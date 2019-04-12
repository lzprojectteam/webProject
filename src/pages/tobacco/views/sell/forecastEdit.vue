 <template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
        <el-form-item :label="$t('tobacco.tsell.forecast.frequency')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.frequency" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.forecast.contractId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.forecast.contractNumber')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.forecast.contractName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractName" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.forecast.pictures')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.pictures" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.forecast.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
        </el-form-item>
        <el-form-item>
            <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import forecastApi from '../../api/tsell/api_forecast';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        frequency: 0,
        contractId: '',
        contractNumber: '',
        contractName: '',
        pictures: '',
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
          Promise.all([forecastApi.updateForecast(this.item.id, this.formItem)])
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
