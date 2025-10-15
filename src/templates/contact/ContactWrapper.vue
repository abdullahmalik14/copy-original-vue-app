<template>
  <div class="contact-wrapper">
    <ContactHeader />
    <div style="display:grid; grid-template-columns: 280px 1fr; gap: 16px; min-height: 60vh;">
      <ContactSidebar />
      <ContactWrapperMain />
    </div>
    <ContactFooter />
  </div>
</template>

<script setup>
import { default as ContactHeader } from './ContactHeader.vue'
import { default as ContactSidebar } from './ContactSidebar.vue'
import { default as ContactFooter } from './ContactFooter.vue'
import { default as ContactWrapperMain } from '@/components/layout/contact/ContactWrapperMain.vue'
</script>
