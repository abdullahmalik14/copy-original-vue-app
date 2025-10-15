<template>
  <AuthWrapper>
    <div class="flex flex-col w-full relative gap-6 z-[5]">
      <div class="flex flex-col w-full gap-6">

        <!-- heading -->
        <Heading text="Hi @gfdhghgjhgjg, Welcome to our website, we're thrilled to have you on board." tag="h2" theme="AuthHeading" />
        <Paragraph
          text="Before you join, we ask that you complete our onboarding froms"
          font-size="text-base"
          font-weight="font-medium"
          font-color="text-white"
        />

        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <!-- confirm button -->
          <ButtonComponent text="Confirm & Proceed" variant="authPink" size="lg" />

          <!-- logout -->

          <ButtonComponent
            text="Logout & Exit"
            variant="authTransparent"
            size="lg"
          />
        </div>

      </div>
    </div>
  </AuthWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { triggerTranslationForElements } from "@/utils/translationUtils";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper.vue";
import Heading from "@/components/dev/default/Heading.vue";
import Paragraph from "@/components/dev/default/Paragraph.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";

const router = useRouter();
const auth = useAuthStore();
const error = ref("");
const isLoading = ref(false);

onMounted(() => {
  // Trigger translation for elements with data-translate attribute
  setTimeout(() => {
    triggerTranslationForElements();
  }, 100);
});

async function completeKyc() {
  const start = performance.now();
  console.log("[KYC] User clicked Complete KYC at:", new Date().toISOString());

  try {
    isLoading.value = true;
    console.log("[UI] Button changed to 'Please wait...'");

    // --- Update Cognito ---
    await authHandler.updateProfileAttributes({ "custom:kyc": "true" });
    const mid = performance.now();
    console.log(
      `[KYC] updateProfileAttributes took ${(mid - start).toFixed(2)} ms`
    );

    // --- Restore Session ---
    const { idToken } = await authHandler.restoreSession();
    const end = performance.now();
    console.log(`[KYC] restoreSession took ${(end - mid).toFixed(2)} ms`);
    console.log(
      `[KYC] Total KYC completion flow took ${(end - start).toFixed(2)} ms`
    );

    // --- Update local state ---
    auth.setTokenAndDecode(idToken);
    console.log("[KYC] Cognito update finished → navigating to /dashboard");

    router.push("/dashboard");
  } catch (err) {
    error.value = "Failed to complete KYC: " + (err.message || "Unknown error");
    console.error("[KYC] Error during KYC completion:", err);
  } finally {
    isLoading.value = false;
    console.log("[UI] Button reset to 'Complete KYC'");
  }
}
</script>
<script>
export const assets = {
  critical: ["/css/onboarding.css"],
  high: [],
  normal: ["/images/kyc-bg.jpg"],
};
</script>
