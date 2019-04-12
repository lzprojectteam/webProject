<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                         style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.license')" prop="license">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.license"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.driver')" prop="driver">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.driver"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.legalPerson')" prop="legalPerson">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.legalPerson"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.mobile')" prop="mobile">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.mobile"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.displacement')" prop="displacement">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.displacement" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.capacity')" prop="capacity">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.capacity" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.vehicle.listingDate')" prop="listingDate">
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="formItem.listingDate"
                      type="date"
                      :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
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

  import vehicleApi from '../../api/tstorage/api_vehicle';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'license': '',
          'driver': '',
          'legalPerson': '',
          'mobile': '',
          'displacement': '',
          'capacity': '',
          'listingDate': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '0',
          'organizationCode': this.$store.state.user.organization.organizationId,
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

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
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
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
            Promise.all([vehicleApi.updateVehicle(this.formItem.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                //重置表单，允许多次操作
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

    }
  };
</script>
