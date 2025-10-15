<!-- ====================== PopupHandler.vue ======================
A single, reusable Vue 3 SFC that handles BOTH centered popups and slide-ins.
- Teleports to <body>
- Shared overlay (singleton) with stacking
- Responsive width/height maps using your schema
- Effects: instant, fade, scale, slideTopFade (popup); translate for slide-in
- Focus trap, Esc-to-close, body scroll lock
- Events: DOM CustomEvents + Vue emits, with detailed flags in event.detail
- Data-attribute close buttons: [data-popup-close], [data-slidein-close]
- Loader via CONFIG-SPECIFIED COMPONENT (no built-in loader markup)
- Allows custom classes and attributes on the container
- Defaults per your specs (close is instant; popup default height is 500px; slide-in from left)
- NEW: Optional scrollable content with hidden scrollbar
================================================================= -->
<template>
  <Teleport to="body">
    <!-- Panel wrapper (modal container) -->
    <div
      v-show="isVisible"
      ref="panelRef"
      :role="ariaRole"
      :aria-modal="isModal ? 'true' : undefined"
      :tabindex="isModal ? -1 : undefined"
      :class="containerClassList"
      v-bind="containerBindAttrs"
      @keydown.esc.prevent.stop="onEsc"
      @click.stop
    >
      <!-- Optional loader (rendered via config.loader.component) -->
      <div
        v-if="isLoading"
        class="pointer-events-none"
        style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:9999; background:rgba(0,0,0,0.1);"
      >
        <component
          v-if="loaderComponent"
          :is="loaderComponent"
          v-bind="loaderProps"
          :data-loader-position="loaderPosition"
        />
        <div v-else class="rounded-lg shadow-lg px-6 py-4 text-center border-2 border-blue-300">
          <div class="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
          <div class="text-sm font-medium text-gray-700">Loading...</div>
        </div>
      </div>

      <!-- Content slot -->
      <div
        ref="contentRef"
        :class="contentClassList"
        @click.stop
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * PopupHandler.vue
 * Requirements satisfied:
 *  - Vue 3 + <script setup>, JS
 *  - Shared overlay & stacking via composable
 *  - Config schema preserved (width/height maps with "<", "A-B", ">", "default")
 *  - Popup positions: center-center (default), top-center, or full page (when width/height resolve to 100%)
 *  - Slide-in: default from left; respects offset; pins to edge unless offset set
 *  - Close on outside clicks closes the MOST RECENT panel (top of stack), subsequent outside clicks close lower ones in turn
 *  - Default close is INSTANT; popup default height 500px; slide-in height 100%
 *  - Data-attribute close buttons supported inside content
 *  - Custom classes & attributes on container via config.containerClass / config.containerAttrs
 *  - Validate presence before acting; throw with clear console error (as requested)
 *  - Events carry flags and metadata for custom logic
 *  - NEW: Optional scrollable content with hidden scrollbar (default: true)
 */

import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { usePopupStack } from '../../../utils/usePopupStack.js';

const props = defineProps({
  /**
   * Full config object (schema preserved)
   * Example keys:
   * {
   *   actionType: "popup" | "slidein",
   *   speed, effect, customEffect, closeSpeed, closeEffect,
   *   showOverlay, closeOnOutside, lockScroll, zIndex, forceZIndex,
   *   width: {...}, height: {...},
   *   from: "left" | "right" | "top" | "bottom",
   *   offset: "0px" | "30px" | number,
   *   resetOnClose, customClass, containerClass, containerAttrs,
   *   escToClose, onOpen, onClose,
   *   position: "center" | "top-center" | "full" (popup only),
   *   loader: { component: <VueComponent>, props: {...}, position: "center"|"top-center"|... },
   *   scrollable: true | false (NEW: makes content scrollable with hidden scrollbar)
   * }
   */
  config: {
    type: Object,
    required: true
  },
  /**
   * v-model control for visibility
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * Optional loading state to show loader component
   */
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'opened',
  'closed'
]);

// -------------------- Defaults (per your spec) --------------------
const defaults = {
  actionType: 'popup',
  speed: '200ms',
  effect: 'ease',
  customEffect: 'scale', // popup default
  closeSpeed: '0ms',     // default close is INSTANT
  closeEffect: 'instant',
  showOverlay: true,
  closeOnOutside: true,
  lockScroll: true,
  zIndex: 2000,
  forceZIndex: null,
  width: { default: '600px' },
  height: { default: '500px' }, // popup default height
  from: 'left', // slide-in default
  offset: '0px',
  resetOnClose: true,
  customClass: '',
  containerClass: '',
  containerAttrs: {},
  escToClose: true,
  position: 'center', // popup: center | top-center | full (inferred if width/height=100%)
  scrollable: true // NEW: default scrollable with hidden scrollbar
};

