<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.gradeContrast.ogradeName')">
      <type-grade-select :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                         :gradeId.sync="formItem.ogradeId" :gradeName.sync="formItem.ogradeName"
                         :gradeCode.sync="formItem.ogradeCode"
                         style="width: 100%;">
      </type-grade-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.gradeContrast.cgradeName')">
      <type-grade-select :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                         :gradeId.sync="formItem.cgradeId" :gradeName.sync="formItem.cgradeName"
                         :gradeCode.sync="formItem.cgradeCode"
                         style="width: 100%;">
      </type-grade-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.gradeContrast.gap')">
      <el-input-number v-model="formItem.gap" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.gradeContrast.desc')">
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
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect2');

  import gradeContrastApi from '../../api/tstorage/api_gradeContrast';

  export default {
    data() {
      return {
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'typeId': '',
          'typeName': '',
          'ogradeId': '',
          'ogradeCode': '',
          'ogradeName': '',
          'cgradeId': '',
          'cgradeCode': '',
          'cgradeName': '',
          'gap': -1,
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
      this.formItem.typeId = '10';
    },
    components: {
      OrganizationForm,
      typeGradeSelect
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
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([gradeContrastApi.saveGradeContrast(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.formReset('formValidate');

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
  };
</script>
