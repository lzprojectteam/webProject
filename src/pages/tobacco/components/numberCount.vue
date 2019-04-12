<template>
  <div class="number-content">
    <div class="number-content-title">
      {{title}}
    </div>
    <div class="number-content-count">
      {{data}}
    </div>
    <div class="number-content-title-describe">
      {{describe}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: { type: String },
    data: { type: String },
    describe: { type: String }
  },
  data() {
    return {};
  }
});
</script>
<style scoped>
.number-content {
  border-bottom: 1px solid black;
  transition: 0.2s;

  padding: 5px;
}
.number-content-title {
  font-size: 18px;
  text-align: left;
}
.number-content-count {
  font-size: 40px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.number-content-title-describe {
  font-size: 18px;
  margin-top: 10px;
  text-align: right;
}
</style>

