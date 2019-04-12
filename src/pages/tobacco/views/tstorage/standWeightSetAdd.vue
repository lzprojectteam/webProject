<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.tobaccoYear')" prop="tobaccoYear">
      <el-date-picker
        value-format="yyyy"
        v-model="formItem.tobaccoYear"
        type="year"
        :placeholder="$t('base.pleaseSelect')"
        style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.businessYear')" prop="businessYear">
      <el-date-picker
        value-format="yyyy"
        v-model="formItem.businessYear"
        type="year"
        :placeholder="$t('base.pleaseSelect')"
        style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
      <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" :key.sync="formItem.statusId"
                     style="width:100%;"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
      <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
    </el-form-item>
    <!--<el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
      <rank-select :label.sync="formItem.rankName" :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                   style="width:100%;"/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.weight')" prop="weight">
      <el-input-number v-model="formItem.weight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.upperWeight')" prop="upperWeight">
      <el-input-number v-model="formItem.upperWeight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.lowerWeight')" prop="lowerWeight">
      <el-input-number v-model="formItem.lowerWeight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.desc')" prop="desc">
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
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const OrganizationForm = () => import('@/components/Organization');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import standWeightSetApi from '../../api/tstorage/api_standWeightSet';

  export default {
    data() {
      return {
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'tobaccoYear': '',
          'businessYear': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'varietyId': '000',
          'varietyName': '普通品种',
          'rankId': '',
          'rankName': '',
          'gradeId': '001',
          'gradeCode': 'C1F',
          'gradeName': '中桔一',
          'weight': '',
          'desc': '',
          'upperWeight': '',
          'lowerWeight': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
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
      this.formItem.businessYear = new Date().getFullYear().toString();
      this.formItem.tobaccoYear = new Date().getFullYear().toString();

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
            Promise.all([standWeightSetApi.saveStandWeightSet(this.formItem)])
              .then(([response]) => {
                loading.close();
                //重置表单，允许多次操作
                this.formReset('formValidate');
                //重置组件部分的值
                this.formItem.statusId = '';
                this.formItem.statusName = '';
                this.formItem.rankId = '';
                this.formItem.rankName = '';
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
