<template>
  <!-- header-component -->
  <div
    ref="headerComponent"
    data-header-component
    class="flex flex-col-reverse justify-between w-full bg-black/30 backdrop-blur-[10px] px-0 fixed top-0 -translate-y-full [transition:transform_0.3s_ease] z-[9999] max-[580px]:[background:linear-gradient(180deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.50)_25%,rgba(0,0,0,0.01)_100%)] max-[580px]:backdrop-blur-[50px] md:px-4 xl:flex-row xl:gap-4 xl:px-12 group [&.scroll-active]:translate-y-0"
  >
    <!-- navigation-section -->
    <div class="xl:pt-[2.813rem]">
      <ul
        class="flex flex-row justify-around items-center overflow-x-auto whitespace-nowrap flex-nowrap sm:gap-4"
      >
        <!-- menu-item -->
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="[
            'flex justify-center gap-1 relative flex-grow opacity-70 [border-bottom:1px_solid_transparent] group cursor-pointer',
            item.active ? 'active [&.active]:[border-bottom:1px_solid_#07f468] max-[580px]:group-[.active]:[border-bottom:1px_solid_#e7e5e4] [&.active]:opacity-100' : '',
            'xl:flex-[unset]'
          ]"
          @click="$emit('menu-click', item)"
        >
          <div
            class="flex justify-center flex-grow max-[325px]:px-2 max-[325px]:py-0 px-4 py-[0.639rem] sm:px-4 sm:py-0"
          >
            <span class="block pt-2 pb-2">
              <span
                class="block text-sm font-medium capitalize text-[#e7e5e4] max-[580px]:group-hover:text-[#e7e5e4] max-[580px]:group-[.active]:text-[#e7e5e4] group-hover:text-[#07f468] group-[.active]:text-[#07f468]"
              >
                {{ item.label }}
              </span>
            </span>

            <div
              v-if="item.count !== undefined"
              class="text-[0.625rem] leading-normal font-medium text-[#07f468]"
            >
              {{ item.count }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- header user profile section -->
    <div
      class="hidden md:flex justify-end items-center gap-4 flex-wrap py-2 xl:justify-[unset]"
    >
      <!-- profile-info -->
      <div
        class="hidden items-center gap-4 pr-2.5 border-r border-white md:inline-flex"
      >
        <div class="flex flex-col items-start gap-2">
          <!-- user-name-title -->
          <div class="flex items-start gap-4 self-stretch h-6">
            <div class="flex items-center gap-2 flex-grow">
              <div class="text-base font-semibold text-white line-clamp-1">
                @{{ profileData.username }}
              </div>
              <img
                v-if="profileData.isVerified"
                src="https://i.ibb.co.com/j9XKPcfK/verified-green.webp"
                alt="verified-green"
                class="w-4 h-4"
              />
            </div>
          </div>

          <!-- profile-info-list -->
          <div class="flex items-start gap-4 opacity-70 relative z-[-1]">
            <div class="flex flex-col items-center gap-0.5">
              <span class="text-xs leading-normal text-white">Followers</span>
              <span class="text-sm text-white">{{ profileData.followers }}</span>
            </div>

            <div class="flex flex-col items-center gap-0.5">
              <span class="text-xs leading-normal text-white">Likes</span>
              <span class="text-sm text-white">{{ profileData.likes }}</span>
            </div>

            <div class="flex flex-col items-center gap-0.5">
              <span class="text-xs leading-normal text-white">Subscribers</span>
              <span class="text-sm text-white">{{ profileData.subscribers }}</span>
            </div>
          </div>
        </div>

        <!-- creator-avatar-container -->
        <div class="flex flex-col justify-center items-center">
          <img
            :src="profileData.avatar"
            alt="user-avatar"
            class="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => [
      { label: 'Media', count: 18, active: true },
      { label: 'About', active: false },
      { label: 'Posts', count: 5, active: false }
    ]
  },
  profileData: {
    type: Object,
    default: () => ({
      username: 'sukii19',
      avatar: 'https://i.ibb.co.com/jk1F8MqJ/featured-media-bg.webp',
      isVerified: true,
      followers: 35,
      likes: 14,
      subscribers: 2
    })
  }
})

defineEmits(['menu-click'])

const headerComponent = ref(null)

const handleScroll = () => {
  const scrollY = window.pageYOffset
  if (headerComponent.value) {
    if (scrollY > 480) {
      headerComponent.value.classList.add('scroll-active')

      // Add progressive blur effect to sticky header
      const blurStart = 480
      const blurEnd = 1000
      const minBlur = 10
      const maxBlur = 50

      let blur = scrollY <= blurStart
        ? minBlur
        : scrollY >= blurEnd
          ? maxBlur
          : minBlur + ((scrollY - blurStart) / (blurEnd - blurStart)) * (maxBlur - minBlur)

      headerComponent.value.style.backdropFilter = `blur(${blur}px)`
      headerComponent.value.style.webkitBackdropFilter = `blur(${blur}px)`
    } else {
      headerComponent.value.classList.remove('scroll-active')
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
