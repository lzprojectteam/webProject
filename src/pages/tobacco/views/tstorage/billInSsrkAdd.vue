<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="16">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sourceOrganizationName')">
          <organization-form :root="userOrgId" @onchange="organizationOnchange" :showRoot="false" style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="调运单号" prop="sourceBillId">
          <el-select v-model="formItem.billNumber" style="width: 100%;" filterable clearable
                     @change="getTransportData">
            <el-option v-for="item in formData.transportList"
                       :value="item.number"
                       :key="item.number"
                       :label="item.number"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
     <el-row>
      <!--<el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.stock.accountSet')">
          <el-select v-model="formItem.bookId" style="width: 100%" default-first-option>
            <el-option v-for="item in formData.bookList"
                       :key="item.id"
                       :value="item.id"
                       :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>-->
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
        <el-form-item :label="$t('tobacco.tstorage.billIn.annual')" prop="annual">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.annual"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
     </el-row>
      <el-row>
      <!--<el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sign')" prop="sign">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sign"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.control')" prop="control">
          <el-select v-model="formItem.control" style="width: 100%" disabled>
            <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!--<el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.date')" prop="date">
          <el-date-picker
            v-model="formItem.date"
            type="date"
            value-format="yyyy-MM-dd"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      </el-row>
       <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.operation')" prop="operation">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operationName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.tobaccoYear')" prop="tobaccoYear">
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
       </el-row>
        <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--      <el-col :span="8" style="height:47px">
              <el-form-item :label="$t('tobacco.tstorage.billIn.totalAmount')" prop="totalAmount">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalAmount"
                                 style="width: 100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height:47px">
              <el-form-item :label="$t('tobacco.tstorage.billIn.totalWeight')" prop="totalWeight">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalWeight"
                                 style="width: 100%"/>
              </el-form-item>
            </el-col>-->
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostAmount')" prop="lostAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lostAmount"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostWeight')" prop="lostWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lostWeight"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
        </el-row>
      <!-- <el-col :span="8">
         <el-form-item :label="$t('tobacco.tstorage.billIn.sourceOrganizationName')" prop="sourceOrganizationId">
           <organization-select :value.sync="formItem.sourceOrganizationId" :label.sync="formItem.sourceOrganizationName"
                                :oId.sync="formItem.operationId" @onchange="organizationOnchange2"/>
         </el-form-item>
       </el-col>-->
        <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.transfer')" prop="transfer">
          <el-select v-model="formItem.transfer" style="width: 100%">
            <el-option :value="1" label="是" key="0"></el-option>
            <el-option :value="0" label="否" key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseAmount')" prop="riseAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.riseAmount"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseWeight')" prop="riseWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.riseWeight"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.billIn.desc')" prop="desc">
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
  const whouseSelect = () => import('../components/whouseSelect');
  const organizationSelect = () => import('../components/organizationSelect');

  import billInApi from '../../api/tstorage/api_billIn';
  import transportApi from '../../api/tstorage/api_transport';
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
          'bookId': '',
          'billNumber': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'region': '',
          'warehouse': '',
          'stack': '',
          'annual': '',
          'serial': '',
          'number': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'operation': '', //这里的operation存的是别名
          'operationId': '', //用于获取收发管理下库房
          'operationName': '',
          'tobaccoYear': '',
          'typeName': '烤烟',
          'typeId': '10',
          'statusName': '原烟',
          'statusId': '101',
          'totalAmount': 0,
          'totalWeight': 0,
          'lostAmount': '',
          'lostWeight': '',
          'sign': '',
          'countryId': '86',
          'countryName': '中国',
          'transfer': 0,
          'riseAmount': '',
          'riseWeight': '',
          'sourceBillId': '',
          'sourceOrganizationId': '',
          'sourceOrganizationCode': '',
          'sourceOrganizationName': '',
          'control': 'ST_IN01',
          'desc': '',
        },
        controllist: [],
        formData: {
          whouseList: [],
          regionList: [],
          stackList: [],
          bookList: [],
          transportList: [],
        },
        ruleValidate: {
          sourceBillId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    components: {
      organizationSelect,
      OrganizationForm,
      typeSelect,
      statusSelect,
      whouseSelect
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId.slice(0, 6);
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
        search: 'organization.organizationId:rlike:{orgid};control.id:EQ:ST_BK03'.format({
          orgid: this.formItem.organizationId,
        })
      })])
        .then(([response]) => {
          this.formData.bookList = response.content;
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
      this.formItem.annual = new Date().getFullYear().toString();
      this.formItem.tobaccoYear = new Date().getFullYear().toString();
      this.formItem.date = this.dateFormat(new Date(), 'yyyy-mm-dd');
    },
    methods: {
      getTransportData() {
        let data = this.formData.transportList.find((item) => {
          return item.number === this.formItem.billNumber;
        });
        if (data) {
          if (data.tyear) {
            this.formItem.tobaccoYear = data.tyear.toString();
          }
          this.formItem.typeName = data.ttypeName;
          this.formItem.sourceBillId = data.id;
          this.formItem.typeId = data.ttypeId;
          this.formItem.statusName = data.tstatusName;
          this.formItem.statusId = data.tstatusId;
          this.formItem.totalAmount = data.totalAmount;
          this.formItem.totalWeight = data.totalWeight;
        }
      },
      getTransportList() {
        // 先清空单号
        this.formItem.sourceBillId = '';
        if (!this.formItem.sourceOrganizationId) {
          this.$message({
            message: '请先选择来货单位',
            type: 'info',
          });
          return;
        }
        //获取调运单数据
        Promise.all([transportApi.getAll({
          size: 500,
          organizationId: this.formItem.sourceOrganizationId,
          isOnTheWay: 1, //只查询在途调运单
          sort: 'number',
        })])
          .then(([response]) => {
            this.formData.transportList = response.content;
            if (this.formData.transportList.length > 0) {
              this.formItem.sourceBillId = this.formData.transportList[0].number;
            }
          })
          .catch(error => {
          });
      },
      load() {
        let arr = this.$route.path.split('/');
        this.formItem.operation = arr[arr.length - 1];//通过路由获取alias
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
        this.formItem.sourceOrganizationId = value;
        this.formItem.sourceOrganizationCode = value;
        this.formItem.sourceOrganizationName = label;
        this.formItem.sourceOrganizationOrder = '0';
        this.getTransportList();
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
            // 赋值不会触发change,导致库区无数据
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
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([billInApi.saveBillIn(this.formItem)])
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
