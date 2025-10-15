<template>
  <div class="shop-wrapper">
    <ShopHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <ShopSidebar />
      <ShopWrapperMain />
    </div>
    <ShopFooter />
  </div>
</template>

<script setup>
import { default as ShopHeader } from './ShopHeader.vue'
import { default as ShopSidebar } from './ShopSidebar.vue'
import { default as ShopFooter } from './ShopFooter.vue'
import { default as ShopWrapperMain } from '@/components/layout/shop/ShopWrapperMain.vue'
</script>
