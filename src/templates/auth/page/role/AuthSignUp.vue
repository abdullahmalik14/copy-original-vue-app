<template>
  <AuthWrapper>
    <!-- login-container -->
    <div class="flex flex-col w-full relative gap-6 z-[5]">
      <div class="flex flex-col w-full gap-6">
        <!-- heading -->
        <Heading text="Sign Up" tag="h2" theme="AuthHeading" />

        <form class="flex flex-col gap-8">
          <div className="flex items-center gap-1">
            <Paragraph
              text="Already have an account?"
              font-size="text-base"
              font-weight="font-medium"
              font-color="text-white"
            />

            <RouterLink
              href="/sign-up"
              class="text-base font-medium leading-6 text-[#f06]"
              >Log in
            </RouterLink>
          </div>

          <!-- input-wrapper (email) -->
          <InputAuthComponent
            v-model="email"
            placeholder="Email address"
            id="email"
            show-label
            label-text="Email address"
            required
            required-display="italic-text"
            type="email"
          />

          <!-- input-wrapper (password) -->
          <InputAuthComponent
            v-model="password"
            placeholder="Password"
            id="password"
            show-label
            label-text="Password"
            required
            required-display="italic-text"
            type="password"
            right-icon="https://i.ibb.co/xSCKFrhW/svgviewer-png-output-82.webp"
            :show-errors="true"
            :errors="[
              {
                error: 'At least 8 characters long',
                icon: InformationCircleIcon,
              },
              {
                error:
                  'Contain at least 1 uppercase letter, 1 lowercase letter, 1 number',
                icon: InformationCircleIcon,
              },
              {
                error: 'Passwords do not match',
                icon: InformationCircleIcon,
              },
            ]"
            :on-success="false"
            :success="[]"
          />
          <!-- input-wrapper (confirm password) -->
          <InputAuthComponent
            v-model="password"
            placeholder="Confirm Password"
            id="password"
            show-label
            label-text="Confirm Password"
            required
            required-display="italic-text"
            type="password"
            right-icon="https://i.ibb.co/xSCKFrhW/svgviewer-png-output-82.webp"
            :show-errors="true"
            :errors="[
              {
                error: 'Passwords do not match',
                icon: InformationCircleIcon,
              },
            ]"
            :on-success="false"
            :success="[]"
          />

                <CloudflareSuccess />

          <!-- Signup button -->
          <ButtonComponent text="Sign up" variant="authPink" size="lg" />

          <!-- Continue with X button -->

          <ButtonComponent
            text="Continue with X (twitter)"
            variant="authTransparent"
            size="lg"
            :leftIcon="'https://i.ibb.co/KjN9R5cr/svgviewer-png-output-83.webp'"
            leftIconClass="w-8 h-8"
          />
        </form>
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { enterpriseI18n } from "@/i18n/enterprise/i18n";
import { useI18n } from "vue-i18n";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper.vue";
import Heading from "@/components/dev/default/Heading.vue";
import Paragraph from "@/components/dev/default/Paragraph.vue";
import InputAuthComponent from "@/components/dev/input/InputAuthComponent.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import CloudflareSuccess from "@/components/ui/badge/dashboard/CloudflareSuccess.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("creator");
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();
const { locale, t } = useI18n();

// Computed properties to force re-render when translations change
const registerTitle = computed(() => t("auth.register.title"));
const firstNamePlaceholder = computed(() => t("auth.register.firstName"));
const emailPlaceholder = computed(() => t("auth.register.emailPlaceholder"));
const passwordPlaceholder = computed(() =>
  t("auth.register.passwordPlaceholder")
);
const registerButton = computed(() => t("auth.register.button"));
const userRole = computed(() => t("auth.common.user"));
const adminRole = computed(() => t("auth.common.admin"));
const guestRole = computed(() => t("auth.common.guest"));

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
