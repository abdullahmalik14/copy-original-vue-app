<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <component v-if="leftIcon" :is="leftIcon" :class="[iconSize, iconSpacing]" />

      <component :is="tag" v-bind="resolvedAttrs.inputAttrs">
        {{ text }}
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { resolveAllConfigs } from "@/utils/componentRenderingUtils";

const props = defineProps({
  text: { type: String, required: true },

  tag: {
    type: String as () => "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    default: "h2",
  },

  theme: { type: String, default: "defaultSecondaryHeading" },

  version: {
    type: String as () => "basic" | "dashboard" | "profile" | "authentication",
    default: "basic",
  },

  leftIcon: [String, Object, Function],

  iconSize: { type: String, default: "w-5 h-5" },
  iconSpacing: { type: String, default: "mr-2 inline-block" },

  addId: String,
  removeId: Boolean,
  addClass: String,
  removeClass: Boolean,
  addAttributes: Object,
  removeAttributes: { type: Array as () => string[], default: () => [] },

  wrapperOverrides: { type: Array as () => any[], default: () => [] },
});

// Tailwind classes matrix (themes × h1–h6)
const themeClasses: Record<string, Record<string, string>> = {
  defaultPrimaryHeading: {
    h1: "text-4xl font-bold text-text dark:text-text-dark tracking-tight",
    h2: "text-3xl font-bold text-text dark:text-text-dark tracking-tight",
    h3: "text-2xl font-semibold text-text dark:text-text-dark tracking-tight",
    h4: "text-xl font-semibold text-text dark:text-text-dark tracking-tight",
    h5: "text-lg font-medium text-text dark:text-text-dark tracking-tight",
    h6: "text-base font-medium text-text dark:text-text-dark tracking-tight",
  },
  defaultSecondaryHeading: {
    h1: "text-3xl font-semibold text-text dark:text-text-dark tracking-tight",
    h2: "text-2xl font-semibold text-text dark:text-text-dark tracking-tight",
    h3: "text-xl font-semibold text-text dark:text-text-dark tracking-tight",
    h4: "text-lg font-medium text-text dark:text-text-dark tracking-tight",
    h5: "text-base font-medium text-text dark:text-text-dark tracking-tight",
    h6: "text-sm font-medium text-text dark:text-text-dark tracking-tight",
  },
  sectionHeading: {
    h1: "text-2xl font-medium uppercase text-text dark:text-text-dark",
    h2: "text-xl font-medium uppercase text-text dark:text-text-dark",
    h3: "text-lg font-medium uppercase text-text dark:text-text-dark",
    h4: "text-base font-medium uppercase text-text dark:text-text-dark",
    h5: "text-sm font-medium uppercase text-text dark:text-text-dark",
    h6: "text-xs font-medium uppercase text-text dark:text-text-dark",
  },
  dashboardHeading: {
    h1: "text-3xl font-bold text-blue-600 dark:text-blue-400",
    h2: "text-2xl font-semibold text-blue-600 dark:text-blue-400",
    h3: "text-xl font-medium text-blue-500 dark:text-blue-300",
    h4: "text-lg font-medium text-blue-500 dark:text-blue-300",
    h5: "text-base font-normal text-blue-400 dark:text-blue-200",
    h6: "text-sm font-normal text-blue-400 dark:text-blue-200",
  },
  AuthHeading: {
    h2: "text-2xl font-semibold tracking-wider text-white",
    h4: "text-xl tracking-wider text-white",
  },
};

const headingConfig = computed(() => ({
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass: "flex flex-col w-full",
      addAttributes: { "data-wrapper": "wrapper1", "data-version": props.version },
    },
    {
      targetAttribute: "wrapper2",
      addClass: "flex items-center gap-2",
      addAttributes: { "data-wrapper": "wrapper2", "data-theme": props.theme },
    },
  ],
  elm: {
    addClass: themeClasses[props.theme]?.[props.tag] || themeClasses.defaultSecondaryHeading.h2,
    addAttributes: {
      role: "heading",
      "aria-level": props.tag.replace("h", ""),
    },
  },
}));

const resolvedAttrs = computed(() => resolveAllConfigs(headingConfig.value, props.version, props));
</script>
