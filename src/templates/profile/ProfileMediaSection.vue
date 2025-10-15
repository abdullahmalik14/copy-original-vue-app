<template>
  <!-- media-section -->
  <section class="mb-8">
    <!-- title-section -->
    <div
      class="flex justify-between items-center px-2 md:px-4 xl:px-12"
    >
      <!-- title-section__left -->
      <div class="flex gap-3.5 mb-4 xl:mb-6">
        <h2
          class="text-xl leading-normal font-medium text-[#e9e5d3] pl-4 border-l border-[#e9e5d3]"
        >
          {{ sectionTitle }}
        </h2>

        <div
          v-if="totalCount"
          class="flex items-center gap-1 cursor-pointer opacity-100"
          @click="$emit('view-all-click')"
        >
          <span class="text-sm font-medium text-[#07F468]">View All</span>
          <span class="text-sm leading-normal text-[#07F468] self-start">{{ totalCount }}</span>
        </div>
      </div>

      <!-- title-section__right -->
      <!-- Can add slider arrows here if needed -->
    </div>

    <!-- Media Grid -->
    <div class="mx-2 overflow-visible md:mx-4 xl:mx-12">
      <ul
        data-media-list-container
        class="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4"
      >
        <ProfileMediaCard
          v-for="media in mediaItems"
          :key="media.id"
          :media="media"
          @media-click="$emit('media-click', media)"
        />
      </ul>
    </div>

    <!-- arrow-section (show more) -->
    <div v-if="showMoreButton" class="flex justify-center cursor-pointer" @click="$emit('show-more-click')">
      <div class="flex justify-center pt-5">
        <span class="flex gap-1 w-8 h-8 whitespace-nowrap text-base text-white">
          <img
            src="https://i.ibb.co.com/mKdm9ZK/chevron-down.webp"
            alt="chevron-down"
            class="w-auto h-8"
          />
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProfileMediaCard from './ProfileMediaCard.vue'

defineProps({
  sectionTitle: {
    type: String,
    required: true
  },
  mediaItems: {
    type: Array,
    default: () => []
  },
  totalCount: {
    type: Number,
    default: 0
  },
  showMoreButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view-all-click', 'media-click', 'show-more-click'])
</script>
