<template>
  <div
    class="sidebar-wrapper hidden md:flex sticky top-0 z-[3] h-screen flex w-max shadow-custom bg-[rgba(249,250,251,0.7)] backdrop-blur-xs [-ms-overflow-style:none] [scrollbar-width:none]"
  >
    <div
      class="sidebar-container transition-all duration-150 ease-in-out w-[5.625rem] gap-1.5 pt-3 pb-3 z-[5] relative flex flex-col items-center justify-start"
    >
      <!-- site-logo -->
      <div
        @click="$router.push('/dashboard')"
        class="flex items-center gap-2.5 rounded-xl cursor-pointer bg-fce40d opacity-80 transition-opacity duration-200 ease-in-out"
      >
        <img
          src="https://i.ibb.co/k21Vw0Dc/svgviewer-png-output-56.webp"
          alt="logo"
          class="w-9 h-9 pointer-events-none"
        />
      </div>

      <!-- profile & controls -->
      <div
        class="flex flex-col items-center self-stretch gap-2 pt-2 pb-2 pl-1 pr-1 border-b border-d0d5dd"
      >
        <!-- avatar -->
        <div class="flex w-10 h-10 rounded-[1.25rem]">
          <div
            @click="isProfileOpen = true"
            class="flex relative w-10 h-10 rounded-[1.25rem] cursor-pointer"
          >
            <img
              src="https://i.ibb.co/jkjtwC9C/svgviewer-png-output-17.webp"
              alt="user"
              class="w-full h-full rounded-[1.25rem] object-cover pointer-events-none bg-avatar-bg-light"
            />
            <!-- status-indicator -->
            <div
              class="absolute bottom-0 right-0 flex w-2.5 h-2.5 rounded-[0.438rem] bg-status"
            >
              &nbsp;
            </div>
          </div>
        </div>

        <!-- cta-controls -->
        <div
          class="flex items-center justify-center self-stretch gap-2 pl-1 pr-1"
        >
          <!-- log-out -->
          <div
            class="log-out-icon-container flex cursor-pointer items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:bg-notification-hover group"
          >
            <img
              src="https://i.ibb.co/ccpY1KKt/svgviewer-png-output-53.webp"
              alt="logout"
              class="w-5 h-5 pointer-events-none transition-all duration-200 [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(13%)_saturate(594%)_hue-rotate(183deg)_brightness(92%)_contrast(92%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
            />
          </div>

          <!-- notification -->
          <div
            @click="isNotificationOpen = true"
            class="notification-icon-container cursor-pointer flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:bg-notification-hover relative group"
          >
            <img
              src="https://i.ibb.co/v65qxNDc/svgviewer-png-output-38.webp"
              alt="notification"
              class="w-6 h-6 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
            />
            <!-- status-indicator -->
            <div
              class="absolute top-[0.188rem] right-[0.188rem] flex w-[0.438rem] h-[0.438rem] rounded-[0.625rem] bg-ff00a6"
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>

      <!-- main-navigation -->
      <div
        class="flex flex-col items-center self-stretch flex-1 gap-1 pt-1 pb-1 pl-2 pr-2"
        ref="menuContainer"
      >
        <div class="flex flex-col items-center self-stretch gap-1">
          <div class="flex flex-col relative z-[5] self-stretch">
            <div class="flex flex-col items-center self-stretch gap-1">
              <!-- Main menu items will be rendered here by JavaScript -->
            </div>
          </div>

          <!-- More button will be rendered here by JavaScript -->
        </div>
      </div>

      <!-- sidebar-bottom-controls -->
      <div class="flex flex-col items-center self-stretch gap-2 pt-2 pb-2">
        <!-- cta-controls -->
        <div
          class="flex items-center justify-center self-stretch gap-2 pl-1 pr-1"
        >
          <!-- language -->
          <a
            class="language-icon-container flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:bg-notification-hover group"
            href=""
          >
            <img
              src="https://i.ibb.co/4Rjb4cQd/svgviewer-png-output-37.webp"
              alt="language"
              class="w-5 h-5 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
            />
          </a>

          <!-- help -->
          <a
            class="help-icon-container opacity-50 pointer-events-none flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ease-in-out hover:bg-notification-hover group"
            href=""
          >
            <img
              src="https://i.ibb.co/xSY4RGZp/svgviewer-png-output-52.webp"
              alt="help"
              class="w-5 h-5 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- PopupHandler for submenu -->
    <PopupHandler
      v-model="showSubmenuPopup"
      :config="submenuPopupConfig"
      :is-loading="false"
    >
      <div
        class="w-full h-[100vh] flex flex-col items-start gap-4 overflow-hidden bg-submenu-bg px-4 py-2 shadow-md backdrop-blur-lg"
      >
        <!-- submenu-header -->
        <div class="flex jusify-between gap-4 w-full mt-8">
          <!-- title -->
          <div class="flex items-center gap-2 w-full">
            <img
              :src="currentSubmenuImage"
              :alt="currentSubmenuTitle"
              class="w-5 h-5"
            />
            <span class="text-sm font-semibold text-submenu-title-text">{{
              currentSubmenuTitle
            }}</span>
          </div>

          <!-- back-button -->
          <div class="flex w-full justify-end">
            <a
              data-slidein-close
              class="flex items-center justify-center w-6 h-6 md:w-auto md:h-auto p-0 md:p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-panel-light-buttonHover cursor-pointer"
            >
              <img
                class="w-6 h-6 pointer-events-none hidden md:block [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(13%)_saturate(594%)_hue-rotate(183deg)_brightness(92%)_contrast(92%)]"
                src="https://i.ibb.co/KxKfkV17/svgviewer-png-output-59.webp"
                alt="close"
              />
              <img
                class="block w-6 h-6 pointer-events-none md:hidden [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(13%)_saturate(594%)_hue-rotate(183deg)_brightness(92%)_contrast(92%)]"
                src="https://i.ibb.co/N2VqD6yD/svgviewer-png-output-60.webp"
                alt="close"
              />
            </a>
          </div>
        </div>

        <!-- Submenu items -->
        <div class="flex flex-col overflow-auto w-full gap-2 py-2">
          <button
            v-for="child in currentSubmenuItems"
            :key="child.id"
            :disabled="!child.enabled"
            @click="child.enabled && handleChildClick(child)"
            :class="[
              'relative flex w-full gap-3 rounded-md px-4 py-2 group transition-all duration-200 outline-none',
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

    <AvatarProfilePopup
      :config="avatarPopupconfig"
      v-model="isProfileOpen"
      @update:modelValue="
        (val) => {
          closeAllPopups();
          isProfileOpen = val;
        }
      "
    />
    <NotificationPopup
      :config="notificationPopupConfig"
      v-model="isNotificationOpen"
      @update:modelValue="
        (val) => {
          closeAllPopups();
          isNotificationOpen = val;
        }
      "
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { menuItems } from "../../assets/data/menuItems.js";
import PopupHandler from "@/components/ui/popup/PopupHandler.vue";
import AvatarProfilePopup from "@/components/ui/popup/AvatarProfilePopup.vue";
import NotificationPopup from "@/components/ui/popup/NotificationPopup.vue";
import { useRouter } from "vue-router";
const router = useRouter();

