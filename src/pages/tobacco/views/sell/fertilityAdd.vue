<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item label="合同选择">
      <el-select clearable v-model='formItem.contractId'
                 filterable
                 clearable
                 remote
                 reserve-keyword
                 @change="getFarmer"
                 placeholder="请输入关键字进行查询"
                 :remote-method="remoteMethod"
                 :loading="loading"
                 style="width: 100%"
      >
        <el-option v-for="item in  formData.seContractList" :key="item.id" :label="item.value" :value="item.id">
          <span style="float: left">{{ item.value }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sfz }}</span>
        </el-option>
      </el-select>
    </el-form-item>
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
      <!-- <el-col :span="12">
         <el-form-item :label="$t('tobacco.tsell.fertility.restWeight')">
           <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.restWeight"
                            style="width: 100%"/>
         </el-form-item>
       </el-col>-->
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import fertilityApi from '../../api/tsell/api_fertility';
  import seContractApi from '../../api/tsell/api_seContract';

  export default {
    data() {
      return {
        loading: false,
        formItem: {
          organizationId: '',
          organizationName: '',
          organizationOrder: '',
          organizationCode: '',
          'contractId': '',
          'contractNumber': '',
          'contractName': '',
          'farmerPhone': '',
          'farmerIdentity': '',
          'farmerAddress': '',
          'bankNo': '',
          'weight': '',
          'restWeight': '',
          'date': '',
          'annual': '',
          'author': this.$store.state.user.userName,
          'control': 'SG_CF01',
        },
        searchData: {
          organizationId: this.$store.state.user.organization.organizationId,
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
      this.formItem.annual = new Date().getFullYear().toString();
      this.formItem.date = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    },
    methods: {
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
              this.formItem.farmerIdentity = item.farmerNumber;
              this.formItem.bankNo = item.bankAccount;
              this.formItem.weight = item.signWeight;
              this.formItem.restWeight = item.signWeight;
              this.formItem.organizationId = item.organization.organizationId;
              this.formItem.organizationCode = item.organization.organizationCode;
              this.formItem.organizationName = item.organization.organizationName;
              this.formItem.organizationOrder = item.organization.organizationOrder;

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
                  orgId: this.searchData.organizationId,
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
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([fertilityApi.saveFertility(this.formItem)])
              .then(([response]) => {
                loading.close();
                //保持签订量与剩余量一致
                this.formItem.restWeight = this.formItem.weight;
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
