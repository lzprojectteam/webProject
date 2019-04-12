<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('base.code')" prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.id" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrPosition.lead')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lead" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrPosition.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrPosition.visible')">
      <el-switch v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrPosition.position')">
      <el-input-number style="width: 100%;" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.position" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrPosition.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import hrPositionApi from '../../api/thuman/api_hrPosition';
export default {
  data() {
    return {
      formItem: {
        id: '',
        lead: '',
        leaf: true,
        name: '',
        visible: true,
        position: 0,
        desc: ''
      },
      ruleValidate: {
        id: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
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
          Promise.all([hrPositionApi.saveHrPosition(this.formItem)])
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
