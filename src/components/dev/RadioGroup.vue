<template>
  <div class="space-y-3">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <div class="space-y-2">
      <Radio v-for="option in options" :key="option.value" :model-value="modelValue" :value="option.value" :name="name"
        :label="option.label" :id="`${name}-${option.value}`" :version="version"
        @update:model-value="$emit('update:modelValue', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Radio from './Radio.vue'

interface RadioOption {
  value: string | number
  label: string
}

const props = defineProps<{
  modelValue: string | number
  name: string
  label?: string
  options: RadioOption[]
  version: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>
