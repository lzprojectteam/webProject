<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.part.typeId')" prop="typeId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.typeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.partId')" prop="partId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.partId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.code')" prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.visible')" prop="visible">
      <el-switch v-model="formItem.visible"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.part.desc')" prop="desc">
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
  import partApi from '../../api/basic/api_part';

  export default {
    data() {
      return {
        formItem: {
          'typeId': '',
          'partId': '',
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
            Promise.all([partApi.savePart(this.formItem)])
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
