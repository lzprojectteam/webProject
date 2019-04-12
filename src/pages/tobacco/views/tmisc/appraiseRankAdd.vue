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
        rows="4"
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
import appraiseRankApi from '../../api/tmisc/api_appraiseRank';
export default {
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
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([appraiseRankApi.saveAppraiseRank(this.formItem)])
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
