<template>
  <div class="home-wrapper">
    <HomeHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <HomeSidebar />
      <HomeWrapperMain />
    </div>
    <HomeFooter />
  </div>
</template>

<script setup>
import { default as HomeHeader } from './HomeHeader.vue'
import { default as HomeSidebar } from './HomeSidebar.vue'
import { default as HomeFooter } from './HomeFooter.vue'
import { default as HomeWrapperMain } from '@/components/layout/home/HomeWrapperMain.vue'
</script>
