<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.organizationName')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.warehouseName')">
      <whouse-select :value.sync="formItem.warehouseId" :label.sync="formItem.warehouseName"
                     :orgId.sync="formItem.organizationId"></whouse-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeOrganizationName')">
      <organization-form :root="threeOrgId" @onchange="threeOrganizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.threeWarehouseName')">
      <whouse-select :value.sync="formItem.threeWarehouseId" :label.sync="formItem.threeWarehouseName"
                     :orgId.sync="formItem.threeOrganizationId"></whouse-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.operationFromTo.desc')" prop="desc">
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
  const whouseSelect = () => import('../components/whouseSelect');

  import operationFromToApi from '../../api/tstorage/api_operationFromTo';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        userOrgId: this.$store.state.user.organization.organizationId,
        threeOrgId: '',
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'warehouseId': '',
          'warehouseName': '',
          'threeOrganizationId': '',
          'threeOrganizationName': '',
          'threeWarehouseId': '',
          'threeWarehouseName': '',
          'desc': '',
          'oid': '',
        },
        rowData: {},
        ruleValidate: {
          organizationId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          warehouseId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          threeOrganizationId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          threeWarehouseId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    components: {
      OrganizationForm,
      whouseSelect
    },
    created() {
      this.load();
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationName = label;
        this.formItem.warehouseId = '';
        this.formItem.warehouseName = '';
      },
      threeOrganizationOnchange(label, value, values) {
        this.formItem.threeOrganizationId = value;
        this.formItem.threeOrganizationName = label;
        this.formItem.threeWarehouseId = '';
        this.formItem.threeWarehouseName = '';
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
            Promise.all([operationFromToApi.saveOperationFromTo(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.formItem.desc = '';
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
      load() {
        this.rowData = JSON.parse(JSON.stringify(this.item));
        if (this.rowData.relationId) {//移库操作
          this.threeOrgId = this.$store.state.user.organization.organizationId;
          this.formItem.threeOrganizationId = this.threeOrgId;
          this.formItem.threeOrganizationName = this.$store.state.user.organization.organizationName;
        } else {
          this.threeOrgId = '11';
          this.formItem.threeOrganizationId = this.threeOrgId;
          this.formItem.threeOrganizationName = '烟草商业公司';
        }
        this.formItem.threeWarehouseName = '';
        this.formItem.threeWarehouseId = '';
        this.formItem.oid = this.rowData.id;
        if (this.rowData.balance !== '' && this.rowData.balance !== null) {
          this.rowData.balance = this.rowData.balance.toString();
        }
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },

    },
    watch: {
      item(curVal, oldVal) {
        this.rowData = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
