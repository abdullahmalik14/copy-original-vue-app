<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <button
        :type="type"
        v-bind="resolvedAttrs.inputAttrs"
        :disabled="disabled"
        @click="handleClick"
      >
        <img
          v-if="leftIcon"
          :src="leftIcon"
          :class="`mr-2 inline-block ${leftIconClass}`"
        />

        <span>{{ text }}</span>

        <img
          v-if="rightIcon"
          :src="rightIcon"
          :class="`mr-2 inline-block ${rightIconClass}`"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { resolveAllConfigs } from "../../../utils/componentRenderingUtils";

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  emit("click", event);
};

const props = defineProps({
  text: { type: String, required: true },

  variant: {
    type: String,
    default: "primary",
  },

  size: {
    type: String,
    default: "md",
  },
  leftIconClass: { type: String, default: "w-5 h-5" },
  rightIconClass: { type: String, default: "w-5 h-5" },

  leftIcon: [String, Object, Function],
  rightIcon: [String, Object, Function],

  disabled: { type: Boolean, default: false },
  type: { type: String, default: "button" },

  addId: String,
  removeId: Boolean,
  addClass: String,
  removeClass: Boolean,
  addAttributes: Object,
  removeAttributes: { type: Array, default: () => [] },

  version: { type: String, default: "" },
  wrapperOverrides: { type: Array, default: () => [] },
});

// Tailwind theme classes
const themeClasses = {
  primary:
    "bg-primary text-white font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed",
  success:
    "bg-green-600 text-white font-medium rounded-md hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed",
  danger:
    "bg-red-600 text-white font-medium rounded-md hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed",
  warning:
    "bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed",
  outline:
    "border border-gray-400 text-gray-700 font-medium rounded-md hover:bg-gray-100 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed",
  authTransparent:
    " w-full relative [caret-color:transparent] h-12 px-6 py-2 gap-2.5 rounded-[0.625rem] inline-flex justify-center items-center text-text border border-buttonSecondaryBorder bg-buttonSecondary font-medium text-[15px] transition-opacity duration-100 ease-in-out hover:bg-[linear-gradient(180deg,_rgba(87,_85,_85,_0.50)_0%,_rgba(0,_0,_0,_0.50)_100%)] hover:[box-shadow:0px_0px_20px_0px_rgba(255,150,192,0.8)_inset,_8px_8px_30px_0px_rgba(255,0,102,0.7),_0px_0px_35px_0px_rgba(255,255,221,0.5),_-8px_-8px_30px_0px_rgba(255,0,0,0.7)]",
  authPink:
    "w-full relative [caret-color:transparent] h-12 px-6 py-2 gap-2.5 rounded-[0.625rem] inline-flex items-center justify-center text-text bg-buttonPrimary  border border-buttonPrimaryBorder font-medium text-[15px] transition-opacity duration-100 ease-in-out hover:bg-gradient-to-b hover:from-[#FF408C] hover:to-[#F00] hover:[box-shadow:0px_0px_20px_0px_rgba(255,150,192,0.8)_inset,_8px_8px_30px_0px_rgba(255,0,102,0.7),_0px_0px_35px_0px_rgba(255,255,221,0.5),_-8px_-8px_30px_0px_rgba(255,0,0,0.7)]",
  hoverBgWhite:
    "flex items-center text-[1.125rem] break-words justify-center min-w-[6.25rem] px-2 py-1 font-medium leading-7 text-[#0c111d] bg-transparent border-none outline-none hover:bg-white",
  greyBg:
    "flex items-center justify-center text-[#98a2b3] uppercase font-medium break-words gap-2 leading-7 text-[1.125rem] min-w-[5.3125rem] px-2 py-1 bg-[rgba(52,64,84,0.05)] border-0",
  polygonLeft:
    "w-max group flex items-center justify-center gap-[0.625rem] py-1 pl-[1.4rem] pr-2 bg-[var(--btn-bg,_black)] hover:bg-[var(--btn-hover-bg,_#07f468)] text-[var(--btn-text,_#fff)] hover:text-[var(--btn-hover-text,_black)] text-lg leading-7 font-medium uppercase transition-colors duration-200 relative cursor-pointer [clip-path:polygon(8%_0,100%_0,105%_105%,0_105%)]",
 polygonRight:
    "w-max group flex items-center justify-center gap-[0.625rem] py-1 pr-[1.4rem] pl-2 bg-black hover:bg-[#07f468] text-[#fff] text-[1.125rem] leading-7 font-medium uppercase transition-colors duration-200 hover:text-black relative cursor-pointer [clip-path:polygon(0_0,92%_0,100%_105%,0_105%)]",

};

// Tailwind size classes
const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const buttonConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass: "flex flex-col w-full",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass: "flex items-center gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
  ],
  elm: {
    addClass: `${themeClasses[props.variant] || themeClasses.primary} ${
      sizeClasses[props.size] || sizeClasses.md
    }`,
    addAttributes: {
      type: props.type,
      role: "button",
    },
  },
};

const resolvedAttrs = computed(() =>
  resolveAllConfigs(buttonConfig, props.version, props)
);
</script>
