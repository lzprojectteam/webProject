<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.price.annual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.annual" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.price')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.price" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.priceUnit')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.priceUnit" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.tax')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.tax" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.freight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.freight" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.begin')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.begin" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.end')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.end" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.active')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.active" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.price.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
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
import priceApi from "../../api/tmaterial/apiPrice";
export default {
  data() {
    return {
      formItem: {
        annual: 0,
        price: 0,
        priceUnit: 0,
        tax: 0,
        freight: 0,
        begin: "",
        end: "",
        active: true,
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
          Promise.all([priceApi.save(this.formItem)])
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
