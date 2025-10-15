<template>
  <div class="discover-wrapper">
    <DiscoverHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <DiscoverSidebar />
      <DiscoverWrapperMain />
    </div>
    <DiscoverFooter />
  </div>
</template>

<script setup>
import { default as DiscoverHeader } from './DiscoverHeader.vue'
import { default as DiscoverSidebar } from './DiscoverSidebar.vue'
import { default as DiscoverFooter } from './DiscoverFooter.vue'
import { default as DiscoverWrapperMain } from '@/components/layout/discover/DiscoverWrapperMain.vue'
</script>
