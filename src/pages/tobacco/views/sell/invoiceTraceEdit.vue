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
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import invoiceTraceApi from '../../api/tsell/api_invoiceTrace';
export default {
  props: ['item', 'isEdit', 'visible'],
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
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            invoiceTraceApi.updateInvoiceTrace(this.item.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset('formValidate');
              this.$message({
                message: this.$t('message.editAndExid'),
                type: 'success',
              });
              this.$emit('update:visible', false);
              this.$emit('refresh');
            })
            .catch(error => {});
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
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
