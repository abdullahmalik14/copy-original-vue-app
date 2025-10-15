<template>
  <div
    class="bg-slate-900/60 border-2 w-[270px] sm:w-[300px]  border-[#736f70] flex items-center justify-between gap-4 px-4 py-2"
  >
    <!-- Left: success icon & texts -->
    <div class="flex items-center gap-3">
      <!-- green circular icon -->
      <div
        class="flex items-center justify-center w-9 h-9 rounded-full bg-[#0aa937] ring-1 ring-[#0aa937]"
      >
        <!-- check icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-green-600"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.707a1 1 0 011.414-1.414L8 11.586l6.293-6.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        
      </div>

        <!-- Title -->
        <div class="text-sm text-white">
          Success!
      </div>
    </div>

    <!-- Right -->
        <div >
       <div class="flex flex-col items-end">
          <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 34"
        class="w-6 h-6"
        fill="currentColor"
      >
        <path d="M8.16 23.43a11.32 11.32 0 0 1-.72-3.27 11.23 11.23 0 0 1-.06-1.11h15.24a3.94 3.94 0 0 0 .1-.87 3.89 3.89 0 0 0-6.42-2.94 6.37 6.37 0 0 0-5.73-3.58 6.45 6.45 0 0 0-6.45 6.44v.09a5.81 5.81 0 0 0 .18 13.22h20.31a4.66 4.66 0 0 0 .16-9.32 7 7 0 0 0-.1-1.16h-16.5z" fill="#f38020"/>
        <path d="M22.67 15.39a3.85 3.85 0 0 0-2.38.82 6.45 6.45 0 0 0-12.5 2v.09a5.81 5.81 0 0 0 .18 13.22h20.31a4.66 4.66 0 0 0 .16-9.32 7 7 0 0 0-.1-1.16h-1.85a3.89 3.89 0 0 0-3.82-4.65z" fill="#faae40"/>
      </svg>
       </div>
          <div class="text-[8px] text-white font-[500] text-right">CLOUDFLARE</div>
          <div class="text-[10px] text-gray-300 text-right ">
            <span class="underline cursor-pointer">Privacy</span>
            <span> •</span> 
            <span class="underline cursor-pointer">Terms</span>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CloudflareSuccess",
};
</script>
