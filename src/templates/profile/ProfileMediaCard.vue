<template>
  <!-- media-card -->
  <li
    ref="mediaCard"
    data-media-card
    class="relative shadow-[0_0_10px_-34px_rgba(0,0,0,0.10)] aspect-[2/1.1522] cursor-pointer group hover:overflow-visible"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <a
      href="#"
      class="block absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)_perspective(0)_translateZ(0)] overflow-visible w-full h-full transition-all duration-150 ease-in-out shadow-[0_0_10px_-34px_rgba(0,0,0,0.10)] bg-no-repeat bg-center bg-cover group-hover:duration-150 group-hover:z-[2] group-hover:block group-hover:w-full group-hover:h-full group-hover:min-w-full xl:group-hover:w-[26.25rem] xl:group-hover:h-[21.875rem] xl:group-hover:min-w-[unset] xl:group-hover:rounded-[0.313rem] xl:group-hover:shadow-[0_0_0.625rem_-2.125rem_rgba(0,0,0,0.10)]"
      @click.prevent="$emit('media-click', media)"
    >
      <!-- thumb-container -->
      <div
        class="block relative w-full h-full overflow-hidden bg-no-repeat bg-center bg-cover z-[10010] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:rounded-none after:z-[10010] after:opacity-100 after:content-[''] after:bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_-24.72%,rgba(0,0,0,0)_41.92%,rgba(0,0,0,0.6)_108.57%)]"
      >
        <div
          class="w-full h-[100.1%] flex justify-center items-center absolute left-0 top-0"
        >
          <img
            class="w-full h-full object-cover visible"
            :src="media.thumbnail"
            :alt="media.title"
          />
        </div>
      </div>

      <!-- media-type -->
      <span
        class="inline-flex justify-center items-center gap-[0.188rem] absolute top-1 left-1 px-1 py-0.5 rounded bg-[rgba(24,34,48,0.50)] dark:bg-[rgba(31,44,63,0.50)] drop-shadow-[0_0_0.313rem_rgba(0,0,0,1)] z-[99999]"
      >
        <img
          :src="media.type === 'video' ? 'https://i.ibb.co.com/wN978Hjm/video.webp' : 'https://i.ibb.co.com/bHdkdBh/image.webp'"
          :alt="media.type"
          class="w-4 h-4"
        />
        <span
          v-if="media.duration"
          class="text-xs leading-normal tracking-[0.008rem] text-white dark:text-[#e8e6e3]"
        >{{ media.duration }}</span>
      </span>

      <!-- duration, likes, views -->
      <div
        class="flex justify-center items-center gap-2 absolute top-1 right-0 px-2.5 drop-shadow-[0_0_0.313rem_rgba(0,0,0,1)]- z-[99999]"
      >
        <!-- posted time ago -->
        <div class="flex justify-center items-center gap-1">
          <span
            class="text-xs leading-none whitespace-nowrap text-white tracking-[0.01875rem] dark:text-[#e8e6e3]"
          >{{ media.postedAgo }}</span>
        </div>

        <!-- likes, views -->
        <div
          class="flex items-center gap-[0.813rem] px-1 opacity-70"
        >
          <span
            class="flex justify-center items-center gap-[0.188rem] drop-shadow-[0_0_0.313rem_rgba(0,0,0,1)]"
          >
            <img
              src="https://i.ibb.co.com/7tbwzFsQ/heart.webp"
              alt="heart"
              class="w-[0.75rem] [filter:brightness(100)_saturate(0)]"
            />
            <span
              class="text-xs font-medium text-white tracking-[0.008rem] dark:text-[#e8e6e3]"
            >{{ media.likes }}</span>
          </span>
          <span
            class="flex justify-center items-center gap-[0.1875rem] drop-shadow-[0_0_.313rem_#000]"
          >
            <img
              src="https://i.ibb.co.com/Kjv16vLZ/eye.webp"
              alt="eye"
              class="w-[0.75rem] [filter:brightness(100)_saturate(0)]"
            />
            <span
              class="text-xs font-medium text-white tracking-[0.0075rem] dark:text-[#e8e6e3]"
            >{{ media.views }}</span>
          </span>
        </div>
      </div>

      <!-- button -->
      <div
        v-if="media.isPaid"
        class="absolute bottom-0 left-0 transition-all duration-150 ease-in-out z-[10100] group-hover:flex xl:group-hover:hidden"
      >
        <span
          class="flex justify-center items-center gap-1 px-2.5 py-1 bg-[#FB0464] transition-all duration-150 ease-in-out opacity-100"
        >
          <span
            class="text-xs leading-[0.875rem] text-white dark:text-[#e8e6e3]"
          >{{ media.buttonText || 'Subscribe or Buy' }}</span>
        </span>
      </div>

      <!-- video -->
      <video
        v-if="media.type === 'video' && media.videoUrl"
        ref="videoElement"
        class="absolute top-0 left-0 w-full h-full backdrop-blur-[10px] object-cover z-[10010] hidden opacity-0 transition-all duration-150 ease-in-out group-hover:flex group-hover:opacity-100 group-hover:bg-black"
        :src="media.videoUrl"
        muted
        loop
      ></video>

      <!-- hover-container -->
      <div
        class="hidden flex-col justify-end gap-3.5 w-full h-full p-2 absolute top-0 left-0 overflow-hidden transition-all duration-150 ease-in-out z-[10100] opacity-0 [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px] group-hover:opacity-100 xl:group-hover:flex"
      >
        <div class="flex justify-between items-center">
          <div class="flex">
            <span
              v-if="media.isPaid"
              class="flex justify-center items-center gap-1 px-2.5 py-1 bg-[#FB0464] transition-all duration-150 ease-in-out opacity-100"
            >
              <span
                class="text-xs leading-[0.875rem] text-white dark:text-[#e8e6e3]"
              >{{ media.buttonText || 'Subscribe or Buy' }}</span>
            </span>
          </div>
        </div>

        <span
          class="text-sm text-white line-clamp-2 [text-shadow:0_0_4px_rgba(0,0,0,0.5)]"
        >{{ media.title }}</span>
      </div>
    </a>
  </li>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  media: {
    type: Object,
    required: true,
    // media: {
    //   id: string,
    //   thumbnail: string,
    //   type: 'video' | 'image',
    //   duration: string, // e.g., '14:09'
    //   postedAgo: string, // e.g., '2d'
    //   likes: number,
    //   views: number,
    //   isPaid: boolean,
    //   buttonText: string,
    //   title: string,
    //   videoUrl: string (optional)
    // }
  }
})

defineEmits(['media-click'])

const mediaCard = ref(null)
const videoElement = ref(null)

const handleMouseEnter = () => {
  if (videoElement.value && props.media.type === 'video') {
    videoElement.value.play().catch(e => {
      console.log('Video play failed:', e)
    })
  }
}

const handleMouseLeave = () => {
  if (videoElement.value && props.media.type === 'video') {
    videoElement.value.pause()
    videoElement.value.currentTime = 0
  }
}
</script>
