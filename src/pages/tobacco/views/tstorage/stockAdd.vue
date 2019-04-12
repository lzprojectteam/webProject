<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
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
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')" prop="warehouse">
          <el-select v-model="formItem.warehouse" clearable @change="getRegion" style="width: 100%">
            <el-option v-for="item in formData.whouseList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')" prop="region">
          <el-select v-model="formItem.region" clearable @change="getStack()" style="width: 100%">
            <el-option v-for="item in formData.regionList"
                       :value="item.id"
                       :label="item.title"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.stackId')" prop="stack">
          <el-select v-model="formItem.stack" clearable style="width: 100%;">
            <el-option v-for="item in formData.stackList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
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
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')" prop="statusName">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
      <type-variety-grade-select :varietyName.sync="formItem.varietyName"
                                 :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
    </el-form-item>
    <el-row>
      <el-col :span="24">
        <el-col :span="12" style="height: 47px;">
          <el-form-item :label="$t('tobacco.tstorage.stock.standard')" prop="standard">
            <el-switch v-model="formItem.standard" @change="standardChange"></el-switch>
          </el-form-item>
        </el-col>
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
          <el-input-number :min="minWeight" v-model="formItem.weight" :disabled="weightDisable"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.stock.desc')" prop="desc">
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
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import stockApi from '../../api/tstorage/api_stock';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import booksApi from '../../api/tstorage/api_books';
  import stackApi from '../../api/tstorage/api_stack';

  export default {
    data() {
      return {
        minWeight: 0,
        weightDisable: true, //重量能否编辑
        amountDisable: false, //数量能否编辑
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'warehouse': '',
          'region': '',
          'stack': '',
          'annual': '',
          'serial': '',
          'year': '',
          'month': '',
          'countryId': '',
          'countryName': '',
          'tobaccoYear': '',
          'rankId': '',
          'rankName': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'varietyId': '000',
          'varietyName': '普通品种',
          'gradeId': '001',
          'gradeCode': 'C1F',
          'gradeName': '中桔一',

          'standard': true,
          'amount': '',
          'weight': '',
          'desc': '',
          'booksId': '',
        },
        formData: {
          whouseList: [],
          regionList: [],
          stackList: [],
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
        search: 'organization.organizationId:rlike:{orgid};control.id:EQ:ST_BK03'.format({
          orgid: this.formItem.organizationId,
        })
      })])
        .then(([response]) => {
          if (response.content.length === 0) {
            this.$message({
              message: '当前组织下无启用账套，请尽快配置',
              type: 'error',
            });
          } else {
            this.formData.bookList = response.content;
            this.formItem.booksId = response.content[0].id;
          }
        })
        .catch(error => {
        });
      this.initWhouseAndRegion();
      //this.getRegion();
      this.formItem.annual = new Date().getFullYear().toString();
      this.formItem.year = new Date().getFullYear().toString();
      this.formItem.tobaccoYear = new Date().getFullYear().toString();
      this.formItem.month = new Date().getMonth() + 1;
    },
    methods: {
      //是否标件改变事件
      standardChange() {
        if (this.formItem.standard === true) {
          this.weightDisable = true;
          this.amountDisable = false;
          this.formItem.weight = 0;
          this.formItem.amount = 0;
          this.minWeight = 0; //标件重量为0
        } else {
          this.weightDisable = false;
          this.amountDisable = true;
          this.formItem.weight = 1;
          this.formItem.amount = 1;
          this.minWeight = 0.000001; //非标件重量不允许为0
        }
      },
      initWhouseAndRegion() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
            if (this.formData.whouseList.length > 0) {
              this.formItem.warehouse = this.formData.whouseList[0].id;
            }
            Promise.all([regionApi.getAll({
              sort: 'title',
              search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
                orgid: this.formItem.organizationId,
                warehouse: this.formItem.warehouse,
              })
            })])
              .then(([response]) => {
                this.formData.regionList = response.content;
                if (this.formData.regionList.length > 0) {
                  this.formItem.region = this.formData.regionList[0].id;
                }
                this.getStack();
              })
              .catch(error => {
              });
          })
          .catch(error => {
          });
      },
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
            if (this.formData.whouseList.length > 0) {
              this.formItem.warehouse = this.formData.whouseList[0].id;
            }
          })
          .catch(error => {
          });
      },
      getRegion() {
        this.formItem.region = '';
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'organization.organizationId:rlike:{orgid};warehouse.id:EQ:{warehouse};'.format({
            orgid: this.formItem.organizationId,
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
            if (this.formData.regionList.length > 0) {
              this.formItem.region = this.formData.regionList[0].id;
            }
          })
          .catch(error => {
          });
      },
      getStack() {
        this.formItem.stack = '';
        Promise.all([stackApi.getAll({
          sort: 'name',
          size: 500,
          search: 'region.id:EQ:{region};'.format({
            region: this.formItem.region,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
            if (this.formData.stackList.length > 0) {
              this.formItem.stack = this.formData.stackList[0].id;
            }
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
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([stockApi.saveStock(this.formItem)])
              .then(([response]) => {
                loading.close();
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
