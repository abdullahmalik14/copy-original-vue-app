<script setup>
import PopupHandler from "../../PopupHandler.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// props define karo
const props = defineProps({
  modelValue: Boolean,
  title: String,
  logo: String,
});

const emit = defineEmits(["update:modelValue"]);

const config = {
  actionType: "slidein",
  from: "top",
  showOverlay: true,
  closeOnOutside: true,
  escToClose: true,
  width: { default: "100%", "<640": "100%" },
  height: { default: "200px", "<640": "200px" },
  speed: "250ms", // ✅ Open smooth
  effect: "cubic-bezier(0.4, 0, 0.2, 1)",
  closeSpeed: "250ms",
  // closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
  offset: "0px",
};

const submenuPopupConfig = {
  actionType: "slidein",
  from: "right",
  offset: "0px",
  speed: "250ms",
  effect: "ease-in-out",
  showOverlay: false,
  closeOnOutside: true,
  lockScroll: false,
  escToClose: true,
  width: { default: "100%", "<640": "100%" },
  height: "100vh",
  scrollable: true,
  closeSpeed: "250ms",
  closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const headerMenuPanel = ref(null);
const showSubmenuPopup = ref(false);
const selectedMenuItem = ref(null);
import { menuItems } from "../../../../../assets/data/menuItems.js";
import { useRouter } from "vue-router";
const router = useRouter();


// Menu item click handler
const handleMenuClick = (e, item) => {
  e.preventDefault();

  if (item.children && item.children.length > 0) {
    selectedMenuItem.value = item;
    showSubmenuPopup.value = true;
  } else if (item.enabled && item.route) {
    router.push(item.route); // ✅ Route navigation
    emit("update:modelValue", false); // ✅ Main popup close
  }
};

// Submenu item click handler
const handleSubmenuClick = (e, childItem) => {
  e.preventDefault();
  
  if (childItem.enabled && childItem.route) {
    router.push(childItem.route); // ✅ Navigate
    showSubmenuPopup.value = false; 
    emit("update:modelValue", false); 
  }
};


const renderHeaderNav = () => {
  const menuEl = headerMenuPanel.value;
  if (!menuEl || !menuItems.length) return;

  // clear old
  menuEl.innerHTML = "";

  // render each item
  menuItems.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "sidebar-item group";
    
    if (!item.enabled) {
      wrapper.className += " disabled opacity-50 pointer-events-none";
    }

    const a = document.createElement("a");
    a.className = `main-menu-item flex flex-col outline-none items-center justify-center self-stretch gap-0.5 p-2 rounded min-w-[4.5rem] min-h-[4.5rem] group-hover:bg-sidebar-active transition-all duration-200 cursor-pointer`;
    a.setAttribute("href", item.route || "#");
    a.title = item.title;
    
    a.innerHTML = `
      <img
        src="${item.image}"
        alt="${item.title}"
        class="w-6 h-6 pointer-events-none group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
      />
      <span class="text-sidebar-text text-[0.625rem] leading-[1.125rem] text-center font-medium pointer-events-none group-hover:text-sidebar-active-text">
        ${item.title}
      </span>
    `;

    // Click event add karo
    a.addEventListener("click", (e) => handleMenuClick(e, item));

    wrapper.appendChild(a);
    menuEl.appendChild(wrapper);
  });
};

onMounted(() => {
  renderHeaderNav();
});
</script>


