 <template>
  <el-form
    :model="formItem"
    label-width="100px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.appraise.title')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.title"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.annual')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.annual"
            format="yyyy"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.serial')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.serial"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.rank')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.rank"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.author')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.author"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.targetId')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.targetId"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.targetCode')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.targetCode"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.appraise.countryId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.countryId"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.date')">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formItem.date"
            type="date"
            v-bind:placeholder="$t('base.pleaseInput')"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.countryName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.countryName"
          />
        </el-form-item>

      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.appraise.targetName')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.targetName"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraise.content')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.content"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraise.summary')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.summary"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraise.total')">
      <el-input
        type="number"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.total"
      />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmisc.appraise.desc')">
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
import appraiseApi from '../../api/tmisc/api_appraise';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        annual: 0,
        serial: '',
        rank: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        targetId: '',
        targetCode: '',
        targetName: '',
        summary: '',
        content: '',
        total: 0,
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {
    console.info('load');
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
          Promise.all([appraiseApi.updateAppraise(this.item.id, this.formItem)])
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
