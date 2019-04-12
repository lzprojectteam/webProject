<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.area.countryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.countryId" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.areaId')"
                  prop="areaId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.areaId" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.prefix')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.prefix" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.depth')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.depth" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.ext')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.ext" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.area.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
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
import areaApi from "../../api/xbasic/apiArea";
export default {
  data() {
    return {
      formItem: {
        countryId: "86",
        areaId: "",
        prefix: "",
        name: "",
        depth: 0,
        ext: 0,
        desc: ""
      },
      ruleValidate: {
        areaId: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([areaApi.saveArea(this.formItem)])
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
