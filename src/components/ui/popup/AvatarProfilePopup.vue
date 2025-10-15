<template>
  <PopupHandler
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    :config="config"
  >
    <div
      class="h-screen flex flex-col items-start overflow-hidden shadow-[4px_0_10px_0_rgba(0,0,0,0.08)] bg-panel-light/70 backdrop-blur-[25px] md:w-[30rem] md:border-l md:border-panel-light-border"
    >
      <div
        class="h-screen w-full overflow-y-auto scroll-smooth flex flex-col items-start self-stretch [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div class="relative flex flex-col items-start self-stretch">
          <!-- Back button -->
          <a
            @click="emit('update:modelValue', false)"
            class="absolute top-2 right-2 z-[5] flex items-center justify-center w-8 h-8 transition-all duration-200 ease-in-out rounded-md hover:bg-panel-light-buttonHover md:p-1.5 md:w-auto md:h-auto"
          >
            <img
              class="block w-6 h-6 pointer-events-none md:hidden"
              src="https://i.ibb.co/N2VqD6yD/svgviewer-png-output-60.webp"
              alt="back-button"
            />
            <img
              class="hidden w-5 h-5 pointer-events-none md:block"
              src="https://i.ibb.co/KxKfkV17/svgviewer-png-output-59.webp"
              alt="back-button"
            />
          </a>

          <!-- Profile cover section -->
          <div
            class="relative z-[4] flex flex-col items-start self-stretch gap-4 bg-cover bg-no-repeat bg-center"
            style="
              background-image: url('https://i.ibb.co.com/F4cf3W53/profile-slidein-bg.webp');
            "
          >
            <div
              class="flex flex-col items-start self-stretch gap-4 p-4 bg-cover-overlay"
            >
              <!-- Profile info row -->
              <div class="flex items-start self-stretch gap-4 pr-6">
                <!-- Avatar with status dot -->
                <a href="#" class="relative flex w-14 h-14 rounded-[1.875rem] outline-none">
                  <img
                    src="https://i.ibb.co/jkjtwC9C/svgviewer-png-output-17.webp"
                    alt="avatar"
                    class="object-cover w-14 h-14 pointer-events-none rounded-[1.875rem] bg-avatar-bg-light"
                  />
                  <span
                    class="absolute bottom-0 right-0 flex w-3.5 h-3.5 rounded-[0.438rem] bg-status-dot-light"
                    >&nbsp;</span
                  >
                </a>

                <!-- Name and status -->
                <div class="flex-1 flex flex-col items-start gap-1">
                  <!-- Name and verified badge -->
                  <div class="flex flex-wrap items-center gap-2 self-stretch">
                    <div class="flex items-center gap-2">
                      <span class="text-lg font-semibold leading-7 text-white"
                        >lindenMay</span
                      >
                      <img
                        src="https://i.ibb.co/HfYg6YgT/svgviewer-png-output-61.webp"
                        alt="verified-icon"
                        class="w-4 h-4"
                      />
                    </div>
                    <span
                      class="text-xs font-normal leading-[1.125rem] text-handle-light"
                      >@linden</span
                    >
                  </div>

                  <!-- Status dropdown -->
                  <div class="flex">
                    <div
                      class="overflow-hidden rounded-[0.938rem] z-[5] relative inline-flex"
                    >
                      <a
                        href="#"
                        class="inline-flex items-center gap-2 px-2 py-1 rounded-[0.938rem] shadow-[0_0_0_1px] shadow-status-trigger-light bg-status-trigger-light"
                      >
                        <span
                          class="text-sm font-medium uppercase leading-5 text-black pointer-events-none"
                          >Away</span
                        >
                        <img
                          src="https://i.ibb.co/hFStx6J8/svgviewer-png-output-62.webp"
                          alt="arrow-down"
                          class="w-3 h-3 pointer-events-none"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status message section -->
              <div class="flex flex-col items-start self-stretch gap-4">
                <!-- Repost toggle -->
                <div class="flex items-center gap-2">
                  <label class="relative inline-block w-8 h-4 cursor-pointer">
                    <input
                      type="checkbox"
                      class="peer h-0 w-0 opacity-0"
                      id="dash-toggle-switch-11"
                      checked=""
                    />
                    <span
                      class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                    ></span>
                    <span
                      class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                    ></span>
                  </label>
                  <div class="flex items-center gap-1">
                    <span class="text-xs leading-[1.125rem] text-white"
                      >Repost status message to X</span
                    >
                    <img
                      src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                      alt="info"
                      class="w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>

                <!-- Editable status -->
                <div
                  class="relative flex items-center self-stretch gap-2 px-2 py-1 rounded-[0.625rem] bg-white/30 hover:bg-white/50 transition-all duration-150 ease-in-out"
                >
                  <input
                    type="text"
                    class="flex-1 text-sm font-medium leading-6 bg-transparent outline-none border-none placeholder-black"
                    placeholder="Write status here..."
                    value="Second update message....."
                  />
                  <a
                    href="#"
                    class="w-4 h-4 opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"
                  >
                    <img
                      src="https://i.ibb.co/YBg4y12W/svgviewer-png-output-64.webp"
                      alt="edit"
                      class="w-full h-full filter brightness-0 saturate-100 invert-0 sepia-4 saturate-17 hue-rotate-99 brightness-98 contrast-105 pointer-events-none"
                    />
                  </a>
                </div>
              </div>

              <!-- Button controls -->
              <div class="flex items-center self-stretch">
                <!-- Left buttons wrapper -->
                <div class="flex flex-1 items-center self-stretch">
                  <!-- Dot button -->
                  <button
                    class="outline-none border-none bg-black shadow-[4px_4px_0_0] shadow-accent-pink-light hover:bg-accent-green-light hover:shadow-black transition-all duration-150 ease-in-out relative flex justify-center items-center w-8 h-8 md:w-10 md:h-10"
                  >
                    <img
                      src="https://i.ibb.co/tMGmRCVx/svgviewer-png-output-65.webp"
                      alt="settings"
                      class="w-4 h-4 md:w-6 md:h-6 transition-all duration-150 ease-in-out pointer-events-none"
                    />
                  </button>

                  <!-- View profile button with group hover -->
                  <button
                    class="group flex flex-1 relative justify-center self-stretch items-center"
                  >
                    <!-- Main part -->
                    <div
                      class="flex-1 flex justify-center self-stretch items-center bg-black shadow-[4px_4px_0_0] shadow-accent-pink-light group-hover:bg-accent-green-light group-hover:shadow-black transition-all duration-150 ease-in-out h-8 md:h-10 px-2 py-1 gap-2.5"
                    >
                      <span
                        class="transition-all duration-150 ease-in-out leading-7 text-base md:text-lg font-medium text-text group-hover:text-black"
                      >
                        View profile
                      </span>
                    </div>

                    <!-- Skewed part with explicit transform -->
                    <div
                      class="w-4 h-8 md:h-10 bg-black shadow-[4px_4px_0_0] shadow-accent-pink-light group-hover:bg-accent-green-light group-hover:shadow-black transition-all duration-150 ease-in-out flex justify-center items-center px-2 py-1 [transform:skew(-20deg)_translateX(-0.438rem)]"
                    ></div>
                  </button>
                </div>

                <!-- Right buttons wrapper -->
                <div class="flex-1 flex items-center self-stretch">
                  <!-- Go Live button with group -->
                  <button
                    class="group flex flex-1 relative justify-center self-stretch items-center cursor-default h-8 md:h-10"
                  >
                    <!-- Skewed part -->
                    <div
                      class="w-4 h-8 md:h-10 filter grayscale bg-disabled-light-bg shadow-[4px_4px_0_0] shadow-disabled-light-shadow transition-all duration-150 ease-in-out flex justify-center items-center px-2 py-1 [transform:skew(-20deg)_translateX(0.563rem)]"
                    ></div>

                    <!-- Main part -->
                    <div
                      class="flex-1 flex justify-center items-center self-stretch filter grayscale bg-disabled-light-bg shadow-[4px_4px_0_0] shadow-disabled-light-shadow transition-all duration-150 ease-in-out h-8 md:h-10 px-2 py-1 gap-2.5"
                    >
                      <span
                        class="transition-all duration-150 ease-in-out leading-6 text-base md:leading-7 md:text-lg font-medium text-disabled-light-text"
                      >
                        Go Live
                      </span>
                      <img
                        src="https://i.ibb.co/NgZgkRR9/svgviewer-png-output-66.webp"
                        alt="go-live"
                        class="h-5 w-5 md:h-6 md:w-6 transition-all duration-150 ease-in-out [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(10%)_saturate(5098%)_hue-rotate(296deg)_brightness(98%)_contrast(101%)]"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick settings panel -->
          <div
            class="relative z-[3] flex flex-col items-start self-stretch bg-background-light"
          >
            <!-- Control block -->
            <div
              class="pointer-events-none relative z-[3] flex flex-col items-start self-stretch gap-4 p-4 opacity-50 border-b border-[#d0d5dd]"
            >
              <!-- Block header -->
              <div
                class="relative z-[3] flex items-center justify-between self-stretch"
              >
                <div class="flex items-center gap-1">
                  <span
                    class="flex items-center justify-center w-[2.625rem] h-[2.625rem] mr-1"
                  >
                    <img
                      src="https://i.ibb.co/ycRzCzqS/svgviewer-png-output-67.webp"
                      alt="video-call"
                      class="w-[2.625rem] h-[2.625rem]"
                    />
                  </span>
                  <span
                    class="text-sm font-medium uppercase leading-5 text-[#344054]"
                  >
                    Video call status
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>

                <!-- Block status -->
                <div class="flex">
                  <div
                    class="overflow-hidden rounded-[0.938rem] z-[5] relative inline-flex"
                  >
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 px-2 py-1 rounded-[0.938rem]"
                    >
                      <span
                        class="text-sm font-medium uppercase leading-5 text-black pointer-events-none"
                      >
                        Offline
                      </span>
                      <img
                        src="https://i.ibb.co/hFStx6J8/svgviewer-png-output-62.webp"
                        alt="arrow-down"
                        class="w-3 h-3 pointer-events-none"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <!-- Status text input -->
              <div
                class="relative flex items-center self-stretch gap-2 px-2 py-1 rounded-[0.625rem] bg-background-light-input hover:bg-background-light-inputHover transition-all duration-150 ease-in-out"
              >
                <input
                  type="text"
                  class="flex-1 text-xs font-medium leading-6 bg-transparent outline-none border-none text-[#344054] placeholder:text-[#344054]"
                  placeholder="Write status here..."
                  value="I am all dressed up ready to eat some chicken 💋"
                />
                <a
                  href="#"
                  class="w-4 h-4 opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"
                >
                  <img
                    src="https://i.ibb.co/YBg4y12W/svgviewer-png-output-64.webp"
                    alt="edit"
                    class="w-full h-full [filter:brightness(0)_saturate(100%)_invert(0)_sepia(4%)_saturate(17%)_hue-rotate(99deg)_brightness(98%)_contrast(105%)] pointer-events-none"
                  />
                </a>
              </div>

              <!-- Repost toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-1"
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Repost status message to X
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <!-- Control block -->
            <div
              class="pointer-events-none relative z-[3] flex flex-col items-start self-stretch gap-4 p-4 opacity-50 border-b border-[#d0d5dd]"
            >
              <!-- Block header -->
              <div
                class="relative z-[3] flex items-center justify-between self-stretch"
              >
                <div class="flex items-center gap-1">
                  <span
                    class="flex items-center justify-center w-[2.625rem] h-[2.625rem] mr-1"
                  >
                    <img
                      src="https://i.ibb.co/qYbwXyPZ/svgviewer-png-output-68.webp"
                      alt="audio-call"
                      class="w-[2.625rem] h-[2.625rem]"
                    />
                  </span>
                  <span
                    class="text-sm font-medium uppercase leading-5 text-[#344054]"
                  >
                    Audio call status
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>

                <!-- Block status -->
                <div class="flex">
                  <div
                    class="overflow-hidden rounded-[0.938rem] z-[5] relative inline-flex"
                  >
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 px-2 py-1 rounded-[0.938rem]"
                    >
                      <span
                        class="text-sm font-medium uppercase leading-5 text-black pointer-events-none"
                      >
                        Offline
                      </span>
                      <img
                        src="https://i.ibb.co/hFStx6J8/svgviewer-png-output-62.webp"
                        alt="arrow-down"
                        class="w-3 h-3 pointer-events-none"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <!-- Status text input -->
              <div
                class="relative flex items-center self-stretch gap-2 px-2 py-1 rounded-[0.625rem] bg-background-light-input hover:bg-background-light-inputHover transition-all duration-150 ease-in-out"
              >
                <input
                  type="text"
                  class="flex-1 text-xs font-medium leading-6 bg-transparent outline-none border-none text-[#344054] placeholder:text-[#344054]"
                  placeholder="Away Message..."
                />
                <a
                  href="#"
                  class="w-4 h-4 opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"
                >
                  <img
                    src="https://i.ibb.co/YBg4y12W/svgviewer-png-output-64.webp"
                    alt="edit"
                    class="w-full h-full [filter:brightness(0)_saturate(100%)_invert(0)_sepia(4%)_saturate(17%)_hue-rotate(99deg)_brightness(98%)_contrast(105%)] pointer-events-none"
                  />
                </a>
              </div>

              <!-- Repost toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-1"
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Repost status message to X
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <!-- Control block -->
            <div
              class="pointer-events-none relative z-[3] flex flex-col items-start self-stretch gap-4 p-4 opacity-50 border-b border-[#d0d5dd]"
            >
              <!-- Block header -->
              <div
                class="relative z-[3] flex items-center justify-between self-stretch"
              >
                <div class="flex items-center gap-1">
                  <span
                    class="flex items-center justify-center w-[2.625rem] h-[2.625rem] mr-1"
                  >
                    <img
                      src="https://i.ibb.co/5XV4sbJN/svgviewer-png-output-69.webp"
                      alt="chat"
                      class="w-[2.625rem] h-[2.625rem]"
                    />
                  </span>
                  <span
                    class="text-sm font-medium uppercase leading-5 text-[#344054]"
                  >
                    Chat status
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>

                <!-- Block status -->
                <div class="flex">
                  <div
                    class="overflow-hidden rounded-[0.938rem] z-[5] relative inline-flex"
                  >
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 px-2 py-1 rounded-[0.938rem]"
                    >
                      <span
                        class="text-sm font-medium uppercase leading-5 text-black pointer-events-none"
                      >
                        Offline
                      </span>
                      <img
                        src="https://i.ibb.co/hFStx6J8/svgviewer-png-output-62.webp"
                        alt="arrow-down"
                        class="w-3 h-3 pointer-events-none"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <!-- Status text input -->
              <div
                class="relative flex items-center self-stretch gap-2 px-2 py-1 rounded-[0.625rem] bg-background-light-input hover:bg-background-light-inputHover transition-all duration-150 ease-in-out"
              >
                <input
                  type="text"
                  class="flex-1 text-xs font-medium leading-6 bg-transparent outline-none border-none text-[#344054] placeholder:text-[#344054]"
                  placeholder="Write status here..."
                  value="Can't type with my greasy fingers, call me instead 💋"
                />
                <a
                  href="#"
                  class="w-4 h-4 opacity-50 hover:opacity-100 transition-all duration-150 ease-in-out"
                >
                  <img
                    src="https://i.ibb.co/YBg4y12W/svgviewer-png-output-64.webp"
                    alt="edit"
                    class="w-full h-full [filter:brightness(0)_saturate(100%)_invert(0)_sepia(4%)_saturate(17%)_hue-rotate(99deg)_brightness(98%)_contrast(105%)] pointer-events-none"
                  />
                </a>
              </div>

              <!-- Repost toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-1"
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Repost status message to X
                  </span>
                  <img
                    src="https://i.ibb.co/d03k8TJZ/svgviewer-png-output-63.webp"
                    alt="info"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Auto repost settings -->
          <div
            class="relative z-[2] flex flex-col items-start self-stretch gap-4 p-4"
          >
            <!-- Heading -->
            <div
              class="flex items-center gap-2 [filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
            >
              <span
                class="text-xs font-medium leading-[1.125rem] text-[#344054] pointer-events-none"
              >
                Advanced Repost Settings
              </span>
              <img
                src="https://i.ibb.co/wZmNXbZp/svgviewer-png-output-70.webp"
                alt="settings"
                class="w-4 h-4 pointer-events-none"
              />
            </div>

            <!-- Settings block -->
            <div class="flex flex-col items-start self-stretch gap-4">
              <p
                class="text-xs leading-[1.125rem] text-[text-darker-light] self-stretch"
              >
                Repost your status and custom message automatically when you:
              </p>

              <!-- toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-2"
                    checked
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Sign In
                  </span>
                </div>
              </div>

              <!-- toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-3"
                    checked
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Log Out
                  </span>
                </div>
              </div>

              <!-- toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-4"
                    checked
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Changes Statuses
                  </span>
                </div>
              </div>

              <!-- toggle -->
              <div class="flex items-center gap-2">
                <label class="relative inline-block w-8 h-4 cursor-pointer">
                  <input
                    type="checkbox"
                    class="peer h-0 w-0 opacity-0"
                    id="profile-slidein-switch-5"
                  />
                  <span
                    class="absolute inset-0 cursor-pointer rounded-[0.75rem] bg-[#98a2b380] transition-all duration-100 ease-in-out peer-checked:bg-[#0c111d]"
                  ></span>
                  <span
                    class="absolute left-[0.125rem] top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white shadow-[0_1px_3px_0_rgba(16,24,40,0.1),0_1px_2px_0_rgba(16,24,40,0.06)] transition-all duration-100 ease-in-out peer-checked:translate-x-[1rem]"
                  ></span>
                </label>
                <div class="flex items-center gap-1">
                  <span
                    class="text-xs leading-[1.125rem] text-[#667085]"
                  >
                    Change Custom Messages
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PopupHandler>
</template>

<script setup>
import PopupHandler from "./PopupHandler.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  config: Object,
});
const emit = defineEmits(["update:modelValue"]);


</script>
