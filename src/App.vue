<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import routesConfig from "@/router/routeConfig.json";
import { onMounted } from "vue"; // ✳️ add
import { assetsConfigReady, getAsset } from "@/utils/assetLibraryHandler";

const auth = useAuthStore();

// Simulate a Creator user for testing fallbacks
// auth.simulateRole("creator", { onboardingPassed: true, kycPassed: true});

// onMounted(() => {
//   console.log("[TEST] assetsConfigReady:", assetsConfigReady());
//   console.log("[TEST] getAsset('logo','icon'):", getAsset("logo", "icon"));
//   if (window.createDependencyGate) {
//     window.createDependencyGate({
//       el: document.getElementById("my-gate"),
//       config: {
//         waitFor: ["assets", "apiLoaded"],
//         assets: {
//           flag: "test",
//           items: [
//             { name: "test-style", url: "/css/test-style.css", type: "css", priority: "critical" },
//             { name: "test-image", url: "/images/test-image.jpg", type: "image" },
//           ],
//         },
//         apiLoaded: { event: "api-ready", timeoutMs: 3000 },
//       },
//       renderWhenReady: () => window.Vue.h("div", "✅ All dependencies ready!"),
//     });
//   } else {
//     console.warn("❌ DependencyGate not found on window");
//   }
// });

</script>

<template>
  <!-- Test assetsLibraryHandler -->
  <!-- <img v-if="assetsConfigReady()" :src="getAsset('logo','icon')" alt="Logo" style="width:100px; margin-top:1rem;" /> -->
  
  <!-- Navigation Bar with Buttons -->

  <!-- <nav
    style="
      padding: 1rem;
      background-color: #f0f0f0;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    "
  >
    <div style="display: flex; gap: 1rem">
      <router-link to="/sign-up">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Sign Up
        </button>
      </router-link>
      <router-link to="/log-in">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Log In
        </button>
      </router-link>
      <router-link to="/dashboard/store/custom-product-requests">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Dashboard
        </button>
      </router-link>
      <router-link to="/profile">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Profile
        </button>
      </router-link>
      <router-link to="/discover">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Discover
        </button>
      </router-link>
      <router-link to="/shop">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Shop
        </button>
      </router-link>
      <router-link to="/about">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          About
        </button>
      </router-link>
      <router-link to="/contact">
        <button
          style="
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Contact
        </button>
      </router-link>

     
      <button
        @click="
          auth.simulateRole('creator', {
            onboardingPassed: true,
            kycPassed: true,
          })
        "
        style="
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Simulate Creator (Complete)
      </button>
      <button
        @click="
          auth.simulateRole('fan', {
            onboardingPassed: true,
          })
        "
        style="
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Simulate Fan
      </button>
      <button
        @click="
          auth.simulateRole('agent', {
            onboardingPassed: true,
          })
        "
        style="
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Simulate Agent
      </button>
      <button
        @click="
          auth.simulateRole('vendor', {
            onboardingPassed: true,
          })
        "
        style="
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Simulate Vendor
      </button>
    </div>

    <LocaleSwitcher />
  </nav> -->

  <!-- Main content -->
  <router-view />

 

  <!-- Footer -->
  <!-- <footer
    style="
      padding: 2rem 1rem;
      background: #f8f9fa;
      border-top: 1px solid #dee2e6;
      margin-top: 3rem;
    "
  >
    <h4 style="margin: 0 0 1rem 0; color: #333; font-size: 1.1rem;">Quick Links</h4>
    
    <ul style="
      columns: 3;
      gap: 2rem;
      list-style: none;
      padding: 0;
      margin: 0;
    ">
      <li v-for="route in routesConfig" :key="route.slug" style="margin-bottom: 0.5rem;">
        <router-link
          :to="route.slug"
          style="
            color: #007bff;
            text-decoration: none;
            font-size: 0.9rem;
            line-height: 1.4;
          "
          @mouseover="e => e.target.style.textDecoration = 'underline'"
          @mouseleave="e => e.target.style.textDecoration = 'none'"
        >
          {{ route.slug }}
        </router-link>
      </li>
    </ul>
  </footer> -->
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
button:hover {
  background-color: #0056b3;
}
</style>
