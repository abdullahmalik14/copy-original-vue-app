// Minimal auth placeholder.
import { reactive, computed } from 'vue'

const state = reactive({
  isAuthenticated: false,
  user: null
})

export function useAuth() {
  const login = (user = { id: 1, name: 'Demo User' }) => {
    state.isAuthenticated = true
    state.user = user
  }
  const logout = () => {
    state.isAuthenticated = false
    state.user = null
  }
  return {
    state,
    isAuthenticated: computed(() => state.isAuthenticated),
    user: computed(() => state.user),
    login,
    logout
  }
}
