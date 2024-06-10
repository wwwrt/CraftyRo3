<template>
    <div id="app">
      <div class="content">
        <div class="flex flex-col lg:flex-row items-center justify-center">
      <ImageComponent
        v-for="(image, index) in modifiedImagesData"
        :key="index"
        :imageSrc="image.src"
        :altText="image.alt"
      />
    </div>
    
        <div
          class="flex mt-8 mb-8 text-[2rem] md:text-[3rem] lg:text-[4rem] justify-center text-center text-[#d4a373] hover:font-bold ">
          Top crafts of november</div>
  
        <Carousel1 />
      </div>
  
      <div
          class="flex mt-8 mb-8 text-[2rem] md:text-[3rem] lg:text-[4rem]  justify-center text-center text-[#d4a373] font-bold hover:text-[#faedcd] hover:bg-[#d4a373] rounded cursor-pointer">
          <RouterLink :to="{name: 'exhibition'}">Go and see 'em ALL!</RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import Carousel1 from '/src/components/Carousel1.vue'
  import ImageComponent from '/src/components/HomeImages.vue'
  import imagesData from '/data/imagesData.json'
  
  //pentru ca prima imagine sa se mai repete o dată
  const modifiedImagesData = [...imagesData, imagesData[0]];
  
  </script>
  
  <style scoped>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  