<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.annual')">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.annual"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.barcode')" prop="barcode">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.date')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.year')">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.farmerName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.inventory.printTimes')">
          <el-input-number v-model="formItem.printTimes" style="width:100%"></el-input-number>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankName" :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.standard')">
          <el-switch v-model="formItem.standard"/>
        </el-form-item>
      </el-col>

      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.inventory.weight')">
          <el-input-number v-model="formItem.weight" style="width: 100%;"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.picture')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.picture"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.control')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.inventory.desc')">
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

  import inventoryApi from '../../api/tstorage/api_inventory';

  export default {
    data() {
      return {
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'annual': '',
          'serial': '',
          'barcode': '',
          'number': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'countryId': '86',
          'countryName': '中国',
          'year': '',
          'farmerName': '',
          'printTimes': '',
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
          'standard': true,
          'weight': '',
          'picture': '',
          'control': '',
          'desc': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
          barcode: [
            {required: true, message: '该项必须填写', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.formItem.date = new Date();
      this.formItem.annual = new Date().getFullYear().toString();
      this.formItem.year = new Date().getFullYear().toString();

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
            if (!this.formItem.gradeId) {
              this.$message({
                message: '请选择等级',
                type: 'info',
              });
              return;
            }
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([inventoryApi.saveInventory(this.formItem)])
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
                this.$message({
                  message: '条码重复',
                  type: 'error',
                });
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
