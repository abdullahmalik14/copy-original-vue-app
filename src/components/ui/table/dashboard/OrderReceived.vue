<template>
    <section class="flex flex-col gap-6  mt-4">
      <!-- bg-[#15222e] -->
      <!-- page-container -->
      <div class="h-full flex flex-col xl:bg-gradient-to-b from-white/30 to-white/0 md:gap-6">
        <!-- page-header -->
        <div class="flex flex-col p-2 px-2 gap-6 lg:pt-6 lg:px-4 xl:pb-0 xl:px-10 xl:pt-6">
          <!-- title-container -->
          <div class="hidden w-full gap-4 md:flex justify-between items-center xl:gap-6">
            <h1 class="text-[1.875rem] leading-[2.375rem] text-[#475467] tracking-[-0.045rem] font-medium m-0 xl:text-[1.875rem] xl:leading-[2.375rem]">Orders Received</h1>
          </div>

          <!-- page-settings -->
          <div class="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
            <!-- tab-buttons -->
            <div class="w-full lg:w-auto">
              <div class="flex px-1 py-1 rounded-[3rem] bg-gradient-to-r from-[rgba(251,_91,_162,_0.15)] to-[rgba(251,_91,_162,_0.08)] border-none shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-hidden items-start">
                <button class="group px-2 md:px-4 py-2 justify-center items-center flex gap-1 md:gap-2 flex-1 lg:flex-none outline-none border-none [&.active]:rounded-[3rem] [&.active]:bg-black active">
                  <span class="text-xs md:text-sm font-medium leading-normal md:leading-5 text-black group-[.active]:text-white whitespace-nowrap">In Progress</span>
                  <small class="text-[#F06] tracking-[.016rem] h-6 leading-normal text-[0.625rem] font-medium">4</small>
                </button>

                <button class="group px-2 md:px-4 py-2 justify-center items-center flex gap-1 md:gap-2 flex-1 lg:flex-none outline-none border-none [&.active]:rounded-[3rem] [&.active]:bg-black">
                  <span class="text-xs md:text-sm font-medium leading-normal md:leading-5 text-black group-[.active]:text-white whitespace-nowrap">Completed</span>
                  <small class="text-[#F06] tracking-[.016rem] h-6 leading-normal text-[0.625rem] font-medium">200+</small>
                </button>

                <button class="group px-2 md:px-4 py-2 justify-center items-center flex gap-1 md:gap-2 flex-1 lg:flex-none outline-none border-none [&.active]:rounded-[3rem] [&.active]:bg-black">
                  <span class="text-xs md:text-sm font-medium leading-normal md:leading-5 text-black group-[.active]:text-white whitespace-nowrap">Canceled</span>
                  <small class="text-[#F06] tracking-[.016rem] h-6 leading-normal text-[0.625rem] font-medium">99+</small>
                </button>

                <button class="group px-2 md:px-4 py-2 justify-center items-center flex gap-1 md:gap-2 flex-1 lg:flex-none outline-none border-none [&.active]:rounded-[3rem] [&.active]:bg-black">
                  <span class="text-xs md:text-sm font-medium leading-normal md:leading-5 text-black group-[.active]:text-white whitespace-nowrap">All</span>
                  <small class="text-[#F06] tracking-[.016rem] h-6 leading-normal text-[0.625rem] font-medium">300+</small>
                </button>
              </div>
            </div>

            <!-- search & dropdown -->
            <div class="flex items-center gap-2 flex-1 w-full xl:w-auto">
              <!-- search -->
              <div class="flex w-full gap-[0.375rem]">
                <div class="flex items-center gap-2 w-full px-3 py-2 rounded-t-sm">
                  <div class="flex items-center gap-2 w-full">
                    <span><img src="https://i.ibb.co.com/8gjMKbFY/svgviewer-png-output-24.webp" alt="search" class="w-5 h-5 min-w-5"></span>
                    <div class="flex-none w-[9.375rem] sm:auto overflow-hidden">
                      <input type="text" placeholder="Search..." class="border-none bg-transparent outline-none text-base text-[#101828] placeholder:text-[#757575]">
                    </div>
                  </div>
                </div>
              </div>

              <!-- select-dropdown -->
              <div class="select-dropdown w-auto relative z-[10000] flex-1" id="select-dropdown">
                  <div class="order-select cursor-pointer min-w-[5.75rem] rounded-[0.5rem] border-none">
                      <div class="dash-select__trigger flex items-center justify-center gap-1 rounded-[0.5rem] px-2">
                          <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#344054] capitalize tracking-[0.01875rem] whitespace-nowrap">Order Type</span>
                          <img class="select-arrow h-4 w-4 transition-transform duration-200" src="https://i.ibb.co.com/8DxMjVHT/svgviewer-png-output-25.webp" alt="arrow-down">
                        </div>
                      <div class="dash-options-container absolute left-auto right-0 top-[calc(100%+0.5rem)] z-[9999] w-full w-max origin-top scale-95 opacity-0 h-0 overflow-hidden pointer-events-none shadow-lg transition-all duration-200 ease-out [transform-origin:50%_0]">
                          <div class="rounded-[0.125rem] border border-[rgba(186,188,203,0.5)] bg-white/90">
                              <div class="option flex items-center justify-center gap-[0.625rem] [&.selected]:bg-white hover:bg-white p-[0.75rem]">
                                  <div class="option-inner-container flex flex-1 gap-[0.625rem]">
                                      <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance">All Types</span>
                                  </div>
                              </div>
                              <div class="option flex items-center justify-center gap-[0.625rem] [&.selected]:bg-white hover:bg-white p-[0.75rem]">
                                  <div class="option-inner-container flex flex-1 gap-[0.625rem]">
                                      <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance">P2V</span>
                                  </div>
                              </div>
                              <div class="option flex items-center justify-center gap-[0.625rem] [&.selected]:bg-white hover:bg-white p-[0.75rem]">
                                  <div class="option-inner-container flex flex-1 gap-[0.625rem]">
                                      <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance">Subscription</span>
                                  </div>
                              </div>
                              <div class="option flex items-center justify-center gap-[0.625rem] [&.selected]:bg-white hover:bg-white p-[0.75rem]">
                                  <div class="option-inner-container flex flex-1 gap-[0.625rem]">
                                      <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance">Merch</span>
                                  </div>
                              </div>
                              <div class="option flex items-center justify-center gap-[0.625rem] [&.selected]:bg-white hover:bg-white p-[0.75rem]">
                                  <div class="option-inner-container flex flex-1 gap-[0.625rem]">
                                      <span class="text-[0.875rem] font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance">Mix</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <select class="dash-real-select hidden" name="order-select" required>
                      <option value="all-types">All Types</option>
                      <option value="p2v">P2V</option>
                      <option value="subscription">Subscription</option>
                      <option value="merch">Merch</option>
                      <option value="mix">Mix</option>
                  </select>
              </div>
            </div>
          </div>
        </div>

        <!-- table -->
        <div class="flex flex-col w-full">
          <!-- table-header -->
          <div
            class="flex items-center border-b border-text-quaternary"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-2.5 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <span
                class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
                >Order#</span
              >
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span
                class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
                >From</span
              >
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
                >Status</span
              >
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
                >Date</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end"
            >
              <span
                class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
                >Total</span
              >
            </div>
          </div>

          <!-- table-row-container -->
          <div class="overflow-auto w-full">
            <!-- table-row -->
            <div
              class="flex items-center cursor-pointer odd:bg-bg-row-odd"
            >
              <!-- order -->
              <div
                data-title="order"
                class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
              >
                <!-- icon-container -->
                <div
                  class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-[#07f468] border-b border-border-icon md:border-b"
                >
                  <img
                    src="https://i.ibb.co.com/Y7phV0cK/cart.webp"
                    alt="cart"
                    class="w-9 h-9"
                  />
                </div>

                <!-- text-container -->
                <div
                  class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
                >
                  <span
                    class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                    >Unknown</span
                  >
                  <span
                    class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                    >#8281</span
                  >
                  <div class="flex md:hidden flex-col">
                    <div class="flex items-center">
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                        >#8281 &nbsp;</span
                      >
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                        >8 Apr 2025</span
                      >
                    </div>
                    <span class="flex items-center gap-[0.3125rem] self-stretch">
                      <img
                        src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                        alt="avatar"
                        class="w-5 h-5 rounded-full"
                      />
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                        >@linden</span
                      >
                    </span>
                  </div>
                </div>
              </div>

              <!-- from -->
              <div
                data-title="from"
                class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
              >
                <span class="flex items-center gap-[0.3125rem] self-stretch">
                  <img
                    src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                    alt="avatar"
                    class="w-5 h-5 rounded-full"
                  />
                  <span
                    class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                    >@linden</span
                  >
                </span>
              </div>

              <!-- status -->
              <div
                data-title="status"
                class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
              >
                <div class="flex items-start">
                  <span
                    class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                  >
                    <img
                      src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                      alt="stars"
                      class="w-4 h-4"
                    />
                  </span>
                  <span
                    class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new backdrop-blur-[10px] whitespace-nowrap"
                    >New</span
                  >
                </div>
              </div>

              <!-- date -->
              <div
                data-title="date"
                class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
              >
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-tertiary"
                  >8 Apr 2025</span
                >
              </div>

              <!-- total -->
              <div
                data-title="total"
                class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary"
              >
                0
              </div>
            </div>

            <!-- table-row -->
            <div
              class="flex items-center cursor-pointer odd:bg-bg-row-odd"
            >
              <!-- order -->
              <div
                data-title="order"
                class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
              >
                <!-- icon-container -->
                <div
                  class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-black border-b border-border-icon md:border-b"
                >
                  <img
                    src="https://i.ibb.co.com/RGtnmtYZ/merch.webp"
                    alt="cart"
                    class="w-9 h-9"
                  />
                </div>

                <!-- text-container -->
                <div
                  class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
                >
                  <span
                    class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                    >Merch</span
                  >
                  <span
                    class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                    >#6565</span
                  >
                  <div class="flex md:hidden flex-col">
                    <div class="flex items-center">
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                        >#6565 &nbsp;</span
                      >
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                        >20 Sep 2024</span
                      >
                    </div>
                    <span class="flex items-center gap-[0.3125rem] self-stretch">
                      <img
                        src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                        alt="avatar"
                        class="w-5 h-5 rounded-full"
                      />
                      <span
                        class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                        >@gaver10</span
                      >
                    </span>
                  </div>
                </div>
              </div>

              <!-- from -->
              <div
                data-title="from"
                class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
              >
                <span class="flex items-center gap-[0.3125rem] self-stretch">
                  <img
                    src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                    alt="avatar"
                    class="w-5 h-5 rounded-full"
                  />
                  <span
                    class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                    >@gaver10</span
                  >
                </span>
              </div>

              <!-- status -->
              <div
                data-title="status"
                class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
              >
                <div class="flex items-start">
                  <span
                    class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                  >
                    <img
                      src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                      alt="stars"
                      class="w-4 h-4"
                    />
                  </span>
                  <span
                    class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new backdrop-blur-[10px] whitespace-nowrap"
                    >New</span
                  >
                </div>
              </div>

              <!-- date -->
              <div
                data-title="date"
                class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
              >
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                  >20 Sep 2024</span
                >
              </div>

              <!-- total -->
              <div
                data-title="total"
                class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
              >
                0
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- page-container with scrollable items -->
      <p class="-mb-4 text-black">Table with scrollable items:</p>
      <!-- table -->
      <div class="flex flex-col w-full">
        <!-- table-header -->
        <div
          class="flex items-center border-b border-text-quaternary"
        >
          <!-- order -->
          <div
            data-title="order"
            class="flex items-center min-h-[2.625rem] p-2.5 w-full md:w-[11.625rem] xl:w-[15.625rem]"
          >
            <span
              class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
              >Order#</span
            >
          </div>

          <!-- from -->
          <div
            data-title="from"
            class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
          >
            <span
              class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
              >From</span
            >
          </div>

          <!-- status -->
          <div
            data-title="status"
            class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
          >
            <span
              class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
              >Status</span
            >
          </div>

          <!-- date -->
          <div
            data-title="date"
            class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
          >
            <span
              class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
              >Date</span
            >
          </div>

          <!-- total -->
          <div
            data-title="total"
            class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end"
          >
            <span
              class="truncate block text-sm leading-5 text-text-quaternary whitespace-nowrap"
              >Total</span
            >
          </div>
        </div>

        <!-- table-row-container -->
        <div class="overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-order-style:none] [scrollbar-width:none] max-h-[15rem]">
          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-[#07f468] border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/Y7phV0cK/cart.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary  whitespace-nowrap"
                  >Unknown</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#8281</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#8281 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >8 Apr 2025</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@linden</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@linden</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >8 Apr 2025</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>

          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-[#07f468] border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/Y7phV0cK/cart.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                  >Unknown</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#8281</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#8281 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >8 Apr 2025</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@linden</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@linden</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >8 Apr 2025</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>

          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-black border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/RGtnmtYZ/merch.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                  >Merch</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#6565</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#6565 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >20 Sep 2024</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@gaver10</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@gaver10</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >20 Sep 2024</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>

          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-black border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/RGtnmtYZ/merch.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                  >Merch</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#6565</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#6565 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >20 Sep 2024</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@gaver10</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@gaver10</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >20 Sep 2024</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>

          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-[#07f468] border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/Y7phV0cK/cart.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                  >Unknown</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#8281</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#8281 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >8 Apr 2025</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@linden</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/jkjtwC9C/svgviewer-png-output-17.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@linden</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >8 Apr 2025</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>

          <!-- table-row -->
          <div
            class="flex items-center cursor-pointer odd:bg-bg-row-odd"
          >
            <!-- order -->
            <div
              data-title="order"
              class="flex items-center min-h-[2.625rem] p-0 w-full md:w-[11.625rem] xl:w-[15.625rem]"
            >
              <!-- icon-container -->
              <div
                class="flex justify-center items-center w-[3.5rem] h-[4.5rem] md:w-[4.5rem] bg-black border-b border-border-icon md:border-b"
              >
                <img
                  src="https://i.ibb.co.com/RGtnmtYZ/merch.webp"
                  alt="cart"
                  class="w-9 h-9"
                />
              </div>

              <!-- text-container -->
              <div
                class="flex flex-col justify-center items-start flex-1 min-h-[4.5rem] p-1.5 md:p-2.5 gap-0 md:gap-0.5"
              >
                <span
                  class="truncate text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
                  >Merch</span
                >
                <span
                  class="hidden md:flex truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >#6565</span
                >
                <div class="flex md:hidden flex-col">
                  <div class="flex items-center">
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >#6565 &nbsp;</span
                    >
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                      >20 Sep 2024</span
                    >
                  </div>
                  <span class="flex items-center gap-[0.3125rem] self-stretch">
                    <img
                      src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                      alt="avatar"
                      class="w-5 h-5 rounded-full"
                    />
                    <span
                      class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                      >@gaver10</span
                    >
                  </span>
                </div>
              </div>
            </div>

            <!-- from -->
            <div
              data-title="from"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[11.25rem] xl:w-[12.5rem]"
            >
              <span class="flex items-center gap-[0.3125rem] self-stretch">
                <img
                  src="https://i.ibb.co.com/b5C0tMTN/placeholder-headshot-creator.webp"
                  alt="avatar"
                  class="w-5 h-5 rounded-full"
                />
                <span
                  class="truncate text-xs leading-[1.125rem] text-content-secondary whitespace-nowrap"
                  >@gaver10</span
                >
              </span>
            </div>

            <!-- status -->
            <div
              data-title="status"
              class="hidden md:flex items-start min-h-[2.625rem] p-2.5 w-[7.5rem] xl:w-[11.25rem]"
            >
              <div class="flex items-start">
                <span
                  class="flex justify-center items-center p-1 bg-bg-status-light backdrop-blur-[10px]"
                >
                  <img
                    src="https://i.ibb.co.com/cSnyRK5k/stars.webp"
                    alt="stars"
                    class="w-4 h-4"
                  />
                </span>
                <span
                  class="flex justify-center items-center px-1.5 py-[0.188rem] gap-2 text-xs font-medium leading-[1.125rem] text-status-new bg-bg-statusTag backdrop-blur-[10px] whitespace-nowrap"
                  >New</span
                >
              </div>
            </div>

            <!-- date -->
            <div
              data-title="date"
              class="hidden md:flex items-center min-h-[2.625rem] p-2.5 w-[6.188rem] xl:w-[11.25rem]"
            >
              <span
                class="truncate text-xs leading-[1.125rem] text-content-tertiary whitespace-nowrap"
                >20 Sep 2024</span
              >
            </div>

            <!-- total -->
            <div
              data-title="total"
              class="flex items-center min-h-[2.625rem] p-2.5 md:pr-6 w-auto xl:pr-10 md:w-[12.5rem] ml-auto xl:ml-0 justify-end text-xs font-semibold leading-[1.125rem] text-content-primary whitespace-nowrap"
            >
              0
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

  <script setup>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all dropdowns on the page
            document.querySelectorAll('.order-select').forEach(orderSelect => {
                const selectDropdown = orderSelect.closest('.select-dropdown');
                const trigger = orderSelect.querySelector('.dash-select__trigger span');
                const arrow = orderSelect.querySelector('.select-arrow');
                const options = orderSelect.querySelectorAll('.option');
                const realSelect = selectDropdown.querySelector('.dash-real-select');
                const optionsContainer = orderSelect.querySelector('.dash-options-container');

                // Set initial value
                if (realSelect) {
                    realSelect.value = 'yearly';
                }

                                // Toggle dropdown with smooth transitions
                orderSelect.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const isOpening = !optionsContainer.classList.contains('open');
                    
                    // Close all other selects first
                    document.querySelectorAll('.order-select').forEach(s => {
                        if (s !== orderSelect) {
                            closeDropdown(s);
                        }
                    });
                    
                    if (isOpening) {
                        // Position dropdown based on available space
                        positionDropdown(orderSelect);
                        openDropdown(orderSelect);
                    } else {
                        closeDropdown(orderSelect);
                    }
                });
                
                // Handle option selection
                 options.forEach(option => {
                    option.addEventListener('click', function(e) {
                        e.stopPropagation();

                        // Remove "selected" class from all options first
                        options.forEach(opt => opt.classList.remove('selected'));

                        // Add "selected" class to the clicked option
                        this.classList.add('selected');
                        
                        const selectedText = this.querySelector('span').textContent;
                        if (trigger) trigger.textContent = selectedText;
                        if (realSelect) realSelect.value = selectedText.toLowerCase();
                        
                        // Close the dropdown
                        closeDropdown(orderSelect);
                        
                        // Trigger change event on the real select
                        if (realSelect) realSelect.dispatchEvent(new Event('change'));
                    });
                     });
                
                // Position dropdown up or down based on available space
                function positionDropdown(select) {
                    const optionsContainer = select.querySelector('.dash-options-container');
                    if (!optionsContainer) return;
                    
                    const rect = select.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;
                    const optionsHeight = optionsContainer.scrollHeight;
                    
                    optionsContainer.classList.remove('upward', 'downward');
                    
                    if (spaceBelow < optionsHeight && spaceAbove > spaceBelow) {
                        optionsContainer.classList.add('upward');
                        optionsContainer.style.top = 'auto';
                        optionsContainer.style.bottom = 'calc(100% + 0.5rem)';
                    } else {
                        optionsContainer.classList.add('downward');
                        optionsContainer.style.top = 'calc(100% + 0.5rem)';
                        optionsContainer.style.bottom = 'auto';
                    }
                }
                
                function openDropdown(select) {
                    const optionsContainer = select.querySelector('.dash-options-container');
                    const arrow = select.querySelector('.select-arrow');
                    
                    if (!optionsContainer || !arrow) return;
                    
                    optionsContainer.classList.add('open');
                    arrow.classList.add('rotate-180');
                    optionsContainer.classList.remove('scale-95', 'opacity-0', 'pointer-events-none', 'h-0', 'overflow-hidden');
                    optionsContainer.classList.add('scale-100', 'opacity-100', 'pointer-events-auto', 'h-auto', 'overflow-auto');
                }
                
              function closeDropdown(select) {
                    const optionsContainer = select?.querySelector('.dash-options-container');
                    const arrow = select?.querySelector('.select-arrow');
                    
                    if (!optionsContainer || !arrow) return;
                    
                    optionsContainer.classList.remove('open');
                    arrow.classList.remove('rotate-180');
                    optionsContainer.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto', 'h-auto', 'overflow-auto');
                    optionsContainer.classList.add('scale-95', 'opacity-0', 'pointer-events-none', 'h-0', 'overflow-hidden');
                }
            });
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function() {
                document.querySelectorAll('.order-select').forEach(select => {
                    closeDropdown(select);
                });
            });
            
            // Reposition dropdowns on window resize
            window.addEventListener('resize', function() {
                document.querySelectorAll('.order-select').forEach(select => {
                    const optionsContainer = select.querySelector('.dash-options-container');
                    if (optionsContainer && optionsContainer.classList.contains('open')) {
                        positionDropdown(select);
                    }
                });
            });
        });
    </script>