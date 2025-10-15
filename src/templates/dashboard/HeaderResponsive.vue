<template>
  <header class="mb-[50px]">
    <div
      class="flex flex-col gap-4 px-2 py-2 flex-1 backdrop-blur-lg fixed inset-x-0 top-0 bg-gradient-to-t from-white/90 to-white/0 bg-[rgba(234,236,240,0.9)]"
    >
      <div class="flex justify-between items-center">
        <!-- logo -->
        <div class="flex items-center gap-1.5 relative">
          <a href="" class="w-6 h-6">
            <img
              src="https://i.ibb.co/0VQVpqrQ/svgviewer-png-output-36.webp"
              alt="svgviewer-png-output-36"
              class="w-6 h-6 pointer-events-none opacity-80"
            />
          </a>
        </div>

        <!-- nav right-item -->
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-end gap-2">
            <!-- choose-language -->
            <a
              href=""
              class="flex items-center justify-center p-1.5 gap-3 rounded hover:bg-[rgba(12,17,29,0.1)]"
            >
              <div class="pointer-events-none h-5 w-5">
                <img
                  src="https://i.ibb.co/4Rjb4cQd/svgviewer-png-output-37.webp"
                  alt="svgviewer-png-output-37"
                  class="brightness-0 pointer-events-none h-5 w-5"
                />
              </div>
            </a>

            <!-- notification-item -->
            <div class="relative">
              <span
                class="absolute top-[.125rem] right-[.188rem] h-[.438rem] w-[.438rem] bg-[#F40793] rounded-full block"
              ></span>

              <a
                @click="isNotificationOpen = true"
                class="notifications-panel-trigger group cursor-pointer rounded flex items-center justify-center p-1.5 gap-3 hover:bg-notification-hover"
              >
                <div class="w-5 h-5 pointer-events-none">
                  <img
                    src="https://i.ibb.co/v65qxNDc/svgviewer-png-output-38.webp"
                    alt="notification"
                    class="h-5 w-5 brightness-0 saturate-100 group-hover:[filter:brightness(0)_saturate(100%)_invert(29%)_sepia(98%)_saturate(5809%)_hue-rotate(325deg)_brightness(92%)_contrast(121%)]"
                  />
                </div>
              </a>
            </div>

            <!-- user-profile-item -->
            <div class="flex justify-end items-center relative cursor-pointer">
              <a
                @click="isProfileOpen = true"
                class="flex flex-col items-center justify-center gap-0.5 rounded"
              >
                <div
                  class="pointer-events-none h-8 w-8 flex justify-center items-center"
                >
                  <div class="relative w-6 h-6">
                    <div class="rounded-full w-6 h-6">
                      <img
                        src="https://i.ibb.co/jkjtwC9C/svgviewer-png-output-17.webp"
                        alt="svgviewer-png-output-17"
                        class="bg-avatar object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div
                      class="bg-[#FDB022] w-1.5 h-1.5 absolute block bottom-0 right-0 rounded-full"
                    ></div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Hamburger-menu -->
          <div
            class="py-1 rounded gap-0.5 px-2 flex flex-col justify-center items-center cursor-pointer"
            @click="isNavOpen = true"
          >
            <div class="w-6 h-6 pointer-events-none">
              <img
                src="https://i.ibb.co/SwVgDdjR/svgviewer-png-output-39.webp"
                alt="svgviewer-png-output-39"
                class="w-6 h-6 pointer-events-none brightness-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavDropdown v-model="isNavOpen" title="Menu" logo="your-logo-url" />
    <NotificationPopup
      :config="notificationPopupConfig"
      v-model="isNotificationOpen"
      @update:modelValue="
        (val) => {
          isNotificationOpen = val;
        }
      "
    />

    <AvatarProfilePopup
      :config="avatarPopupconfig"
      v-model="isProfileOpen"
      @update:modelValue="
        (val) => {
          isProfileOpen = val;
        }
      "
    />
  </header>
</template>

<script setup>
import NavDropdown from "@/components/ui/popup/dropdown/dashboard/NavDropDown.vue";
import { ref } from "vue";
import NotificationPopup from "@/components/ui/popup/NotificationPopup.vue";
import AvatarProfilePopup from "@/components/ui/popup/AvatarProfilePopup.vue";

const isNavOpen = ref(false);
const isNotificationOpen = ref(false);
const isProfileOpen = ref(false);

const notificationPopupConfig = {
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
  height: "100%",
  scrollable: true,
  closeSpeed: "250ms",
  closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
};

const avatarPopupconfig = {
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
  height: "100%",
  scrollable: true,
  closeSpeed: "250ms",
  closeEffect: "cubic-bezier(0.4, 0, 0.2, 1)",
};
</script>
