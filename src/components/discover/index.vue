<script setup>
// Discover component - translations handled by Vue i18n
</script>

<script>
export const assets = {
  critical: [],
  high: [],
  normal: ["/images/media1.jpg"],
};
</script>

<template>
  <main>
    <h1>{{ $t('discover.page.title') }}</h1>
    <p>{{ $t('discover.page.description') }}</p>
    <div class="discover-content">
      <h2>{{ $t('discover.sections.featured') }}</h2>
      <p>{{ $t('discover.messages.explore') }}</p>
    </div>
  </main>
</template>
