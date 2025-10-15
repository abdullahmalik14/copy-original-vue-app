<template>
  <div class="form-input-container relative w-full">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-gray-700 mb-1 flex items-center"
      v-bind="labelAttrs"
    >
      {{ label }}
      <span v-if="theme === 'asterisk'" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="safeType"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="inputAttrs"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        :class="{ 'border-red-500': error }"
      />

      <span v-if="rightSpan" class="absolute right-2 top-1/2 -translate-y-1/2">
        <span v-html="rightSpan"></span>
      </span>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";


const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "text", // "text" or "asterisk"
  },
  rightSpan: {
    type: String,
    default: "",
  },
  inputAttrs: {
    type: Object,
    default: () => ({}),
  },
  labelAttrs: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const safeType = computed(() => {
  const allowed = ["text", "email", "number"];
  return allowed.includes(props.type) ? props.type : "text";
});

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
