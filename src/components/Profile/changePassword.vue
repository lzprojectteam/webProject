<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           status-icon>
    <el-form-item :label="$t('user.oldPassword')"
                  prop="oldPassword">
      <el-input v-model="formItem.oldPassword"
                :placeholder="$t('base.pleaseInput')"
                type="password"></el-input>
    </el-form-item>

    <el-form-item :label="$t('user.newPassword')"
                  prop="password">
      <el-input v-model="formItem.password"
                :placeholder="$t('base.pleaseInput')"
                type="password"></el-input>
    </el-form-item>
    <el-form-item :label="$t('user.confirmPassword')"
                  prop="confirmPassword">
      <el-input v-model="formItem.confirmPassword"
                :placeholder="$t('base.pleaseInput')"
                type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import userApi from "@/api/base/apiUser";

export default {
  props: ["visible"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formItem.password !== "") {
          this.$refs.formValidate.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formItem.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formItem: {
        oldPassword: "",
        password: "",
        confirmPassword: ""
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      if (
        this.formItem.password === undefined ||
        this.formItem.password === ""
      ) {
        this.$message({
          message: this.$t("user.passwordNotNull"),
          type: "info"
        });
      }
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([
            userApi.changePass(this.$store.state.user.loginName, this.formItem)
          ])
            .then(([response]) => {
              this.$message({
                message: response,
                type: "success"
              });
              this.formReset(name);
              //重置表单，允许多次操作
              this.$emit("update:visible", false);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },

    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
