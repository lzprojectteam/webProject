<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
        </el-form-item>
      </el-col>
      <!--
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tstorage.stock.accountSet')">
                <el-select v-model="formItem.bookId" style="width: 100%">
                  <el-option v-for="item in formData.bookList"
                             :key="item.id"
                             :value="item.id"
                             :label="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
      -->
      <el-col :span="8">
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')" prop="warehouse">
          <el-select v-model="formItem.warehouse" clearable @change="getRegion(1)" style="width: 100%;">
            <el-option v-for="item in formData.whouseList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')" prop="region">
          <el-select v-model="formItem.region" clearable @change="getStack(1)" style="width: 100%;">
            <el-option v-for="item in formData.regionList"
                       :value="item.id"
                       :label="item.title"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--
            <el-col :span="8">
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
      -->
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.year')" prop="year">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.month')" prop="month">
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
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.date')" prop="date">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            v-model="formItem.date"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.operation')" prop="operation">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operationName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.organizationName')" prop="destOrganizationId">
          <organization-select :value.sync="formItem.destOrganizationId" :label.sync="formItem.destOrganizationName"
                               :oId.sync="formItem.operationId"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.tobaccoYear')" prop="tobaccoYear">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.tobaccoYear"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-select :label.sync="formItem.typeName" :value.sync="formItem.typeId" :key.sync="formItem.typeId"
                       style="width: 100%;">
          </type-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--  <el-col :span="8" style="height: 47px">
          <el-form-item :label="$t('tobacco.tstorage.billIn.totalAmount')" prop="totalAmount">
            <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalAmount"
                             style="width: 100%"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="height: 47px">
          <el-form-item :label="$t('tobacco.tstorage.billIn.totalWeight')" prop="totalWeight">
            <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalWeight"
                             style="width: 100%"/>
          </el-form-item>
        </el-col>-->
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.control')" prop="control">
          <el-select v-model="formItem.control" style="width: 100%" disabled>
            <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.transfer')" prop="transfer">
          <el-select v-model="formItem.transfer" style="width: 100%">
            <el-option :value="1" label="是" key="0"></el-option>
            <el-option :value="0" label="否" key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billOut.destBillId')" prop="destBillId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.destBillId"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.billOut.desc')" prop="desc">
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
  const organizationSelect = () => import('../components/organizationSelect');

  import billOutApi from '../../api/tstorage/api_billOut';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import stackApi from '../../api/tstorage/api_stack';
  import operationApi from '../../api/tstorage/api_operation';
  import booksApi from '../../api/tstorage/api_books';
  import categoryApi from '../../api/basic/api_category';

  export default {
    data() {
      return {
        formItem: {
          'annual': '',
          'bookId': '',
          'region': '',
          'warehouse': '',
          'stack': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '0',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'serial': '',
          'number': '',
          'year': '',
          'month': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'operation': '', //这里的operation存的是别名
          'operationId': '', //用于获取收发管理下库房
          'operationName': '',
          'destOrganizationId': '',
          'destOrganizationName': '',
          'destOrganizationCode': '',
          'destOrganizationOrder': '',
          'countryId': '86',
          'countryName': '中国',
          'tobaccoYear': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'totalAmount': '',
          'totalWeight': '',
          'control': 'ST_IN01',
          'transfer': 0,
          'destBillId': '',
          'desc': '',
        },
        formData: {
          whouseList: [],
          regionList: [],
          stackList: [],
          bookList: [],
        },
        controllist: [],
        ruleValidate: {}
      };
    },
    components: {
      OrganizationForm,
      typeSelect,
      statusSelect,
      organizationSelect
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId;
        }
      },
    },
    created() {
      this.load();
      //获取状态列表
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_IN'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
      //获取账套数据
      Promise.all([booksApi.getAll({
        size: 500,
        sort: 'name',
        search: 'organization.organizationId:rlike:{orgid};control.id:EQ:ST_BK03;'.format({
          orgid: this.formItem.organizationId,
        })
      })])
        .then(([response]) => {
          this.formData.bookList = response.content;
          //设置默认账套
          //设置默认账套
          if (this.formData.bookList.length >= 1) {
            this.formItem.bookId = this.formData.bookList[0].id;
          } else {
            this.$message({
              message: '当前组织下没有启用账套，请及时配置！',
              type: 'error',
            });
          }
        })
        .catch(error => {
        });
      this.getWhouse();
      this.formItem.year = new Date().getFullYear().toString();
      this.formItem.month = new Date().getMonth();
      this.formItem.tobaccoYear = new Date().getFullYear().toString();
      this.formItem.date = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    },
    methods: {
      load() {
        let arr = this.$route.path.split('/');
        this.formItem.operation = arr[arr.length - 1];//通过路由获取流程id
        //获取id对应的业务流程名称
        Promise.all([operationApi.getAll({
          search: 'alias:EQ:{alias};'.format({
            alias: this.formItem.operation,
          })
        })])
          .then(([response]) => {
            this.formItem.operationName = response.content[0].name;
            this.formItem.operationId = response.content[0].id;
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
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          size: 500,
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.$store.state.user.organization.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
            if (this.formData.whouseList.length > 0) {
              this.formItem.warehouse = this.formData.whouseList[0].id;
              this.getRegion();
            }
          })
          .catch(error => {
          });
      },
      getRegion() {
        this.formItem.region = '';
        this.formItem.stack = '';
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'warehouse.id:EQ:{warehouse};'.format({
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
            if (response.content.length > 0) {
              this.formItem.region = this.formData.regionList[0].id;
            }
          })
          .catch(error => {
          });
      },
      getStack() {
        this.formItem.stock = '';
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
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formItem.annual = this.formItem.year;
            //非移库出库调用save方法
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([billOutApi.save(this.formItem)])
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
    watch: {//监听路由变化
      $route: {
        handler: function (val, oldVal) {
          this.load();
        },
        // 深度观察监听
        deep: true
      }
    },
  };
</script>
