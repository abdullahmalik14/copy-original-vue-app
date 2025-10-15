// =========================== usePopupStack.js ===========================
// Shared overlay + stacking + body scroll lock. Minimal and framework-friendly.
// Creates a singleton overlay element appended to <body> on first use.
// Manages top-most panel and outside-click behavior.
let overlayEl = null;
let overlayActive = false;
let overlayVisible = false;
let lockCount = 0;
const stack = []; // { el: HTMLElement, baseZ: number }

function ensureOverlay() {
  if (overlayEl) return overlayEl;
  overlayEl = document.createElement('div');
  overlayEl.setAttribute('data-popup-overlay', '');
  Object.assign(overlayEl.style, {
    position: 'fixed',
    inset: '0',
    opacity: '0',
    // background: 'rgba(0,0,0,0.4)',
    transition: 'opacity 150ms ease',
    visibility: 'hidden',
    zIndex: '1999', // will be overridden dynamically
    width: '100vw',
height: '100vh',
backdropFilter: 'blur(7.5px)',
backgroundColor: 'rgba(0, 0, 0, 0.05)'
  });
  document.body.appendChild(overlayEl);
  overlayEl.addEventListener('click', () => {
    if (overlayClick._handler) overlayClick._handler();
  });
  return overlayEl;
}

export const overlayClick = {
  _handler: null,
  setHandler(fn) { this._handler = fn; }
};

export function usePopupStack() {
  function registerPanel(elRef, callbacks) {
    const el = elRef?.value || elRef?.el || elRef;
    if (!el) {
      console.error('[usePopupStack] registerPanel: invalid element.');
      return;
    }
    const baseZ = Number(el.style.zIndex || 2000);
    stack.push({ el, baseZ, callbacks });
    bringToFront(el, baseZ);
    if (overlayActive) {
      setOverlayVisible(true);
    }
  }

  function unregisterPanel(el) {
    const idx = stack.findIndex(s => s.el === el);
    if (idx !== -1) stack.splice(idx, 1);
    // If no panels left, hide overlay & unlock scroll handled by caller via callbacks.onAllClosed
    if (stack.length === 0) {
      setOverlayVisible(false);
      overlayActive = false;
    } else {
      // Re-position overlay zIndex below new top-most
      const top = stack[stack.length - 1];
      setOverlayZ(Number(top.el.style.zIndex) - 1);
      if (top.callbacks?.onBecomeTop) top.callbacks.onBecomeTop();
    }
  }

  function bringToFront(el, baseZ) {
    // If baseZ is a forceZIndex (high value > 5000), use it directly
    if (baseZ && baseZ > 5000) {
      el.style.zIndex = String(baseZ);
      ensureOverlay();
      setOverlayZ(baseZ - 1);
      return baseZ;
    }
    
    // For normal popups, only consider other normal popups (z-index < 5000) for stacking
    const normalStackZ = stack
      .map(s => Number(s.el.style.zIndex || s.baseZ || 2000))
      .filter(z => z < 5000); // Only consider normal z-index values
    
    const maxNormalZ = normalStackZ.length > 0 ? Math.max(...normalStackZ) : 2000;
    const newZ = Math.max(maxNormalZ + 2, baseZ || 2000);
    
    el.style.zIndex = String(newZ);
    // Update overlay z
    ensureOverlay();
    setOverlayZ(newZ - 1);
    return newZ;
  }
  bringToFront.isTop = (el) => {
    if (stack.length === 0) return false;
    const top = stack[stack.length - 1];
    return top.el === el;
  };

  function setOverlayZ(z) {
    ensureOverlay();
    overlayEl.style.zIndex = String(z);
  }

  function setOverlayActive(active) {
    ensureOverlay();
    overlayActive = !!active;
  }

  function setOverlayVisible(visible) {
    ensureOverlay();
    overlayVisible = !!visible;
    if (overlayVisible) {
      overlayEl.style.visibility = 'visible';
      requestAnimationFrame(() => {
        overlayEl.style.opacity = '1';
      });
    } else {
      overlayEl.style.opacity = '0';
      overlayEl.addEventListener('transitionend', () => {
        if (!overlayVisible) overlayEl.style.visibility = 'hidden';
      }, { once: true });
    }
  }

  function bodyScrollLock(shouldLock) {
    if (shouldLock) {
      lockCount += 1;
      document.body.classList.add('overflow-hidden');
    } else {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  return {
    registerPanel,
    unregisterPanel,
    bringToFront,
    setOverlayActive,
    setOverlayVisible,
    setOverlayZ,
    overlayClick,
    bodyScrollLock,
    topZIndexBase: 2000
  };
}
