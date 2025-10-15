<template>
  <div class="text-[#334155] p-2 max-w-7xl mx-auto">
    <div class="flex flex-col gap-10">
      <section class="flex flex-col gap-6 pb-4">
        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold mb-4">Auth Demo components</h1>
          <AuthDemo />
        </section>
        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold mb-4">Paragraph demo component</h1>
          <div>
            <Paragraph
              text="Hello, this is a styled paragraph component."
              font-size="text-lg"
              font-weight="font-semibold"
              font-color="text-gray-700 "
              shadow="shadow-sm"
              :left-icon="PaperClipIcon"
            />
          </div>
          <div>
            <Paragraph
              text="This is another paragraph component."
              font-size="text-sm"
              font-weight="font-normal"
              font-color="text-blue-800 "
            />
          </div>
          <div>
            <Paragraph
              text="This is paragraph component with icon size (10 X 10) & spacing"
              font-size="text-sm"
              font-weight="font-normal"
              font-color="text-blue-800 "
              :left-icon="PaperClipIcon"
              :iconSize="'w-10 h-10'"
            />
          </div>
          <div>
            <Paragraph
              text="This is paragraph component with WEBP"
              font-size="text-sm"
              font-weight="font-normal"
              font-color="text-blue-800 "
              :left-icon="greentick"
            />
          </div>
        </section>
        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold mb-4">Heading demo component</h1>
          <div>
            <Heading
              text="Dashboard h1 heading"
              tag="h1"
              theme="defaultPrimaryHeading"
            />
          </div>
          <div>
            <Heading text="This is a h3 heading" tag="h3" />
          </div>
          <div>
            <Heading
              text="This is a h2 heading"
              tag="h2"
              theme="defaultSecondaryHeading"
            />
          </div>
          <div>
            <Heading
              text="This is a Section h1 heading"
              tag="h1"
              theme="sectionHeading"
            />
          </div>
          <div>
            <Heading
              :leftIcon="PaperClipIcon"
              :iconSpacing="'mr-5 inline-block'"
              text="This is a heading with icon (size,spacing)"
              tag="h2"
              theme="defaultSecondaryHeading"
            />
          </div>
        </section>
        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold mb-4">Button demo component</h1>
          <div><Button text="Save" variant="success" size="lg" /></div>
          <div><Button text="Delete" variant="danger" size="sm" /></div>
          <div>
            <Button
              text="With Icon"
              :left-icon="PaperClipIcon"
              variant="secondary"
              size="md"
            />
          </div>
          <div><Button text="More Info" variant="outline" size="md" /></div>
          <div>
            <h3>Buttons with Icons</h3>
            <div class="button-group">
              <Button text="Confirm" variant="success" :leftIcon="CheckIcon" />
              <Button text="Next" variant="danger" :rightIcon="PaperClipIcon" />
              <Button
                text="Settings"
                variant="secondary"
                :leftIcon="PaperClipIcon"
                :rightIcon="CheckIcon"
              />
            </div>
          </div>
          <div>
            <h3>Other Variants</h3>
            <div class="button-group">
              <Button text="Warning" variant="warning" size="lg" />
              <Button text="Outline" variant="outline" size="md" />
              <Button text="Disabled" variant="danger" :disabled="true" />
            </div>
          </div>
        </section>

        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-4">
          <h1 class="text-3xl font-bold mb-4">Notification Card demo</h1>
          <!-- Notice with link and close -->
          <NotificationCard
            variant="notice"
            title="You have 3 active subscriber in this tier"
            description="Changing detail of this plan might affect current subscriber's subscription fee and benefits."
            linkLabel="Learn more"
            linkHref="#"
          />

          <!-- Alert without icon -->
          <NotificationCard
            variant="alert"
            :showIcon="false"
            title="You have 3 active subscriber in this tier"
            description="Changing detail of this plan might affect current subscriber's subscription fee and benefits."
          />

          <!-- Success with external icon -->
          <NotificationCard
            variant="success"
            :icon="CheckCircleIcon"
            title="Action completed successfully"
            description="All systems are now up and running."
          />

          <!-- Error controlled with toggle -->
          <NotificationCard
            v-model="showCustom"
            variant="error"
            title="Payment failed"
            description="Please update your billing information to continue."
          />
          <div class="flex gap-2">
            <Button
              text="Toggle Error Card"
              variant="secondary"
              size="sm"
              @click="showCustom = !showCustom"
            />
          </div>

          <!-- Info minimal -->
          <NotificationCard
            variant="info"
            title="Heads up"
            description="We updated our terms of service."
          />

          <!-- Warning long message -->
          <NotificationCard
            variant="warning"
            :icon="ExclamationTriangleIcon"
            description="WARNING: Uploading (or attempting to upload) content that violates any laws or criminal laws (ex: child pornography or non-consensual content), our Child Sexual Abuse Material Policy or Anti-Sexual Exploitation Policies, will result in related accounts to be immediately terminated and reported to law enforcement authorities."
          />
        </section>

        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-4">
          <h1 class="text-3xl font-bold mb-4">
            Dashboard Buttons demo (CSS-first)
          </h1>

          <!-- Reusable TwoPieceButton Variants Showcase -->
          <div class="flex flex-col gap-3 mt-4">
            <!-- Variant: skew-right (uses built-in defaults) -->
            <TwoPieceButton
              :tag="'button'"
              variant="skew-right"
              :text="'Link your X account (variant=skew-right)'"
              :textClass="'py-1 break-words leading-7 text-lg text-black group-hover:text-[#07f468] font-medium flex group-hover:text-dash-success'"
              :dataAttrs="{ 'data-green-skew-right-bottom-button': true }"
            >
              <template #icon>
                <!-- X icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="w-6 h-6"
                >
                  <g id="social media icon/X">
                    <g id="Vector">
                      <mask id="path-1-inside-1_8797_16211" fill="white">
                        <path
                          d="M13.7142 10.6226L20.4163 3H18.8287L13.0068 9.61729L8.36042 3H3L10.0278 13.0075L3 21H4.58761L10.7316 14.0104L15.6396 21H21.0001M5.16061 4.17142H7.59962L18.8275 19.8861H16.3878"
                        />
                      </mask>
                      <path
                        d="M13.7142 10.6226L20.4163 3H18.8287L13.0068 9.61729L8.36042 3H3L10.0278 13.0075L3 21H4.58761L10.7316 14.0104L15.6396 21H21.0001M5.16061 4.17142H7.59962L18.8275 19.8861H16.3878"
                        fill="black"
                        class="group-hover:fill-[#07f468]"
                      />
                      <path
                        d="M20.4163 3L21.1673 3.6603L22.627 2H20.4163V3ZM18.8287 3V2H18.3765L18.0779 2.33946L18.8287 3ZM13.0068 9.61729L12.1884 10.1919L12.9185 11.2316L13.7576 10.2778L13.0068 9.61729ZM8.36042 3L9.17882 2.42535L8.88015 2H8.36042V3ZM3 3V2H1.07579L2.18164 3.5747L3 3ZM10.0278 13.0075L10.7788 13.6678L11.2985 13.0768L10.8462 12.4328L10.0278 13.0075ZM3 21L2.24902 20.3397L0.7891 22H3V21ZM4.58761 21V22H5.04L5.33868 21.6602L4.58761 21ZM10.7316 14.0104L11.55 13.4358L10.8196 12.3956L9.98055 13.3502L10.7316 14.0104ZM15.6396 21L14.8213 21.5747L15.1199 22H15.6396V21ZM7.59962 4.17142L8.41327 3.59008L8.11415 3.17142H7.59962V4.17142ZM18.8275 19.8861V20.8861H20.7709L19.6411 19.3048L18.8275 19.8861ZM14.4652 11.2829L21.1673 3.6603L19.6653 2.3397L12.9632 9.96235L14.4652 11.2829ZM20.4163 2H18.8287V4H20.4163V2ZM18.0779 2.33946L12.256 8.95675L13.7576 10.2778L19.5794 3.66054L18.0779 2.33946ZM13.8252 9.04264L9.17882 2.42535L7.54202 3.57465L12.1884 10.1919L13.8252 9.04264ZM8.36042 2H3V4H8.36042V2ZM2.18164 3.5747L9.20946 13.5822L10.8462 12.4328L3.81836 2.4253L2.18164 3.5747ZM9.27685 12.3471L2.24902 20.3397L3.75098 21.6603L10.7788 13.6678L9.27685 12.3471ZM3 22H4.58761V20H3V22ZM5.33868 21.6602L11.4827 14.6706L9.98055 13.3502L3.83653 20.3398L5.33868 21.6602ZM9.91324 14.5851L14.8213 21.5747L16.458 20.4253L11.55 13.4358L9.91324 14.5851ZM15.6396 22H21.0001V20H15.6396V22ZM5.16061 5.17142H7.59962V3.17142H5.16061V5.17142ZM6.78596 4.75277L18.0138 20.4675L19.6411 19.3048L8.41327 3.59008L6.78596 4.75277ZM18.8275 18.8861H16.3878V20.8861H18.8275V18.8861Z"
                        fill="black"
                        mask="url(#path-1-inside-1_8797_16211)"
                        class="group-hover:fill-[#07f468]"
                      />
                    </g>
                  </g>
                </svg>
              </template>
            </TwoPieceButton>

            <!-- Variant: two-piece (legacy) minimal example -->
            <TwoPieceButton
              :tag="'a'"
              href="#"
              variant="two-piece"
              :text="'Two-piece minimal example'"
              :skewPosition="'right'"
              :rootClass="'group flex w-max self-stretch no-underline'"
              :mainClass="'px-3 h-10 flex items-center bg-black shadow-[4px_4px_0_0_#fb5ba2] transition-all duration-150 ease-in-out group-hover:bg-[#07f468] group-hover:shadow-[4px_4px_0_0_#000]'"
              :skewClass="'relative -skew-x-[20deg] -translate-x-[0.438rem] h-10 w-4 bg-black shadow-[4px_4px_0_0_#fb5ba2] transition-all duration-150 ease-in-out group-hover:bg-[#07f468] group-hover:shadow-[4px_4px_0_0_#000]'"
              :textClass="'font-medium text-base leading-7 text-white transition-all duration-150 ease-in-out group-hover:text-black'"
            />
          </div>

          <!-- Save & Cancel Buttons -->
          <div class="flex items-center gap-2">
            <ButtonBase
              :text="'Cancel'"
              :rootClass="'py-1 px-2 min-w-[6.25rem] text-lg font-medium flex justify-center items-center hover:bg-white'"
              :textClass="'text-[#0c111d] break-words leading-7 text-lg font-medium uppercase'"
            />
            <ButtonBase
              :text="'Save'"
              :rootClass="'group py-1 px-2 gap-2.5 min-w-[5.3125rem] bg-black flex justify-center items-center hover:bg-[#07f468]'"
              :textClass="'text-[#07f468] break-words leading-7 text-lg font-medium uppercase group-hover:text-black'"
            />
          </div>

          <!-- View Profile & Go Live layout -->
          <div class="flex item s-center self-stretch gap-4">
            <!-- Left: dotted + view profile -->
            <div class="flex-1 self-stretch flex items-center gap-2">
              <ButtonBase
                :rootClass="'bg-black shadow-[4px_4px_0_0_#fb5ba2] h-10 w-10 relative flex justify-center items-center cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#07f468] hover:shadow-[4px_4px_0_0_#000]'"
              >
                <template #icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="pointer-events-none transition-all duration-150 ease-in-out h-6 w-6"
                  >
                    <g id="dots-vertical">
                      <g id="Icon">
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="#FB5BA2"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                          stroke="#FB5BA2"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                          stroke="#FB5BA2"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </g>
                  </svg>
                </template>
              </ButtonBase>

              <TwoPieceButton
                :tag="'a'"
                href="#"
                :text="'View Profile'"
                :skewPosition="'right'"
                :rootClass="'group flex-1 self-stretch no-underline'"
                :mainClass="'w-full gap-2.5 h-10 px-2 py-1 flex justify-center self-stretch items-center bg-black shadow-[4px_4px_0_0_#fb5ba2] transition-all duration-150 ease-in-out group-hover:bg-[#07f468] group-hover:shadow-[4px_4px_0_0_#000]'"
                :skewClass="'relative -skew-x-[20deg] -translate-x-[0.438rem] h-10 p-1 w-4 flex justify-center items-center bg-black shadow-[4px_4px_0_0_#fb5ba2] transition-all duration-150 ease-in-out group-hover:bg-[#07f468] group-hover:shadow-[4px_4px_0_0_#000]'"
                :textClass="'font-medium text-lg leading-7 text-white transition-all duration-150 ease-in-out group-hover:text-black'"
              />
            </div>

            <!-- Right: go live disabled -->
            <div class="flex-1 self-stretch flex items-center">
              <TwoPieceButton
                :tag="'a'"
                href="#"
                :text="'Go Live'"
                :skewPosition="'left'"
                :rootClass="'no-underline cursor-default h-10 flex-1 relative flex justify-center items-center self-center'"
                :skewClass="'[filter:grayscale(100%)] shadow-[4px_4px_0_0_#636363] bg-[#9f9f9f] -skew-x-[20deg] translate-x-[0.563rem] h-10 p-1 w-4 flex justify-center items-center transition-all duration-150 ease-in-out'"
                :mainClass="'[filter:grayscale(100%)] shadow-[4px_4px_0_0_#636363] bg-[#9f9f9f] relative transition-all duration-150 ease-in-out cursor-default flex-1 gap-2.5 h-10 p-1 flex justify-center items-center self-stretch'"
                :textClass="'leading-7 text-lg text-black font-medium'"
              >
                <template #rightIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-6 h-6 [filter:brightness(0)_saturate(100%)_invert(55%)_sepia(10%)_saturate(5098%)_hue-rotate(296deg)_brightness(98%)_contrast(101%)] transition-all duration-150 ease-in-out"
                  >
                    <g clip-path="url(#clip0_1177_37360)">
                      <path
                        d="M9.77811 6.63604C9.22582 6.63604 8.77811 6.18832 8.77811 5.63604C8.77811 5.08376 9.22583 4.63604 9.77811 4.63604L18.2634 4.63605C18.5395 4.63605 18.7895 4.74798 18.9705 4.92895C19.0664 5.02482 19.1387 5.13532 19.1875 5.25327C19.2364 5.37117 19.2634 5.50046 19.2634 5.63605L19.2634 14.1213C19.2634 14.6736 18.8157 15.1213 18.2634 15.1213C17.7111 15.1213 17.2634 14.6736 17.2634 14.1213L17.2634 8.05026L6.24256 19.0711C5.85204 19.4616 5.21887 19.4616 4.82835 19.0711C4.43782 18.6806 4.43782 18.0474 4.82835 17.6569L15.8492 6.63605L9.77811 6.63604Z"
                        fill="#303437"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1177_37360">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </template>
              </TwoPieceButton>
            </div>
          </div>
        </section>

        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-2">
          <h1 class="text-3xl font-bold mb-4">
            Default demo components in single Input
          </h1>
          <div>
            <h3 class="text-xl font-bold mb-4">Check Box</h3>
            <Checkbox
              v-model="rememberMe"
              label="Remember Me"
              checkboxClass="m-0 border border-checkboxBorder [appearance:none] w-[0.75rem] h-[0.75rem] rounded-[2px] bg-transparent relative cursor-pointer checked:bg-checkbox checked:border-checkbox checked:[&::after]:content-[''] checked:[&::after]:absolute checked:[&::after]:left-[0.2rem] checked:[&::after]:w-[0.25rem] checked:[&::after]:h-[0.5rem] checked:[&::after]:border checked:[&::after]:border-solid checked:[&::after]:border-white checked:[&::after]:border-r-[2px] checked:[&::after]:border-b-[2px] checked:[&::after]:border-t-0 checked:[&::after]:border-l-0 checked:[&::after]:rotate-45 "
              labelClass="text-[0.875rem] leading-6 text-text cursor-pointer"
              wrapperClass="flex items-center gap-2"
            />
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Radio Box</h3>
            <Radio
              v-model="selectedOption"
              name="paymentMethod"
              value="credit"
              label="Credit Card"
              radioClass="w-5 h-5 border border-gray-400 text-blue-600"
              labelClass="text-sm text-gray-700 font-medium"
              wrapperClass="flex items-center gap-3"
            />
          </div>

          <div class="w-3/4 mb-4">
            <h3 class="text-xl font-bold mb-4">Input Box</h3>
            <InputDefaultComponent
              id="input"
              type="text"
              placeholder="Enter your name"
              show-label
              v-model="name"
              label-text="Text input with description"
              description="Please enter your full name as it appears on your ID"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_1"
              type="text"
              placeholder="This is a required field"
              show-label
              v-model="name"
              label-text="Required Input"
              requiredDisplay="*"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_2"
              type="text"
              placeholder="Input with left icon"
              show-label
              v-model="name"
              label-text="Input with left Icon"
              :left-icon="EnvelopeIcon"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_3"
              type="text"
              placeholder="Input with right icon"
              show-label
              v-model="name"
              label-text="Input with right Icon"
              :right-icon="EyeIcon"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_4"
              type="text"
              placeholder="Enter discount code"
              show-label
              v-model="name"
              label-text="Input with Optional text"
              isOptional
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_5"
              type="number"
              placeholder="Enter Discount percentage"
              show-label
              v-model="name"
              label-text="Input with Right Span Text"
              rightSpan
              :rightSpanText="'% off'"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_6"
              type="number"
              placeholder="Monthly Price"
              show-label
              leftSpan
              :leftSpanText="'USD$'"
              v-model="name"
              label-text="Input with Right Span Text & Left Span Text"
              rightSpan
              :rightSpanText="'/mo'"
              :rightSpanClass="'text-slate-500'"
            />
          </div>

          <div class="w-3/4 mb-4">
            <Input
              v-model="username"
              label="User name"
              type="text"
              theme="asterisk"
              rightSpan="<p>H1</p>"
              class="mb-2"
              :inputAttrs="{
                required: true,
                maxlength: 25,
                placeholder: 'Enter your text',
              }"
              :labelAttrs="{
                title: 'This is email label',
                class: 'text-blue-600',
              }"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_7"
              type="textarea"
              placeholder="Enter multiline text"
              show-label
              v-model="name"
              label-text="Input with Type Text Area"
              description="30/200 characters"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputDefaultComponent
              id="input_8"
              type="textarea"
              placeholder="Enter multiline text"
              show-label
              richTextEditor
              v-model:content="name"
              label-text="Textarea with Quills library"
              description="30/200 characters"
            />
          </div>
        </section>

        <section class="bg-gray-50 p-8 shadow-md mx-4 flex flex-col gap-6">
          <h1 class="text-3xl font-bold mb-4">Subscription Card Demo</h1>

          <!-- Basic Cards Row -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Basic Subscription Cards</h3>
            <div class="flex flex-wrap gap-6 justify-center">
              <!-- Gold Tier Card -->
              <SubscriptionCard
                title="Gold Tier"
                :price="1"
                currency="USD$"
                description="This is the gold tier. Better perks than the silver tier and definitely the free subscriptions. Golden plan."
                :stats="{ videos: 3, photos: 6, other: 2 }"
                :benefits="[
                  { highlight: '5 free tokens', text: ' per month' },
                  { highlight: '11% off', text: ' on all Merchandise' },
                  { highlight: '11% off', text: ' on all Pay to View videos' },
                  { highlight: '12% off', text: ' on all Custom Request' },
                ]"
                border-color="#07F468"
                accent-color="#07F468"
                background-color="#064e3b"
                hover-accent-color="#101828"
                button-color="#07F468"
                @subscribe="handleSubscribe('Gold')"
              />

              <!-- Silver Tier Card (Featured) -->
              <SubscriptionCard
                title="Silver Tier"
                :price="100"
                currency="USD$"
                description="This is the silver tier. More perks than the free subscription. This is the silver tier. More perks than the free subscription."
                :stats="{ videos: 1, photos: 2, other: 0 }"
                :benefits="[
                  {
                    highlight: '3 free tokens',
                    text: ' per month',
                    highlightColor: '#4D20ff',
                  },
                  {
                    highlight: '14% off',
                    text: ' on all Merchandise',
                    highlightColor: '#4D20ff',
                  },
                  {
                    highlight: '10% off',
                    text: ' on all Pay to View videos',
                    highlightColor: '#4D20ff',
                  },
                  {
                    highlight: '12% off',
                    text: ' on all Custom Request',
                    highlightColor: '#4D20ff',
                  },
                ]"
                :is-featured="true"
                border-color="#4d20ff"
                accent-color="#4d20ff"
                background-image="https://i.ibb.co/3Yr4FQD2/1377790.png"
                button-text="No followers yet"
                button-variant="disabled"
                featured-text="FEATURED"
                button-color="#4d20ff"
              />
            </div>
          </div>

          <!-- Custom Styled Cards -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Custom Styled Cards</h3>
            <div class="flex flex-wrap gap-6 justify-center">
              <!-- Premium Card -->
              <SubscriptionCard
                title="Premium Tier"
                :price="250"
                currency="USD$"
                description="The ultimate premium experience with exclusive benefits and priority support."
                :stats="{ videos: 10, photos: 25, other: 5 }"
                :benefits="[
                  { highlight: '15 free tokens', text: ' per month' },
                  { highlight: '25% off', text: ' on all Merchandise' },
                  { highlight: '20% off', text: ' on all Pay to View videos' },
                  { highlight: '30% off', text: ' on all Custom Request' },
                  { highlight: 'Priority support', text: ' 24/7' },
                ]"
                border-color="#f59e0b"
                accent-color="#f59e0b"
                hover-accent-color="#07F468"
                @subscribe="handleSubscribe('Premium')"
                button-color="#f59e0b"
                background-color=""
              />

              <!-- Basic Free Card -->
              <SubscriptionCard
                title="Free Tier"
                :price="0"
                currency="USD$"
                description="Start your journey with our free tier. Limited features but great for getting started."
                :stats="{ videos: 0, photos: 1, other: 0 }"
                :benefits="[
                  { highlight: '1 free token', text: ' per month' },
                  { highlight: '5% off', text: ' on first purchase' },
                  { highlight: 'Basic support', text: ' via email' },
                ]"
                border-color="#6b7280"
                accent-color="#6b7280"
                @subscribe="handleSubscribe('Free')"
                button-color="#6b7280"
                background-color=""
              />

              <!-- VIP Card -->
              <SubscriptionCard
                title="VIP Tier"
                :price="500"
                currency="USD$"
                description="Exclusive VIP treatment with unlimited access and premium perks."
                :stats="{ videos: 50, photos: 100, other: 20 }"
                :benefits="[
                  { highlight: 'Unlimited tokens', text: ' per month' },
                  { highlight: '50% off', text: ' on all Merchandise' },
                  { highlight: '40% off', text: ' on all Pay to View videos' },
                  { highlight: '60% off', text: ' on all Custom Request' },
                  { highlight: 'VIP support', text: ' with dedicated manager' },
                ]"
                :is-featured="true"
                border-color="#8b5cf6"
                accent-color="#8b5cf6"
                background-image="https://images.unsplash.com/photo-1557683316-973673baf926?w=400"
                featured-text="VIP"
                @subscribe="handleSubscribe('VIP')"
                button-color="#8b5cf6"
              />
            </div>
          </div>

          <!-- Disabled State Examples -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Disabled State Examples</h3>
            <div class="flex flex-wrap gap-6 justify-center">
              <!-- Sold Out Card -->
              <SubscriptionCard
                title="Limited Edition"
                :price="999"
                currency="USD$"
                description="Limited edition tier with exclusive content and benefits. Only available for a short time."
                :stats="{ videos: 20, photos: 50, other: 10 }"
                :benefits="[
                  { highlight: '25 free tokens', text: ' per month' },
                  { highlight: '35% off', text: ' on all Merchandise' },
                  { highlight: '30% off', text: ' on all Pay to View videos' },
                  { highlight: 'Exclusive content', text: ' access' },
                ]"
                border-color="#ef4444"
                accent-color="#ef4444"
                button-text="SOLD OUT"
                button-variant="disabled"
                :button-disabled="true"
                button-color="#6b7280"
                background-color=""
              />

              <!-- Coming Soon Card -->
              <SubscriptionCard
                title="Diamond Tier"
                :price="1000"
                currency="USD$"
                description="The most exclusive tier coming soon. Stay tuned for the ultimate experience."
                :stats="{ videos: 100, photos: 200, other: 50 }"
                :benefits="[
                  { highlight: 'Unlimited everything', text: '' },
                  { highlight: '70% off', text: ' on all services' },
                  { highlight: 'Personal assistant', text: ' included' },
                  { highlight: 'Exclusive events', text: ' access' },
                ]"
                border-color="#06b6d4"
                accent-color="#06b6d4"
                button-text="COMING SOON"
                button-variant="disabled"
                :button-disabled="true"
                button-color="#6b7280"
                background-color=""
              />
            </div>
          </div>
        </section>

        <!-- <SubscriptionCardExample /> -->

        <section class="bg-gray-50 px-6 mx-4 flex flex-col gap-6">
          <h1 class="text-2xl font-semibold">
            Form components with Dashboard Style
          </h1>
          <div class="w-3/4">
            <InputComponentDashbaord
              id="input_a"
              placeholder="Enter username"
              show-label
              v-model="name"
              label-text="Username"
              description="Usernames cannot be changed after your first month, but special circumstances may allow for exceptions. Please contact us if you need assistance with changing your username."
            />
          </div>

          <div class="w-3/4">
            <InputComponentDashbaord
              id="input_b"
              placeholder="Enter username..."
              show-label
              v-model="name"
              label-text="Username"
              description="Usernames cannot be changed after your first month, but special circumstances may allow for exceptions. Please contact us if you need assistance with changing your username."
              requiredDisplay="required-text-error"
              showErrors
              :errors="[
                {
                  error: 'Must be between 3 and 100 characters long',
                  icon: InformationCircleIcon,
                },
                {
                  error:
                    'Can contain any letters from a-z, any numbers from 0-9.',
                  icon: InformationCircleIcon,
                },
                {
                  error: 'Cannot contain space.',
                  icon: InformationCircleIcon,
                },
                {
                  error: 'Sorry, username \'minimay\' is taken',
                  icon: InformationCircleIcon,
                },
              ]"
            />
          </div>

          <div class="w-3/4">
            <InputComponentDashbaord
              id="input_b"
              placeholder="Enter username..."
              show-label
              v-model="name"
              label-text="Username"
              description="Usernames cannot be changed after your first month, but special circumstances may allow for exceptions. Please contact us if you need assistance with changing your username."
              onSuccess
              :success="[
                {
                  message: 'Must be between 3 and 100 characters long',
                  icon: CheckIcon,
                },
                {
                  message:
                    'Can contain any letters from a-z, any numbers from 0-9.',
                  icon: CheckIcon,
                },
                {
                  message: 'Cannot contain space.',
                  icon: CheckIcon,
                },
                {
                  message: 'Good news! Username \'notminimay\' is available!',
                  icon: CheckCircleIcon,
                },
              ]"
            />
          </div>

          <div class="w-3/4">
            <InputComponentDashbaord
              id="input_b"
              placeholder="Search with user id"
              show-label
              v-model="name"
              label-text="Co-performer (Optional)"
              :left-icon="MagnifyingGlassIcon"
              optionalLabel
              optionalLabelText=" If this media includes other performers, please tag them below."
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputComponentDashbaord
              id="input_c"
              placeholder="Account number in local or IBAN format"
              show-label
              v-model="name"
              label-text="Beneficiary Account"
              :right-icon="QuestionMarkCircleIcon"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputComponentDashbaord
              id="input_d"
              placeholder="Enter country"
              show-label
              v-model="name"
              label-text="Country"
              requiredDisplayText="Optional"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputComponentDashbaord
              id="input_e"
              type="number"
              show-label
              v-model="name"
              label-text="Merch Discount"
              rightSpan
              rightSpanText="% off"
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputComponentDashbaord
              id="input_f"
              type="number"
              show-label
              v-model="name"
              label-text="Original Price"
              rightSpan
              rightSpanText="Token/mo"
              leftSpan
              leftSpanText="USD$"
              description="Price must be between USD$ 1 to 1000."
            />
          </div>

          <div class="w-3/4 mb-4">
            <InputComponentDashbaord
              id="input_g"
              type="textarea"
              show-label
              v-model="name"
              textAreaRows="3"
              label-text="Dashboard Textarea"
              placeholder="Thank you for your tip!"
              description="0/200 characters"
            />
          </div>

          <div class="w-3/4 mb-4">
            <CheckboxGroup
              v-model="transferOptions"
              name="transfer-options"
              label="Checkbox Options"
              :options="transferOptionsList"
              version="dashboard"
            />
          </div>

          <div class="w-3/4 mb-4">
            <RadioGroup
              v-model="transferType"
              name="subscription"
              label="Subscription Tier"
              :options="transferTypeOptions"
              version="dashboard"
            />
          </div>

          <div class="w-3/4 mb-4">
            <CheckboxSwitch
              v-model="isChecked"
              label="Toggle Dark mode"
              version="dashboard"
              wrapper-label="Dark Mode"
              showWrapperLabel
            />
          </div>

          <Paragraph
            text="Options"
            fontSize="text-xl"
            fontWeight="font-semibold"
            fontColor="text-[#101828] "
          />

          <div>
            <InputComponentCheckbox
              v-model="selectedFeatures"
              type="checkbox"
              name="features"
              label="Checkbox Options"
            >
              <CheckboxOption
                v-for="option in featureOptions"
                :key="option.value"
                :id="`feature-${option.value}`"
                :value="option.value"
                :label="option.label"
                :tags="option.tags"
              />
            </InputComponentCheckbox>
          </div>
          <div>
            <InputComponentCheckbox
              v-model="selectedPlan"
              type="radio"
              name="plan"
              label="Subscription Tier"
            >
              <CheckboxOption
                v-for="option in planOptions"
                :key="option.value"
                :id="`plan-${option.value}`"
                :value="option.value"
                :label="option.label"
              />
            </InputComponentCheckbox>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthDemo from "./AuthDemo.vue";
