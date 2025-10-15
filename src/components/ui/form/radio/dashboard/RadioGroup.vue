<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      class="w-4 h-4"
      @change="emit('update:modelValue', value)"
    />
    <span class="text-sm">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: "Radio",
  props: {
    modelValue: { type: [String, Number, Boolean], default: null },
    value: { type: [String, Number, Boolean], required: true },
    label: { type: String, required: true },
    name: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
};
</script>
