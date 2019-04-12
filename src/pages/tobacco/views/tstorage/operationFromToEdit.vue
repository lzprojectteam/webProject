<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.organizationId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.organizationId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.organizationName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.organizationName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.warehouseId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.warehouseId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.warehouseName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.warehouseName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeOrganizationId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.threeOrganizationId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeOrganizationName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.threeOrganizationName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeWarehouseId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.threeWarehouseId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeWarehouseName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.threeWarehouseName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import operationFromToApi from '../../api/tstorage/api_operationFromTo';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'organizationId': '',
          'organizationName': '',
          'warehouseId': '',
          'warehouseName': '',
          'threeOrganizationId': '',
          'threeOrganizationName': '',
          'threeWarehouseId': '',
          'threeWarehouseName': '',
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
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([operationFromToApi.updateOperationFromTo(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset(name);
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.$emit('update:visible', false);
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
