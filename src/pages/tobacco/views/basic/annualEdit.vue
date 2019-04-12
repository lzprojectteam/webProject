<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.basic.annual.annualId')" prop="annualId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annualId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.begin')">
      <el-date-picker
        v-model="formItem.begin"
        type="date"
        style="width:100%;"
        :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.end')">
      <el-date-picker
        v-model="formItem.end"
        type="date"
        style="width:100%;"
        :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.annual.desc')">
      <el-input type='textarea' v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import annualApi from '../../api/basic/api_annual';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'annualId': 0,
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
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([annualApi.updateAnnual(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {

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

    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
