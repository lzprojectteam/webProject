<template>
  <div>
    <div class="header Cgreen">
      <div class="wrapper clearfix">

        <span class="QRspan">

        </span>
      </div>
    </div>
    <div class="loginContent">
      <div class="wrapper">
        <img class="bg1"
             src="./../style/css/bg1.png" />
        <div class="loginBox">
          <div class="logo"></div>
          <div class="formDiv">
            <form action=""
                  method="post">
              <label class="user">
                <input type="text"
                       v-model="username"
                       placeholder="请输入用户名" />
                <i class="iconfont">&#xe614;</i>
              </label>
              <label class="pwd">
                <input type="password"
                       v-model="password"
                       placeholder="请输入密码" />
                <i class="iconfont">&#xe615;</i>
              </label>
              <div class="pwdOper">
                <span class="remember">
                  <label>
                    <input type="checkbox"
                           class="hide"
                           v-model="remember" />
                    <span class="checkbox"></span>
                    记住用户名
                  </label>
                </span>
                <a class="forget Cred"
                   href="javascript();">忘记密码?</a>
              </div>
              <a href="javascript:;"
                 class="submit"
                 @click="onLoginClick">登 录</a>
              <qrcode :value="qrcodeUrl"
                      style="height: 100px;margin-top:-15px; margin-left: -650px;"
                      :options="{ size: 170 }">凉烟生产</qrcode>

            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="wrapper">
        <span>Copyright © 2005-2018 www.casit.com.cn 版权所有 </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { setUser, getUser, setFiled } from "@/utils/userUtils";
import { setToken } from "@/utils/cookieUtils";
import Vue from "vue";
import apiUser from "@/api/base/apiUser";
import QRcode from "@xkeshi/vue-qrcode";
export default Vue.extend({
  name: "home",
  data() {
    return {
      username: "",
      password: "",
      remember: false,
      qrcodeUrl:
        window.location.origin + "/upload/app/" + process.env.VUE_APP_APK_NAME
    };
  },
  mounted() {
    let user = getUser();
    this.remember = user.remember;
    this.username = user.username;
  },
  components: {
    qrcode: QRcode
  },
  methods: {
    onLoginClick() {
      let that = this;
      apiUser
        .loginByUserName(this.username, this.password)
        .then((response: any) => {
          let user = getUser();
          user.remember = that.remember;
          if (this.remember) {
            user.username = that.username;
          } else {
            user.username = "";
          }
          setUser(user);
          setToken(response.token);
          window.location.href = "/";
        })
        .catch(error => {
          if (error.response.data.code === "400") {
            that.$notify({
              title: "提示",
              message: "用户名或者密码错误",
              type: "warning"
            });
          } else {
            that.$notify({
              title: "提示",
              message: "登陆异常",
              type: "warning"
            });
            console.log(error);
          }
        });
    }
  }
});
</script>
<style  scoped >
@import "../style/css/base.scss";
</style>