<template>

  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organization">
      <el-input v-model="formItem.organization.organizationName" disabled></el-input>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.annual')">
      <el-date-picker
        value-format="yyyy"
        v-model="formItem.annual"
        type="year"
        :placeholder="$t('base.pleaseSelect')" style="width: 100%" disabled>
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.catalog')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.catalog" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.key')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.key" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.value')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.value"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.parameter.date')">
      <el-date-picker
        v-model="formItem.date"
        type="date"
        style="width:100%;"
        :placeholder="$t('base.pleaseSelect')">
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
  import parameterApi from '../../api/setup/api_parameter';

  const OrganizationForm = () => import('@/components/Organization');
  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'annual': '',
          'catalog': '',
          'key': '',
          'value': '',
          'desc': '',
          'date': '',
          organizationId: '',
          organizationCode: '',
          organizationName: '',
          organizationOrder: ''
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      Promise.all([parameterApi.showType()])
        .then(([response]) => {
          this.optionData.typeOptions = response;
        })
        .catch(error => {
          console.log(error);
        });
      this.load();
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
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.annual !== '' && this.formItem.annual !== null) {
          this.formItem.annual = this.formItem.annual.toString();
        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([parameterApi.updateParameter(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success'
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
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    components: {
      OrganizationForm
    },
  };
</script>
