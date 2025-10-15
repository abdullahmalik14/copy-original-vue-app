<template>
  <div v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <div v-bind="resolvedAttrs.wrapperAttrs.wrapper2">
      <label v-if="showLabel" v-bind="resolvedAttrs.labelAttrs">
        {{ labelText }}
      </label>
      <span v-if="isOptional" class="text-xs italic text-slate-500 "
        >Optional</span
      >
      <span v-if="requiredDisplay === '*'" class="text-red-500">*</span>
      <span
        v-else-if="requiredDisplay === 'italic-text'"
        class="text-[0.625rem] leading-6 text-right italic text-text dark:text-text-dark"
      >
        Required
      </span>
    </div>
    <div
      v-bind="resolvedAttrs.wrapperAttrs.wrapper3"
      class="relative"
      v-for="item in inputItems"
      :key="item.id"
    >
      <component
        v-if="leftIcon && type !== 'checkbox' && type !== 'radio'"
        :is="leftIcon"
        class="text-text dark:text-dark-text w-4 h-4"
      />

      <span
        :class="leftSpanClass"
        v-if="leftSpan"
        class="text-sm font-semibold text-text dark:text-dark-text"
        >{{ leftSpanText }}</span
      >

    <input
  v-bind="resolvedAttrs.inputAttrs"
  :id="item.id"
  :type="type"
  :value="item.value"
  v-if="type !== 'textarea'"
  :checked="modelValue === item.value"
  @change="$emit('update:modelValue', item.value)"
/>


      <div class="w-full" v-if="type === 'textarea' && !richTextEditor">
        <textarea
          id="textarea"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-full text-sm border-none focus:outline-none bg-transparent text-text dark:text-dark-text placeholder-text dark:placeholder-dark-text min-h-[5.5rem]"
          placeholder="Enter multiline text"
        ></textarea>
      </div>

      <div class="text-text dark:text-dark-text" v-if="type === 'textarea' && richTextEditor">
        <QuillEditor
          theme="snow"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-full text-sm border-none focus:outline-none bg-transparent text-text dark:text-dark-text placeholder-text dark:placeholder-dark-text min-h-[5.5rem]"
        />
      </div>

      <label
        v-if="['radio', 'checkbox'].includes(type)"
        :for="item.id"
        v-bind="resolvedAttrs.labelAttrs"
      >
        <span
          v-if="type === 'checkbox'"
          :class="
            item.badge
              ? 'text-sm cursor-pointer flex items-baseline text-text '
              : 'text-sm cursor-pointer text-text dark:text-dark-text'
          "
        >
          <span>
            {{ item.label }}
          </span>
          <div
            v-if="item.badge"
            class="h-[1.125rem] flex justify-center items-center px-1.5 rounded-tag bg-published dark:bg-dark-published ml-2"
          >
            <span class="text-xs font-medium">{{ item.badgeText }}</span>
          </div>
        </span>
        <span v-else>
          {{ item.label }}
        </span>
      </label>

      <span
        v-if="rightSpan"
        :class="rightSpanClass"
        class="text-sm text-text dark:text-dark-text whitespace-nowrap"
        >{{ rightSpanText }}</span
      >

      <component
        v-if="rightIcon && type !== 'checkbox' && type !== 'radio'"
        :is="rightIcon"
        class="text-text dark:text-dark-text w-4 h-4 cursor-pointer"
      />
    </div>
    <p
      v-if="description"
      v-bind="resolvedAttrs.descriptionAttrs"
      class="text-xs text-slate-500 dark:text-dark-text"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { resolveAllConfigs } from "../../../utils/componentRenderingUtils";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  version: String,
  badgeText: String,
  badge: Boolean,
  radioOptions: { type: Array, default: () => [] },
  addId: String,
  removeId: Boolean,
  addClass: String,
  removeClass: Boolean,
  addAttributes: Object,
  removeAttributes: { type: Array, default: () => [] },
  name: String,
  type: { type: String, default: "text" },
  placeholder: String,
  required: Boolean,
  autocomplete: String,
  showLabel: Boolean,
  labelText: { type: String, default: "Label" },
  requiredDisplay: String,
  isOptional: Boolean,
  richTextEditor: Boolean,
  description: String,
  leftIcon: [String, Object, Function],
  rightIcon: [String, Object, Function],
  rightSpan: Boolean,
  rightSpanText: String,
  rightSpanClass: String,
  leftSpan: Boolean,
  leftSpanText: String,
  leftSpanClass: String,
  radioValue: String,
  wrapperOverrides: { type: Array, default: () => [] },
});


const inputConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass:
        props.type === "checkbox"
          ? "flex flex-col gap-1.5"
          : props.type === "radio"
          ? "flex flex-col gap-[0.375rem] flex-1 self-stretch"
          : "flex flex-col gap-1.5",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass:
        props.type === "checkbox"
          ? "flex flex-col gap-4"
          : props.type === "radio"
          ? "flex flex-col gap-2"
          : props.isOptional
          ? "flex justify-between items-center"
          : "flex gap-2",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
    {
      targetAttribute: "wrapper3",
      addClass:
        props.type === "checkbox"
          ? "flex items-start gap-2"
          : props.type === "radio"
          ? "flex items-center gap-2 relative"
          : props.richTextEditor
          ? "border border-border dark:border-dark-border rounded-input bg-white dark:bg-dark-surface"
          : "flex items-center px-3.5 py-2.5 border border-border dark:border-dark-border rounded-input gap-2 focus-within:ring-3 focus-within:ring-primary/20 dark:focus-within:ring-dark-primary/20 bg-white dark:bg-dark-surface",
      addAttributes: { "data-wrapper": "wrapper3" },
    },
  ],
  elm: {
    addClass:
      props.type === "checkbox"
        ? "w-4 min-w-4 h-4 cursor-pointer accent-primary"
        : props.type === "radio"
        ? 'relative pl-8 cursor-pointer text-[0.938rem] font-medium leading-6 text-gray-900 dark:text-dark-text '
        : "flex-1 text-sm border-none focus:outline-none bg-transparent text-text dark:text-dark-text placeholder-text dark:placeholder-dark-text" +
          (props.leftIcon ? "pl-10" : "pl-3") +
          " " +
          (props.rightIcon ? "pr-10" : "pr-3"),
    addAttributes: {
      type: props.type,
    },
  },
  additionalConfig: {
    label: {
      addClass:
        props.type === "checkbox"
          ? "block text-sm font-medium text-text dark:text-dark-text"
          : props.type === "radio"
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

const inputItems = computed(() => {
  if ((props.type === "radio" || props.type === "checkbox") && props.radioOptions?.length) {
    return props.radioOptions.map((option) => ({
      label: option.label,
      value: option.value,
      badge: option.badge,
      badgeText: option.badgeText,
      id: `${props.addId || resolvedAttrs.value.inputAttrs.id}-${option.value}`,
    }));
  }

  return [
    {
      label: props.labelText || "",
      value: props.modelValue,
      badge: props.badge,
      badgeText: props.badgeText,
      id: props.addId || resolvedAttrs.value.inputAttrs.id,
    },
  ];
});
</script>