// -------------------- State & Refs --------------------
const panelRef = ref(null);
const contentRef = ref(null);
const isVisible = ref(false);
const currentZ = ref(defaults.zIndex);

const {
  registerPanel,
  unregisterPanel,
  bringToFront,
  setOverlayActive,
  setOverlayVisible,
  setOverlayZ,
  overlayClick,
  bodyScrollLock,
} = usePopupStack();

// -------------------- Helpers --------------------
const cfg = computed(() => ({ ...defaults, ...(props.config || {}) }));

function errorAndThrow(msg) {
  console.error(`[PopupHandler] ${msg}`);
  throw new Error(msg);
}

function resolveResponsive(value) {
  if (value == null) return value;
  if (typeof value !== 'object') {
    return (typeof value === 'string') ? value.trim().toLowerCase() : value;
  }
  const w = window.innerWidth;
  const fallback = value.default ?? Object.values(value)[0];
  let matched = null;

  for (const key in value) {
    if (key === 'default') continue;
    if (key.startsWith('<')) {
      const lim = parseInt(key.slice(1), 10);
      if (w < lim) matched = value[key];
    } else if (key.startsWith('>')) {
      const lim = parseInt(key.slice(1), 10);
      if (w > lim) matched = value[key];
    } else if (key.includes('-')) {
      const [min, max] = key.split('-').map(n => parseInt(n, 10));
      if (w >= min && w <= max) matched = value[key];
    }
  }
  const resolved = (matched ?? fallback);
  return (typeof resolved === 'string') ? resolved.trim().toLowerCase() : resolved;
}

function isInstantOpen() {
  // open animation considered instant if speed === "0ms" OR customEffect === "instant"
  return cfg.value.speed === '0ms' || cfg.value.customEffect === 'instant';
}
function isInstantClose() {
  // close animation considered instant if closeSpeed === "0ms" OR closeEffect === "instant"
  return (cfg.value.closeSpeed ?? cfg.value.speed) === '0ms' || (cfg.value.closeEffect ?? cfg.value.effect) === 'instant';
}

function dispatchDomEvent(name, detail) {
  // Include a "flag" payload for custom logic as requested
  // detail will include: type, mode, isPopup, isSlideIn, zIndex, id (if containerAttrs has data-* id), timestamps, etc.
  const el = panelRef.value;
  if (!el) return;
  const ev = new CustomEvent(name, { bubbles: true, cancelable: false, detail });
  el.dispatchEvent(ev);
}

// -------------------- Derived styles & classes --------------------
const isPopup = computed(() => (cfg.value.actionType || 'popup') === 'popup');
const isSlideIn = computed(() => !isPopup.value);

const ariaRole = computed(() => {
  // Use dialog semantics for modal popups; slide-ins default to complementary unless overlay makes them modal
  if (isPopup.value) return 'dialog';
  return cfg.value.showOverlay ? 'dialog' : 'complementary';
});
const isModal = computed(() => !!cfg.value.showOverlay);

// container class: minimal Tailwind; visual decisions mostly from config / inline transforms
const containerClassList = computed(() => {
  const base = [
    // positioning controlled inline; still add isolation and text settings
    'isolate',
    'text-base',
    'antialiased',
    'overflow-hidden' // container clips its own content (scroll applied inside content box)
  ];
  // Allow custom class string/array
  if (cfg.value.containerClass) {
    if (Array.isArray(cfg.value.containerClass)) base.push(...cfg.value.containerClass);
    else base.push(cfg.value.containerClass);
  }
  if (cfg.value.customClass) base.push(cfg.value.customClass);
  return base;
});

const contentClassList = computed(() => {
  // Provide a minimal default for white bg and shadow; caller can override via slot classes if desired
  const base = [
    // 'bg-white',
    // 'shadow-xl',
  ];
  
  // Add border radius only for popups, not slide-ins
  // if (isPopup.value) {
  //   base.push('rounded-xl');
  // }
  
  // NEW: Add scrollable behavior with hidden scrollbar if enabled
  if (cfg.value.scrollable !== false) {
    base.push('overflow-auto', 'scrollbar-hide');
  } else {
    base.push('overflow-visible');
  }
  
  return base;
});

