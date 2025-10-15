<script setup>
import ButtonComponent from '@/components/dev/button/ButtonComponent.vue';
import Heading from '@/components/dev/default/Heading.vue';
import Paragraph from '@/components/dev/default/Paragraph.vue';

</script>

<template>
    <div class="p-4 bg-gray-500/50 [caret-color:transparent] w-[300px] sm:w-[400px] rounded-lg flex flex-col gap-4">
    <Heading text="This website uses cookies." tag="h4" theme="AuthHeading" />
     <Paragraph
              text="We use cookies to analyze website traffic and optmize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data."
              font-size="text-base"
              font-weight="font-[400]"
              font-color="text-white"
            />
    
    <ButtonComponent text="Accept" variant="authPink" size="lg" />
    
    </div>
</template>