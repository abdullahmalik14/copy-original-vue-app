export const SafeUtils = {
  ensureString(value, fallback = '') {
    return (typeof value === 'string' && value.length) ? value : fallback
  },
  ensureNumber(value, fallback = 0) {
    const n = Number(value)
    return Number.isFinite(n) ? n : fallback
  },
  ensureBoolean(value, fallback = false) {
    return typeof value === 'boolean' ? value : fallback
  }
}
