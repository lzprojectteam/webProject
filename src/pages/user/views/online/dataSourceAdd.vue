<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('dataSource.title')"
                  prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('dataSource.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('dataSource.url')"
                  prop="url">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.url" />
    </el-form-item>
    <el-form-item :label="$t('dataSource.driverClassName')"
                  prop="driverClassName">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.driverClassName" />
    </el-form-item>

    <el-form-item :label="$t('dataSource.userName')"
                  prop="userName">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.userName" />
    </el-form-item>
    <el-form-item :label="$t('dataSource.password')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.password"
                type="password" />
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
import dataSourceApi from "../../api/online/apiDataSource";

export default {
  data() {
    return {
      formItem: {
        title: "",
        name: "",
        url: "",
        userName: "",
        password: "",
        driverClassName: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        url: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        driverClassName: [
          { required: true, message: "驱动不能为空", trigger: "blur" }
        ],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([dataSourceApi.saveDataSource(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
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