import Paragraph from "./default/Paragraph.vue";
import Heading from "./default/Heading.vue";
import Button from "./button/ButtonComponent.vue";
import InputDefaultComponent from "./input/InputDefaultComponent.vue";
import Input from "./input/Input.vue";
import InputComponentDashbaord from "./input/InputComponentDashboard.vue";
import CheckboxGroup from "./checkbox/CheckboxGroup.vue";
import RadioGroup from "./RadioGroup.vue";
import CheckboxSwitch from "./checkbox/CheckboxSwitch.vue";
import InputComponentCheckbox from "./checkbox/InputComponentCheckbox.vue";
import CheckboxOption from "./checkbox/CheckboxOption.vue";
import NotificationCard from "./card/notification/NotificationCard.vue";
import SubscriptionCard from "./card/subscription/SubscriptionCard.vue";
import ButtonBase from "./button/ButtonBase.vue";
import TwoPieceButton from "./button/TwoPieceButton.vue";
import greentick from "../../assets/images/greentick.webp";
import {
  PaperClipIcon,
  EnvelopeIcon,
  EyeIcon,
  InformationCircleIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/solid";
import Checkbox from "@/components/ui/form/checkbox/CheckboxGroup.vue";
import Radio from "@/components/ui/form/radio/dashboard/RadioGroup.vue";


// Basic refs
const selectedOption = ref(null);
const rememberMe = ref(false);
const name = ref("");
const checkBoxGroup = ref("");
const isChecked = ref(false);
const username = ref("");
const showCustom = ref(true);
const selectedRadio = ref("");
const selectedFeatures = ref([]);
const selectedPlan = ref([]);

const transferType = ref("subscription");
const transferTypeOptions = [
  { value: "choice-a", label: "Choice A" },
  { value: "choice-b", label: "Choice B" },
  { value: "choice-c", label: "Choice C" },
];

const transferOptions = ref([]);
const transferOptionsList = [
  {
    value: "free-plan",
    label: "Free Plan",
    tags: [{ text: "Published Tier", variant: "blue" }],
    version: "dashboard",
  },
  {
    value: "free-plan-draft",
    label: "Free Plan",
    tags: [{ text: "Draft", variant: "gray" }],
    version: "dashboard",
  },
  {
    value: "verified",
    label:
      'I have verified, preserved and currently hold all identification cards and documents required under Record Keeping Requirements, 18 U.S.C. 2257 and 28 C.F.R. 75, or applicable laws in any other jurisdictions, countries, and territories ("2257 documentation"), for all individuals appearing in the Content.',
    version: "dashboard",
  },
];

const featureOptions = [
  {
    value: "free-plan",
    label: "Free Plan",
    tags: [{ text: "Published Tier", variant: "#d1e0ff" }],
  },
  {
    value: "free-plan-again",
    label: "Free Plan",
    tags: [{ text: "Draft", variant: "" }],
  },
  {
    value: "verified",
    label:
      "I have verified, preserved and currently hold all identification cards and documents required under Record Keeping Requirements, 18 U.S.C. 2257 and 28 C.F.R. 75, or applicable laws in any other jurisdictions, countries, and territories ('2257 documentation'), for all individuals appearing in the Content.",
  },
];

const planOptions = [
  { value: "choice-a", label: "Choice A" },
  { value: "Choice-b", label: "Choice B" },
  { value: "Choice-c", label: "Choice C" },
];

// Handlers
const handleSubscribe = (tier) => {
  console.log(`Subscribing to ${tier} tier`);
  alert(`You clicked subscribe for ${tier} tier!`);
};
</script>

<style scoped></style>
