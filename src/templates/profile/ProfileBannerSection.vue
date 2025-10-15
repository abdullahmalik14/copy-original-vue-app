<template>
  <section
    data-section="banner"
    class="w-full h-screen relative [transition:opacity_0.8s] z-0"
  >
    <!-- Header -->
    <ProfileBannerHeader
      :avatar-url="profileData.avatar"
      :is-online="profileData.isOnline"
      @cart-click="$emit('cart-click')"
      @notification-click="$emit('notification-click')"
      @language-click="$emit('language-click')"
      @avatar-click="$emit('avatar-click')"
    />

    <!-- profile-info (desktop top right) -->
    <div class="flex justify-end px-4 pt-4 xl:px-12">
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

    <!-- bottom-section -->
    <div
      class="flex flex-col items-end absolute left-0 bottom-0 w-full pb-14 px-0 z-[-1] sm:pb-12 md:flex-row md:px-4 md:pb-6 xl:px-12 xl:pb-12"
    >
      <!-- hero-info -->
      <div
        class="flex flex-col gap-2 w-full max-[580px]:justify-end max-[580px]:h-screen max-[580px]:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_25%,rgba(0,0,0,0.15)_75%)] md:block lg:w-1/2"
      >
        <div class="flex flex-col gap-1 px-2.5 md:gap-4 md:px-0 xl:gap-0">
          <!-- Desktop Title -->
          <h1
            class="hidden items-center gap-1 text-xl leading-normal font-semibold text-white md:flex md:text-5xl md:leading-[3.75rem] xl:text-6xl xl:leading-[4.5rem] xl:mb-5 xl:mt-[.67em]"
          >
            {{ profileData.displayName }}
            <div v-if="profileData.isVerified" class="flex w-3.5 h-3.5 md:hidden">
              <img
                src="https://i.ibb.co.com/nMhY8CpS/svgviewer-png-output-22.webp"
                alt="verified-tick"
                class="w-3.5 h-3.5"
              />
            </div>
          </h1>

          <!-- Mobile Avatar message online row -->
          <div class="flex gap-2 md:hidden">
            <!-- Avatar Wrapper -->
            <div class="relative">
              <!-- avatar -->
              <div
                class="bg-[#2970FF] w-16 h-16 aspect-square rounded-[25%_75%_50%_51%_/_45%_65%_36%_55%] relative overflow-hidden"
              >
                <img
                  :src="profileData.avatar"
                  alt="user-avatar"
                  class="w-full h-full absolute top-0 left-0 object-cover"
                />
              </div>

              <!-- Online-user-signal -->
              <span
                v-if="profileData.isOnline"
                class="block absolute right-[0.313rem] bottom-[0.188rem] w-2 h-2 bg-[#07F468] rounded-full"
              ></span>
            </div>
          </div>

          <!-- Mobile Title and Stats -->
          <div class="flex flex-col gap-1 md:hidden">
            <h1
              class="hidden items-center gap-1 text-xl leading-normal font-semibold text-white md:flex md:text-5xl md:leading-[3.75rem] xl:text-6xl xl:leading-[4.5rem] xl:mb-5"
            >
              {{ profileData.displayName }}
              <div v-if="profileData.isVerified" class="flex w-3.5 h-3.5 md:hidden">
                <img
                  src="https://i.ibb.co.com/nMhY8CpS/svgviewer-png-output-22.webp"
                  alt="verified-tick"
                  class="w-3.5 h-3.5"
                />
              </div>
            </h1>

            <!-- profile-info-list (mobile) -->
            <div class="flex items-start gap-3 opacity-70">
              <div class="flex items-center gap-1">
                <span class="flex items-center">
                  <img
                    src="https://i.ibb.co.com/gZfGQhSp/profile.webp"
                    alt="profile"
                    class="w-3.5 h-3.5 [filter:brightness(0)_saturate(100%)_invert(90%)_sepia(9%)_saturate(72%)_hue-rotate(183deg)_brightness(105%)_contrast(91%)]"
                  />
                </span>
                <span class="text-sm font-light text-[#EAECF0]">{{ profileData.followers }}</span>
              </div>

              <div class="flex items-center gap-1">
                <span class="flex items-center">
                  <img
                    src="https://i.ibb.co.com/vCFQPp7N/heart.webp"
                    alt="heart"
                    class="w-3.5 h-3.5 [filter:brightness(0)_saturate(100%)_invert(90%)_sepia(9%)_saturate(72%)_hue-rotate(183deg)_brightness(105%)_contrast(91%)]"
                  />
                </span>
                <span class="text-sm font-light text-[#EAECF0]">{{ profileData.likes }}</span>
              </div>

              <div class="flex items-center gap-1">
                <span class="flex items-center">
                  <img
                    src="https://i.ibb.co.com/8LGTj3jC/logo.webp"
                    alt="logo"
                    class="w-3.5 h-3.5 [filter:brightness(0)_saturate(100%)_invert(90%)_sepia(9%)_saturate(72%)_hue-rotate(183deg)_brightness(105%)_contrast(97%)]"
                  />
                </span>
                <span class="text-sm font-light text-[#EAECF0]">{{ profileData.subscribers }}</span>
              </div>
            </div>

            <!-- User info line -->
            <div class="flex gap-1">
              <span class="text-xs leading-normal text-[#FCFCFD] line-clamp-1">@{{ profileData.username }}</span>
              <span class="text-xs leading-normal text-[#FCFCFD] line-clamp-1">/</span>
              <span class="text-xs leading-normal text-[#FCFCFD] line-clamp-1">{{ profileData.age }}</span>
              <span class="text-xs leading-normal text-[#FCFCFD] line-clamp-1">/</span>
              <span class="text-xs leading-normal text-[#FCFCFD] line-clamp-1">{{ profileData.location }}</span>
            </div>
          </div>

          <!-- Action Buttons (mobile) -->
          <div class="flex items-center gap-1 py-2 md:hidden">
            <!-- tip-button -->
            <div class="flex gap-1">
              <div class="flex justify-end relative pl-[1.875rem] md:flex-grow md:pl-0" @click="$emit('tip-click')">
                <span class="absolute top-1/2 left-0 -translate-y-1/2 z-[1]">
                  <img src="https://i.ibb.co.com/DfbNLYFj/token.webp" alt="token" class="w-12 h-12" />
                </span>
                <span
                  class="flex justify-center items-center text-sm text-white w-[5.594rem] h-8 px-2 border border-[#e9e5d380] bg-black/10 backdrop-blur-[25px] [transition:all_0.3s_ease-in-out] max-[580px]:rounded-[0_50px_50px_0] max-[580px]:[border:0.5px_solid_#FF9AD0] max-[580px]:[background:linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.75)_100%),linear-gradient(180deg,rgba(232,3,174,0.54)_0%,rgba(232,3,174,0.60)_100%)] max-[580px]:shadow-[0_0_10px_0_rgba(232,3,174,0.30),0_0_10px_0_rgba(232,3,174,0.10),0_0_10px_0_rgba(232,3,174,0.30)_inset] md:w-[90%] cursor-pointer"
                >Tip</span>
              </div>
            </div>

            <span
              class="flex justify-center items-center w-8 h-8 bg-black/10 border border-[#e9e5d380] rounded-full [transition:all_0.3s_ease-in-out] cursor-pointer md:w-12 md:h-12"
              @click="$emit('like-click')"
            >
              <img
                src="https://i.ibb.co.com/vCFQPp7N/heart.webp"
                alt="heart"
                class="w-4 h-4 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
              />
            </span>

            <span
              class="flex justify-center items-center w-8 h-8 bg-black/10 border border-[#e9e5d380] rounded-full [transition:all_0.3s_ease-in-out] cursor-pointer md:w-12 md:h-12"
              @click="$emit('share-click')"
            >
              <img
                src="https://i.ibb.co.com/21KzYNJ8/link.webp"
                alt="link"
                class="w-4 h-4 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
              />
            </span>

            <div class="relative cursor-pointer" @click="$emit('more-click')">
              <span class="flex justify-center items-center w-8 h-8 rounded-full [transition:all_0.3s_ease-in-out] md:w-12 h-12">
                <img
                  src="https://i.ibb.co.com/cSNVr9ks/3-dot.webp"
                  alt="3-dot"
                  class="w-4 h-4 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
                />
              </span>
            </div>
          </div>

          <!-- Bio -->
          <p class="xl:mb-5">
            <span v-if="profileData.bio && profileData.bio.length > 100" class="hidden text-xs leading-normal font-semibold text-[#07F468] md:text-sm cursor-pointer" @click="$emit('read-more-click')">
              <span class="text-xs leading-normal font-medium text-white md:text-sm md:font-semibold">...</span>
              Read more
            </span>
          </p>

          <!-- Action Buttons (desktop) -->
          <div class="hidden items-center gap-[0.3125rem] py-2 md:flex md:py-0">
            <span
              class="flex justify-center items-center w-8 h-8 bg-black/10 border border-[#e9e5d380] rounded-full [transition:all_0.3s_ease-in-out] cursor-pointer md:w-12 md:h-12"
              @click="$emit('like-click')"
            >
              <img
                src="https://i.ibb.co.com/vCFQPp7N/heart.webp"
                alt="heart"
                class="w-4 h-4 md:w-6 md:h-6 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
              />
            </span>

            <span
              class="flex justify-center items-center w-8 h-8 bg-black/10 border border-[#e9e5d380] rounded-full [transition:all_0.3s_ease-in-out] cursor-pointer md:w-12 md:h-12"
              @click="$emit('share-click')"
            >
              <img
                src="https://i.ibb.co.com/21KzYNJ8/link.webp"
                alt="link"
                class="w-4 h-4 md:w-6 md:h-6 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
              />
            </span>

            <div class="relative cursor-pointer" @click="$emit('more-click')">
              <span class="flex justify-center items-center w-8 h-8 rounded-full [transition:all_0.3s_ease-in-out] md:w-12 md:h-12">
                <img
                  src="https://i.ibb.co.com/cSNVr9ks/3-dot.webp"
                  alt="3-dot"
                  class="w-4 h-4 md:w-6 md:h-6 [filter:brightness(0)_saturate(100%)_invert(84%)_sepia(12%)_saturate(222%)_hue-rotate(12deg)_brightness(105%)_contrast(97%)]"
                />
              </span>
            </div>

            <!-- tip-button (desktop) -->
            <div class="flex gap-1">
              <div class="flex justify-end relative pl-[1.875rem] md:flex-grow md:pl-0" @click="$emit('tip-click')">
                <span class="absolute top-1/2 left-0 -translate-y-1/2 z-[1]">
                  <img src="https://i.ibb.co.com/DfbNLYFj/token.webp" alt="token" class="w-12 h-12" />
                </span>
                <span
                  class="flex justify-center items-center text-sm text-white w-[5.594rem] h-8 px-2 border border-[#e9e5d380] bg-black/10 backdrop-blur-[25px] [transition:all_0.3s_ease-in-out] rounded-[0_50px_50px_0] [border:0.5px_solid_#FF9AD0] [background:linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.75)_100%),linear-gradient(180deg,rgba(232,3,174,0.54)_0%,rgba(232,3,174,0.60)_100%)] shadow-[0_0_10px_0_rgba(232,3,174,0.30),0_0_10px_0_rgba(232,3,174,0.10),0_0_10px_0_rgba(232,3,174,0.30)_inset] md:w-[90%] cursor-pointer"
                >Tip</span>
              </div>
            </div>
          </div>

          <!-- Gallery Carousel for Tablet and Mobile -->
          <div
            class="flex w-full py-[.3125rem] [transition:opacity_0.8s] relative md:py-[0.313rem] xl:hidden"
          >
            <Splide
              ref="gallerySlider"
              :options="gallerySlideOptions"
              class="w-full"
            >
              <SplideSlide
                v-for="(image, index) in backgroundImages"
                :key="index"
                class="flex flex-col items-start gap-4 z-[-2] border-l-4 border-r-4 border-transparent bg-center bg-cover bg-no-repeat max-[580px]:rounded-sm opacity-50 max-[580px]:!border-none is-active [&.is-active]:opacity-100 w-full h-[2.5rem] sm:h-[5rem]"
                :style="`background-image: url('${image}')`"
              >
                <img
                  class="hidden"
                  :src="image"
                  :alt="`gallery-${index + 1}`"
                />
              </SplideSlide>
            </Splide>
          </div>
        </div>

        <!-- Subscribe Button Section -->
        <div class="flex md:mt-8 xl:mt-16">
          <!-- new-subscriber-button -->
          <div
            class="flex justify-center items-end min-w-[45rem] max-w-[45rem] w-full h-20 cursor-pointer sm:px-5 md:relative"
          >
            <!-- buy-now-button -->
            <button
              class="flex justify-center items-center gap-1 w-[53%] h-[3.75rem] absolute left-0 bg-black flex-grow px-6 py-[0.313rem] shadow-[0_0_24px_0_rgba(251,4,100,0.25)] md:rounded-[16px_0_0_16px] lg:w-[27.875rem] group/button"
              @click="$emit('subscribe-click')"
            >
              <span
                class="hidden absolute bottom-1 left-0 text-white w-[6.875rem] h-[6.25rem] overflow-hidden md:block"
              >
                <span class="w-[6.875rem] h-[6.25rem] block relative">
                  <img
                    src="https://i.ibb.co.com/99P9hHTv/subscriber-btn-img.webp"
                    alt="subscriber-btn-img"
                    class="absolute bottom-0 left-0 opacity-100 [transition:all_0.5s_ease-in-out] transition-all duration-500 ease-in-out group-hover/button:animate-bouncedown"
                  />
                  <img
                    src="https://i.ibb.co.com/276TkNhV/subscriber-btn-hover-img.webp"
                    alt="subscriber-btn-hover-img"
                    class="absolute bottom-0 left-0 opacity-0 w-[3.75rem] [transition:all_0.5s_ease-in-out] transition-all duration-500 ease-in-out group-hover/button:animate-bouncup"
                  />
                </span>
              </span>

              <!-- subscribe-hot-tag -->
              <div
                class="absolute bottom-12 left-[0.6875rem] text-black md:relative md:bottom-[unset] md:left-[unset]"
              >
                <span class="absolute left-[-0.75rem] z-[1] text-black">
                  <span
                    class="absolute top-1 w-[0.8125rem] h-3 shadow-[3px_0_4px_0_rgba(0,0,0,0.25)] z-[-3] text-black"
                  ></span>
                  <img
                    src="https://i.ibb.co.com/m5WBnbQ7/hot-offer.webp"
                    alt="hot-offer"
                    class="w-6 h-6 aspect-square"
                  />
                </span>

                <span
                  class="flex justify-center text-sm font-semibold text-black [background:linear-gradient(90deg,#F06_0%,#FF4A92_100%)] pl-3 pr-1.5 py-0.5 rounded backdrop-blur-[10px]"
                >29% off</span>
              </div>

              <!-- tier-price -->
              <span
                class="text-xs leading-6 font-medium whitespace-nowrap text-white md:text-sm"
              >Starting
                <span
                  class="text-lg leading-[2rem] font-medium text-white -mr-1 md:text-3xl md:leading-[2.375rem] md:-mr-2"
                >
                  $32
                </span>
                <span
                  class="text-xs leading-6 font-medium whitespace-nowrap text-white line-through md:text-sm"
                >45</span>
                /mo
              </span>
            </button>

            <!-- subscribe-button -->
            <div
              class="absolute right-0 flex flex-col justify-center items-center w-1/2 h-20 min-h-[4.5] pl-12 pr-6 py-4 md:right-4 md:min-w-[20rem] lg:right-0 lg:w-auto"
            >
              <div
                class="absolute flex flex-col justify-center items-center gap-2.5 w-full h-20 min-h-[4.5] md:min-w-[20rem] md:w-[-webkit-fill-available] lg:w-auto"
              >
                <!-- shape-wrapper -->
                <div
                  class="absolute h-20 left-[-1.65625rem] sm:left-[-1.625rem]"
                >
                  <img
                    src="https://i.ibb.co.com/DHJWhq4f/subscriber-button-shape.webp"
                    alt="subscriber-button-shape"
                    class="w-[1.75rem] h-full"
                  />
                </div>

                <button
                  class="flex justify-center items-center self-stretch px-3 py-[0.313rem] bg-[#FB0464] flex-grow md:rounded-[0_16px_16px_0] lg:max-w-[18.9375rem]"
                  @click="$emit('subscribe-click')"
                >
                  <span
                    class="text-lg font-medium text-white uppercase whitespace-nowrap md:text-2xl lg:text-xl lg:leading-normal xl:text-2xl"
                  >SUBSCRIBE</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- navigation Section for mobile -->
        <div
          class="absolute bottom-0 flex w-full [background:linear-gradient(180deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.50)_25%,rgba(0,0,0,0.01)_100%)] backdrop-blur-[40px] sm:[background:unset] sm:backdrop-blur-0 md:hidden"
        >
          <ul
            class="flex flex-row items-center w-full overflow-x-auto whitespace-nowrap flex-wrap"
          >
            <!-- menu-item -->
            <li
              class="relative flex justify-center gap-1 opacity-70 [border-bottom:1.5px_solid_transparent] group active [&.active]:[border-bottom:1.5px_solid_#07f468] [&.active]:opacity-100 max-[580px]:[&.active]:[border-bottom:1.5px_solid_#E7E5E4] flex-grow"
            >
              <div
                class="flex justify-center flex-grow max-[325px]:px-2 max-[325px]:py-0 px-4 py-[0.639rem] sm:px-4 sm:py-0"
              >
                <span class="block pt-2 pb-2">
                  <span
                    class="block text-sm font-medium text-[#e7e5e4] max-[580px]:group-hover:text-[#e7e5e4] max-[580px]:group-[.active]:text-[#e7e5e4] group-hover:text-[#07f468] group-[.active]:text-[#07f468]"
                  >Media</span>
                </span>

                <div
                  class="text-[0.625rem] leading-normal font-medium text-[#07f468]"
                >
                  18
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- profile options (right side) - for desktop -->
      <div class="hidden w-1/2 xl:block">
        <!-- Add slider controls or other content here if needed -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import ProfileBannerHeader from './ProfileBannerHeader.vue'

const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({
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
      bio: ''
    })
  },
  backgroundImages: {
    type: Array,
    default: () => [
      'https://i.ibb.co.com/F4cf3W53/profile-slidein-bg.webp',
      'https://i.ibb.co.com/bjGQxr5S/sample-bg-image.webp',
      'https://i.ibb.co.com/jPw7ChWb/auth-bg.webp'
    ]
  }
})

defineEmits([
  'cart-click',
  'notification-click',
  'language-click',
  'avatar-click',
  'tip-click',
  'like-click',
  'share-click',
  'more-click',
  'read-more-click',
  'subscribe-click'
])

const gallerySlider = ref(null)

const gallerySlideOptions = {
  type: 'loop',
  perPage: 3,
  perMove: 1,
  gap: '0.5rem',
  pagination: false,
  arrows: false,
  focus: 'center',
  trimSpace: false,
  breakpoints: {
    580: {
      perPage: 1,
      gap: '0'
    }
  }
}
</script>
