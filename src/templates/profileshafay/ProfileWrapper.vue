<template>
  <div class="profile-wrapper">
    <ProfileHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <ProfileSidebar />
      <ProfileWrapperMain />
    </div>
    <ProfileFooter />
  </div>
</template>

<script setup>
import { default as ProfileHeader } from './ProfileHeader.vue'
import { default as ProfileSidebar } from './ProfileSidebar.vue'
import { default as ProfileFooter } from './ProfileFooter.vue'
import { default as ProfileWrapperMain } from '@/components/layout/profile/ProfileWrapperMain.vue'
</script>
