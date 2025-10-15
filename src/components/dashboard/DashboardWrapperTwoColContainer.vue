<template>
  <!--Mobile Header -->
  <HeaderResponsive class="block md:hidden" />

  <div class="dashboard-two-col-container min-h-screen flex">
    <!--Desktop Sidebar -->
    <DashboardSidebar class="hidden md:block" />

    <!-- Body / Main Content -->
    <div class="flex-1 p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import HeaderResponsive  from "@/templates/dashboard/HeaderResponsive.vue";
import DashboardSidebar from "../../templates/dashboard/DashboardSidebar.vue";
</script>

<style scoped>
.dashboard-two-col-container {
  display: flex;
}
</style>
