<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <template>
        <keep-alive v-if="!$route.meta.noCache">
          <router-view ></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </template>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>
