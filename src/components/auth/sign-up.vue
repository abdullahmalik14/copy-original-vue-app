<template>
  <div>
    <h1>{{ $t('auth.register.title') }}</h1>
    <form @submit.prevent="handleSignUp">
      <input v-model="name" type="text" :placeholder="$t('auth.register.firstName')" required />
      <input v-model="email" type="email" :placeholder="$t('auth.register.emailPlaceholder')" required />
      <input
        v-model="password"
        type="password"
        :placeholder="$t('auth.register.passwordPlaceholder')"
        required
      />
      <select v-model="role" required>
        <option value="creator">{{ $t('auth.common.user') }}</option>
        <option value="vendor">{{ $t('auth.common.admin') }}</option>
        <option value="customer">{{ $t('auth.common.guest') }}</option>
        <option value="agent">{{ $t('auth.common.user') }}</option>
      </select>
      <button type="submit">{{ $t('auth.register.button') }}</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { enterpriseI18n } from "@/i18n/enterprise/i18n";
import { useI18n } from "vue-i18n";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("creator");
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();
const { locale, t } = useI18n();

// Computed properties to force re-render when translations change
const registerTitle = computed(() => t('auth.register.title'));
const firstNamePlaceholder = computed(() => t('auth.register.firstName'));
const emailPlaceholder = computed(() => t('auth.register.emailPlaceholder'));
const passwordPlaceholder = computed(() => t('auth.register.passwordPlaceholder'));
const registerButton = computed(() => t('auth.register.button'));
const userRole = computed(() => t('auth.common.user'));
const adminRole = computed(() => t('auth.common.admin'));
const guestRole = computed(() => t('auth.common.guest'));

// Preload auth section translations
onMounted(async () => {
  try {
    await enterpriseI18n.preloadLocale(locale.value);
    console.log(`[SIGNUP] Preloaded auth section for locale '${locale.value}'`);
  } catch (error) {
    console.error(`[SIGNUP] Failed to preload auth section:`, error);
  }
});

async function handleSignUp() {
  try {
    console.log("Attempting signup with:", {
      email: email.value,
      role: role.value,
    });
    await authHandler.register(email.value, password.value, {
      email: email.value, // Added: Explicitly set email attribute
      name: name.value,
      "custom:role": role.value,
    });
    console.log("Signup successful, redirecting to confirm-email");
    router.push("/confirm-email");
  } catch (err) {
    console.error("Signup error:", err);
    error.value = err.message || "Sign up failed";
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
