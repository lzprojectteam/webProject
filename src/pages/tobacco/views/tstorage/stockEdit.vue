<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                         style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stock.accountSet')" prop="booksId">
          <el-select v-model="formItem.booksId" style="width: 100%" disabled>
            <el-option v-for="item in formData.bookList"
                       :key="item.id"
                       :value="item.id"
                       :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')">
          <el-select v-model="formItem.warehouse" clearable @change="getRegion(1)" style="width: 100%">
            <el-option v-for="item in formData.whouseList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')">
          <el-select v-model="formItem.region" clearable @change="getStack(1)" style="width: 100%">
            <el-option v-for="item in formData.regionList"
                       :value="item.id"
                       :label="item.title"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.stackId')" prop="stackId">
          <el-select v-model="formItem.stack" clearable style="width: 100%;">
            <el-option v-for="item in formData.stackList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stock.annual')" prop="annual">
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
        <el-form-item :label="$t('tobacco.tstorage.stock.serial')" prop="serial">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stock.year')" prop="year">
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
        <el-form-item :label="$t('tobacco.tstorage.stock.month')" prop="month">
          <el-select v-model="formItem.month" style="width: 100%">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item+'月'"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stock.tobaccoYear')" prop="tobaccoYear">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.tobaccoYear"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')" prop="statusName">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')" prop="typeName">
      <type-variety-grade-select :allData.sync="allData" :varietyName.sync="formItem.varietyName"
                                 :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
    </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="12" style="height: 47px;">
        <el-form-item :label="$t('tobacco.tstorage.stock.standard')" prop="standard">
          <el-switch v-model="formItem.standard" disabled></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" style="height: 47px;">
        <el-form-item :label="$t('tobacco.tstorage.stock.amount')" prop="amount">
          <el-input-number :min="1" v-model="formItem.amount" :disabled="amountDisable"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px;">
        <el-form-item :label="$t('tobacco.tstorage.stock.weight')" prop="weight">
          <el-input-number :min="0" v-model="formItem.weight" :disabled="weightDisable"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.stock.desc')" prop="desc">
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

  import stackApi from '../../api/tstorage/api_stack';
  import stockApi from '../../api/tstorage/api_stock';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import booksApi from '../../api/tstorage/api_books';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        weightDisable: true,
        amountDisable: false,
        allData: {},
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'annual': 0,
          'serial': '',
          'year': 0,
          'month': 0,
          'countryId': '',
          'countryName': '',
          'tobaccoYear': 0,
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
          'standard': true,
          'amount': 1,
          'weight': 0,
          'desc': '',
          'booksId': '',
          'warehouse': '',
          'region': '',
        },
        formData: {
          whouseList: [],
          regionList: [],
          bookList: [],
        },
        ruleValidate: {
          booksId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          warehouse: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          region: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          stack: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          annual: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          year: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          tobaccoYear: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          statusName: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
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
      //获取账套数据
      Promise.all([booksApi.getAll({
        size: 500,
        sort: 'name',
        search: 'organization.organizationId:rlike:{orgid};'.format({
          orgid: this.formItem.organizationId,
        })
      })])
        .then(([response]) => {
          this.formData.bookList = response.content;
        })
        .catch(error => {
        });
      this.load();
      this.getWhouse();
    },
    methods: {
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
          })
          .catch(error => {
          });
      },
      getRegion(flag) {
        if (flag === 1) {
          this.formItem.region = '';
        }
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
            orgid: this.$store.state.user.organization.organizationId,
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
          })
          .catch(error => {
          });
      },
      getStack(flag) {
        if (flag === 1) {
          this.formItem.stack = '';
        }
        Promise.all([stackApi.getAll({
          sort: 'name',
          size: 500,
          search: 'region.id:EQ:{region};'.format({
            region: this.formItem.region,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
          })
          .catch(error => {
          });
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
            if (this.formItem.typeId === '') {
              this.$message({
                message: this.$t('请选择烟叶类型'),
                type: 'info',
              });
              return;
            }
            if (this.formItem.statusId === '') {
              this.$message({
                message: this.$t('请选择烟叶品种'),
                type: 'info',
              });
              return;
            }
            if (this.formItem.gradeId === '') {
              this.$message({
                message: this.$t('请选择烟叶等级'),
                type: 'info',
              });
              return;
            }
            Promise.all([stockApi.updateStock(this.formItem.id, this.formItem)])
              .then(([response]) => {
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
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.allData = {};
        //初始化烟叶类型等数据，用于回显
        this.allData['typeId'] = this.formItem.typeId;
        this.allData['varietyId'] = this.formItem.varietyId;
        this.allData['gradeId'] = this.formItem.gradeId;
        this.formItem.annual = this.formItem.annual.toString();
        this.formItem.year = this.formItem.year.toString();
        this.formItem.tobaccoYear = this.formItem.tobaccoYear.toString();
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.warehouse !== '' && this.formItem.warehouse !== null) {
          this.formItem.warehouse = this.formItem.warehouse.id;
          this.getRegion();//请求该库房对应库区数据
        }
        if (this.formItem.region !== '' && this.formItem.region !== null) {
          this.formItem.region = this.formItem.region.id;
          this.getStack();//请求垛位数据
        }
        if (this.formItem.stack !== '' && this.formItem.stack !== null) {
          this.formItem.stack = this.formItem.stack.id;
        }
        //根据是否标件判断数量重量哪个能编辑
        if (this.formItem.standard) {
          this.weightDisable = true;
          this.amountDisable = false;
        } else {
          this.weightDisable = false;
          this.amountDisable = true;
        }
      },
    },
    watch: {
      item(curVal, oldVal) {
        this.load();
      },
    },
  };
</script>
