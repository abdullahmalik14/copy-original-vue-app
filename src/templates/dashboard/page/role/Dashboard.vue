<template>
  <DashboardWrapperTwoColContainer>
    <p class="mb-4">This is Dashboard for global</p>
    <Cookies />

    <ButtonComponent text="Cancel" variant="hoverBgWhite" size="lg" />

    <br />

    <ButtonComponent text="Save" variant="greyBg" size="lg" />

    <br />

    <ButtonComponent
      text="Add Tier"
      variant="polygonLeft"
      :leftIcon="'https://i.ibb.co/N2xH2QVV/svgviewer-png-output-13.webp'"
      :leftIconClass="`
    w-6 h-6 transition duration-200 group-hover:filter-none
    [filter:brightness(0)_saturate(100%)_invert(75%)_sepia(23%)_saturate(7280%)_hue-rotate(93deg)_brightness(109%)_contrast(95%)]
  `"
    />

    <br />

    <ButtonComponent
      text="Save"
      variant="polygonRight"
      :leftIcon="'https://i.ibb.co/Sw3WhF1p/svgviewer-png-output-9.webp'"
      :leftIconClass="`
  w-6 h-6 transition duration-200
  filter brightness-0 invert
  group-hover:[filter:brightness(0)_saturate(100%)_invert(0%)_sepia(96%)_saturate(7494%)_hue-rotate(96deg)_brightness(112%)_contrast(97%)]
`"
    />

    <br />

    <ButtonComponent
      text="Next"
      variant="polygonLeft"
      :rightIcon="'https://i.ibb.co/hx8ztZFf/svgviewer-png-output-8.webp'"
      :rightIconClass="`
  w-6 h-6 transition duration-200
  filter brightness-0 invert-0   /* Default: black */
  group-hover:[filter:brightness(0)_saturate(100%)_invert(75%)_sepia(23%)_saturate(7280%)_hue-rotate(93deg)_brightness(109%)_contrast(95%)]
`"
      :addClass="`
    [--btn-bg:#07f468]           /* normal bg */
    [--btn-hover-bg:black]     /* hover bg */
    [--btn-text:#black]            /* text */
    [--btn-hover-text:#07f468]      /* hover text */
  `"
    />
      
  <OrderReceived/>

    
  </DashboardWrapperTwoColContainer>
</template>

<script setup>

import DashboardWrapperTwoColContainer from "@/components/dashboard/DashboardWrapperTwoColContainer.vue";
import ButtonComponent from "@/components/dev/button/ButtonComponent.vue";
import Cookies from "@/components/ui/badge/dashboard/Cookies.vue";
import OrderReceived from "@/components/ui/table/dashboard/OrderReceived.vue";
</script>
