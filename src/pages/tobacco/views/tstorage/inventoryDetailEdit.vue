<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.detailId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.detailId"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.countryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.countryName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractNumber')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.contractCard')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractCard"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerNumber')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.farmerIdentity')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.unpackWeight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.unpackWeight"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.weight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.basket')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.basket"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.content"/>
    </el-form-item>
    <el-form-item :label="$t('casit.tstorage.inventoryDetail.desc')">
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
  import inventoryDetailApi from '../../api/tstorage/api_inventoryDetail';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'detailId': 0,
          'title': '',
          'countryId': '',
          'countryName': '',
          'contractId': '',
          'contractNumber': '',
          'contractCard': 0,
          'farmerId': '',
          'farmerNumber': '',
          'farmerName': '',
          'farmerIdentity': '',
          'unpackWeight': '',
          'weight': 0,
          'basket': '',
          'content': '',
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
            Promise.all([inventoryDetailApi.updateInventoryDetail(this.item.id, this.formItem)])
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
