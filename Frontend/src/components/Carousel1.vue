<template>
  <div class="carousel">
    <button class="mt-5 mb-5 block text-center text-3xl text-[#7f5539] p-2 font-bold" @click="prevSlide">Previous</button>
    <img :src="currentSlide.image" :alt="currentSlide.alt" />
    <button class="mt-5 mb-5 block text-center text-3xl text-[#7f5539] p-2 font-bold" @click="nextSlide">Next</button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      slides: [
        { id: 1, image: '/images/3.png', alt: 'Image 1' },
        { id: 2, image: '/images/4.png', alt: 'Image 2' },
        { id: 3, image: '/images/goose.png', alt: 'Image 3' },
        { id: 4, image: '/images/5.png', alt: 'Image 4' },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex];
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    },
  },
};
</script>
  
<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 600px;
  /* sau dimensiunea dorită */
  margin: auto;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

button:nth-child(1) {
  left: 0;
}

button:nth-child(3) {
  right: 0;
}
</style>
  