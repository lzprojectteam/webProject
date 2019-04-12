<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.transportInventory.transportId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.transportId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportInventory.inventoryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.inventoryId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportInventory.weight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportInventory.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import transportInventoryApi from '../../api/tstorage/api_transportInventory';

  export default {
    data() {
      return {
        formItem: {
          'transportId': '',
          'inventoryId': '',
          'weight': 0,
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
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([transportInventoryApi.saveTransportInventory(this.formItem)])
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

      formReset(name) {
        this.$refs[name].resetFields();
      },

    }
  };
</script>
