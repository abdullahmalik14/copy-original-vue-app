<template>
  <!-- profile-id -->
  <div class="bg-black/30  font-sans p-0 m-0 box-border overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-order-style:none] [scrollbar-width:none]">
    <!-- Background Slider -->
    <ProfileBackgroundSlider
      ref="backgroundSlider"
      :images="backgroundImages"
      @slider-moved="handleSliderMove"
    />

    <!-- Sticky Header (appears on scroll) -->
    <ProfileStickyHeader
      :menu-items="menuItems"
      :profile-data="profileData"
      @menu-click="handleMenuClick"
    />

    <!-- Main Profile Banner -->
    <ProfileBannerSection
      :profile-data="profileData"
      :background-images="backgroundImages"
      @cart-click="handleCartClick"
      @notification-click="handleNotificationClick"
      @language-click="handleLanguageClick"
      @avatar-click="handleAvatarClick"
      @tip-click="handleTipClick"
      @like-click="handleLikeClick"
      @share-click="handleShareClick"
      @more-click="handleMoreClick"
      @read-more-click="handleReadMoreClick"
      @subscribe-click="handleSubscribeClick"
    />

    <!-- bottom-section -->
    <div
      class="flex flex-col items-stretch max-[580px]:bg-black/25 opacity-100 md:overflow-hidden xl:overflow-auto"
    >
      <!-- media-tab-content -->
      <div
        class="hidden active [&.active]:block relative flex-1 min-h-[65.25rem] pt-20 md:pt-32"
      >
        <!-- pay-per-view-section -->
        <ProfileMediaSection
          section-title="Pay to View"
          :media-items="payPerViewMedia"
          :total-count="11"
          :show-more-button="true"
          @view-all-click="handleViewAll('pay-per-view')"
          @media-click="handleMediaClick"
          @show-more-click="handleShowMore('pay-per-view')"
        />

        <!-- subscription-section -->
        <ProfileMediaSection
          section-title="Subscription"
          :media-items="subscriptionMedia"
          :total-count="8"
          :show-more-button="true"
          @view-all-click="handleViewAll('subscription')"
          @media-click="handleMediaClick"
          @show-more-click="handleShowMore('subscription')"
        />

        <!-- featured-section -->
        <ProfileMediaSection
          section-title="Featured"
          :media-items="featuredMedia"
          :total-count="15"
          :show-more-button="true"
          @view-all-click="handleViewAll('featured')"
          @media-click="handleMediaClick"
          @show-more-click="handleShowMore('featured')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProfileBackgroundSlider from './ProfileBackgroundSlider.vue'
import ProfileStickyHeader from './ProfileStickyHeader.vue'
import ProfileBannerSection from './ProfileBannerSection.vue'
import ProfileMediaSection from './ProfileMediaSection.vue'

// Refs
const backgroundSlider = ref(null)

// Background images
const backgroundImages = ref([
  'https://i.ibb.co.com/F4cf3W53/profile-slidein-bg.webp',
  'https://i.ibb.co.com/bjGQxr5S/sample-bg-image.webp',
  'https://i.ibb.co.com/jPw7ChWb/auth-bg.webp'
])

// Menu items for sticky header
const menuItems = ref([
  { label: 'Media', count: 18, active: true }
])

// Profile data
const profileData = ref({
  username: 'sukii19',
  displayName: 'Sukii19',
  avatar: 'https://i.ibb.co.com/jk1F8MqJ/featured-media-bg.webp',
  isVerified: true,
  isOnline: true,
  followers: 35,
  likes: 14,
  subscribers: 2,
  age: 22,
  location: 'Hong Kong',

})

// Sample media data - replace with actual data from API
const createSampleMedia = (count, isPaid = false) => {
  const thumbnails = [
    'https://i.ibb.co.com/F4cf3W53/profile-slidein-bg.webp',
    'https://i.ibb.co.com/bjGQxr5S/sample-bg-image.webp',
    'https://i.ibb.co.com/jPw7ChWb/auth-bg.webp',
    'https://i.ibb.co.com/jk1F8MqJ/featured-media-bg.webp'
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `media-${Math.random().toString(36).substr(2, 9)}`,
    thumbnail: thumbnails[i % thumbnails.length],
    type: i % 3 === 0 ? 'video' : 'image',
    duration: i % 3 === 0 ? '14:09' : null,
    postedAgo: ['2d', '5d', '1w', '2w'][i % 4],
    likes: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 1000),
    isPaid: isPaid,
    buttonText: isPaid ? 'Subscribe or Buy' : null,
    title: 'Building successful teams through collaboration',
    videoUrl: i % 3 === 0 ? 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' : null
  }))
}

const payPerViewMedia = ref(createSampleMedia(10, true))
const subscriptionMedia = ref(createSampleMedia(10, true))
const featuredMedia = ref(createSampleMedia(10, false))

// Event handlers
const handleSliderMove = (index) => {
  console.log('Slider moved to:', index)
}

const handleMenuClick = (item) => {
  console.log('Menu clicked:', item)
  // Update active menu item
  menuItems.value.forEach(menuItem => {
    menuItem.active = menuItem.label === item.label
  })
}

const handleCartClick = () => {
  console.log('Cart clicked')
}

const handleNotificationClick = () => {
  console.log('Notification clicked')
}

const handleLanguageClick = () => {
  console.log('Language clicked')
}

const handleAvatarClick = () => {
  console.log('Avatar clicked')
}

const handleTipClick = () => {
  console.log('Tip clicked')
}

const handleLikeClick = () => {
  console.log('Like clicked')
  profileData.value.likes++
}

const handleShareClick = () => {
  console.log('Share clicked')
}

const handleMoreClick = () => {
  console.log('More clicked')
}

const handleReadMoreClick = () => {
  console.log('Read more clicked')
}

const handleViewAll = (section) => {
  console.log('View all clicked for:', section)
}

const handleMediaClick = (media) => {
  console.log('Media clicked:', media)
}

const handleShowMore = (section) => {
  console.log('Show more clicked for:', section)
  // Load more media items for the section
}

const handleSubscribeClick = () => {
  console.log('Subscribe clicked')
}
</script>

<style>
/* Initialize CSS variable for blur effect */
:root {
  --blur: 0px;
}
</style>
