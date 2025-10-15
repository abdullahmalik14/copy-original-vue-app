<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="isOpen"
      class="w-full border-b border-[#E5E7EB] dark:border-dark-dash-border flex relative"
    >
      <!-- Left border color -->
      <div
        class="toast-border w-[0.188rem] absolute h-full left-0 top-0"
        :class="variantConfig.leftBorderClass"
      />

      <!-- Card body -->
      <div
        class="dashboard-toast-inner-wrapper flex gap-4 py-3 px-2 flex-1 min-w-0 min-h-0"
        :class="variantConfig.bgClass"
      >
        <div class="dashboard-toast-inner-container relative w-full flex items-start gap-5">
          <!-- Close button -->
          <div v-if="closable" class="absolute top-0 right-0 cursor-pointer" @click="handleClose">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="w-6 h-6">
              <path
                d="M17 7L7 17M7 7L17 17"
                stroke="#D0D5DD"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>

          <!-- Icon -->
          <div v-if="showIconComputed" class="relative">
            <div
              class="toast-icon-container w-10 h-10 flex justify-center items-center rounded-lg"
              :class="variantConfig.iconBgClass"
            >
              <component
                v-if="icon"
                :is="icon"
                class="w-7 h-7"
                :class="variantConfig.iconStrokeClass"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                fill="none"
                class="w-7 h-7"
                :class="variantConfig.iconStrokeClass"
              >
                <path
                  d="M25.666 24.5V22.167c0-2.175-1.487-4.002-3.5-4.52M18.083 3.839A4.666 4.666 0 0 1 21 8.167a4.667 4.667 0 0 1-2.917 4.327M19.833 24.5c0-2.174 0-3.262-.355-4.12a4.666 4.666 0 0 0-2.526-2.525c-.858-.355-1.945-.355-4.12-.355H9.333c-2.174 0-3.262 0-4.12.355A4.666 4.666 0 0 0 2.688 20.38C2.333 21.238 2.333 22.326 2.333 24.5M15.75 8.167a4.667 4.667 0 1 1-9.334 0 4.667 4.667 0 0 1 9.334 0Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col flex-1 min-w-0 min-h-0 pr-[1.125rem] md:pr-0">
            <div class="flex flex-col gap-2 pb-2" v-if="title">
              <div class="flex justify-between items-center pt-1 pr-1">
                <span
                  v-if="title"
                  class="toast-heading text-sm font-semibold"
                  :class="variantConfig.titleTextClass"
                  >{{ title }}</span
                >
                <slot name="title" />
              </div>
            </div>
            <div class="flex justify-between items-center gap-4">
              <span
                v-if="description"
                class="text-sm flex-1 [text-shadow:0_0_10px_rgba(0,0,0,0.10)] dark:[text-shadow:0_0_10px_rgba(255,255,255,0.10)] text-[#0F172A] dark:text-dark-dash-text pr-5"
                >{{ description }}</span
              >
              <slot />

              <a
                v-if="linkHref && linkLabel"
                :href="linkHref"
                class="flex gap-0.5 items-center"
                @click.prevent="onLink"
              >
                <span
                  class="toast-link text-xs font-medium whitespace-nowrap"
                  :class="variantConfig.linkTextClass"
                  >{{ linkLabel }}</span
                >
              </a>
              <slot name="actions" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    variant?: "notice" | "alert" | "success" | "error" | "info" | "warning";
    title?: string;
    description?: string;
    linkLabel?: string;
    linkHref?: string;
    icon?: any;
    showIcon?: boolean;
    closable?: boolean;
    modelValue?: boolean; // controls open/close externally
  }>(),
  {
    variant: "notice",
    title: "",
    description: "",
    linkLabel: "",
    linkHref: "",
    showIcon: true,
    closable: true,
    modelValue: true,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "close"): void;
  (e: "link"): void;
}>();

