<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.detailId')" prop="detailId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.detailId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.title')" prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
    </el-form-item>
    <!--<el-form-item :label="$t('tobacco.tstorage.inventoryDetail.countryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.countryName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName"/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.contractId')" prop="contractId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.contractNumber')" prop="contractNumber">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.contractCard')" prop="contractCard">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractCard" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.farmerId')" prop="farmerId">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.farmerNumber')" prop="farmerNumber">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.farmerName')" prop="farmerName">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.farmerIdentity')" prop="farmerIdentity">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.unpackWeight')" prop="unpackWeight">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.unpackWeight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.weight')" prop="weight">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.basket')" prop="basket">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.basket"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.content')" prop="content">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.content"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.inventoryDetail.desc')" prop="desc">
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
  import inventoryApi from '../../api/tstorage/api_inventory';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'organizationId': '',
          'organizationName': '',
          'organizationOrder': '',
          'organizationCode': '',
          'inventory': {},
          'detailId': '',
          'title': '',
          'countryId': '86',
          'countryName': '中国',
          'contractId': '',
          'contractNumber': '',
          'contractCard': '',
          'farmerId': '',
          'farmerNumber': '',
          'farmerName': '',
          'farmerIdentity': '',
          'unpackWeight': '',
          'weight': '',
          'basket': '',
          'content': '',
          'desc': '',
        },
        acceptData: {},
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
        this.acceptData = JSON.parse(JSON.stringify(this.item));
        // this.formItem.inventory.id = this.acceptData.id;
        this.formItem.organizationId = this.acceptData.organization.organizationId;
        this.formItem.organizationCode = this.acceptData.organization.organizationId;
        this.formItem.organizationName = this.acceptData.organization.organizationName;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.acceptData.detailList.push(this.formItem);
            let arr = [];
            arr.push(this.acceptData);
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([inventoryApi.upload(arr)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
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

    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