<template>
  <PopupHandler
    :modelValue="props.modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    :config="config"
  >
    <div
      class="sidebar-main-wrapper flex flex-col items-center justify-start bg-sidebar-bg w-full pt-2 pb-2 gap-4 left-0 backdrop-blur-lg px-4 fixed top-0 z-[5] h-auto sm:h-auto sm-md:h-auto h-screen shadow-sidebar opacity-100 visible pointer-events-auto scale-100 origin-[100%_0]"
    >
      <!-- nav-close-button -->
      <div class="flex flex-col items-end self-stretch">
        <a
          @click="emit('update:modelValue', false)"
          class="flex items-center justify-center w-8 h-8 cursor-pointer"
        >
          <img
            src="https://i.ibb.co/HfPJmd0W/svgviewer-png-output-40.webp"
            alt="svgviewer-png-output-40"
            class="w-6 h-6"
          />
        </a>
      </div>

      <!-- main-navigation -->
      <div
        class="sidebar-nav-wrapper flex-1 sm:flex-1 sm-md:flex-1 flex-none flex flex-col items-center self-stretch gap-1 px-2 py-1"
      >
        <div class="flex flex-col items-center self-stretch gap-1">
          <div class="flex flex-col self-stretch relative z-[5]">
            <div
              class="menu-panel grid gap-4 items-center self-stretch grid-cols-3 sm:grid-cols-5 sm-md:grid-cols-6"
              ref="headerMenuPanel"
            ></div>
          </div>
        </div>
      </div>

      <!-- sidebar-bottom-controls -->
      <div class="flex flex-col gap-2 items-center self-stretch py-2">
        <div class="flex justify-between items-center gap-2 self-stretch px-2">
          <!-- help -->
          <a
            href=""
            class="inline-flex items-center opacity-50 py-1 gap-1.5 transition-all duration-200 pointer-events-none px-1.5"
          >
            <img
              src="https://i.ibb.co/xSY4RGZp/svgviewer-png-output-52.webp"
              alt="help"
              class="w-5 h-5 pointer-events-none"
            />
            <span
              class="text-sidebar-help-text leading-[1.125rem] pointer-events-none text-[0.75rem] font-medium"
              >Help</span
            >
          </a>

          <!-- logout -->
          <a
            href=""
            class="logout-button py-1 px-1.5 transition-all duration-200 rounded bg-sidebar-logout-bg inline-flex items-center gap-1.5 hover:bg-sidebar-logout-hover"
          >
            <img
              src="https://i.ibb.co/ccpY1KKt/svgviewer-png-output-53.webp"
              alt="logout"
              class="w-5 h-5 pointer-events-none"
            />
            <span
              class="text-sidebar-logout-text leading-[1.125rem] pointer-events-none text-[0.75rem] font-medium"
              >Logout</span
            >
          </a>
        </div>
      </div>
    </div>
  </PopupHandler>

  <!-- Submenu Popup -->
  <PopupHandler
    v-model="showSubmenuPopup"
    :config="submenuPopupConfig"
    :is-loading="false"
  >
    <div
        class="w-full h-[100vh] flex flex-col items-start gap-4 overflow-hidden bg-submenu-bg px-4 py-2 shadow-md backdrop-blur-lg"
      >
        <!-- submenu-header -->
        <div class="flex flex-col gap-4 w-full">
          <!-- title -->
          <div class="flex items-center justify-center gap-2 w-full">
            <img
              v-if="selectedMenuItem?.image"
            :src="selectedMenuItem.image" 
            :alt="selectedMenuItem.title"
              class="w-5 h-5"
            />
            <span class="text-sm font-semibold text-submenu-title-text">
              {{ selectedMenuItem?.title }}
          </span>
          </div>

          <!-- back-button -->
          <div>
            <a
              data-slidein-close
              class="flex h-6 w-8 items-center justify-center rounded-md transition hover:bg-submenu-item-hover-bg"
            >
              <img
                src="https://i.ibb.co/yc4yx8NT/svgviewer-png-output-55.webp"
                alt="back"
                class="pointer-events-none h-6 w-6"
              />
            </a>
          </div>
          
        </div>

        <!-- Submenu items -->
        <div
          class="flex flex-col overflow-auto w-full gap-2 py-2"
        >
          <button
            v-for="child in selectedMenuItem?.children"
          :key="child.id"
            :disabled="!child.enabled"
            @click="(e) => child.enabled && handleSubmenuClick(e, child)"
            :class="[
              'relative flex w-full gap-3 outline-none rounded-md px-4 py-2 justify-center group transition-all duration-200',
              child.enabled
                ? 'hover:bg-transparent cursor-pointer'
                : 'cursor-not-allowed opacity-50',
            ]"
          >
            <span
              :class="[
                'relative z-10 text-sm font-medium transition',
                child.enabled
                  ? 'text-submenu-item-text group-hover:text-submenu-item-hover-shadow'
                  : 'text-gray-400',
              ]"
            >
              {{ child.title }}

              <span
                v-if="child.count"
                :class="[
                  `text-[0.625rem] font-medium text-submenu-item-text`,
                  child.enabled
                    ? `group-hover:text-submenu-item-hover-shadow`
                    : ``,
                ]"
              >
                {{ child.count }}
              </span>
            </span>

            <!-- Left hover effect -->
            <div
              v-if="child.enabled"
              class="absolute top-0 left-0 z-0 h-full w-[calc(100%-1.25rem)] opacity-0 group-hover:opacity-100 group-hover:visible invisible bg-black shadow-green transition"
            ></div>

            <!-- Skewed side -->
            <div
              v-if="child.enabled"
              class="absolute top-0 left-[calc(100%-1.25rem)] z-0 h-full w-4 -translate-x-[0.438rem] -skew-x-[20deg] bg-black shadow-green opacity-0 group-hover:opacity-100 group-hover:visible invisible transition"
            ></div>
          </button>
        </div>
      </div>
  </PopupHandler>
</template>