// Local open state to support both controlled and uncontrolled usages
const isOpen = ref<boolean>(props.modelValue);
watch(
  () => props.modelValue,
  (v) => {
    isOpen.value = v;
  }
);
watch(isOpen, (v) => emit("update:modelValue", v));

const showIconComputed = computed(() => props.showIcon !== false);

const palettes = {
  notice: {
    left: "bg-[#22CCEE] dark:bg-[#22CCEE]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(34,204,238,0.15)_0,rgba(34,204,238,0.15)_100%),rgba(255,255,255,0.9)] ",
    title: "text-[#22CCEE] dark:text-[#22CCEE]",
    link: "text-[#22CCEE] dark:text-[#22CCEE]",
    iconBg: "bg-[rgba(34,204,238,0.15)] dark:bg-[rgba(34,204,238,0.15)]",
    iconStroke: "stroke-[#22CCEE] text-[#22CCEE]",
  },
  alert: {
    left: "bg-[#FDB022] dark:bg-[#FDB022]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(253,176,34,0.15)_0,rgba(253,176,34,0.15)_100%),rgba(255,255,255,0.9)] ",
    title: "text-[#FDB022] dark:text-[#FDB022]",
    link: "text-[#FDB022] dark:text-[#FDB022]",
    iconBg: "bg-[rgba(253,176,34,0.15)] dark:bg-[rgba(253,176,34,0.15)]",
    iconStroke: "stroke-[#FDB022] text-[#FDB022]",
  },
  success: {
    left: "bg-[#07f468] dark:bg-[#07f468]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(7,244,104,0.15)_0,rgba(7,244,104,0.15)_100%),rgba(255,255,255,0.9)]",
    title: "text-[#07f468] dark:text-[#07f468]",
    link: "text-[#07f468] dark:text-[#07f468]",
    iconBg: "bg-[rgba(7,244,104,0.15)]",
    iconStroke: " text-[#07f468]",
    // stroke-[#07f468]
  },
  error: {
    left: "bg-[#FF4405] dark:bg-[#FF4405]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(255,68,5,0.12)_0,rgba(255,68,5,0.12)_100%),rgba(255,255,255,0.9)] ",
    title: "text-[#FF4405] dark:text-[#FF4405]",
    link: "text-[#FF4405] dark:text-[#FF4405]",
    iconBg: "bg-[rgba(255,68,5,0.12)]",
    iconStroke: "stroke-[#FF4405] text-[#FF4405]",
  },
  warning: {
    left: "bg-[#FF4405] dark:bg-[#FF4405]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(255,68,5,0.10)_0,rgba(255,68,5,0.10)_100%),rgba(255,255,255,0.9)] ",
    title: "text-[#FF4405] dark:text-[#FF4405]",
    link: "text-[#FF4405] dark:text-[#FF4405]",
    iconBg: "bg-[rgba(255,68,5,0.10)]",
    iconStroke: " text-[#FF4405]",
    // stroke-[#FF4405]
  },
  info: {
    left: "bg-[#3B82F6] dark:bg-[#3B82F6]",
    bg: "[background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(59,130,246,0.12)_0,rgba(59,130,246,0.12)_100%),rgba(255,255,255,0.9)] ",
    title: "text-[#3B82F6] dark:text-[#3B82F6]",
    link: "text-[#3B82F6] dark:text-[#3B82F6]",
    iconBg: "bg-[rgba(59,130,246,0.12)]",
    iconStroke: "stroke-[#3B82F6] text-[#3B82F6]",
  },
} as const;

const variantConfig = computed(() => {
  const p = palettes[props.variant];
  return {
    leftBorderClass: p.left,
    bgClass: p.bg,
    titleTextClass: p.title,
    linkTextClass: p.link,
    iconBgClass: p.iconBg,
    iconStrokeClass: p.iconStroke,
    closeColor: "#D0D5DD",
  };
});

function handleClose() {
  isOpen.value = false;
  emit("close");
}

function onLink() {
  emit("link");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
