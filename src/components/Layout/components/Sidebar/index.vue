<style scoped>
.systemIcon {
  position: fixed;
  left: 0;
  top: 0;
  display: inline-block;
  width: 200px;
  /*text-align: center;*/
  background: #ffffff;
  /*padding: 15px 0px 15px 0px;*/
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 9999;
  height: 50px !important;
  text-align: center;
  padding: 5px;
  background: lightseagreen;
}
.systemIcon img {
  width: 190px;
}
.userPart {
  margin-top: 50px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  white-space: nowrap;
  height: 57px;
  color: #4a4a4a;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.user-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 160px;
  padding: 0px;
}
.profile-image {
  width: 40px;
  height: 40px;
}
.profile-image img {
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  opacity: 0.5;
}
.text-wrapper {
  margin-left: 15px;
  line-height: 1;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
}
.profile-name {
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 18px;
  color: black;
}
.designation {
  color: black !important;
}
</style>
<template>
  <div>
    <router-link to="/dashboard"
                 v-show="!isCollapse">
      <h1 class="systemIcon">
        <img src="@/styles/image/logo.png"
             alt="systemLogo"
             style="width: auto;	height: auto;	max-width: 100%;	max-height: 100%;">
      </h1>
    </router-link>
    <div class="userPart"
         v-show="!isCollapse">
      <div class="user-wrapper">
        <div class="profile-image">
          <img :src="avatar"
               style="width:40px;height:40px"
               alt="profile image">
        </div>
        <div class="text-wrapper">
          <p class="profile-name"
             v-text="username"></p>
          <div>
            <el-tooltip :content="organization2"
                        placement="top">
              <small class="designation text-muted"
                     v-text="organization"></small>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <scroll-bar>

      <el-menu mode="vertical"
               class="el-menu-vertical-demo"
               :default-active="$route.path"
               :collapse="isCollapse">
        <div class="menu-wrapper">

          <template v-for="item in menus">
            <sidebar-item :routes="item"
                          :key="item.id" />
          </template>
          <div>
            <el-submenu index="1"
                        v-if="systemList.length>1">
              <template slot="title">
                <template>
                  <i class="icon-cus iconfont el-iconfont-manage"></i>
                </template>
                <span slot="title">更多系统</span>
              </template>
              <template v-for=" item in systemList">
                <router-link :key="item.id "
                             to="/"
                             @click.native='redirect(item)'>

                  <el-menu-item :index="item.id">
                    <template>
                      <i class="icon-cus iconfont el-iconfont-manage"></i>
                    </template>
                    <span>{{ item.title}}</span>
                  </el-menu-item>
                </router-link>
              </template>

            </el-submenu>
          </div>
        </div>
      </el-menu>
    </scroll-bar>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";
import API from "@/api/base/apiUser.js";
import { getUser, setUser } from "@/utils/userUtils";
import { setSystemId } from "@/utils/cookieUtils";
export default {
  data() {
    return {
      systemList: [] // 系统列表
    };
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["menus", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    systemName() {
      return this.$store.getters.system.title;
    },
    username() {
      let length = this.$store.getters.user.userName.length;
      if (length <= 7) {
        return this.$store.getters.user.userName;
      } else {
        return this.$store.getters.user.userName.slice(0, 6) + "...";
      }
    },
    organization() {
      if (!this.$store.getters.user.organization) {
        return "未设置组织单位";
      }
      let length = this.$store.getters.user.organization.organizationName
        .length;
      if (length <= 7) {
        return this.$store.getters.user.organization.organizationName;
      } else {
        return (
          this.$store.state.user.organization.organizationName.slice(0, 8) +
          "..."
        );
      }
    },
    organization2() {
      if (!this.$store.state.user.organization) {
        return "未设置组织单位";
      }
      return this.$store.state.user.organization.organizationName;
    },
    banner() {
      return this.$store.state.user.system.banner;
    },
    avatar() {
      let length = this.$store.getters.user.avatar.length;
      if (
        this.$store.getters.user.avatar === undefined ||
        this.$store.getters.user.avatar === ""
      ) {
        return "@/styles/image/head.jpg";
      } else {
        return this.$store.getters.user.avatar;
      }
    }
  },
  created() {
    Promise.all([API.checkSystem()])
      .then(([response]) => {
        this.systemList = response; //设置系统列表
      })
      .catch(error => {
        // 自定义错误处理
      });
  },
  methods: {
    redirect(system) {
      let user = getUser();
      user.systemId = system.id;
      user.index = system.entry;
      setUser(user);
      setSystemId(system.id);
      window.location.href = system.entry;
    }
  }
};
</script>
<style>
.icon-cus {
  margin-right: 5px;
  font-size: 16px;
  text-align: center;
  font-family: element-icons;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.systemBanner {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 10px;
}
.more-system {
  font-size: 14px;
  color: #fff;
}
</style>
