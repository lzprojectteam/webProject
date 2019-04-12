<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           status-icon>
    <el-form-item :label="$t('user.loginName')"
                  prop="loginName">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.loginName" />
    </el-form-item>
    <el-form-item :label="$t('user.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>

    <el-form-item :label="$t('user.password')"
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
    <el-form-item :label="$t('user.phone')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.phone"
                clearable />
    </el-form-item>
    <el-form-item :label="$t('user.mobile')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.mobile"
                clearable />
    </el-form-item>
    <el-form-item :label="$t('user.email')"
                  prop="email">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.email"
                clearable />
    </el-form-item>
    <el-form-item :label="$t('user.no')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.no"
                clearable />
    </el-form-item>

    <el-form-item :label="$t('user.district')">
      <el-cascader :options="districtOptions"
                   v-model="selectedOptions"
                   @change="handleChange"
                   show-all-levels
                   change-on-select
                   ref="org"
                   clearable
                   :props="props"
                   v-loading="loading"
                   style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('user.state')">
      <el-select v-model="formItem.state"
                 style="width: 100%">
        <el-option value=1
                   :label="$t('user.state1')" />
        <el-option value=5
                   :label="$t('user.state5')" />
        <el-option value=7
                   :label="$t('user.state7')" />
      </el-select>
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
import districtApi from "@/api/xbasic/apiDistrict";
export default {
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
      loading: false,
      formItem: {
        name: "",
        loginName: "",
        mobile: "",
        no: "",
        phone: "",
        state: "1",
        password: "",
        email: "",
        confirmPassword: "",
        districtId: "",
        districtName: ""
      },
      ruleValidate: {
        loginName: [
          {
            required: true,
            message: "登陆名至少3个字符",
            trigger: "blur",
            min: 3,
            max: 32
          }
        ],
        name: [
          {
            required: true,
            message: "登陆名至少2个字符",
            trigger: "blur",
            min: 2
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        email: [
          { type: "email", message: "请输入有效邮箱,参考格式：tom@msn.com" }
        ]
      },
      selectedOptions: [],
      districtOptions: [],
      props: {
        value: "id",
        label: "name"
      }
    };
  },
  created() {
    this.loadDistrictData();
  },
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
          Promise.all([userApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.selectedOptions = [];
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              this.$message({
                message: error.message,
                type: "error"
              });
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
    },
    handleChange(value) {
      console.log(value, this.$refs["org"].currentLabels);
      this.formItem.districtId = value[value.length - 1];
      let labels = this.$refs["org"].currentLabels;
      this.formItem.districtName = labels[labels.length - 1];
    },
    loadDistrictData() {
      Promise.all([districtApi.getByLead(0, 0)])
        .then(([response]) => {
          this.districtOptions = response;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    }
  }
};
</script>
