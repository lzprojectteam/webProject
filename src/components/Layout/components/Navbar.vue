<template>
  <el-menu class="navbar"
           mode="horizontal">
    <hamburger class="hamburger-container"
               :toggleClick="toggleSideBar"
               :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <div id="clock">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
      </div>
      <error-log class="errLog-container right-menu-item"></error-log>

      <el-tooltip effect="dark"
                  :content="$t('navbar.screenfull')"
                  placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <el-dropdown @command="systemCommand"
                   v-if="systemList.length>1"
                   v-show="false">
        <span class="el-dropdown-link"
              style="cursor: pointer;color:black">
          {{ formateSystemTitle() }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for=" item in systemList"
                            :command="item.id"
                            :key="item.id">
            {{ item.title}}
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          <span class="el-dropdown-link userinfo-inner"
                style="color:black">
            {{$store.state.user.userName}}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button plain type="text"
                       @click="changePassForm=true">{{ $t('user.changePassword') }}
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;"
                  @click="personalForm=true">{{$t('navbar.personal')}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout"
                  style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <template>
      <el-dialog :title="$t('user.changePassword')"
                 :visible.sync="changePassForm"
                 width="400px">
        <change-password :visible.sync="changePassForm" />
      </el-dialog>
    </template>
    <el-dialog :title="$t('navbar.personal')"
               :visible.sync="personalForm"
               width="400px">
      <personal :visible.sync="personalForm" />
    </el-dialog>
  </el-menu>

</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import API from "@/api/base/apiUser.js";
import ChangePassword from "@/components/Profile/changePassword.vue";
import personal from "@/components/Profile/personal.vue";
import { getSystemId, setSystemId } from "@/utils/cookieUtils";

export default {
  data() {
    return {
      changePassForm: false,
      personalForm: false,
      time: "",
      date: "",
      systemList: [] // 系统列表
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    "change-password": ChangePassword,
    personal
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  created() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    Promise.all([API.checkSystem()])
      .then(([response]) => {
        this.systemList = response; //设置系统列表
      })
      .catch(error => {
        // 自定义错误处理
      });
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    updateTime() {
      var week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];

      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    systemCommand(sid) {
      setSystemId(sid);
      this.$router.push("/");
      location.reload();
    },
    formateSystemTitle() {
      var system = this.systemList.find(function(x) {
        return x.id === getSystemId();
      });
      return system.title;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: lightseagreen;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

#clock {
  font-family: "Share Tech Mono", monospace;
  color: #000;
  text-align: center;
  //text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
  display: inline;
  margin-right: 10px;
}

#clock .time {
  letter-spacing: 0.05em;
  font-size: 14px;
  padding: 5px 0;
}

#clock .date {
  letter-spacing: 0.1em;
  font-size: 14px;
}

#clock .text {
  letter-spacing: 0.1em;
  font-size: 14px;
  padding: 20px 0 0;
}
</style>
