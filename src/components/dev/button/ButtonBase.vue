<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :disabled="disabled && tag === 'button'"
    :class="[rootClass, disabled ? 'opacity-60 cursor-not-allowed' : '']"
    @click="onClick"
  >
    <div :class="contentClass">
      <slot name="icon" />
      <span v-if="text" :class="textClass">{{ text }}</span>
      <slot />
      <slot name="rightIcon" />
    </div>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: "button" | "a" | "div";
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    text?: string;
    rootClass?: string;
    contentClass?: string;
    textClass?: string;
  }>(),
  {
    tag: "button",
    href: "#",
    type: "button",
    disabled: false,
    text: "",
    rootClass: "",
    contentClass: "flex items-center gap-2.5",
    textClass: "",
  }
);

const emit = defineEmits<{ (e: "click", ev: MouseEvent): void }>();

function onClick(ev: MouseEvent) {
  if (props.disabled) return;
  emit("click", ev);
}
</script>

<style scoped>
/* CSS-first: All visuals are supplied via props/classes */
</style>
