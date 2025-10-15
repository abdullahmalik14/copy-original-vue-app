<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <input
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      v-bind="resolvedAttrs.inputAttrs"
    />

    <label v-if="label" :for="id" v-bind="resolvedAttrs.labelAttrs">
      <span class="text-gray-900 dark:text-dark-text leading-5 text-sm text-wrap">{{ label }}</span>

      <p v-if="description" class="text-sm text-gray-500 mt-1">
        {{ description }}
      </p>
      <div v-if="tags && tags.length > 0">
        <span
          v-for="tag in tags"
          :key="tag.text"
          :class="[
            'inline-flex items-center gap-2',
            tag.variant === 'blue'
              ? 'bg-blue-100 text-blue-800'
              : tag.variant === 'gray'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-gray-100 text-gray-800',
          ]"
        >
          <div
            class="text-gray-900 dark:text-dark-text text-right font-medium text-xs leading-[1.125rem] inline-flex px-1.5 justify-center items-center gap-2.5 rounded-tag bg-published dark:bg-dark-published"
          >
            {{ tag.text }}
          </div>
        </span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { resolveAllConfigs } from "@/utils/componentRenderingUtils";
import { computed } from "vue";

interface Tag {
  text: string;
  variant?: "blue" | "gray";
}

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  description?: string;
  tags?: Tag[];
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
          ? " flex flex-1 items-center gap-2" // yahi original rakha
          : props.version === "auth"
          ? "flex flex-col gap-[0.375rem] flex-1 self-stretch"
          : "flex flex-col gap-1.5",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass:
        props.version === "checkbox"
          ? "flex flex-col gap-4"
          : props.version === "radio"
          ? "flex flex-col gap-2"
          : "flex gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
    {
      targetAttribute: "wrapper3",
      addClass:
        props.version === "checkbox"
          ? "flex items-start gap-2"
          : props.version === "radio"
          ? "flex items-center gap-2 relative"
          : "",
      addAttributes: { "data-wrapper": "wrapper3" },
    },
  ],
  elm: {
    addClass:
      props.version === "dashboard"
        ? "cursor-pointer" // sirf cursor rakha, custom appearance aur pseudo-element hata diya
        : props.version === "auth"
        ? ""
        : "",
    addAttributes: {
      type: "checkbox", // version se type nahi, hamesha checkbox
    },
  },
  additionalConfig: {
    label: {
      addClass:
        props.version === "dashboard"
          ? "flex items-center gap-2 text-gray-900 dark:text-dark-text leading-5 text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer" // untouched
          : props.version === "auth"
          ? "block text-sm font-medium text-gray-700 dark:text-dark-text"
          : "block text-sm font-medium text-text dark:text-dark-text",
      addAttributes: {
        for: "input-id",
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
  "update:modelValue": [value: boolean];
}>();
</script>
