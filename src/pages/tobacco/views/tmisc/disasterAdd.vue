<template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.disaster.lead')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.lead"
      />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmisc.disaster.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.detail')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.detail"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.picture')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.picture"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.icon')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.icon"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
      />
    </el-form-item>
    <el-row>
      <el-col :span="4">
        <el-form-item :label="$t('tobacco.tmisc.disaster.visible')">
          <el-checkbox v-model="formItem.visible" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="$t('tobacco.tmisc.disaster.leaf')">
          <el-checkbox v-model="formItem.leaf" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item :label="$t('tobacco.tmisc.disaster.desc')">
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
import disasterApi from '../../api/tmisc/api_disaster';
export default {
  data() {
    return {
      formItem: {
        lead: '',
        leaf: true,
        name: '',
        detail: '',
        picture: '',
        icon: '',
        visible: true,
        position: 0,
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
          Promise.all([disasterApi.saveDisaster(this.formItem)])
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
