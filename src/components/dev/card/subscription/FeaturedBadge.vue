<template>
  <button
    class="absolute left-[-0.375rem] top-[-0.375rem] px-2 py-1 pr-[1.125rem] gap-1 flex justify-center items-center border-none outline-none clip-path-[polygon(0_0,100%_0,88%_105%,0_105%)] bg-gradient-to-r group"
    :class="[gradientClass, customClass]"
  >
    <span class="text-white text-lg font-semibold leading-7 group-hover:text-black">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  gradientClass?: string; // e.g., 'from-[#4d20ff] to-[#7e5eff]'
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'FEATURED',
  gradientClass: 'from-[#4d20ff] to-[#7e5eff]',
  customClass: '',
});
</script>

<style scoped></style>
