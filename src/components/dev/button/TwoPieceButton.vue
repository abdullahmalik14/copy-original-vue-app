<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="disabled && tag === 'button'"
    :class="[computedRootClass, disabled ? 'opacity-60 cursor-not-allowed' : '']"
    v-bind="dataAttrs"
    @click="onClick"
  >
    <!-- Variant: existing two-piece layout -->
    <template v-if="variant === 'two-piece'">
      <div v-if="skewPosition === 'right'" class="flex items-center self-stretch w-full">
        <div :class="[mainClass]">
          <slot name="icon" />
          <span v-if="text" :class="textClass">{{ text }}</span>
          <slot />
        </div>
        <div :class="[skewClass]"></div>
      </div>

      <div v-else class="flex items-center self-stretch w-full">
        <div :class="[skewClass]"></div>
        <div :class="[mainClass]">
          <span v-if="text" :class="textClass">{{ text }}</span>
          <slot name="rightIcon" />
        </div>
      </div>
    </template>

    <!-- Variant: skew-right (green skew-right-bottom button UI) -->
    <template v-else-if="variant === 'skew-right'">
      <div :class="contentWrapperClass">
        <slot name="icon" />
        <span v-if="text" :class="textClass">{{ text }}</span>
        <slot />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    tag?: "a" | "button" | "div";
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    text?: string;
    skewPosition?: "left" | "right";
    variant?: "two-piece" | "skew-right";
    rootClass?: string;
    mainClass?: string;
    skewClass?: string;
    textClass?: string;
    contentWrapperClass?: string;
    // Pass-through attributes like data-*, aria-*, etc.
    dataAttrs?: Record<string, any>;
  }>(),
  {
    tag: "a",
    href: "#",
    type: "button",
    disabled: false,
    text: "",
    skewPosition: "right",
    variant: "two-piece",
    rootClass: "",
    mainClass: "",
    skewClass: "",
    textClass: "",
    contentWrapperClass: "",
    dataAttrs: () => ({}),
  }
);

const emit = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

function onClick(ev: MouseEvent) {
  if (props.disabled) return;
  emit("click", ev);
}

// Computed defaults depending on variant
const computedRootClass = computed(() => {
  if (props.rootClass && props.rootClass.length) return props.rootClass;
  if (props.variant === "skew-right") {
    // Default classes for the green skew-right-bottom button UI
    return "group w-max pl-2 bg-[#07f468] gap-2.5 pr-2.5 h-10 relative flex justify-center items-center appearance-button transition-opacity duration-100 ease-in-out normal-case overflow-visible outline-none border-none hover:bg-black hover:after:bg-black before:content-[''] before:block before:w-full before:h-full before:absolute before:top-0 before:right-0 before:z-[1] before:shadow-[4px_4px_0_0_#000] before:transition-all before:ease-in-out before:duration-0 after:content-[''] after:block after:w-4 after:h-full after:absolute after:top-0 after:-right-[0.43rem] after:z-[1] after:shadow-[4px_4px_0_0_#000] after:skew-x-[20deg] after:translate-x-0 after:transition-all after:ease-in-out after:duration-0 after:bg-[#07f468]";
  }
  // Default for the legacy two-piece variant
  return "no-underline";
});

const contentWrapperClass = computed(() => {
  if (props.contentWrapperClass && props.contentWrapperClass.length)
    return props.contentWrapperClass;
  if (props.variant === "skew-right") {
    return "flex items-center justify-center gap-2.5 relative";
  }
  return props.mainClass || "";
});
</script>

<style scoped>
/* CSS-first two-piece button. All visuals via classes passed in props. */
</style>
