<template>
  <div
    class="max-w-[24rem] min-h-[39.6875rem] rounded-[0.125rem] relative"
    :class="[backgroundImageClass, borderClass, backgroundClass]"
    :style="backgroundStyle"
  >
    <div
      class="min-h-[39.6875rem] rounded-[0.125rem] bg-black/40 backdrop-blur-[5px] flex flex-col gap-4 pt-8 px-6 pb-[4.25rem] relative"
    >
      <!-- Featured Badge -->
      <FeaturedBadge
        v-if="showFeatured"
        :text="featuredText"
        :gradient-class="featuredBadgeClass"
      />

      <!-- Title with Tooltip -->
      <span class="flex items-center">
        <div
          class="w-full z-[5] relative overflow-hidden hover:overflow-visible hover:cursor-pointer group"
        >
          <h2
            class="overflow-hidden line-clamp-2 text-[1.875rem] text-[#efeff3] font-semibold leading-[2.375rem]"
          >
            {{ title }}
          </h2>
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[17.5rem] max-w-[17.5rem] p-2 px-3 text-xs font-medium leading-[1.125rem] bg-[rgba(16,24,40,0.7)] text-white rounded-lg shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1),0_2px_4px_-2px_rgba(16,24,40,0.06)] backdrop-blur-[25px] opacity-0 invisible pointer-events-none transition-all duration-150 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
          >
            {{ title }}
          </div>
        </div>
      </span>

      <!-- Stats Row -->
      <div class="flex items-center gap-[0.625rem]">
        <!-- Videos count -->
        <div class="flex items-center gap-[0.063rem]">
          <span class="tracking-[0.005rem] text-base text-white block">
            {{ stats.videos }}
          </span>
         
        </div>

        <div class="h-[0.188rem] w-[0.188rem] bg-white block rounded-full"></div>

        <!-- Photos count -->
        <div class="flex items-center gap-[0.063rem]">
          <span class="tracking-[0.005rem] text-base text-white block">
            {{ stats.photos }}
          </span>
         
        </div>

        <div class="h-[0.188rem] w-[0.188rem] bg-white block rounded-full"></div>

        <!-- Other count -->
        <div class="flex items-center gap-[0.063rem]">
          <span class="tracking-[0.005rem] text-base text-white block">
            {{ stats.other }}
          </span>
        
        </div>
      </div>

      <!-- Price -->
      <div class="flex items-end gap-1">
        <span class="relative">
          <span class="text-xl text-white font-semibold leading-[1.875rem]">
            {{ currency }}
          </span>
          <span
            class="text-white tracking-[-0.06rem] leading-[3.75rem] uppercase font-semibold text-[3rem]"
          >
            {{ price }}
          </span>
        </span>
      </div>

      <!-- Description -->
      <div class="flex flex-col pt-1 gap-1">
        <div class="flex flex-col">
          <div class="flex flex-col gap-1">
            <span
              class="line-clamp-7 text-sm text-[#edeff3] font-normal leading-[1.42] [text-shadow:0_4px_8px_rgba(16,24,40,0.1),0_2px_4px_rgba(16,24,40,0.06)]"
            >
              {{ description }}
            </span>
          </div>
        </div>
      </div>

      <!-- Benefits list -->
      <div class="flex flex-col gap-2">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="flex items-center gap-[0.938rem]"
        >
          
          <span class="text-white font-semibold text-base leading-6">
            <span
              class="text-base font-semibold"
              :style="{ color: benefit.highlightColor || accentColor }"
            >
              {{ benefit.highlight }}
            </span>
            {{ benefit.text }}
          </span>
        </div>
      </div>

      <!-- Subscribe/Action Button -->

      <button
        v-if="buttonVariant === 'subscribe'"
        :class="`absolute h-14 gap-2.5 px-2 bottom-0 right-0 flex justify-center items-center group cursor-pointer hover:!bg-[${hoverAccentColor}]`"
        :style="{ backgroundColor: buttonColor }"
        :disabled="buttonDisabled"
        @click="handleSubscribe"
      >
        <!-- Text and icon container -->
        <div
          class="relative z-10 py-1 leading-8 text-2xl text-black font-bold flex flex-row-reverse"
          :class="buttonTextClass"
        >
          
          <span class="leading-8 break-words text-2xl text-black font-semibold">
            {{ buttonText }}
          </span>
        </div>

        <!-- Shadow element -->
        <div class="absolute w-full h-full top-0 right-0 z-[1] shadow-[4px_4px_0_0_#000]"></div>

        <!-- Skewed element -->
        <div
          class="absolute w-8 h-full top-0 left-[-1rem] z-[-1] shadow-[4px_4px_0_0_#000] -skew-x-[20deg] translate-x-[3px]"
          :style="{ backgroundColor: buttonColor }"
        ></div>
      </button>

      <!-- Disabled Button -->
      <button
        v-else
        class="h-14 gap-2.5 px-2 absolute bottom-0 right-0 flex justify-center items-center group cursor-pointer"
        :class="disabledButtonClass"
        disabled
      >
        <div class="relative z-10 py-1 leading-8 text-2xl font-bold flex flex-row-reverse">
          <span class="leading-8 break-words text-2xl text-white font-semibold">
            {{ buttonText }}
          </span>
        </div>
        <div class="absolute w-full h-full top-0 right-0 z-[1] shadow-[4px_4px_0_0_#000]"></div>
        <div
          class="absolute w-8 h-full top-0 left-[-1rem] z-[-1] shadow-[4px_4px_0_0_#000] -skew-x-[20deg] translate-x-[3px]"
          :style="{ backgroundColor: buttonColor }"
        ></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import FeaturedBadge from "./FeaturedBadge.vue";