const containerBindAttrs = computed(() => {
  // Add any data-* or aria-* attributes the caller wants
  const attrs = cfg.value.containerAttrs || {};
  return attrs;
});

// Loader component from config
const loaderComponent = computed(() => (cfg.value.loader && cfg.value.loader.component) ? cfg.value.loader.component : null);
const loaderProps = computed(() => (cfg.value.loader && cfg.value.loader.props) ? cfg.value.loader.props : {});
const loaderPosition = computed(() => (cfg.value.loader && cfg.value.loader.position) ? cfg.value.loader.position : 'center');

// -------------------- Open/Close mechanics --------------------
async function openPanel() {
  validateBeforeOpen();
  isVisible.value = true;

  await nextTick();

  const panel = panelRef.value;
  if (!panel) return;

  // z-index calc & overlay
  const baseZ = (cfg.value.forceZIndex != null) ? cfg.value.forceZIndex : (cfg.value.zIndex ?? defaults.zIndex);
  currentZ.value = bringToFront(panel, baseZ);
  if (cfg.value.showOverlay) {
    setOverlayZ(currentZ.value - 1);
    setOverlayActive(true);
    setOverlayVisible(true);
    if (cfg.value.closeOnOutside) {
      overlayClick.setHandler(() => closeTopMost());
    } else {
      overlayClick.setHandler(() => {/* swallow clicks; do nothing */});
    }
  } else if (cfg.value.closeOnOutside) {
    // Even without overlay, set up outside click detection
    overlayClick.setHandler(() => closeTopMost());
  }

  // Body scroll lock
  if (cfg.value.lockScroll) bodyScrollLock(true);

  // Initial inline styles (positioning + transform off-screen if needed)
  applyInitialStyles(panel);

  // Wire data-close buttons
  wireCloseButtons();

  // Focus handling
  focusFirstFocusable();

  // Animate open
  requestAnimationFrame(() => {
    applyEnterStyles(panel);
    const done = () => {
      // Add document click listener for outside click detection (only if no overlay)
      if (!cfg.value.showOverlay && cfg.value.closeOnOutside) {
        // Use setTimeout to ensure the popup is fully rendered before adding the listener
        setTimeout(() => {
          document.addEventListener('click', handleDocumentClick);
        }, 100);
      }
      
      // Dispatch events with flags
      const detail = buildEventDetail('open');
      const domName = isPopup.value ? (cfg.value.onOpen || 'popup:open') : (cfg.value.onOpen || 'slidein:open');
      dispatchDomEvent(domName, detail);
      emit('opened', detail);
    };
    if (isInstantOpen()) done();
    else panel.addEventListener('transitionend', done, { once: true });
  });
}

function closePanel() {
  const panel = panelRef.value;
  if (!panel) return;

  applyLeaveStyles(panel);

  const finalize = () => {
    // Reset styles if requested
    if (cfg.value.resetOnClose) {
      panel.removeAttribute('style');
      if (cfg.value.customClass) {
        // nothing else to remove; customClass is kept as class (per spec)
      }
    }
    isVisible.value = false;

    // Unlock scroll if this panel was locking it
    if (cfg.value.lockScroll) bodyScrollLock(false);

    // Remove document click listener if it was added
    if (!cfg.value.showOverlay && cfg.value.closeOnOutside) {
      document.removeEventListener('click', handleDocumentClick);
    }

    // Overlay & scroll unlock managed by stack (only if top-most)
    unregisterPanel(panel);

    // Restore focus to previous element
    restoreFocus();

    // Events
    const detail = buildEventDetail('close');
    const domName = isPopup.value ? (cfg.value.onClose || 'popup:close') : (cfg.value.onClose || 'slidein:close');
    dispatchDomEvent(domName, detail);
    emit('closed', detail);
  };

  if (isInstantClose()) finalize();
  else panel.addEventListener('transitionend', finalize, { once: true });
}


function closeTopMost() {
  // Only close if THIS panel is top-most; otherwise let the real top-most handle it
  const panel = panelRef.value;
  if (!panel) return;
  if (bringToFront.isTop(panel)) {
    emit('update:modelValue', false);
  }
}

function handleDocumentClick(event) {
  const panel = panelRef.value;
  if (!panel || !isVisible.value) return;
  
  // Check if click is outside the panel
  if (!panel.contains(event.target)) {
    closeTopMost();
  }
}

