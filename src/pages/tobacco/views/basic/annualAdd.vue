<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.annual.annualId')" prop="annualId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annualId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.name')" prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.begin')" prop="begin">
      <el-date-picker
        v-model="formItem.begin"
        type="date"
        style="width:100%;"
        :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.end')" prop="end">
      <el-date-picker
        v-model="formItem.end"
        type="date"
        style="width:100%;"
        :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.desc')" prop="desc">
      <el-input type='textarea' v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import annualApi from '../../api/basic/api_annual';

  export default {
    data() {
      return {
        formItem: {
          'annualId': '',
          'name': '',
          'begin': '',
          'end': '',
          'control': 0,
          'desc': '',
        },
        ruleValidate: {
          annualId: [
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
            Promise.all([annualApi.saveAnnual(this.formItem)])
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
