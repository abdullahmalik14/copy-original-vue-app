<template>
  <AuthWrapper>
    <div class="flex flex-col w-full relative gap-6 z-[5]">
      <div class="flex flex-col w-full gap-6">

        <!-- heading -->
        <Heading text="Reset Password" tag="h2" theme="AuthHeading" />

        <!-- input-wrapper (password) -->
          <InputAuthComponent
            v-model="password"
            placeholder="Password"
            id="password"
            show-label
            label-text="New Password"
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
            placeholder="Confirm New Password"
            id="password"
            show-label
            label-text="Confirm New Password"
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

            <!-- submit button -->
          <ButtonComponent text="Submit" variant="authPink" size="lg" />
        
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup>
import { ref } from "vue";
import { authHandler } from "@/services/authHandler";
import { useRouter } from "vue-router";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper.vue";
import Heading from "@/components/dev/default/Heading.vue";
import InputAuthComponent from "@/components/dev/input/InputAuthComponent.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";
import {
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";


const email = ref("");
const code = ref("");
const newPassword = ref("");
const message = ref("");
const error = ref("");
const router = useRouter();

async function handleReset() {
  try {
    await authHandler.confirmPassword(
      email.value,
      code.value,
      newPassword.value
    );
    message.value = "Password reset successful. Please log in.";
    router.push("/log-in");
  } catch (err) {
    error.value = err.message || "Reset failed";
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
