<template>
  <div>
    <h1 data-translate="auth.register.KYC.status.title">{{ $t('auth.register.KYC.status.title') }}</h1>
    <p data-translate="auth.register.KYC.status.description">
      {{ $t('auth.register.KYC.status.description') }}: {{ auth.currentUser.kycPassed ? $t('auth.register.KYC.status.done') : $t('auth.register.KYC.status.pending') }}
    </p>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
</script>
<script>
export const assets = {
  critical: ["/css/onboarding.css"],
  high: [],
  normal: ["/images/onboarding-bg.jpg"],
};
</script>