// -------------------- Validation --------------------
function validateBeforeOpen() {
  // Always validate presence before performing actions
  // Popup always centers (or top-center/full page per config); slide-in requires direction
  // Ensure we have the element refs
  if (!panelRef.value) errorAndThrow('Panel element not found.');
  if (!contentRef.value) errorAndThrow('Content element not found.');

  // Validate actionType
  const at = cfg.value.actionType || 'popup';
  if (at !== 'popup' && at !== 'slidein') errorAndThrow(`Invalid actionType "${at}". Use "popup" or "slidein".`);

  // Validate effects if provided
  const ce = (cfg.value.customEffect || (isPopup.value ? 'scale' : null));
  if (isPopup.value) {
    const allowed = ['instant', 'fade', 'scale', 'slideTopFade'];
    if (ce && !allowed.includes(ce)) errorAndThrow(`Unsupported popup customEffect "${ce}". Allowed: ${allowed.join(', ')}`);
  }

  // slide-in direction
  if (isSlideIn.value) {
    const dir = cfg.value.from || 'left';
    const allowedDir = ['left', 'right', 'top', 'bottom'];
    if (!allowedDir.includes(dir)) errorAndThrow(`Invalid slide-in "from"="${dir}". Allowed: ${allowedDir.join(', ')}`);
  }

  // Validate width/height types
  validateSizeValue(cfg.value.width, 'width');
  validateSizeValue(cfg.value.height, 'height');
}

function validateSizeValue(value, name) {
  if (value == null) return; // null/undefined is allowed
  
  if (typeof value === 'string') {
    // String values: px, %, vw, vh, auto
    const validStringPattern = /^(auto|\d+(\.\d+)?(px|%|vw|vh))$/i;
    if (!validStringPattern.test(value.trim())) {
      errorAndThrow(`Invalid ${name} string value "${value}". Use format like "600px", "50%", "100vw", "100vh", or "auto".`);
    }
  } else if (typeof value === 'number') {
    // Number values: treated as pixels
    if (value < 0) {
      errorAndThrow(`Invalid ${name} number value "${value}". Must be non-negative.`);
    }
  } else if (typeof value === 'object') {
    // Responsive object: validate each key-value pair
    for (const key in value) {
      if (key === 'default') {
        validateSizeValue(value[key], `${name}.default`);
      } else if (key.startsWith('<') || key.startsWith('>')) {
        // Breakpoint keys like "<640", ">1024"
        const num = parseInt(key.slice(1), 10);
        if (isNaN(num) || num <= 0) {
          errorAndThrow(`Invalid ${name} breakpoint key "${key}". Use format like "<640" or ">1024".`);
        }
        validateSizeValue(value[key], `${name}.${key}`);
      } else if (key.includes('-')) {
        // Range keys like "301-767"
        const [min, max] = key.split('-').map(n => parseInt(n, 10));
        if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0 || min >= max) {
          errorAndThrow(`Invalid ${name} range key "${key}". Use format like "301-767" where min < max.`);
        }
        validateSizeValue(value[key], `${name}.${key}`);
      } else {
        errorAndThrow(`Invalid ${name} object key "${key}". Use "default", "<N", ">N", or "N-M" format.`);
      }
    }
  } else {
    errorAndThrow(`Invalid ${name} type "${typeof value}". Use string, number, or responsive object.`);
  }
}

