<template>
  <div class="flex flex-col gap-[0.375rem] flex-1 self-stretch">
    <label
      v-if="label"
      class="block text-sm font-medium dark:text-dark-dash-text"
      :class="type === 'checkbox' ? 'text-[#101828]' : 'text-[#344054]'"
    >
      {{ label }}
    </label>

    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

const props = defineProps<{
  modelValue: (string | number)[];
  name: string;
  label?: string;
  type: "checkbox" | "radio";
}>();

const emit = defineEmits<{
  "update:modelValue": [value: (string | number)[]];
}>();

const updateValue = (value: string | number, checked: boolean) => {
  if (props.type === "checkbox") {
    const newValues = checked
      ? [...props.modelValue, value]
      : props.modelValue.filter((v) => v !== value);
    emit("update:modelValue", newValues);
  } else {
    emit("update:modelValue", [value]);
  }
};

provide("checkboxGroup", {
  name: props.name,
  type: props.type,
  selected: props.modelValue,
  updateValue,
});
</script>
