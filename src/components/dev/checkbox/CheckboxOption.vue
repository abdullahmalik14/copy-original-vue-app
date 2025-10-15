<template>
  <div class="flex items-center gap-2" :class="group.type === 'checkbox' ? 'flex-1' : 'relative'">
    <input
      :id="id"
      :type="group.type"
      :name="group.name"
      :value="value"
      :checked="isChecked"
      @change="onChange"
  :class="group.type === 'checkbox' ? 'dash-checkbox' : 'dash-radio'"

    />

    <label :for="id" :class="labelClasses()">
      <div v-if="leftIcon">
        <component :is="leftIcon" class="w-4 h-4 text-gray-500" />
      </div>
      <span
        class="text-[#101828] dark:text-dark-dash-text leading-5 text-sm whitespace-normal break-words "
        >{{ label }}</span
      >
      <span class="inline-flex items-center gap-2" v-if="tags && tags?.length > 0">
        <div
          v-for="(tag, key) in tags"
          :key="key"
          :style="{ backgroundColor: tag.variant || '#ffffff' }"
          class="text-[#101828] dark:text-dark-dash-text text-right font-medium text-xs leading-[1.125rem] inline-flex px-1.5 justify-center items-center gap-2.5 rounded-[3.125rem] dark:bg-dark-dash-published"
        >
          {{ tag.text }}
        </div>
      </span>
      <div v-if="rightIcon">
        <component :is="rightIcon" class="w-4 h-4 text-gray-500" />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

interface Tag {
  text: string;
  variant: string;
}

const props = defineProps<{
  id: string;
  value: string | number;
  label: string;
  description?: string;
  tags?: Tag[];
  leftIcon?: any;
  rightIcon?: any;
}>();

const group = inject<any>("checkboxGroup");

const isChecked = computed(() => {
  if (group.type === "checkbox") {
    return group.selected.includes(props.value);
  } else {
    return group.selected.includes(props.value);
  }
});

const labelClasses = () => {
  if (group.type === "checkbox") {
    return `text-[#101828] dark:text-dark-dash-text leading-5 text-sm whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer flex gap-1 items-center`;
  } else {
    // radio
    return `dash-radio-label text-[#101828] dark:text-dark-dash-text leading-5 text-sm cursor-pointer relative flex items-center gap-6`;
  }
};
const onChange = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  group.updateValue(props.value, checked);
};
</script>