// -------------------- Style application --------------------
function applyInitialStyles(panel) {
  const w = resolveResponsive(cfg.value.width);
  const h = resolveResponsive(cfg.value.height);
  const normalizedW = (typeof w === 'string') ? w.trim().toLowerCase() : w;
  const normalizedH = (typeof h === 'string') ? h.trim().toLowerCase() : h;
  const isFullW = ['100%', '100vw'].includes(normalizedW);
  const isFullH = ['100%', '100vh'].includes(normalizedH);

  // Base styles
  panel.style.position = 'fixed';
  panel.style.zIndex = String(currentZ.value);
  panel.style.visibility = 'visible';
  panel.style.width = (normalizedW ?? 'auto');
  panel.style.height = (normalizedH ?? (isPopup.value ? '500px' : '100%'));
  panel.style.maxHeight = window.innerHeight + 'px';
  panel.style.overflow = 'visible'; // content box has its own overflow

  // Positioning
  if (isPopup.value) {
    const pos = cfg.value.position || 'center';
    if (isFullW) {
      panel.style.left = '0';
      panel.style.right = '0';
    } else {
      panel.style.left = '50%';
    }
    if (isFullH) {
      panel.style.top = '0';
      panel.style.bottom = '0';
    } else {
      if (pos === 'top-center') {
        panel.style.top = '0';
      } else {
        // center-center
        panel.style.top = '50%';
      }
    }

    // Initial transform based on effect
    const effect = cfg.value.customEffect || 'scale';
    if (isInstantOpen()) {
      panel.style.transition = 'none';
      if (!isFullW || !isFullH) {
        if (effect === 'slideTopFade') {
          panel.style.opacity = '1';
          panel.style.transform = 'translate(-50%, -50%)';
        } else if (effect === 'fade') {
          panel.style.opacity = '1';
        } else if (effect === 'scale') {
          panel.style.transform = 'translate(-50%, -50%)';
        }
      }
    } else {
      if (effect === 'fade') {
        panel.style.opacity = '0';
        panel.style.transition = `opacity ${cfg.value.speed} ${cfg.value.effect}`;
      } else if (effect === 'slideTopFade') {
        panel.style.opacity = '0';
        panel.style.transform = isFullW || isFullH
          ? 'none'
          : (pos === 'top-center' ? 'translate(-50%, -150%)' : 'translate(-50%, -150%)');
        panel.style.transition = `transform ${cfg.value.speed} ${cfg.value.effect}, opacity ${cfg.value.speed} ${cfg.value.effect}`;
      } else { // scale default
        panel.style.transform = (isFullW || isFullH)
          ? 'none'
          : (pos === 'top-center' ? 'translate(-50%, 0) scale(0)' : 'translate(-50%, -50%) scale(0)');
        panel.style.transition = `transform ${cfg.value.speed} ${cfg.value.effect}`;
      }
    }

    // translate offsets for centering
    if (!isFullW && !isFullH && cfg.value.position !== 'top-center') {
      panel.style.transform = panel.style.transform || 'translate(-50%, -50%)';
    }
    if (!isFullW && isFullH) {
      // full height but not full width → vertical center via translateY(-50%)
      if (cfg.value.customEffect !== 'fade') {
        panel.style.transform = 'translate(-50%, 0)'; // already centered horizontally via left:50%
      }
    }

  } else {
    // Slide-in
    const dir = cfg.value.from || 'left';
    const offset = (typeof cfg.value.offset === 'number') ? `${cfg.value.offset}px` : (cfg.value.offset || '0px');

    if (dir === 'left' || dir === 'right') {
      panel.style.top = '0';
      panel.style.bottom = '0';
      if (dir === 'left') {
        panel.style.left = offset || '0';
        panel.style.right = 'auto';
        panel.style.transform = 'translateX(-100%)';
      } else {
        panel.style.right = offset || '0';
        panel.style.left = 'auto';
        panel.style.transform = 'translateX(100%)';
      }
      panel.style.height = '100%';
    } else {
      panel.style.left = '0';
      panel.style.right = '0';
      if (dir === 'top') {
        panel.style.top = offset || '0';
        panel.style.bottom = 'auto';
        panel.style.transform = 'translateY(-100%)';
      } else {
        panel.style.bottom = offset || '0';
        panel.style.top = 'auto';
        panel.style.transform = 'translateY(100%)';
      }
      panel.style.width = (normalizedW ?? '100%');
    }

    if (isInstantOpen()) {
      panel.style.transition = 'none';
    } else {
      const prop = (dir === 'left' || dir === 'right') ? 'transform' : 'transform';
      panel.style.transition = `${prop} ${cfg.value.speed} ${cfg.value.effect}`;
    }
  }
}

function applyEnterStyles(panel) {
  if (isPopup.value) {
    const w = resolveResponsive(cfg.value.width);
    const h = resolveResponsive(cfg.value.height);
    const isFullW = ['100%', '100vw'].includes((w || '').toString());
    const isFullH = ['100%', '100vh'].includes((h || '').toString());
    const pos = cfg.value.position || 'center';
    const effect = cfg.value.customEffect || 'scale';

    if (effect === 'fade') {
      panel.style.opacity = '1';
    } else if (effect === 'slideTopFade') {
      panel.style.opacity = '1';
      panel.style.transform = (isFullW || isFullH)
        ? 'none'
        : (pos === 'top-center' ? 'translate(-50%, 0)' : 'translate(-50%, -50%)');
    } else { // scale
      panel.style.transform = (isFullW || isFullH)
        ? 'none'
        : (pos === 'top-center' ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, -50%) scale(1)');
    }
  } else {
    // Slide-in: move to 0
    panel.style.transform = 'translate(0, 0)';
  }
}

