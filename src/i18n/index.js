import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    welcome: 'Welcome',
    pages: {
      home: 'Home',
      dashboard: 'Dashboard',
      profile: 'Profile',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
      discover: 'Discover'
    }
  },
  vi: {
    welcome: 'Chào mừng',
    pages: {
      home: 'Trang chủ',
      dashboard: 'Bảng điều khiển',
      profile: 'Hồ sơ',
      shop: 'Cửa hàng',
      about: 'Giới thiệu',
      contact: 'Liên hệ',
      discover: 'Khám phá'
    }
  }
}

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
