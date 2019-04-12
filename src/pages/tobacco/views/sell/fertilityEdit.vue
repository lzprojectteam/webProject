<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.contractId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.contractNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.contractName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.farmerPhone')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="身份证号">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.farmerAddress')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.bankNo')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankNo" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.fertility.weight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import fertilityApi from '../../api/tsell/api_fertility';
  import seContractApi from '../../api/tsell/api_seContract';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        loading: false,
        formItem: {
          organizationId: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          organizationOrder: 0,
          organizationCode: this.$store.state.user.organization.organizationId,
          'contractId': '',
          'contractNumber': '',
          'contractName': '',
          'farmerPhone': '',
          'farmerAddress': '',
          'bankNo': '',
          'weight': '',
          'restWeight': '',
          'date': '',
          'annual': '',
          'author': '',
          'control': '',
        },
        formData: {
          seContractList: [],
          optionData: [], //存放下拉数据，用于反向查询
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
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.annual !== '' && this.formItem.annual !== null) {
          this.formItem.annual = this.formItem.annual.toString();
        }
        if (this.formItem.control !== '' && this.formItem.control !== null) {
          this.formItem.control = this.formItem.control.id;
        }
      },
      //查询烟农信息
      getFarmer() {
        if (this.formItem.contractId !== '' && this.formItem.contractId !== null && this.formItem.contractId !== undefined) {
          this.formData.optionData.forEach((item) => {
            if (item.number === this.formItem.contractId) {
              this.formItem.contractId = item.id;
              this.formItem.contractNumber = item.number;
              this.formItem.contractName = item.farmerName;
              this.formItem.farmerPhone = item.farmerPhone;
              this.formItem.farmerAddress = item.farmerAddress;
              this.formItem.bankNo = item.bankAccount;
              this.formItem.weight = item.signWeight;
              this.formItem.restWeight = item.signWeight;
            }
          });
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          // 获取合同
          Promise.all([
            seContractApi.getAll({
              size: 10,
              sort: 'id,ASC',
              contains: 'title,farmerName,farmerNumber,farmerPhone,bankAccount:{keyword}:true'.format({keyword: query}),
              search: 'organization.organizationId:EQ:{orgId};annual:EQ:{annual};'.format(
                {
                  orgId: this.formItem.organizationId,
                  annual: new Date().getFullYear().toString(),
                }
              )
            })
          ])
            .then(([response]) => {
              let arr = [];
              this.formData.optionData = response.content;
              response.content.forEach(function (item) {
                arr.push({
                  'value': '[' + item.annual + ']' + item.farmerName,
                  'id': item.id,
                  'sfz': item.farmerNumber
                });
              });
              this.formData.seContractList = arr;
              this.loading = false;
            })
            .catch(error => {
            });
        } else {
          this.formData.seContractList = [];
          this.formData.optionData = [];
          this.loading = false;
        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([fertilityApi.updateFertility(this.formItem.id, this.formItem)])
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
