<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">

    <el-form-item :label="$t('base.code')" prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('base.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('system.title')" prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('system.banner')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.banner" />
    </el-form-item>
    <el-form-item :label="$t('system.entry')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.entry" />
    </el-form-item>
    <el-form-item :label="$t('system.status')"  v-show="false">
      <el-select v-model="formItem.status" style="width: 100%">
        <el-option value=1 :label="$t('system.state1')" />
        <el-option value=5 :label="$t('system.state5')" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('base.icon')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.icon" />
    </el-form-item>
    <el-form-item :label="$t('system.token')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.token" />
    </el-form-item>
    <el-form-item :label="$t('system.type')">
      <el-select v-model="formItem.type" style="width: 100%" filterable allow-create default-first-option :placeholder="$t('base.pleaseSelect')">
        <el-option v-for="item in typeList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('base.visible')">
      <el-checkbox v-model="formItem.visible" />
    </el-form-item>
    <br />
    <el-form-item>
      <el-button plain type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>

</template>
<script>
import systemApi from '../../api/apiSystem';

export default {
  data() {
    return {
      formItem: {
        banner: '',
        code: '',
        entry: '',
        icon: '',
        name: '',
        status: '1',
        title: '',
        token: '',
        visible: true,
        type: 'WEB'
      },
      ruleValidate: {
        code: [
          {
            required: true,
            message: '编码至少3个字符',
            trigger: 'blur',
            min: 3,
            max: 32
          }
        ],
        name: [
          {
            required: true,
            message: '登陆名至少2个字符',
            trigger: 'blur',
            min: 2
          }
        ],
        title: [
          {
            required: true,
            message: '登陆名至少2个字符',
            trigger: 'blur',
            min: 2
          }
        ]
      },
      typeList: ['WEB', 'ANDROID', 'WPF', 'MOBILE', 'DINGTALK', 'WEBCHAT']
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([systemApi.saveSystem(this.formItem)])
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
