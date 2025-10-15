<template>
  <div
    class="bg-container w-full flex justify-between items-center h-[100vh] bg-[url('https://i.ibb.co.com/jPw7ChWb/auth-bg.webp')] bg-cover bg-no-repeat bg-lightgray xl:bg-center lg:bg-center md:bg-left sm:bg-[position:-100px] max-[479px]:bg-[position:-290px]"
  >
    <!-- Left column -->
    <div></div>

    <!-- Right column -->
    <div
      class="right-column relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full h-full flex flex-col items-start gap-4 px-6 py-12 bg-black/30 lg:w-1/2 after:content-[''] after:fixed after:right-0 after:top-0 after:w-1/2 after:h-full backdrop-blur-[50px] after:z-[1] lg:after:w-1/2 max-lg:after:w-full"
    >
      <!-- header-container -->
      <div class="relative z-20 flex justify-between items-start w-full">
        <!-- translation icon & dropdown -->
        <div class="flex flex-col w-1/2 gap-8 sm:gap-6">
          <img
            class="w-8 h-8 opacity-70"
            src="https://i.ibb.co.com/mF9x2JG0/svgviewer-png-output-85.webp"
            alt="globe"
          />
        </div>

        <a href="">
          <img
            src="https://i.ibb.co/jZQNHC2t/svgviewer-png-output-4.webp"
            class="w-16 h-16"
          />
        </a>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup></script>
