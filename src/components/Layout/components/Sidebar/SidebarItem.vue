<template>
  <div>
    <router-link v-if="routes.child.length===0"
                 :to="formatUrl(routes)"
                 :index="routes.url">
      <el-menu-item :index="'system.entry'+routes.url"
                    class="'submenu-title-noDropdown'">
        <template v-if="routes.icon===undefined||(routes.icon.indexOf('el-')===-1&&routes.icon.indexOf('iconfont')===-1)">
          <svg-icon :icon-class="routes.icon===''?'windows':routes.icon"></svg-icon>
        </template>
        <template v-else>
          <i :class="routes.icon==''?'el-icon-menu':routes.icon"
             class="icon-cus"></i>
        </template>
        <span>{{routes.title}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else
                :index="routes.id">
      <template slot="title">
        <template v-if="routes.icon===undefined||(routes.icon.indexOf('el-')===-1&&routes.icon.indexOf('iconfont')===-1)">
          <svg-icon :icon-class="routes.icon===''?'windows':routes.icon"></svg-icon>
        </template>
        <template>
          <i :class="routes.icon==''?'el-icon-menu':routes.icon"
             class="icon-cus"></i>
        </template>
        <span>{{routes.title}}</span>
      </template>
      <template v-for="item in routes.child">
        <sidebar-item :routes="item"
                      :key="item.id"></sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
// import {generateTitle} from '@/utils/i18n';
import { mapGetters } from "vuex";
import { encodeCipher } from "@/utils/cryptoUtils";
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Object
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    formatUrl(routes) {
      let index = routes.url.indexOf("?");
      let url = routes.url;
      let param = {};
      if (index !== -1) {
        url = url.substring(0, index);
        let tmp = routes.url.substring(index + 1);
        let plist = tmp.split("&");
        for (var i = 0; i < plist.length; i++) {
          let tp = plist[i].split("=");
          param[tp[0]] = tp[1];
        }
      }
      return {
        path: encodeCipher(routes.url),
        query: param
      };
    }
  },
  computed: {
    ...mapGetters(["system"])
  }
};
</script>

