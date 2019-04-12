<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.serial')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.serial"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.annual')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.annual"
            format="yyyy"
            style="width:100%"
          >
          </el-date-picker>
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
        <el-form-item :label="$t('tobacco.tmisc.appraise.title')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.title"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.author')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.author"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.date')">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="formItem.date"
            type="date"
            v-bind:placeholder="$t('base.pleaseInput')"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.countryName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.countryName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.appraise.targetName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.targetName"
          />
        </el-form-item>
      </el-col>
    </el-row>
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
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.total"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.appraise.countryId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.countryId"
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
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import appraiseApi from '../../api/tmisc/api_appraise';
export default {
  data() {
    return {
      formItem: {
        annual: 0,
        serial: '',
        rank: '',
        title: '',
        author: '',
        date: new Date(),
        countryId: '+86',
        countryName: '中国',
        targetId: '',
        targetCode: '',
        targetName: '',
        summary: '',
        content: '',
        total: '',
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.formItem.date = new Date();
  },
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([appraiseApi.saveAppraise(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
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