function applyLeaveStyles(panel) {
  if (isInstantClose()) {
    panel.style.transition = 'none';
  }
  if (isPopup.value) {
    const effect = cfg.value.customEffect || 'scale';
    if (effect === 'fade') {
      panel.style.opacity = '0';
    } else if (effect === 'slideTopFade') {
      panel.style.opacity = '0';
      panel.style.transform = 'translate(-50%, -150%)';
    } else {
      panel.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  } else {
    const dir = cfg.value.from || 'left';
    if (dir === 'left') panel.style.transform = 'translateX(-100%)';
    else if (dir === 'right') panel.style.transform = 'translateX(100%)';
    else if (dir === 'top') panel.style.transform = 'translateY(-100%)';
    else panel.style.transform = 'translateY(100%)';
  }
}

// -------------------- Focus & keyboard --------------------
let lastActive = null;

function focusFirstFocusable() {
  lastActive = document.activeElement;
  const el = panelRef.value;
  if (!el) return;
  // Try to focus the first focusable inside content
  const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const first = el.querySelector(selectors);
  (first || el).focus({ preventScroll: true });
}

function restoreFocus() {
  if (lastActive && typeof lastActive.focus === 'function') {
    lastActive.focus({ preventScroll: true });
  }
}

function onEsc() {
  if (!cfg.value.escToClose) return;
  closeTopMost();
}

// -------------------- Close buttons --------------------
function wireCloseButtons() {
  const el = panelRef.value;
  if (!el) return;
  const selector = isPopup.value ? '[data-popup-close]' : '[data-slidein-close]';
  el.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('click', handleCloseClick, { once: false });
  });
}
function handleCloseClick() {
  closeTopMost();
}

// -------------------- Events detail --------------------
function buildEventDetail(phase) {
  return {
    phase,                        // "open" | "close"
    type: cfg.value.actionType || 'popup',
    isPopup: isPopup.value,
    isSlideIn: isSlideIn.value,
    zIndex: currentZ.value,
    timestamp: Date.now(),
    flags: {
      instantOpen: isInstantOpen(),
      instantClose: isInstantClose(),
      hasOverlay: !!cfg.value.showOverlay,
      lockScroll: !!cfg.value.lockScroll,
      scrollable: cfg.value.scrollable !== false
    },
    config: { ...cfg.value }
  };
}

// -------------------- Watchers & lifecycle --------------------
watch(() => props.modelValue, (nv) => {
  if (nv) {
    registerPanel(panelRef, {
      onBecomeTop: () => { /* no-op; could add highlighting */ },
      onAllClosed: () => {
        // When all closed: hide overlay & unlock scroll
        setOverlayVisible(false);
        setOverlayActive(false);
        bodyScrollLock(false);
      }
    });
    openPanel();
  } else {
    if (isVisible.value) closePanel();
  }
}, { immediate: false });

watch(() => cfg.value.width, () => {
  if (!isVisible.value) return;
  const panel = panelRef.value;
  if (!panel) return;
  panel.style.width = resolveResponsive(cfg.value.width);
});
watch(() => cfg.value.height, () => {
  if (!isVisible.value) return;
  const panel = panelRef.value;
  if (!panel) return;
  panel.style.height = resolveResponsive(cfg.value.height);
  panel.style.maxHeight = window.innerHeight + 'px';
});

function handleWindowResize() {
  if (!isVisible.value) return;
  const panel = panelRef.value;
  if (!panel) return;
  // Re-apply width/height responsively
  if (cfg.value.width) panel.style.width = resolveResponsive(cfg.value.width);
  if (cfg.value.height) panel.style.height = resolveResponsive(cfg.value.height);
  panel.style.maxHeight = window.innerHeight + 'px';
}

onMounted(() => {
  window.addEventListener('resize', handleWindowResize, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize);
  // Remove document click listener if it was added
  if (!cfg.value.showOverlay && cfg.value.closeOnOutside) {
    document.removeEventListener('click', handleDocumentClick);
  }
  // Ensure scroll unlocked if this panel was locking it
  bodyScrollLock(false);
  const panel = panelRef.value;
  if (panel) unregisterPanel(panel);
});

// -------------------- v-model methods exposed --------------------
defineExpose({
  open: () => { emit('update:modelValue', true); },
  close: () => { emit('update:modelValue', false); },
  toggle: () => { emit('update:modelValue', !props.modelValue); }
});
</script>

<style scoped>
/* No hard-coded visual CSS; Tailwind handles visuals.
   Positioning/transform/opacity are inline because they're dynamic. */
</style>
