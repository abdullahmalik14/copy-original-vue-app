<template>
  <div>
    <h1 data-translate="auth.register.Onboarding.title">{{ $t('auth.register.Onboarding.title') }}</h1>
    <p data-translate="auth.register.Onboarding.description">{{ $t('auth.register.Onboarding.description') }}</p>
    <button @click="completeOnboarding" data-translate="auth.register.Onboarding.button">{{ $t('auth.register.Onboarding.button') }}</button>
    <p v-if="error" data-translate="auth.messages.Onboarding.error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Added: Import ref
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { triggerTranslationForElements } from "@/utils/translationUtils";

const router = useRouter();
const auth = useAuthStore();
const error = ref("");

onMounted(() => {
  // Trigger translation for elements with data-translate attribute
  setTimeout(() => {
    triggerTranslationForElements();
  }, 100);
});

function completeOnboarding() {
  try {
    auth.updateUserAttributesLocally({ onboardingPassed: true });
    if (auth.currentUser.role === "creator") {
      router.push("/sign-up/onboarding/kyc");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    error.value = "Failed to complete onboarding";
  }
}
</script>
<script>
export const assets = {
  critical: ["/css/onboarding.css"],
  high: [],
  normal: ["/images/kyc-status-bg.jpg"],
};
</script>