// Props with defaults
const props = defineProps({
  title: { type: String, required: true },
  price: { type: [String, Number], required: true },
  currency: { type: String, default: "USD$" },
  description: { type: String, default: "" },
  stats: {
    type: Object,
    default: () => ({ videos: 0, photos: 0, other: 0 }),
  },
  benefits: {
    type: Array,
    default: () => [],
  },

  variant: { type: String, default: "default" },
  borderColor: { type: String, default: "#07F468" },
  accentColor: { type: String, default: "#07F468" },
  backgroundColor: { type: String, default: "#064e3b" },
  backgroundImage: { type: String, default: "" },
  hoverAccentColor: { type: String, default: "#101828" },
  buttonColor: { type: String, default: "#ffffff" },

  isFeatured: { type: Boolean, default: false },
  featuredText: { type: String, default: "FEATURED" },

  buttonText: { type: String, default: "SUBSCRIBE" },
  buttonDisabled: { type: Boolean, default: false },
  buttonVariant: { type: String, default: "subscribe" },
});


// Emits
const emit = defineEmits(["subscribe"]);
// Computed styles
const showFeatured = computed(() => props.isFeatured || props.variant === "featured");

const backgroundImageClass = computed(() => {
  return showFeatured.value || !!props.backgroundImage ? "bg-cover bg-center bg-no-repeat" : "";
});

const borderClass = computed(() => {
  if (props.variant === "featured" || props.isFeatured) {
    return "border-[1.5px] border-[#4d20ff]";
  }
  return `border-[1.5px]`;
});

const backgroundClass = computed(() => {
  // Do not apply gradient background class when:
  // - featured/isFeatured
  // - explicit backgroundColor is provided
  if (props.variant === "featured" || props.isFeatured || props.backgroundColor) {
    return "";
  }
  // Otherwise use provided gradient or default gradient
  return (
    props.backgroundGradient ||
    "bg-[linear-gradient(0deg,rgba(7,244,104,0.5),rgba(7,244,104,0.5)),linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),radial-gradient(79%_79%_at_50%_50%,rgba(0,0,0,0)_17.51%,rgba(0,0,0,0.7)_100%)]"
  );
});

const backgroundStyle = computed(() => {
  const styles = {};

  // Priority 1: background image
  if (props.backgroundImage) {
    styles.backgroundImage = `url('${props.backgroundImage}')`;
  } else if (props.backgroundColor) {
    // Priority 2: solid background color
    styles.backgroundColor = props.backgroundColor;
  }

  if (props.borderColor && props.variant !== "featured" && !props.isFeatured) {
    styles.borderColor = props.borderColor;
  }

  return styles;
});

const featuredBadgeClass = computed(() => {
  if (props.variant === "featured" || props.isFeatured) {
    return "from-[#4d20ff] to-[#7e5eff]";
  }
  return "from-[#07F468] to-[#07F468]";
});

const buttonClass = computed(() => {
  return `bg-[${props.accentColor}]`;
});

const buttonTextClass = computed(() => {
  return `group-hover:[&>span]:text-[${props.accentColor}]`;
});

const buttonIconClass = computed(() => {
  return `group-hover:[&>path]:stroke-[${props.accentColor}]`;
});

const buttonSkewedClass = computed(() => {
  return `bg-[${props.accentColor}]`;
});

const disabledButtonClass = computed(() => {
  if (props.variant === "featured" || props.isFeatured) {
    return "bg-[#4d20ff]";
  }
  return "bg-[#6b7280]";
});

const disabledButtonSkewedClass = computed(() => {
  if (props.variant === "featured") {
    return "bg-[#4d20ff]";
  }
  return "bg-[#4d20ff]";
});

// Methods
const handleSubscribe = () => {
  if (!props.buttonDisabled) {
    emit("subscribe");
    if (props.onSubscribe) {
      props.onSubscribe();
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-7 {
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
