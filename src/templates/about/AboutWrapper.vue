<template>
  <div class="about-wrapper">
    <AboutHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <AboutSidebar />
      <AboutWrapperMain />
    </div>
    <AboutFooter />
  </div>
</template>

<script setup>
import { default as AboutHeader } from './AboutHeader.vue'
import { default as AboutSidebar } from './AboutSidebar.vue'
import { default as AboutFooter } from './AboutFooter.vue'
import { default as AboutWrapperMain } from '@/components/layout/about/AboutWrapperMain.vue'
</script>
