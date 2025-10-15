<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <!-- Optional Left Icon -->
      <template v-if="leftIcon">
        <img
          v-if="typeof leftIcon === 'string'"
          :src="leftIcon"
          :alt="text + ' icon'"
          :class="[iconSize, iconSpacing]"
        />
        <component v-else :is="leftIcon" :class="[iconSize, iconSpacing]" />
      </template>

      <!-- Paragraph Text -->
      <p v-bind="resolvedAttrs.inputAttrs">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { resolveAllConfigs } from "@/utils/componentRenderingUtils";

const props = defineProps({
  text: { type: String, required: true },

  // optional icons
  leftIcon: { type: [String, Object, Function], default: null },

  iconSize: { type: String, default: "w-5 h-5" },
  iconSpacing: { type: String, default: "mr-2 inline-block" },

  // override props (same structure as Input)
  addId: String,
  removeId: Boolean,
  addClass: String,
  removeClass: Boolean,
  addAttributes: Object,
  removeAttributes: { type: Array as () => string[], default: () => [] },

  version: { type: String, default: "" },
  wrapperOverrides: { type: Array as () => any[], default: () => [] },

  // style props
  fontSize: { type: String, default: "text-base" },
  fontWeight: { type: String, default: "font-normal" },
  fontColor: { type: String, default: "text-text dark:text-text-dark" },
  fontFamily: { type: String, default: "" },
  shadow: { type: String, default: "" },
  layoutClass: { type: String, default: "" },
});

const paragraphConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass: "flex flex-col",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass: "flex items-start gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
  ],
  elm: {
    addClass: [
      props.fontSize,
      props.fontWeight,
      props.fontColor,
      props.fontFamily,
      props.shadow,
      props.layoutClass,
    ]
      .filter(Boolean)
      .join(" "),
    addAttributes: {
      role: "paragraph",
    },
  },
};

const resolvedAttrs = computed(() => resolveAllConfigs(paragraphConfig, props.version, props));
</script>
