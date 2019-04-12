<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId'  @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.annual')">
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
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item :label="$t('tobacco.tstorage.smokepoint.serial')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" disabled/>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.date')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.tyear')">
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
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :varietyName.sync="formItem.tvarietyName" :varietyId.sync="formItem.tvarietyId"
                                     :typeId.sync="formItem.ttypeId" :typeName.sync="formItem.ttypeName"
                                     :gradeId.sync="formItem.tgradeId" :gradeName.sync="formItem.tgradeName"
                                     :gradeCode.sync="formItem.tgradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.trankName" :value.sync="formItem.trankId" :key.sync="formItem.trankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.standard')">
          <el-switch v-model="formItem.standard"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.amount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.weight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.transport.control')" prop="control">
          <el-select v-model="formItem.control" style="width: 100%" disabled>
            <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.smokepoint.type')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.type"/>
        </el-form-item>
      </el-col>-->
    </el-row>
    <el-row>
      <el-form-item :label="$t('tobacco.tstorage.smokepoint.desc')">
        <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
      </el-form-item>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
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

  import smokepointApi from '../../api/tstorage/api_smokepoint';
  import categoryApi from '../../api/basic/api_category';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        controllist: [],
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '0',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'annual': '',
          'serial': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'operation': '',
          'countryId': '86',
          'countryName': '中国',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'trankId': '',
          'trankName': '',
          'tgradeId': '',
          'tgradeName': '',
          'tgradeCode': '',
          'standard': true,
          'amount': '',
          'weight': '',
          'control': '',
          'desc': '',
          'type': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
    },
    created() {
      this.load();
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_SP'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
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
            Promise.all([smokepointApi.updateSmokepoint(this.formItem.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.$message({
              message: this.$t('message.editAndExid'),
              type: 'warn',
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.control = this.formItem.control.id;
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.tyear !== '' && this.formItem.tyear !== null) {
          this.formItem.tyear = this.formItem.tyear.toString();
        }
        if (this.formItem.annual !== '' && this.formItem.annual !== null) {
          this.formItem.annual = this.formItem.annual.toString();
        }
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
