<template>
  <div class="locale-switcher">
    <div class="locale-dropdown">
      <button 
        @click="toggleDropdown" 
        class="locale-button"
        :disabled="i18nStore.isLoading"
      >
        <span class="locale-flag">{{ currentLocaleInfo?.flag }}</span>
        <span class="locale-name">{{ currentLocaleInfo?.name }}</span>
        <span class="locale-arrow" :class="{ 'rotated': isDropdownOpen }">▼</span>
      </button>

      <div v-if="isDropdownOpen" class="locale-dropdown-menu">
        <button
          v-for="locale in i18nStore.supportedLocales"
          :key="locale.code"
          @click="switchLocale(locale.code)"
          class="locale-option"
          :class="{ 'active': locale.code === i18nStore.currentLocale }"
        >
          <span class="locale-flag">{{ locale.flag }}</span>
          <span class="locale-name">{{ locale.name }}</span>
          <span class="locale-native">{{ locale.nativeName }}</span>
        </button>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="i18nStore.isLoading" class="locale-loading">
      <span class="loading-spinner"></span>
      <span class="loading-text">{{ $t('common.loading') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEnterpriseI18nStore } from '@/stores/enterpriseI18n'

const i18nStore = useEnterpriseI18nStore()
const isDropdownOpen = ref(false)

// Computed properties
const currentLocaleInfo = computed(() => i18nStore.currentLocaleInfo)

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const switchLocale = async (localeCode) => {
  try {
    await i18nStore.setLocale(localeCode)
    isDropdownOpen.value = false
  } catch (error) {
    console.error('Failed to switch locale:', error)
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.locale-switcher')) {
    isDropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.locale-switcher {
  position: relative;
  display: inline-block;
}

.locale-dropdown {
  position: relative;
}

.locale-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.locale-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.locale-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.locale-flag {
  font-size: 16px;
}

.locale-name {
  font-weight: 500;
}

.locale-arrow {
  font-size: 10px;
  transition: transform 0.2s;
}

.locale-arrow.rotated {
  transform: rotate(180deg);
}

.locale-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
}

.locale-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.locale-option:hover {
  background: #f9fafb;
}

.locale-option.active {
  background: #eff6ff;
  color: #1d4ed8;
}

.locale-native {
  margin-left: auto;
  font-size: 12px;
  color: #6b7280;
}

.locale-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: #6b7280;
  font-size: 14px;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
