<template>
  <ur-carousel class="carousel-demo" direction="horizontal">
    <ur-carousel-item v-for="item in items" :key="item.id">
      <img :src="item.imgSrc" />
    </ur-carousel-item>
  </ur-carousel>

  <ur-carousel class="carousel-demo" direction="horizontal" trigger="click">
    <ur-carousel-item v-for="item in items" :key="item.id">
      <img :src="item.imgSrc" />
    </ur-carousel-item>
  </ur-carousel>

  <ur-carousel class="carousel-demo" direction="horizontal" trigger="click" arrow="always">
    <ur-carousel-item v-for="item in items" :key="item.id">
      <img :src="item.imgSrc" />
    </ur-carousel-item>
  </ur-carousel>

  <ur-carousel class="carousel-demo" direction="vertical" trigger="click">
    <ur-carousel-item v-for="item in items" :key="item.id">
      <img :src="item.imgSrc" />
    </ur-carousel-item>
  </ur-carousel>
</template>

<script>
import image1 from '@/assets/img/carousel/image-1.jpg';
import image2 from '@/assets/img/carousel/image-2.jpg';
import image3 from '@/assets/img/carousel/image-3.jpg';

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          imgSrc: image1,
        },
        {
          id: 2,
          imgSrc: image2,
        },
        {
          id: 3,
          imgSrc: image3,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.carousel-demo {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>
