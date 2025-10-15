<template>
  <PopupHandler
    :modelValue="modelValue"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    :config="config"
  >
    <div
      class="h-screen flex flex-col items-start overflow-hidden shadow-[4px_0_10px_0_rgba(0,0,0,0.08)] bg-panel-light/70 backdrop-blur-[25px] md:w-[30rem] md:border-l md:border-panel-light-border"
    >
      <!-- header -->
      <div
        class="flex items-center self-stretch gap-2 p-2 pb-0 md:bg-transparent bg-background-header-light"
      >
        <div class="flex-1 flex items-center gap-2">
          <span class="flex items-center justify-start">
            <img
              src="https://i.ibb.co/cX3Y4YZx/svgviewer-png-output-71.webp"
              alt="Notifications"
              class="w-5 h-5 pointer-events-none"
            />
          </span>
          <span
            class="text-sm font-semibold leading-5 text-text-secondary-light"
          >
            Notifications
          </span>
          <div class="flex">
            <span
              class="flex items-center justify-center w-6 h-6 p-1 rounded-[0.313rem] cursor-pointer"
            >
              <img
                src="https://i.ibb.co/JR1WLL0s/svgviewer-png-output-72.webp"
                alt="settings"
                class="w-4 h-4 [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)]"
              />
            </span>
          </div>
        </div>

        <div class="flex">
          <a
            @click="emit('update:modelValue', false)"
            class="flex items-center justify-center w-6 h-6 md:w-auto md:h-auto p-0 md:p-2 rounded-md transition-all duration-200 ease-in-out hover:bg-panel-light-buttonHover cursor-pointer"
          >
            <img
              class="w-6 h-6 pointer-events-none hidden md:block [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(13%)_saturate(594%)_hue-rotate(183deg)_brightness(92%)_contrast(92%)]"
              src="https://i.ibb.co/KxKfkV17/svgviewer-png-output-59.webp"
              alt="close"
            />
            <img
              class="block w-6 h-6 pointer-events-none md:hidden [filter:brightness(0)_saturate(100%)_invert(45%)_sepia(13%)_saturate(594%)_hue-rotate(183deg)_brightness(92%)_contrast(92%)]"
              src="https://i.ibb.co/N2VqD6yD/svgviewer-png-output-60.webp"
              alt="close"
            />
          </a>
        </div>
      </div>

      <!-- body -->
      <div
        class="flex-1 z-[1] overflow-y-auto self-stretch flex flex-col [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <!-- tab-main-wrapper -->
        <div class="flex-1 self-stretch flex flex-col">
          <!-- tab-header-list -->
          <div
            class="md:relative flex flex-col self-stretch items-start gap-2 p-2 pb-0 md:p-2 md:pb-0 md:pr-0 md:pl-0 md:bg-transparent bg-background-header-light fixed md:static w-full z-[99]"
          >
            <ul
              class="flex flex-row justify-between items-center self-stretch overflow-x-auto whitespace-nowrap scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-[0_-1.5px_0_0_inset] shadow-border-tab-light"
            >
              <li class="flex-1 flex outline-none">
                <a
                  href=""
                  class="w-full outline-none flex flex-col items-center gap-2.5 whitespace-nowrap px-4 py-2 opacity-100 transition-all duration-200 ease-in-out shadow-[0_-1.5px_0_0_inset] shadow-border-tab-active-light"
                >
                  <span
                    class="flex items-center gap-0.5 h-8 pointer-events-none"
                  >
                    <span
                      class="text-sm font-semibold uppercase leading-5 text-text-tab-active-light"
                      >All</span
                    >
                    <span
                      class="flex flex-col items-center self-stretch gap-2.5"
                    >
                      <small
                        class="text-[0.625rem] font-medium leading-none tracking-[0.016rem] text-text-badge-light"
                        >400+</small
                      >
                    </span>
                  </span>
                </a>
              </li>
              <li class="flex-1 flex">
                <a
                  href=""
                  class="w-full flex flex-col items-center gap-2.5 whitespace-nowrap px-4 py-2 opacity-70 hover:shadow-[0_-1.5px_0_0_inset] hover:shadow-border-tab-hover-light transition-all duration-200 ease-in-out"
                >
                  <span
                    class="flex items-center gap-0.5 h-8 pointer-events-none"
                  >
                    <span
                      class="text-sm font-medium uppercase leading-5 text-text-tab-light"
                      >Unread</span
                    >
                    <span
                      class="flex flex-col items-center self-stretch gap-2.5"
                    >
                      <small
                        class="text-[0.625rem] font-medium leading-none tracking-[0.016rem] text-text-badge-light"
                        >400+</small
                      >
                    </span>
                  </span>
                </a>
              </li>
              <li class="flex-1 flex">
                <a
                  href=""
                  class="w-full flex flex-col items-center gap-2.5 whitespace-nowrap px-4 py-2 opacity-70 hover:shadow-[0_-1.5px_0_0_inset] hover:shadow-border-tab-hover-light transition-all duration-200 ease-in-out"
                >
                  <span
                    class="flex items-center gap-0.5 h-8 pointer-events-none"
                  >
                    <span
                      class="text-sm font-medium uppercase leading-5 text-text-tab-light"
                      >Custom Requests</span
                    >
                    <span
                      class="flex flex-col items-center self-stretch gap-2.5"
                    >
                      <small
                        class="text-[0.625rem] font-medium leading-none tracking-[0.016rem] text-text-badge-light"
                        >1</small
                      >
                    </span>
                  </span>
                </a>
              </li>
              <li class="flex-1 flex">
                <a
                  href=""
                  class="w-full flex flex-col items-center gap-2.5 whitespace-nowrap px-4 py-2 opacity-70 hover:shadow-[0_-1.5px_0_0_inset] hover:shadow-border-tab-hover-light transition-all duration-200 ease-in-out"
                >
                  <span
                    class="flex items-center gap-0.5 h-8 pointer-events-none"
                  >
                    <span
                      class="text-sm font-medium uppercase leading-5 text-text-tab-light"
                      >Account</span
                    >
                    <span
                      class="flex flex-col items-center self-stretch gap-2.5"
                    >
                      <small
                        class="text-[0.625rem] font-medium leading-none tracking-[0.016rem] text-text-badge-light"
                        >6</small
                      >
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- tab-content-containers -->
          <div
            class="flex flex-col items-stretch h-full self-stretch mt-14 md:mt-0"
          >
            <div class="flex flex-1 justify-center self-stretch flex-col">
              <div
                class="h-[calc(100vh-6.5rem)] bg-background-notification-light/50 backdrop-blur-[50px] overflow-y-auto self-stretch flex flex-col [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div
                  class="opacity-100 visible pointer-events-auto translate-x-0 pb-1 self-stretch flex flex-col items-start"
                >
                  <!-- notification warning -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-warning-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(253,176,34,0.15)_0,rgba(253,176,34,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- Warning Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(253,176,34,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/d4xcGw6t/svgviewer-png-output-73.webp"
                            alt="film"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(81%)_sepia(13%)_saturate(5746%)_hue-rotate(341deg)_brightness(102%)_contrast(98%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#fdb022]"
                          >
                            <img
                              src="https://i.ibb.co/nNXJP9LJ/svgviewer-png-output-74.webp"
                              alt="upload"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Media Content Required: Your profile currently
                                has no media. Enhance your profile's visibility
                                by adding at least 5 media items.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >1w</span
                                >
                              </div>

                              <!-- actions -->
                              <div class="flex items-end gap-2">
                                <!-- cta-dismiss -->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out md:flex hidden"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-dismiss-light group-hover:text-cta-dismiss-hover"
                                    >Dismiss</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>

                                <!-- cta-->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-warning-light group-hover:text-cta-dismiss-hover"
                                    >Take Action</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(24%)_sepia(100%)_saturate(1622%)_hue-rotate(10deg)_brightness(98%)_contrast(94%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification success -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-success-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(46,211,183,0.15)_0,rgba(46,211,183,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- notification-close -->
                        <a
                          href=""
                          class="absolute right-0 top-0 flex justify-center items-center w-6 h-6 hidden md:block"
                        >
                          <img
                            src="https://i.ibb.co/jvsPTy91/svgviewer-png-output-81.webp"
                            alt="close"
                            class="w-4 h-4 pointer-events-none"
                          />
                        </a>

                        <!-- Success Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(46,211,183,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co.com/27y6kPNB/placeholder-jpeg.webp"
                            alt="placeholder"
                            class="w-full h-full"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#2ed3b7]"
                          >
                            <img
                              src="https://i.ibb.co/nNXJP9LJ/svgviewer-png-output-74.webp"
                              alt="upload"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Congratulations: Your media 'Audio with
                                placeholder and no preview' has been approved.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >1m</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification info -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-info-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(34,204,238,0.15)_0,rgba(34,204,238,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- notification-close -->
                        <a
                          href=""
                          class="absolute right-0 top-0 flex justify-center items-center w-6 h-6 hidden md:block"
                        >
                          <img
                            src="https://i.ibb.co/jvsPTy91/svgviewer-png-output-81.webp"
                            alt="close"
                            class="w-4 h-4 pointer-events-none"
                          />
                        </a>

                        <!-- Info Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(34,204,238,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/sdtcNrtm/svgviewer-png-output-76.webp"
                            alt="bank-deposit"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(67%)_sepia(37%)_saturate(913%)_hue-rotate(145deg)_brightness(95%)_contrast(97%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#2ce]"
                          >
                            <img
                              src="https://i.ibb.co/VW3pDzp0/svgviewer-png-output-79.webp"
                              alt="info"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Bank Details Required: To ensure seamless
                                transactions, please complete your bank
                                information.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >3m</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification destructive -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-destructive-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(255,68,5,0.1)_0,rgba(255,68,5,0.1)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- notification-close -->
                        <a
                          href=""
                          class="absolute right-0 top-0 flex justify-center items-center w-6 h-6 hidden md:block"
                        >
                          <img
                            src="https://i.ibb.co/jvsPTy91/svgviewer-png-output-81.webp"
                            alt="close"
                            class="w-4 h-4 pointer-events-none"
                          />
                        </a>

                        <!-- Destructive Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(255,68,5,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/p60ycFJX/svgviewer-png-output-77.webp"
                            alt="plane"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(42%)_sepia(53%)_saturate(6174%)_hue-rotate(356deg)_brightness(98%)_contrast(105%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#ff4405]"
                          >
                            <img
                              src="https://i.ibb.co/Kxgt1PZ5/svgviewer-png-output-78.webp"
                              alt="text-input"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Bank Details Required: To ensure seamless
                                transactions, please complete your bank
                                information.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >3m</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification warning -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-warning-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(253,176,34,0.15)_0,rgba(253,176,34,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- Warning Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(253,176,34,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/d4xcGw6t/svgviewer-png-output-73.webp"
                            alt="film"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(81%)_sepia(13%)_saturate(5746%)_hue-rotate(341deg)_brightness(102%)_contrast(98%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#fdb022]"
                          >
                            <img
                              src="https://i.ibb.co/nNXJP9LJ/svgviewer-png-output-74.webp"
                              alt="upload"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Media Content Required: Your profile currently
                                has no media. Enhance your profile's visibility
                                by adding at least 5 media items.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >1w</span
                                >
                              </div>

                              <!-- actions -->
                              <div class="flex items-end gap-2">
                                <!-- cta-dismiss -->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out md:flex hidden"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-dismiss-light group-hover:text-cta-dismiss-hover"
                                    >Dismiss</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>

                                <!-- cta-->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-warning-light group-hover:text-cta-dismiss-hover"
                                    >Take Action</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(24%)_sepia(100%)_saturate(1622%)_hue-rotate(10deg)_brightness(98%)_contrast(94%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification success -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-success-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(46,211,183,0.15)_0,rgba(46,211,183,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- Success Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(46,211,183,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co.com/27y6kPNB/placeholder-jpeg.webp"
                            alt="placeholder"
                            class="w-full h-full"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#2ed3b7]"
                          >
                            <img
                              src="https://i.ibb.co/nNXJP9LJ/svgviewer-png-output-74.webp"
                              alt="upload"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Congratulations: Your media 'Audio with
                                placeholder and no preview' has been approved.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >1m</span
                                >
                              </div>

                              <!-- actions -->
                              <div class="flex items-end gap-2">
                                <!-- cta-dismiss -->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out md:flex hidden"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-dismiss-light group-hover:text-cta-dismiss-hover"
                                    >Dismiss</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>

                                <!-- cta-->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-success-light group-hover:text-cta-dismiss-hover"
                                    >Take Action</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(34%)_sepia(63%)_saturate(508%)_hue-rotate(123deg)_brightness(94%)_contrast(97%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification info -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-info-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(34,204,238,0.15)_0,rgba(34,204,238,0.15)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- Info Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(34,204,238,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/sdtcNrtm/svgviewer-png-output-76.webp"
                            alt="bank-deposit"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(67%)_sepia(37%)_saturate(913%)_hue-rotate(145deg)_brightness(95%)_contrast(97%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#2ce]"
                          >
                            <img
                              src="https://i.ibb.co/VW3pDzp0/svgviewer-png-output-79.webp"
                              alt="info"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Bank Details Required: To ensure seamless
                                transactions, please complete your bank
                                information.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >3m</span
                                >
                              </div>

                              <!-- actions -->
                              <div class="flex items-end gap-2">
                                <!-- cta-dismiss -->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out md:flex hidden"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-dismiss-light group-hover:text-cta-dismiss-hover"
                                    >Dismiss</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>

                                <!-- cta-->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-info-light group-hover:text-cta-dismiss-hover"
                                    >Take Action</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(39%)_sepia(96%)_saturate(762%)_hue-rotate(157deg)_brightness(88%)_contrast(94%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- notification destructive -->
                  <div
                    class="relative flex justify-center items-center self-stretch border-b border-border-notification-light border-l-3 border-l-border-notification-destructive-light"
                  >
                    <div
                      class="flex-1 gap-4 pt-3 pb-3 pl-2 pr-2 z-[2] relative self-stretch flex flex-col items-start transition-all duration-150 ease-in-out [background:linear-gradient(90deg,rgba(255,255,255,0)_0,rgba(255,255,255,0.9)_100%),linear-gradient(0deg,rgba(255,68,5,0.1)_0,rgba(255,68,5,0.1)_100%),rgba(255,255,255,0.9)]"
                    >
                      <div
                        class="relative flex justify-start items-start self-stretch gap-5"
                      >
                        <!-- Destructive Notification Icon -->
                        <div
                          class="relative flex justify-center items-center w-10 h-10 rounded-lg bg-[rgba(255,68,5,0.1)]"
                        >
                          <img
                            src="https://i.ibb.co/p60ycFJX/svgviewer-png-output-77.webp"
                            alt="plane"
                            class="w-6 h-6 min-w-[1.5rem] [filter:brightness(0)_saturate(100%)_invert(42%)_sepia(53%)_saturate(6174%)_hue-rotate(356deg)_brightness(98%)_contrast(105%)]"
                          />
                          <div
                            class="absolute -bottom-[0.563rem] -right-[0.563rem] flex justify-center items-center w-[1.375rem] h-[1.375rem] rounded-lg bg-[#ff4405]"
                          >
                            <img
                              src="https://i.ibb.co/Kxgt1PZ5/svgviewer-png-output-78.webp"
                              alt="text-input"
                              class="w-4 h-4 opacity-90 [filter:brightness(0)_saturate(100%)_invert(99%)_sepia(99%)_saturate(0)_hue-rotate(176deg)_brightness(107%)_contrast(100%)]"
                            />
                          </div>
                        </div>

                        <!-- notification-content -->
                        <div
                          class="flex-1 self-stretch flex flex-col items-start"
                        >
                          <!-- text-contents -->
                          <div class="self-stretch flex flex-col items-start">
                            <!-- text -->
                            <div
                              class="self-stretch flex justify-start items-start pr-6 pt-2"
                            >
                              <p
                                class="text-sm leading-5 font-normal text-text-notification-light"
                              >
                                Bank Details Required: To ensure seamless
                                transactions, please complete your bank
                                information.
                              </p>
                            </div>

                            <!-- bottom-contents -->
                            <div
                              class="self-stretch flex justify-between items-end pt-2 gap-2"
                            >
                              <!-- time -->
                              <div class="flex justify-start items-end">
                                <span
                                  class="text-xs leading-[1.125rem] text-text-time-light"
                                  >3m</span
                                >
                              </div>

                              <!-- actions -->
                              <div class="flex items-end gap-2">
                                <!-- cta-dismiss -->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out md:flex hidden"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-dismiss-light group-hover:text-cta-dismiss-hover"
                                    >Dismiss</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(31%)_saturate(534%)_hue-rotate(179deg)_brightness(93%)_contrast(90%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>

                                <!-- cta-->
                                <a
                                  href=""
                                  class="group flex items-center gap-0.5 transition-all duration-200 ease-in-out"
                                >
                                  <span
                                    class="text-xs leading-[1.125rem] font-medium transition-all duration-200 ease-in-out text-cta-destructive-light group-hover:text-cta-dismiss-hover"
                                    >Take Action</span
                                  >
                                  <span>
                                    <img
                                      src="https://i.ibb.co/TD1xRhhB/svgviewer-png-output-75.webp"
                                      alt="dismiss"
                                      class="h-4 w-4 transition-all duration-200 ease-in-out [filter:brightness(0)_saturate(100%)_invert(12%)_sepia(50%)_saturate(4284%)_hue-rotate(351deg)_brightness(115%)_contrast(102%)] group-hover:[filter:brightness(0)_saturate(100%)_invert(37%)_sepia(57%)_saturate(6169%)_hue-rotate(214deg)_brightness(91%)_contrast(106%)]"
                                    />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
