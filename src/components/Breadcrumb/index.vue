<template>
  <el-breadcrumb class="app-breadcrumb"
                 separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/dashboard' }"
                          key="1000">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index)  in levelList"
                          :key="item+index">
        <span>{{item}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from "@/utils/i18n";
import { mapGetters } from "vuex";

export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  computed: {
    ...mapGetters(["getTitleList"])
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      /*
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'dashboard') {
          matched = [{path: '/dashboard', meta: {title: 'dashboard'}}].concat(matched)
        }
        */
      if (this.$route.meta !== undefined && this.$route.meta.id !== undefined) {
        this.levelList = this.getTitleList(this.$route.meta.id);
      } else {
        this.levelList = [];
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
