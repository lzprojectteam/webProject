 <template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate" :disabled="isEdit">
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.date')">
      <el-date-picker v-model="formItem.date" type="date" value-format="yyyy-MM-dd" style="width:100%;" :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.bakeAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bakeAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.finishAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.finishAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.topMatureAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.topMatureAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.operator')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operator" />
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import bakeProgressApi from '../../api/tsell/api_bakeProgress';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        date: '',
        bakeAmount: 0,
        finishAmount: 0,
        topMatureAmount: 0,
        operator: '',
        siteOperator: '',
        countyOperator: '',
        level: '',
        status: 0
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
            bakeProgressApi.updateBakeProgress(this.item.id, this.formItem)
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
