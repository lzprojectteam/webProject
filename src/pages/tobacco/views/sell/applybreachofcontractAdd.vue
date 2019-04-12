<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyPerson')" prop="applyPerson">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.applyPerson"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyDate')" prop="applyDate">
      <el-date-picker value-format="yyyy-MM-dd"
                      v-model="formItem.applyDate"
                      type="date" @change='getApplyDate'
                      :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="申请人" prop="contractNumber">
      <el-select clearable v-model='formItem.contractNumber'
                 filterable 
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
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.contractyNo')" prop="contractyNo">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractyNo" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.recoveryDate')" prop="recoveryDate">
      <el-date-picker value-format="yyyy-MM-dd"
                      v-model="formItem.recoveryDate"
                      type="date" :picker-options="pickerOptions1"
                      :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyExplain')" prop="applyExplain">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.applyExplain"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.desc')" prop="desc">
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
  const OrganizationForm = () => import('@/components/Organization');

  import seContractApi from '../../api/tsell/api_seContract';
  import categoryApi from '../../api/basic/api_category';
  import applybreachofcontractApi from '../../api/tsell/api_applybreachofcontract';

  export default {
    data() {
      return {
        loading: false,
        controllist: [],
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'applyPerson': this.$store.state.user.userName,
          'applyDate': '',
          'contractNumber': '',
          'contractyNo': '',
          'farmerName': '',
          'recoveryDate': '',
          'applyExplain': '',
          'examinePerson': '',
          'examineDate': '',
          'examineSuggestion': '',
          'desc': '',
          'control': 'SG_A01',
        },
        formData: {
          seContractList: [],
          optionData: [], //存放下拉数据，用于反向查询
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        },
        pickerOptions1: {
          disabledDate: (time) => {
            console.info(this.formItem.applyDate);
            var temp = this.formItem.applyDate + ' 00:00:00';
            temp = temp.replace(/-/g, '/');
            var timestamp = new Date(temp).getTime();
            return time.getTime() < timestamp;
          }
        }
      };
    },
    components: {
      OrganizationForm
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    created() {
      this.formItem.applyDate = this.dateFormat(new Date(), 'yyyy-mm-dd ');
      this.formItem.recoveryDate = this.dateFormat(new Date(), 'yyyy-mm-dd ');
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:SG_A'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
    },
    methods: {
      getApplyDate() {
        this.formItem.recoveryDate = this.formItem.applyDate;
      },
      //查询烟农姓名
      getFarmer() {
        if (this.formItem.contractNumber !== '' && this.formItem.contractNumber !== null && this.formItem.contractNumber !== undefined) {
          this.formItem.contractyNo = this.formItem.contractNumber;
          this.formData.optionData.forEach((item) => {
            if (item.number === this.formItem.contractNumber) {
              this.formItem.farmerName = item.farmerName;
            }
          });
        }
      },
      remoteMethod(query) {
        if (query) {
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
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (new Date(this.formItem.recoveryDate) < new Date(this.formItem.applyDate)) {
              this.$message({
                message: '恢复日期不能小于填报日期',
                type: 'info',
              });
            } else {
              const loading = this.$loading({
                lock: true,
                text: '处理中,请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              Promise.all([applybreachofcontractApi.saveApplybreachofcontract(this.formItem)])
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
            }
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
