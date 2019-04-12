<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.tobaccoYear')">
      <el-date-picker
        value-format="yyyy"
        v-model="formItem.tobaccoYear"
        type="year"
        :placeholder="$t('base.pleaseSelect')"
        style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.businessYear')">
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
      <type-variety-grade-select :allData.sync="allData" :varietyName.sync="formItem.varietyName"
                                 :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
      <rank-select :label.sync="formItem.rankName" :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                   style="width:100%;"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.weight')">
      <el-input-number v-model="formItem.weight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.upperWeight')">
      <el-input-number v-model="formItem.upperWeight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.lowerWeight')">
      <el-input-number v-model="formItem.lowerWeight" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.standWeightSet.desc')">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
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

  import standWeightSetApi from '../../api/tstorage/api_standWeightSet';

  export default {
    data() {
      return {
        allData: {}, //存放烟叶类型等数据，用于回显
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'tobaccoYear': '',
          'businessYear': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'rankId': '',
          'rankName': '',
          'gradeId': '',
          'gradeCode': '',
          'gradeName': '',
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
    props: ['item', 'isEdit', 'visible'],
    created() {
      this.load();
    },
    components: {
      typeGradeSelect,
      typeSelect,
      varietySelect,
      typeVarietySelect,
      statusSelect,
      rankSelect,
      'type-grade-select': typeGradeSelect,
      typeVarietyGradeSelect,
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

    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.allData = {};
        //初始化烟叶类型等数据，用于回显
        this.allData['typeId'] = this.formItem.typeId;
        this.allData['varietyId'] = this.formItem.varietyId;
        this.allData['gradeId'] = this.formItem.gradeId;
        if (this.formItem.businessYear !== '') {
          this.formItem.businessYear = this.formItem.businessYear.toString();
        }
        if (this.formItem.tobaccoYear !== '') {
          this.formItem.tobaccoYear = this.formItem.tobaccoYear.toString();
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([standWeightSetApi.updateStandWeightSet(this.item.id, this.formItem)])
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