export default {
  name: "Sidebar",
  components: {
    PopupHandler,
    AvatarProfilePopup,
    NotificationPopup,
  },
  data() {
    return {
      flyoutHovered: false,
      hideTimeout: null,
      isSidebarAttached: true,
      showSubmenuPopup: false,
      isProfileOpen: false,
      isNotificationOpen: false,
      currentSubmenuItems: [],
      currentSubmenuTitle: "",
      currentSubmenuImage: "",
      submenuPopupConfig: {
        actionType: "slidein",
        from: "left",
        offset: "90px", // Sidebar ke width ke baad se khule (90px = sidebar width)
        speed: "250ms",
        effect: "ease-in-out",
        showOverlay: false, // Overlay nahi chahiye taaki sidebar dikhe
        closeOnOutside: true,
        lockScroll: false, // Scroll lock nahi, kyunki sidebar bhi visible rahna hai
        escToClose: true,
        width: { default: "400px", "<640": "100%" },
        height: "100%",
        scrollable: true,
        closeSpeed: "250ms",
        closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      notificationPopupConfig: {
        actionType: "slidein",
        from: "left",
        offset: "90px",
        speed: "250ms",
        effect: "ease-in-out",
        showOverlay: false,
        closeOnOutside: true,
        lockScroll: false,
        escToClose: true,
        width: { default: "550px", "<640": "100%" },
        height: "100%",
        scrollable: true,
        closeSpeed: "250ms",
        closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      avatarPopupconfig: {
        actionType: "slidein",
        from: "left",
        offset: "90px",
        speed: "250ms",
        effect: "ease-in-out",
        showOverlay: false,
        closeOnOutside: true,
        lockScroll: false,
        escToClose: true,
        width: { default: "550px", "<640": "100%" },
        height: "100%",
        scrollable: true,
        closeSpeed: "250ms",
        closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    };
  },
  mounted() {
    this.renderSidebarMenu();
    this.handleSidebarVisibility();
    window.addEventListener("resize", this.handleSidebarVisibility);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleSidebarVisibility);
  },
  methods: {
    closeAllPopups() {
      this.showSubmenuPopup = false;
      this.isProfileOpen = false;
      this.isNotificationOpen = false;
    },

    createMenuItem(item) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-menu-item", "");
      if (!item.enabled) wrapper.setAttribute("data-disabled", "true");
      wrapper.title = item.title;

      const content = document.createElement("a");
      content.innerHTML = `
        <img
          src="${item.image}"
          alt="${item.title}"
          class="w-6 h-6 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
        />
        <span class="pointer-events-none text-sidebar-text text-[0.625rem] font-medium leading-[1.125rem] text-center transition-all duration-200 group-hover:text-sidebar-active-text">${item.title}</span>
      `;
      content.className =
        "main-menu-item group flex flex-col items-center justify-center self-stretch gap-0.5 p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-active";
      content.setAttribute("href", "#");

      content.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleMenuClick(item);
      });

      if (!item.enabled) {
        content.style.pointerEvents = "none";
        content.style.opacity = "0.5";
      }

      wrapper.className =
        "sidebar-menu-item block transition-all duration-200 ease-in-out rounded-md flex-col items-center justify-center self-stretch";
      if (!item.enabled) {
        wrapper.className += " opacity-50 pointer-events-none grayscale";
      }

      wrapper.appendChild(content);
      return wrapper;
    },

    handleMenuClick(item) {
      this.closeAllPopups(); // ✅ added
      if (item.children && item.children.length > 0) {
        this.currentSubmenuItems = item.children;
        this.currentSubmenuTitle = item.title;
        this.currentSubmenuImage = item.image;
        this.showSubmenuPopup = true;
      } else if (item.enabled && item.route) {
        console.log("Navigate to:", item.route);
        this.$router.push(item.route);
      }
    },

    handleChildClick(child) {
      if (child.enabled && child.route) {
        console.log("Navigate to child route:", child.route);
        this.showSubmenuPopup = false;
        this.$router.push(child.route);
      }
    },

    renderSidebarMenu() {
      // Clear any old flyouts before rerendering
      document
        .querySelectorAll("[data-floating-panel-wrapper], .hover-bridge")
        .forEach((el) => el.remove());

      const menuEl = this.$refs.menuContainer;
      if (!menuEl) return;

      // Clear existing menu items
      const existingItems = menuEl.querySelectorAll(
        ".sidebar-menu-item, [data-more-wrapper]"
      );
      existingItems.forEach((item) => item.remove());

      const sidebarHeight = this.$el.offsetHeight;
      const headerHeight = this.$el.querySelector(
        ".flex.flex-col.items-center.self-stretch.gap-2.pt-2.pb-2"
      ).offsetHeight;
      const footerHeight = this.$el.querySelector(
        ".flex.flex-col.items-center.self-stretch.gap-2.pt-2.pb-2:last-child"
      ).offsetHeight;
      const logoEl = this.$el.querySelector("div.flex.items-center.gap-2\\.5");
      const logoHeight = logoEl ? logoEl.offsetHeight : 0;
      const availableHeight =
        sidebarHeight - headerHeight - footerHeight - logoHeight - 48;

      const testContainer = document.createElement("div");
      testContainer.style.visibility = "hidden";
      testContainer.style.position = "absolute";
      testContainer.style.top = "-9999px";
      document.body.appendChild(testContainer);

      let usedHeight = 0;
      let visibleItems = [];
      let overflowItems = [];

      const tempMore = document.createElement("div");
      tempMore.setAttribute("data-menu-item", "");
      tempMore.innerHTML = `
        <img
          src="https://i.ibb.co/WvqB5S2p/svgviewer-png-output-57.webp"
          alt="More"
          class="w-6 h-6 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
        />
        <span class="pointer-events-none text-sidebar-text text-[0.625rem] font-medium leading-[1.125rem] text-center transition-all duration-200 group-hover:text-sidebar-active-text ">More</span>
      `;
      tempMore.className =
        "main-menu-item group flex flex-col items-center justify-center self-stretch gap-0.5 p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-active ";
      const moreWrapper = document.createElement("div");
      moreWrapper.className =
        "sidebar-menu-item block transition-all duration-200 ease-in-out rounded-md flex-col items-center justify-center self-stretch";
      moreWrapper.appendChild(tempMore);
      testContainer.appendChild(moreWrapper);
      const moreBtnHeight = moreWrapper.offsetHeight + 4;

      for (let item of menuItems) {
        const tempItem = this.createMenuItem(item);
        testContainer.appendChild(tempItem);
        const h = tempItem.offsetHeight + 4;

        if (usedHeight + h + moreBtnHeight <= availableHeight) {
          usedHeight += h;
          visibleItems.push(item);
        } else {
          overflowItems.push(item);
        }
      }

      document.body.removeChild(testContainer);

      const menuItemsContainer = menuEl.querySelector(
        ".flex.flex-col.items-center.self-stretch.gap-1"
      );
      visibleItems.forEach((item) => {
        menuItemsContainer.appendChild(this.createMenuItem(item));
      });

      if (overflowItems.length > 0) {
        this.createOverflowMenu(menuItemsContainer, overflowItems);
      }
    },

    createOverflowMenu(menuEl, overflowItems) {
      const moreWrapper = document.createElement("div");
      moreWrapper.setAttribute("data-more-wrapper", "");
      moreWrapper.className =
        "flex flex-col items-center justify-center self-stretch rounded-md transition-all duration-200 ease-in-out";

      const moreBtn = document.createElement("a");
      moreBtn.setAttribute("data-menu-item", "");
      moreBtn.innerHTML = `
        <img
          src="https://i.ibb.co/WvqB5S2p/svgviewer-png-output-57.webp"
          alt="More"
          class="w-6 h-6 pointer-events-none transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
        />
        <span class="pointer-events-none text-sidebar-text text-[0.625rem] font-medium leading-[1.125rem] text-center transition-all duration-200 group-hover:text-sidebar-active-text">More</span>
      `;
      moreBtn.className =
        "main-menu-item group flex flex-col items-center justify-center self-stretch gap-0.5 p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-sidebar-active";
      // moreBtn.setAttribute("href", "/");
      moreWrapper.appendChild(moreBtn);
      menuEl.appendChild(moreWrapper);

      const flyoutWrapper = document.createElement("div");
      flyoutWrapper.setAttribute("data-floating-panel-wrapper", "");
      flyoutWrapper.className =
        "fixed top-[-9999px] left-[-11000] pointer-events-none z-[9999]";

      const flyout = document.createElement("div");
      flyout.setAttribute("data-floating-panel", "");
      flyout.className = `
        fixed bg-white shadow-lg rounded-md p-3 min-w-[200px] grid grid-cols-2 gap-4 z-[9999] border border-gray-200 backdrop-blur-lg bg-[hsla(0,0%,100%,0.5)]
        opacity-0 invisible pointer-events-none
        scale-0 translate-y-16
        transition-all duration-150 ease-in-out
        origin-bottom-left
      `;

      overflowItems.forEach((item) => {
        const o = document.createElement("div");
        o.setAttribute("data-flyout-item", "");
        if (!item.enabled) o.setAttribute("data-disabled", "true");
        o.innerHTML = `
          <img
            src="${item.image}"
            alt="${item.title}"
            class="w-6 h-6 transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
          />
          <span class=" text-sidebar-text text-[0.625rem] font-medium leading-[1.125rem] text-center transition-all duration-200 group-hover:text-sidebar-active-text">${item.title}</span>
        `;
        o.className =
          "sidebar-menu-item block group transition-all duration-200 ease-in-out rounded-md flex-col items-center justify-center self-stretch w-[4.625rem] h-14 cursor-pointer p-2 whitespace-nowrap text-sm hover:bg-sidebar-active rounded transition-colors flex items-center";
        if (!item.enabled) {
          o.className += " opacity-50 grayscale";
        }
        o.addEventListener("click", () => this.handleMenuClick(item));
        flyout.appendChild(o);
      });

      flyoutWrapper.appendChild(flyout);
      document.body.appendChild(flyoutWrapper);

      const hoverBridge = document.createElement("div");
      hoverBridge.className =
        "fixed bg-transparent pointer-events-none top-[-9999px] left-[-9999px] h-0 w-0 z-[9998] transition-all duration-100 ease-in-out";
      document.body.appendChild(hoverBridge);

      const showFlyout = () => {
        this.flyoutHovered = true;
        if (this.hideTimeout) clearTimeout(this.hideTimeout);

        requestAnimationFrame(() => {
          const btnRect = moreBtn.getBoundingClientRect();
          const align = overflowItems.length <= 2 ? "center" : "bottom";

          let top = btnRect.top;
          if (align === "center") {
            top = btnRect.top + btnRect.height / 2 - flyout.offsetHeight / 2;
          } else if (align === "bottom") {
            top = btnRect.bottom - flyout.offsetHeight;
          }

          flyoutWrapper.style.top = `${Math.max(0, top)}px`;
          flyoutWrapper.style.left = `${btnRect.right + 10}px`;
          flyoutWrapper.style.pointerEvents = "auto";

          flyout.className = `
            fixed bg-white shadow-lg rounded-md p-3 ml-2 min-w-[200px] grid grid-cols-2 gap-4 z-[9999] border border-gray-200 backdrop-blur-lg bg-[hsla(0,0%,100%,0.5)]
            opacity-100 visible pointer-events-auto
            scale-100 translate-y-0
            transition-all duration-150 ease-in-out
            origin-bottom-left
          `;

          const newFlyoutRect = flyout.getBoundingClientRect();
          const buffer = 16;

          const bridgeTop =
            Math.min(btnRect.top, newFlyoutRect.top) - buffer / 2;
          const bridgeBottom =
            Math.max(btnRect.bottom, newFlyoutRect.bottom) + buffer / 2;
          const bridgeHeight = bridgeBottom - bridgeTop;

          const bridgeLeft = btnRect.right - buffer;
          const bridgeRight = newFlyoutRect.left + buffer;
          const bridgeWidth = bridgeRight - bridgeLeft;

          hoverBridge.style.top = `${bridgeTop}px`;
          hoverBridge.style.left = `${bridgeLeft}px`;
          hoverBridge.style.height = `${bridgeHeight}px`;
          hoverBridge.style.width = `${bridgeWidth}px`;
          hoverBridge.style.pointerEvents = "auto";
        });
      };

      const hideFlyout = () => {
        this.hideTimeout = setTimeout(() => {
          if (!this.flyoutHovered) {
            flyoutWrapper.style.top = "-9999px";
            flyoutWrapper.style.left = "-9999px";
            flyoutWrapper.style.pointerEvents = "none";

            flyout.className = `
              fixed bg-white shadow-lg rounded-md p-3 min-w-[200px] grid grid-cols-2 gap-4 z-[9999] border border-gray-200 backdrop-blur-lg bg-[hsla(0,0%,100%,0.5)]
              opacity-0 invisible pointer-events-none
              scale-0 translate-y-16
              transition-all duration-150 ease-in-out
              origin-bottom-left
            `;

            hoverBridge.style.top = "-9999px";
            hoverBridge.style.left = "-9999px";
            hoverBridge.style.height = "0";
            hoverBridge.style.width = "0";
            hoverBridge.style.pointerEvents = "none";
          }
        }, 150);
      };

      const onEnter = () => {
        this.flyoutHovered = true;
        showFlyout();
      };

      const onLeave = () => {
        this.flyoutHovered = false;
        hideFlyout();
      };

      moreBtn.addEventListener("mouseenter", onEnter);
      moreBtn.addEventListener("mouseleave", onLeave);
      flyout.addEventListener("mouseenter", onEnter);
      flyout.addEventListener("mouseleave", onLeave);
      hoverBridge.addEventListener("mouseenter", onEnter);
      hoverBridge.addEventListener("mouseleave", onLeave);
    },

    handleSidebarVisibility() {
      const shouldBeVisible = window.innerWidth > 768;

      if (shouldBeVisible && !this.isSidebarAttached) {
        document.body.insertBefore(this.$el, document.body.firstChild);
        this.renderSidebarMenu();
        this.isSidebarAttached = true;
      } else if (!shouldBeVisible && this.isSidebarAttached) {
        this.$el.remove();
        this.isSidebarAttached = false;

        document
          .querySelectorAll("[data-floating-panel-wrapper], .hover-bridge")
          .forEach((el) => el.remove());
      } else if (shouldBeVisible && this.isSidebarAttached) {
        this.renderSidebarMenu();
      }
    },
  },
};
</script>
