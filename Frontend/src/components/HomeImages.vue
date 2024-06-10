
<template>
    <div>
      <img
        :src="imageSrc"
        :alt="altText"
        class="scale-up-center w-44 h-56 sm:w-60 sm:h-80 md:w-[15rem] md:h-[20rem] lg:w-[20rem] lg:h-[30rem] xl:w-[25rem] xl:h-[40rem] mx-2 my-4 rounded-3xl"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  