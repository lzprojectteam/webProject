<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <!--<el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.bid')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bid"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.cid')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.cid"/>
        </el-form-item>
      </el-col>
    </el-row>-->
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.tyear')">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.tyear"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.tstatusName" :value.sync="formItem.tstatusId"
                         :key.sync="formItem.tstatusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
        <type-variety-grade-select :varietyName.sync="formItem.tvarietyName" :varietyId.sync="formItem.tvarietyId"
                                   :typeId.sync="formItem.ttypeId" :typeName.sync="formItem.ttypeName"
                                   :gradeId.sync="formItem.tgradeId" :gradeName.sync="formItem.tgradeName"
                                   :gradeCode.sync="formItem.tgradeCode" style="width:100%;"/>
      </el-form-item>

    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.trankName" :value.sync="formItem.trankId" :key.sync="formItem.trankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.amount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.weight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.sample')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sample" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.qualified')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.qualified"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheck.rate')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rate" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item :label="$t('tobacco.tstorage.billCheck.desc')">
        <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
      </el-form-item>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import billCheckApi from '../../api/tstorage/api_billCheck';

  export default {
    data() {
      return {
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': 0,
          'organizationCode': this.$store.state.user.organization.organizationId,
          'bid': '',
          'cid': '',
          'countryId': '',
          'countryName': '',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'tgradeId': '',
          'tgradeCode': '',
          'tgradeName': '',
          'trankId': '',
          'trankName': '',
          'amount': 0,
          'weight': 0,
          'sample': 0,
          'qualified': 0,
          'rate': 0,
          'desc': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
    },
    components: {
      OrganizationForm,
      typeGradeSelect,
      typeSelect,
      varietySelect,
      typeVarietySelect,
      statusSelect,
      rankSelect,
      'type-grade-select': typeGradeSelect,
      typeVarietyGradeSelect
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
      this.formItem.tyear = new Date().getFullYear().toString();
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
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
            Promise.all([billCheckApi.saveBillCheck(this.formItem)])
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

    }
  };
</script>
