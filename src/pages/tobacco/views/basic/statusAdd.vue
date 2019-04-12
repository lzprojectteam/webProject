<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.status.id')"
                  prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.id" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.status.lead')"
                  prop="lead">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.lead" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.status.leaf')"
                  prop="leaf">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.leaf" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.status.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.status.visible')"
                  prop="visible">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.status.desc')"
                  prop="desc">
      <el-input type="textarea"
                v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import statusApi from "@/api/tobacco/apiStatus";

export default {
  data() {
    return {
      formItem: {
        id: "",
        lead: "",
        leaf: "",
        name: "",
        visible: "",
        desc: ""
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
        if (valid) {
          Promise.all([statusApi.saveStatus(this.formItem)])
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
