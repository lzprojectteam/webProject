<template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.invoiceId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.invoiceId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.timeId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.timeId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.code')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.action')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.action" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.operator')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operator" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.message')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.message" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.loginId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.loginName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginName" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.invoiceTrace.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import invoiceTraceApi from '../../api/tsell/api_invoiceTrace';
export default {
  data() {
    return {
      formItem: {
        invoiceId: '',
        timeId: 0,
        code: 0,
        action: '',
        operator: '',
        message: '',
        loginId: 0,
        loginName: '',
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '处理中,请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          Promise.all([invoiceTraceApi.saveInvoiceTrace(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
              loading.close();
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
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
