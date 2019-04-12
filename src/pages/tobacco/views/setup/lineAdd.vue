<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.line.id')" prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.id" @blur="checkRepeat"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.visible')" prop="visible">
      <el-radio-group v-model="formItem.visible">
        <el-radio :label=true>是</el-radio>
        <el-radio :label=false>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.line.desc')" prop="desc">
      <el-input
        type="textarea"
        :rows="2"
        :placeholder="$t('base.pleaseInput')" v-model="formItem.desc">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="isDisabled"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import lineApi from '../../api/setup/api_line';

  export default {
    data() {
      return {
        formItem: {
          'name': '',
          'visible': true,
          'desc': '',
          'id': ''
        },
        isDisabled: true,
        ruleValidate: {
          id: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ]
        }
      };
    },
    created() {

    },
    methods: {
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([lineApi.saveLine(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });

              })
              .catch(error => {
                loading.close();
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
      checkRepeat() {
        if (this.formItem.id !== '') {
          Promise.all([lineApi.getAll({
            search: 'id:EQ:{id};'.format({
              id: this.formItem.id
            })
          })])
            .then(([response]) => {
              if (response.content.length > 0) {
                this.$message({
                  message: this.$t('tobacco.setup.line.repeatId'),
                  type: 'error'
                });
                this.isDisabled = true;
              } else {
                this.isDisabled = false;
              }
            })
            .catch(error => {
            });
        }
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },

    }
  };
</script>
