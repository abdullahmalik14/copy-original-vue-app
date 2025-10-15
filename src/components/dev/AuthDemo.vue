<template>
  <div class="bg-gray-600 dark:bg-primary-dark p-5 h-screen">

    <section class="flex flex-col gap-6 max-w-4xl mx-auto">

      <InputAuthComponent v-model="email" placeholder="Email" id="email" show-label label-text="Email" required
        required-display="italic-text" type="email" />

      <InputAuthComponent v-model="password" placeholder="Password" id="password" show-label label-text="Password"
        required required-display="italic-text" type="password" :right-icon="EyeSlashIcon" />

      <InputAuthComponent v-model="rememberMe" id="checkbox" type="checkbox" show-label label-text="Remember me" />

      <InputAuthComponent v-model="role" id="radiobox" type="radio" show-label label-text="Select Role" :radio-options="[
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]" />




      <!-- login button -->
      <button
        class="auth-login-button w-full relative [caret-color:transparent] h-12 px-6 py-2 gap-2.5 rounded-[0.625rem] inline-flex items-center justify-center text-text dark:text-text-dark bg-[#f0f0f0] dark:bg-buttonPrimary-dark border border-buttonPrimaryBorder dark:border-buttonPrimaryBorder-dark font-medium text-[15px] transition-opacity duration-100 ease-in-out hover:bg-gradient-to-b hover:from-[#FF408C] hover:to-[#F00] hover:[box-shadow:0px_0px_20px_0px_rgba(255,150,192,0.8)_inset,_8px_8px_30px_0px_rgba(255,0,102,0.7),_0px_0px_35px_0px_rgba(255,255,221,0.5),_-8px_-8px_30px_0px_rgba(255,0,0,0.7)] dark:hover:bg-[linear-gradient(#a60042_0%,_#cc0000_100%)] dark:hover:bg-[initial] dark:hover:[box-shadow:rgba(114,_0,_46,_0.8)_0px_0px_20px_0px_inset,_rgba(204,_0,_82,_0.7)_8px_8px_30px_0px,_rgba(54,_54,_0,_0.5)_0px_0px_35px_0px,_rgba(204,_0,_0,_0.7)_-8px_-8px_30px_0px]">
        <div class="flex items-center gap-5">
          <span class="font-medium leading-6 text-text dark:text-text-dark text-lg">Log in</span>
        </div>
      </button>

      <!-- Continue with X button -->
     <button
        class="auth-x-login-button w-full relative [caret-color:transparent] h-12 px-6 py-2 gap-2.5 rounded-[0.625rem] inline-flex justify-center items-center text-text dark:text-text-dark border border-buttonSecondaryBorder dark:border-buttonSecondaryBorder-dark bg-[#f0f0f0] dark:bg-buttonSecondary-dark font-medium text-[15px] transition-opacity duration-100 ease-in-out hover:bg-[linear-gradient(180deg,_rgba(87,_85,_85,_0.50)_0%,_rgba(0,_0,_0,_0.50)_100%)] hover:[box-shadow:0px_0px_20px_0px_rgba(255,150,192,0.8)_inset,_8px_8px_30px_0px_rgba(255,0,102,0.7),_0px_0px_35px_0px_rgba(255,255,221,0.5),_-8px_-8px_30px_0px_rgba(255,0,0,0.7)] dark:hover:bg-[linear-gradient(rgba(65,_70,_73,_0.5)_0%,_rgba(0,_0,_0,_0.5)_100%)] dark:hover:bg-[initial] dark:hover:[box-shadow:rgba(114,_0,_46,_0.8)_0px_0px_20px_0px_inset,_rgba(204,_0,_82,_0.7)_8px_8px_30px_0px,_rgba(54,_54,_0,_0.5)_0px_0px_35px_0px,_rgba(204,_0,_0,_0.7)_-8px_-8px_30px_0px]">
        <div class="flex items-center gap-5">
          <img class="w-8 h-8 fill-white" src="https://i.ibb.co.com/KjN9R5cr/svgviewer-png-output-83.webp" alt="X" />
          <span class="leading-6 text-lg font-medium text-text dark:text-text-dark">Continue with X (twitter)</span>
        </div>
      </button>

      <!-- error-message -->
      <div
        class="flex justify-center items-center self-stretch border-l-[3px] border-errorBorder dark:border-errorBorder-dark bg-error dark:bg-error-dark relative">
        <div
          class="relative flex flex-col items-start self-stretch gap-4 px-2 py-3 w-full [background:linear-gradient(90deg,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_0.9)_100%),_linear-gradient(0deg,_rgba(255,_68,_5,_0.3)_0,_rgba(255,_68,_5,_0.3)_100%),_rgba(0,_0,_0,_0.9)] dark:[background:linear-gradient(90deg,_rgba(0,_0,_0,_0)_0px,_rgba(0,_0,_0,_0.9)_100%),_linear-gradient(0deg,_rgba(201,_51,_0,_0.3)_0px,_rgba(201,_51,_0,_0.3)_100%)] dark:bg-[rgba(0,_0,_0,_0.9)] transition-all duration-150 ease-in-out z-[2]">
          <div class="relative flex justify-start items-start self-stretch gap-4">
            <!-- close-icon -->
            <a href="#" class="absolute right-0 top-0 h-6 w-6 flex justify-center items-center">
              <img class="w-4 h-4 [pointer-events:none]"
                src="https://i.ibb.co.com/Mxvwrpbg/svgviewer-png-output-84.webp" alt="close" />
            </a>

            <!-- error-icon -->
            <div
              class="flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(255,_68,_5,_0.1)] dark:bg-[rgba(251,_51,_0,_0.1)]">
              <img src="https://i.ibb.co.com/d0qGrKZv/svgviewer-png-output-9.webp" alt="info"
                class="w-7 h-7 [filter:brightness(0)_saturate(100%)_invert(42%)_sepia(53%)_saturate(6174%)_hue-rotate(356deg)_brightness(98%)_contrast(105%)]" />
            </div>

            <!-- error-content -->
            <div class="flex-1 flex flex-col justify-center items-start self-stretch">
              <div class="flex flex-col items-start self-stretch">
                <div class="flex flex-col items-start self-stretch pr-6">
                  <p class="font-semibold text-sm leading-5 text-[#fcfcfd] dark:text-[#e6e4e1]">
                    Invalid email or password.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import InputAuthComponent from './input/InputAuthComponent.vue';
import { EyeSlashIcon } from '@heroicons/vue/24/solid';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const role = ref('');


</script>

<style scoped></style>
