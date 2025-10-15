<template>
  <AuthWrapper>
    <!-- signup-onboarding-container -->
    <div class="flex flex-col w-full relative gap-6 z-[5]">
      <div class="flex flex-col w-full gap-6">
        <!-- heading -->
        <Heading text="Welcome to our websiite" tag="h2" theme="AuthHeading" />
        <Paragraph
          text="Please select your role and enter a Username below. Please note that once you've saved your Username, it cnnot be chnaged"
          font-size="text-base"
          font-weight="font-medium"
          font-color="text-white"
        />
        <form class="flex flex-col gap-8">
          <!-- input-wrapper (Role) -->
          <InputAuthComponent
            v-model="email"
            placeholder="Select your role"
            id="role"
            show-label
            label-text="Role"
            :required-display="['required-text-error']"
            required
            type="text"
          />

          <!-- input-wrapper (username) -->
          <InputAuthComponent
            v-model="password"
            placeholder="Username"
            id="Username"
            show-label
            label-text="Username"
            required
            :required-display="['italic-text', 'required-text-error']"
            type="text"
            right-icon="https://i.ibb.co/xSCKFrhW/svgviewer-png-output-82.webp"
            :show-errors="true"
            :errors="[
              {
                error: 'Must be between 3 and 100 characters long',
                icon: InformationCircleIcon,
              },
              {
                error: 'Can contain any letters from a-z, any numbers from 0-9',
                icon: InformationCircleIcon,
              },
              {
                error: 'Cannot contain space',
                icon: InformationCircleIcon,
              },
            ]"
            :on-success="true"
            :success="[
              {
                message: 'Must be between 3 and 100 characters long',
                icon: CheckIcon,
              },
              {
                message:
                  'Can contain any letters from a-z, any numbers from 0-9.',
                icon: CheckIcon,
              },
              {
                message: 'Cannot contain space.',
                icon: CheckIcon,
              },
              {
                message: 'Good news! Username \'hgfu\' is available!',
                icon: CheckCircleIcon,
                textColor: 'text-[#07f468]', // optional
                iconColor: 'text-[#07f468]',
              },
            ]"
          />
          <!--  -->
          <!-- input-wrapper (display name) -->
          <InputAuthComponent
            v-model="password"
            placeholder="Display name"
            id="name"
            show-label
            label-text="Display name"
            required
            :required-display="['italic-text', 'required-text-error']"
            type="text"
            right-icon="https://i.ibb.co/xSCKFrhW/svgviewer-png-output-82.webp"
            :show-errors="true"
            :errors="[
              {
                error:
                  'Can contain any letters from a-z, any numbers from 0-9, and some special characters (!@#$%^&*()_-).',
                icon: InformationCircleIcon,
              },
              {
                error:
                  'Display name must be more than 6 and less than or equal to 20 characters.',
                icon: InformationCircleIcon,
              },
            ]"
            :on-success="true"
            :success="[
              {
                message:
                  'Can contain any letters from a-z, any numbers from 0-9, and some special characters (!@#$%^&*()_-).',
                icon: CheckIcon,
              },
              {
                message:
                  'Display name must be more than 6 and less than or equal to 20 characters.',
                icon: CheckIcon,
              },
            ]"
          />

          <CheckboxGroup
            v-model="termsOfService"
            label="By signing up you agree to our Terms of Service"
            checkboxClass="m-0 border border-checkboxBorder [appearance:none] w-[0.75rem] h-[0.75rem] rounded-[2px] bg-transparent relative cursor-pointer checked:bg-checkbox checked:border-checkbox checked:[&::after]:content-[''] checked:[&::after]:absolute checked:[&::after]:left-[0.2rem] checked:[&::after]:w-[0.25rem] checked:[&::after]:h-[0.5rem] checked:[&::after]:border checked:[&::after]:border-solid checked:[&::after]:border-white checked:[&::after]:border-r-[2px] checked:[&::after]:border-b-[2px] checked:[&::after]:border-t-0 checked:[&::after]:border-l-0 checked:[&::after]:rotate-45 "
            labelClass="text-[12px] sm:text-[14px] text-text cursor-pointer "
            wrapperClass="flex items-center gap-2"
          />

          <CloudflareSuccess />

          <!-- Signup button -->
          <ButtonComponent
            text="Complete Sign Up"
            variant="authPink"
            size="lg"
          />
        </form>
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Added: Import ref
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { triggerTranslationForElements } from "@/utils/translationUtils";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper.vue";
import Heading from "@/components/dev/default/Heading.vue";
import Paragraph from "@/components/dev/default/Paragraph.vue";
import InputAuthComponent from "@/components/dev/input/InputAuthComponent.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";
import CloudflareSuccess from "@/components/ui/badge/dashboard/CloudflareSuccess.vue";
import CheckboxGroup from "@/components/ui/form/checkbox/CheckboxGroup.vue";
import {
  InformationCircleIcon,
  CheckIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const auth = useAuthStore();
const error = ref("");
const termsOfService = ref(false);

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
