import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { authHandler } from "@/services/authHandler";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    idToken: null,
    currentUser: null,
     simulate: {
    role: "admin",
    email: "dev@test.com",
    kycPassed: true,
    onboardingPassed: true,
    raw: { exp: Math.floor(Date.now() / 1000) + 86400 }
  },
    onboardingPassed: false, // Local persisted state for onboarding
    _refreshInterval: null,
  }),

  actions: {
    setTokenAndDecode(idToken) {
      this.idToken = idToken;
      const decoded = jwtDecode(idToken);
   
      // console.log("[TOKEN] Full decoded token:", decoded);
      this.currentUser = {
        email: decoded.email,
        role: decoded["custom:role"],
        kycPassed: decoded["custom:kyc"] === "true",
        onboardingPassed: this.onboardingPassed, // From local state
        raw: decoded,
      };
      // console.log("[TOKEN] Extracted attributes:", this.currentUser);
    },

    refreshFromStorage() {
      const token = localStorage.getItem("idToken");
      if (token) this.setTokenAndDecode(token);

      // Restore simulate fallback (so route guard sees simulated role on refresh)
      try {
        const sim = localStorage.getItem("simulate");
        if (sim && !this.simulate) {
          this.simulate = JSON.parse(sim);
        }
      } catch (e) {
        console.warn("[AUTH] Failed to restore simulate:", e);
      }
    },

    simulateRole(role, overrides = {}) {
      this.simulate = { role, ...overrides };
      try {
        localStorage.setItem("simulate", JSON.stringify(this.simulate));
      } catch (e) {
        console.warn("[AUTH] Failed to persist simulate:", e);
      }
    },

    updateUserAttributesLocally(updates) {
      if (updates.onboardingPassed !== undefined) {
        this.onboardingPassed = updates.onboardingPassed;
      }
      this.currentUser = { ...this.currentUser, ...updates };
    },

    logout() {
      authHandler.logout();

      // Remove only auth keys, don't clear everything (pinia persisted state may live here)
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // if you saved simulate intentionally, maybe keep it during logout for dev-testing.
      // localStorage.removeItem("simulate"); // optional: uncomment if you want to remove simulate

      // Reset store (Pinia)
      this.$reset();
    },

    startTokenRefreshLoop() {
      clearInterval(this._refreshInterval);
      this._refreshInterval = setInterval(async () => {
        const exp = this.currentUser?.raw?.exp;
        if (!exp) return;
        const expiresIn = exp * 1000 - Date.now();
        if (expiresIn < 5 * 60 * 1000) {
          try {
            const { idToken } = await authHandler.restoreSession();
            this.setTokenAndDecode(idToken);
          } catch (err) {
            this.logout();
          }
        }
      }, 60 * 1000);
    },
  },

  persist: true,
});
