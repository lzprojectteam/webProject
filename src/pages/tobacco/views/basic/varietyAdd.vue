<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.variety.typeId')" prop="typeId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.typeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.variety.varietyId')" prop="varietyId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.varietyId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.variety.code')" prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.variety.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.variety.visible')" prop="visible">
      <el-switch v-model="formItem.visible"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.variety.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import varietyApi from '../../api/basic/api_variety';

  export default {
    data() {
      return {
        formItem: {
          'typeId': '',
          'varietyId': '',
          'code': '',
          'name': '',
          'visible': true,
          'desc': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
    },
    created() {

    },
    methods: {
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([varietyApi.saveVariety(this.formItem)])
              .then(([response]) => {
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });

              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn',
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },

    }
  };
</script>
