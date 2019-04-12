<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                             style="width:100%"/>
        </el-form-item>
      </el-col>
<!--
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.stock.accountSet')" prop="bookId">
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
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')" prop="whouseId">
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
        <el-form-item :label="$t('tobacco.tstorage.facility.regionId')" prop="regionId">
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
      -->
    </el-row>
    <el-row>
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
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.serial')" prop="serial">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.number')" prop="number">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.date')" prop="date">
          <el-date-picker
            v-model="formItem.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.operation')" prop="operation">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formData.operationName" disabled/>
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
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.totalAmount')" prop="totalAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalAmount"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.totalWeight')" prop="totalWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalWeight"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostAmount')" prop="lostAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lostAmount"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.lostWeight')" prop="lostWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.lostWeight"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sourceOrganizationName')" prop="sourceOrganizationId">
          <organization-select :value.sync="formItem.sourceOrganizationId" :label.sync="formItem.sourceOrganizationName"
                               :oId.sync="formData.operationId"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sign')" prop="sign">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sign"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.transfer')" prop="transfer">
          <el-select v-model="formItem.transfer" style="width: 100%">
            <el-option :value="1" label="是" key="0"></el-option>
            <el-option :value="0" label="否" key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseAmount')" prop="riseAmount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.riseAmount"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.riseWeight')" prop="riseWeight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.riseWeight"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.sourceBillId')" prop="sourceBillId">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sourceBillId"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tstorage.billIn.control')" prop="control">
          <el-select v-model="formItem.control" style="width: 100%" disabled>
            <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.billIn.desc')" prop="desc">
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
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const OrganizationForm = () => import('@/components/Organization');
  const statusSelect = () => import('../components/statusSelect');
  const organizationSelect = () => import('../components/organizationSelect');

  import billInApi from '../../api/tstorage/api_billIn';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import regionApi from '../../api/tstorage/api_region';
  import stackApi from '../../api/tstorage/api_stack';
  import booksApi from '../../api/tstorage/api_books';
  import categoryApi from '../../api/basic/api_category';
  import operationApi from '../../api/tstorage/api_operation';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'bookId': '',
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
          'tobaccoYear': '',
          'typeName': '',
          'typeId': '',
          'statusName': '',
          'statusId': '',
          'totalAmount': '',
          'totalWeight': '',
          'lostAmount': '',
          'lostWeight': '',
          'sign': '',
          'transfer': '',
          'riseAmount': '',
          'riseWeight': '',
          'sourceBillId': '',
          'sourceOrganizationId': '',
          'sourceOrganizationCode': '',
          'sourceOrganizationName': '',
          'control': '',
          'desc': '',
        },
        controllist: [],
        formData: {
          'operationName': '',
          'operationId': '', //用于获取收发管理下库房
          whouseList: [],
          regionList: [],
          stackList: [],
          bookList: [],
        },
        ruleValidate: {
          bookId: [
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
        search: 'organization.organizationId:rlike:{orgid};'.format({
          orgid: this.formItem.organizationId,
        })
      })])
        .then(([response]) => {
          this.formData.bookList = response.content;
        })
        .catch(error => {
        });
      this.getWhouse();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        //获取id对应的业务流程名称
        Promise.all([operationApi.getAll({
          search: 'alias:rlike:{alias};'.format({
            alias: this.formItem.operation,
          })
        })])
          .then(([response]) => {
            this.formData.operationName = response.content[0].name;
            this.formData.operationId = response.content[0].id;
          })
          .catch(error => {
          });
        if (this.formItem.annual) {
          this.formItem.annual = this.formItem.annual.toString();
        }
        if (this.formItem.control) {
          this.formItem.control = this.formItem.control.id;
        }
        if (this.formItem.tobaccoYear) {
          this.formItem.tobaccoYear = this.formItem.tobaccoYear.toString();
        }
        if (this.formItem.warehouse) {
          this.formItem.warehouse = this.formItem.warehouse.id;
          this.getRegion();//请求该库房对应库区数据

        }
        if (this.formItem.region) {
          this.formItem.region = this.formItem.region.id;
          this.getStack();//请求垛位数据
        }
        if (this.formItem.stack !== '' && this.formItem.stack !== null) {
          this.formItem.stack = this.formItem.stack.id;
        }
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
          })
          .catch(error => {
          });
      },
      getRegion(flag) {
        //在编辑界面，需要判断是回显还是用户在操作，回显不能清空库区垛位，而用户操作就需要清空
        if (flag === 1) {
          this.formItem.region = '';
          this.formItem.stack = '';
        }
        Promise.all([regionApi.getAll({
          sort: 'title',
          search: 'warehouse.id:EQ:{warehouse};'.format({
            warehouse: this.formItem.warehouse,
          })
        })])
          .then(([response]) => {
            this.formData.regionList = response.content;
            //默认第一个库区
            if (flag === 1 && response.content.length > 0) {
              this.formItem.region = this.formData.regionList[0].id;
            }
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
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([billInApi.updateBillIn(this.formItem.id, this.formItem)])
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

    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
      $route: {
        handler: function (val, oldVal) {//编辑界面也要监听路由变化，不然一个页面编辑切换到另一个页面编辑会有bug
          let arr = this.$route.path.split('/');
          //获取id对应的业务流程名称
          Promise.all([operationApi.getAll({
            search: 'alias:EQ:{alias};'.format({
              alias: arr[arr.length - 1],
            })
          })])
            .then(([response]) => {
              this.formData.operationName = response.content[0].name;
            })
            .catch(error => {
            });
        },
        // 深度观察监听
        deep: true
      }

    },
  };
</script>
