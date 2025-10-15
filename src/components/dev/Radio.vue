<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <input
        :id="id"
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
        v-bind="resolvedAttrs.inputAttrs"
      />
      <label v-if="label" :for="id" v-bind="resolvedAttrs.labelAttrs">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveAllConfigs } from "@/utils/componentRenderingUtils";
import { computed } from "vue";

const props = defineProps<{
  modelValue: string | number;
  value: string | number;
  name: string;
  label?: string;
  id?: string;

  version: string;
  addId?: string;
  removeId?: boolean;
  addClass?: string;
  removeClass?: boolean;
  addAttributes?: object;
  removeAttributes?: string[];
  wrapperOverrides?: any[];
}>();

const inputConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass:
        props.version === "dashboard"
          ? "flex flex-col gap-2" // untouched
          : props.version === "auth"
          ? "flex flex-col gap-[0.375rem] flex-1 self-stretch"
          : "flex flex-col gap-1.5",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass:
        props.version === "dashboard"
          ? "flex items-center gap-2" // removed relative
          : props.version === "auth"
          ? "flex flex-col gap-2"
          : "flex gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
  ],
  elm: {
    addClass: "cursor-pointer", // sr-only, peer, pseudo-elements hata di
    addAttributes: {
      type: "radio", // always radio
      name: props.name, // ensure group works
    },
  },
  additionalConfig: {
    label: {
      addClass:
        props.version === "dashboard"
          ? "ml-2 text-gray-900 dark:text-dark-text text-sm cursor-pointer" // removed pseudo-element styling
          : props.version === "auth"
          ? "block text-sm font-medium text-gray-700 dark:text-dark-text"
          : "block text-sm font-medium text-text dark:text-dark-text",
      addAttributes: {
        for: props.id,
      },
    },
    description: {
      addClass: "text-xs text-slate-500 dark:text-dark-text",
      addAttributes: {
        "data-description": "true",
      },
    },
  },
};


const resolvedAttrs = computed(() => resolveAllConfigs(inputConfig, props.version, props));

defineEmits<{
  "update:modelValue": [value: string | number];
}>();
</script>
