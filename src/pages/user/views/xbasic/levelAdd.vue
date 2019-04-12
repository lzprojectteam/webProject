<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.level.lead')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.lead" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.level.leaf')">
      <el-switch v-model="formItem.leaf" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.level.prefix')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.prefix" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.level.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.level.depth')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.depth" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.level.ext')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.ext" />
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
import levelApi from "../../api/xbasic/apiLevel";

export default {
  data() {
    return {
      formItem: {
        lead: "",
        leaf: true,
        prefix: "",
        name: "",
        depth: 0,
        ext: 0
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([levelApi.saveLevel(this.formItem)])
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
