<template>
  <div class="dashboard-wrapper">
    <DashboardHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <DashboardSidebar />
      <DashboardWrapperMain />
    </div>
    <DashboardFooter />
  </div>
</template>

<script setup>
import { default as DashboardHeader } from './DashboardHeader.vue'
import { default as DashboardSidebar } from './DashboardSidebar.vue'
import { default as DashboardFooter } from './DashboardFooter.vue'
import { default as DashboardWrapperMain } from '@/components/layout/dashboard/DashboardWrapperMain.vue'
</script>
