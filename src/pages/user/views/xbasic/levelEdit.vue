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
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">
        {{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import levelApi from "../../api/xbasic/apiLevel";

export default {
  props: ["item", "isEdit", "visible"],
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
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([levelApi.updateLevel(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {});
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
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
