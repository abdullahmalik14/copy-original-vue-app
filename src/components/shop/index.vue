<script setup>
// Shop component - translations handled by Vue i18n
</script>

<script>
export const assets = {
  critical: [],
  high: ["/js/shop-cart.js"],
  normal: [],
};
</script>

<template>
  <main>
    <h1>{{ $t('shop.page.title') }}</h1>
    <p>{{ $t('shop.page.description') }}</p>
    <div class="shop-content">
      <h2>{{ $t('shop.sections.products') }}</h2>
      <p>{{ $t('shop.messages.comingSoon') }}</p>
    </div>
  </main>
</template>
