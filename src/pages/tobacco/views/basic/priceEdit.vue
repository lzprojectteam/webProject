<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" :orgId='formItem.organizationId'
                         style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.price.annual')" prop="annual">
      <el-date-picker
        value-format="yyyy"
        v-model="formItem.annual"
        type="year"
        :placeholder="$t('base.pleaseSelect')"
        style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.price.payId')" prop="pay">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.pay"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.price.areaId')" prop="area">
      <el-select v-model="formItem.area" style="width: 100%">
        <el-option v-for="item in formData.areaList"
                   :label="item.name"
                   :value="item.name"
                   :key="item.areaId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
      <status-select :label.sync="formItem.status" :value.sync="formItem.statusId" :key.sync="formItem.statusId"
                     style="width:100%;"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
      <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeid" :gradeName.sync="formItem.gradename"
                                 :gradeCode.sync="formItem.gradecode" style="width:100%;"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.basic.price.price')" prop="price">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.price.supportFee')" prop="supportfee">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.supportfee" style="width: 100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.price.subsidy')" prop="subsidy">
      <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.subsidy" style="width: 100%"/>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import priceApi from '../../api/basic/api_price';
  import areaApi from '@/api/tobacco/apiArea';

  const OrganizationForm = () => import('@/components/Organization');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');
  const statusSelect = () => import('../components/statusSelect');

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'annual': 0,
          'organizationid': this.$store.state.user.organization.organizationId,
          'organizationame': this.$store.state.user.organization.organizationName,
          'pay': '',
          'area': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'varietyId': '',
          'varietyName': '',
          'gradeid': '',
          'gradecode': '',
          'gradename': '',
          'price': 0,
          supportfee: '',
          subsidy: '',
        },
        formData: {
          areaList: [],
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
    },
    created() {
      Promise.all([areaApi.getAll({
        size: 500,
      })])
        .then(([response]) => {
          this.formData.areaList = response.content;
        })
        .catch(error => {
        });
      this.load();
    },
    components: {
      OrganizationForm,
      varietySelect,
      statusSelect,
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
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationid = value;
        this.formItem.organizationname = label;
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([priceApi.updatePrice(this.formItem.id, this.formItem)])
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
