<template>
  <el-carousel indicator-position="outside"
              
               height="400px"
               align="center">
    <el-carousel-item v-for="(item, index)  in photoList"
                      :key="index"
                      style="text-align:center">
      <img :src="item"
           style=" width: 100%;height: auto;  ">
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "carousel-image",
  props: {
    photoList: { type: Array },
    interval: {
      type: Number,
      default: () => 4000
    }
  },
  data() {
    return {};
  }
});
</script>

