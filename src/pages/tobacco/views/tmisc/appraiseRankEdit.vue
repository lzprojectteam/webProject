 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.appraiseRank.appraiseId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.appraiseId"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraiseRank.rankId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.rankId"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraiseRank.point')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.point"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraiseRank.score')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.score"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraiseRank.desc')">
      <el-input
        type="textarea"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        v-show='isEdit'
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import appraiseRankApi from '../../api/tmisc/api_appraiseRank';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        appraiseId: '',
        rankId: '',
        point: 0,
        score: 0,
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
            appraiseRankApi.updateAppraiseRank(this.item.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
              this.$emit('update:visible', false);
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
