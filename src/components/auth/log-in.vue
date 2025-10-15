<template>
  <div>
    <h1>{{ welcomeText }}</h1>
    <form @submit.prevent="handleLogin">
      <input 
        v-model="email" 
        type="email" 
        :placeholder="emailPlaceholder" 
        required 
      />
      <input
        v-model="password"
        type="password"
        :placeholder="passwordPlaceholder"
        required
      />
      <button type="submit">
        {{ isLoading ? loadingText : loginButton }}
      </button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { useI18n } from "vue-i18n";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();
const isLoading = ref(false);
const { t, locale } = useI18n();

// Computed properties to force re-render when translations change
const welcomeText = computed(() => t('auth.login.title'));
const emailPlaceholder = computed(() => t('auth.login.emailPlaceholder'));
const passwordPlaceholder = computed(() => t('auth.login.passwordPlaceholder'));
const loginButton = computed(() => t('auth.login.button'));
const loadingText = computed(() => t('common.loading'));

// Watch locale changes
watch(locale, (newLocale, oldLocale) => {
  console.log(`[LOGIN] Locale changed from '${oldLocale}' to '${newLocale}'`);
  console.log(`[LOGIN] Welcome Back text after locale change: ${t('auth.login.title')}`);
}, { immediate: true });

onMounted(() => {
  console.log(`[LOGIN] Component mounted, current locale: ${locale.value}`);
  console.log(`[LOGIN] Welcome Back text: ${t('auth.login.title')}`);
});

async function handleLogin() {
  try {
    isLoading.value = true;
    console.log("[LOGIN] Attempting login with:", email.value);
    const { idToken, accessToken, refreshToken } = await authHandler.login(
      email.value,
      password.value
    );

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    auth.setTokenAndDecode(idToken);
    auth.startTokenRefreshLoop();
    isLoading.value = false;
    if (!auth.currentUser.onboardingPassed) {
      router.push("/sign-up/onboarding");
    } else if (
      auth.currentUser.role === "creator" &&
      !auth.currentUser.kycPassed
    ) {
      router.push("/sign-up/onboarding/kyc");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("[LOGIN] Login failed:", err);
    error.value = "Login failed: " + (err.message || "Unknown error");
  }
}
</script>

<script>
export const assets = {
  critical: ["/css/auth.css"],
  high: [],
  normal: ["/images/auth-bg.jpg"],
};
</script>
