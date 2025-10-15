<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <!-- Optional wrapper label -->
    <label
      v-if="showWrapperLabel"
      class="block text-sm font-medium text-gray-900 dark:text-dark-text"
    >
      {{ wrapperLabel }}
    </label>

    <!-- Switch + label -->
    <div class="flex items-center gap-2">
              <label class="relative inline-block w-8 h-4">
                <input
                  type="checkbox"
                  class="opacity-0 w-0 h-0 peer"
                  id="dash-toggle-switch"
                />
                <span
                   class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 
             bg-[#98A2B3]  /* default bg when off */
             rounded-[0.75rem]
             transition-all duration-100 ease-in-out
             peer-checked:bg-[#101828]"></span>
                <span
                  class="absolute w-3 h-3 top-1/2 left-[0.125rem] bg-white dark:bg-dark-surface transition-all duration-100 ease-in-out rounded-full shadow-dash-toggle dark:shadow-dark-dash-toggle transform -translate-y-1/2 peer-checked:translate-x-[1rem]"
                ></span>
              </label>
              <label
                for="dash-toggle-switch"
                class="text-base font-medium text-dash-gray-900 dark:text-dark-dash-text cursor-pointer"
                >{{label}}</label
              >
            </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { resolveAllConfigs } from "@/utils/componentRenderingUtils";

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  id?: string;
  showWrapperLabel?: boolean;
  wrapperLabel?: string;
  version: string;
  addId?: string;
  removeId?: boolean;
  addClass?: string;
  removeClass?: boolean;
  addAttributes?: object;
  removeAttributes?: string[];
  wrapperOverrides?: any[];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

// Toggle function
const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};

// Wrapper config
const inputConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass: "flex flex-col gap-[0.375rem] flex-1 self-stretch",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass: "flex items-center gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
  ],
  elm: {
    addClass: "opacity-0 w-0 h-0 peer",
  },
  additionalConfig: {
    label: {
      addClass: "text-base font-medium text-gray-900 dark:text-dark-text cursor-pointer",
      addAttributes: { for: "input-id" },
    },
  },
};

// Resolve attributes
const resolvedAttrs = computed(() =>
  resolveAllConfigs(inputConfig, props.version, props)
);
</script>
