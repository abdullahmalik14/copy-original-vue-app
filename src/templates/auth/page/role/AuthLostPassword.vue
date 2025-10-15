<template>
<AuthWrapper>
    <div class="flex flex-col w-full relative gap-6 z-[5]">
      <div class="flex flex-col w-full gap-6">

        <!-- heading -->
        <Heading text="Forgot Password" tag="h2" theme="AuthHeading" />
    
        <Paragraph
          text="If an account is associated with the provided email addrress, you will recieve a link to reset your password."
          font-size="text-base"
          font-weight="font-medium"
          font-color="text-white"
        />


        <!-- input-wrapper (email) -->
          <InputAuthComponent
            v-model="email"
            placeholder="Email"
            id="email"
            show-label
            label-text="Email"
            required
            required-display="italic-text"
            type="email"
          />

          <CloudflareSuccess/>

            <!-- submit button -->
          <ButtonComponent text="Submit" variant="authPink" size="lg" />
          <ButtonComponent text="Resend" variant="authPink" size="lg" />
        
      </div>
    </div>
  </AuthWrapper>
</template>

<script setup>
import { ref } from "vue";
import { authHandler } from "@/services/authHandler";
import AuthWrapper from "@/components/auth/authWrapper/AuthWrapper.vue";
import Heading from "@/components/dev/default/Heading.vue";
import Paragraph from "@/components/dev/default/Paragraph.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";
import InputAuthComponent from "@/components/dev/input/InputAuthComponent.vue";
import CloudflareSuccess from "@/components/ui/badge/dashboard/CloudflareSuccess.vue";

const email = ref("");
const message = ref("");
const error = ref("");

async function handleForgot() {
  try {
    await authHandler.forgotPassword(email.value);
    message.value = "Reset code sent to your email.";
  } catch (err) {
    error.value = err.message || "Failed to send code";
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
