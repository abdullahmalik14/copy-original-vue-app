<template>
  <div class="flex flex-col gap-2" v-bind="resolvedAttrs.wrapperAttrs.wrapper1">
    <!-- Label -->
    <div
      class="flex justify-between items-center w-full"
      v-bind="resolvedAttrs.wrapperAttrs.wrapper2"
    >
      <label
        v-if="showLabel"
        v-bind="resolvedAttrs.labelAttrs"
        class="text-[#ffffff]"
      >
        {{ labelText }}
      </label>

      <span v-if="requiredDisplayValues.includes('*')" class="text-red-500"
        >*</span
      >
      <span
        v-if="requiredDisplayValues.includes('italic-text')"
        class="text-[0.625rem] leading-6 text-right italic text-[#ffffff]"
      >
        Required
      </span>
    </div>

    <!-- Input Wrapper -->
    <div
      v-bind="resolvedAttrs.wrapperAttrs.wrapper3"
      class="relative rounded-[0.625rem] border border-border bg-input min-h-10 gap-2.5 pt-3 pb-3 px-2.5 flex justify-center items-center self-stretch"
    >
      <component
        v-if="leftIcon"
        :is="leftIcon"
        class="absolute left-2 top-[50%] transform -translate-y-1/2 pointer-events-none w-5 h-5 text-white"
      />

      <input
        v-bind="resolvedAttrs.inputAttrs"
        :id="resolvedAttrs.inputAttrs.id"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full text-white bg-transparent outline-none placeholder:text-gray-400 pr-3"
      />

      <img
        v-if="rightIcon"
        :src="rightIcon"
        alt="icon"
        class="absolute right-2 top-[50%] transform -translate-y-1/2 w-5 h-5"
      />
    </div>

    <!-- Description -->
    <Paragraph
      v-if="description"
      :text="description"
      fontSize="text-sm"
      fontColor="text-white/80"
      class="mt-1"
    />

    <!-- Required Error Text -->
    <Paragraph
      v-if="requiredDisplayValues.includes('required-text-error')"
      :text="'This field is required.'"
      fontSize="text-xs"
      fontColor="text-[#FF4405]"
    />

    <!-- Errors List -->
    <div
      v-if="showErrors && errors.length"
      class="flex flex-col items-start self-stretch gap-1 px-2 pt-1 pb-2"
    >
      <div class="flex flex-col gap-1">
        <div
          v-for="(errorObj, index) in errors"
          :key="index"
          class="flex w-full gap-[.4375rem] text-[#FF4405]"
        >
          <component
            v-if="errorObj.icon"
            :is="errorObj.icon"
            class="block w-[1.125rem] h-[1.125rem]"
          />

          <Paragraph
            :text="errorObj.error"
            font-size="text-[12px] sm:text-[14px]"
            font-color="text-[#FF4405]"
          />
        </div>
      </div>
    </div>

    <!-- Success List -->
    <div
      v-if="onSuccess && success.length"
      class="flex flex-col items-start self-stretch gap-1 px-2 pt-1 pb-2"
    >
      <div class="flex flex-col gap-1">
        <div
          v-for="(successObj, index) in success"
          :key="index"
          class="flex w-full gap-[.4375rem]"
        >
          <component
            v-if="successObj.icon"
            :is="successObj.icon"
            :class="[
              'block w-[1.125rem] h-[1.125rem] md:w-[1.25rem] md:h-[1.25rem] text-[#07f468]', // default styles
              successObj.iconColor || 'text-white', // dynamic color
            ]"
          />
          <p :class="successObj.textColor || 'text-[12px] sm:text-[14px] text-white'">
            {{ successObj.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { resolveAllConfigs } from "../../../utils/componentRenderingUtils";
import Paragraph from "../default/Paragraph.vue";

const props = defineProps({
  modelValue: [String, Number, Boolean],
  version: { type: String, default: "" },

  addId: String,
  addClass: String,
  addAttributes: Object,

  name: String,
  type: { type: String, default: "text" },
  placeholder: String,
  required: Boolean,
  autocomplete: String,

  showLabel: Boolean,
  labelText: { type: String, default: "Label" },
  requiredDisplay: {
    type: [String, Array],
    default: "",
  },

  description: String,

  leftIcon: [String, Object, Function],
  rightIcon: [String, Object, Function],

  showErrors: Boolean,
  errors: {
    type: Array,
    default: () => [],
  },

  onSuccess: Boolean,
  success: {
    type: Array,
    default: () => [],
  },

  wrapperOverrides: { type: Array, default: () => [] },
});

const inputConfig = {
  wrappers: [
    {
      targetAttribute: "wrapper1",
      addClass: "flex flex-col gap-2",
      addAttributes: { "data-wrapper": "wrapper1" },
    },
    {
      targetAttribute: "wrapper2",
      addClass: "flex justify-between items-center w-full",
      addAttributes: { "data-wrapper": "wrapper2" },
    },
    {
      targetAttribute: "wrapper3",
      addClass:
        "rounded-[0.625rem] border border-border bg-input min-h-10 gap-2.5 pt-3 pb-3 px-2.5 flex justify-center items-center self-stretch",
      addAttributes: { "data-wrapper": "wrapper3" },
    },
  ],
  elm: {
    addClass: `w-full text-white bg-transparent outline-none placeholder:text-white pr-3`,
    addAttributes: {
      type: props.type,
    },
  },
  additionalConfig: {
    label: {
      addClass: "text-sm leading-6 tracking-[0.009rem] text-[#ffffff]",
      addAttributes: {
        for: "input-id",
      },
    },
    description: {
      addClass: "text-sm text-white/80",
      addAttributes: {
        "data-description": "true",
      },
    },
  },
};

const requiredDisplayValues = computed(() => {
  if (!props.requiredDisplay) return [];
  return Array.isArray(props.requiredDisplay)
    ? props.requiredDisplay
    : [props.requiredDisplay];
});

const resolvedAttrs = computed(() =>
  resolveAllConfigs(inputConfig, props.version, props)
);
</script>
