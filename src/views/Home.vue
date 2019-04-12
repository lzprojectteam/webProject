<template>
  <div class="home">
    <not-found v-if="show"
               front="/login.html"
               frontName="返回登陆" />

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotFound from "@/components/errorPage/404.vue"; // @ is an alias to /src
export default Vue.extend({
  name: "home",
  data() {
    return {
      show: false
    };
  },
  components: {
    NotFound
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: "正在加载系统，请稍等",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    setTimeout(() => {
      loading.close();
      this.show = true;
    }, 5000);
  }
});
</script>
