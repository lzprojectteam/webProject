<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item label="发货单位">
          <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange" style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.destinationName')">
          <organization-form :root="userOrgId2" :orgId='formItem.destinationId' @onchange="organizationOnchange2" :showRoot="false" style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.annual')" prop="annual">
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
        <el-form-item :label="$t('tobacco.tstorage.transport.tyear')" prop="tyear">
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
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')" prop="ttypeId">
          <type-select :label.sync="formItem.ttypeName" :value.sync="formItem.ttypeId" :key.sync="formItem.ttypeId"
                       style="width: 100%;">
          </type-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')" prop="tstatusId">
          <status-select :label.sync="formItem.tstatusName" :value.sync="formItem.tstatusId"
                         :key.sync="formItem.tstatusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.barcode')" prop="barcode">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.date')" prop="date">
          <el-date-picker
            v-model="formItem.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.depart')" prop="depart">
          <el-date-picker
            v-model="formItem.depart"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.vehicle')" prop="vehicle">
          <el-select clearable v-model='formItem.vehicle'
                     filterable
                     allow-create
                     clearable
                     remote
                     reserve-keyword
                     @change="getInfo"
                     placeholder="请输入关键字进行查询"
                     :remote-method="remoteMethod"
                     :loading="loading"
                     style="width: 100%"
          >
            <el-option v-for="item in  formData.vehicleList" :key="item.id" :label="item.value" :value="item.id">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobile }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.driver')" prop="driver">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.driver"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="联系电话" prop="driver">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.driverMobile"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px;">
        <el-form-item :label="$t('tobacco.tstorage.transport.totalAmount')" prop="totalAmount">
          <el-input-number v-model="formItem.totalAmount" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px;">
        <el-form-item :label="$t('tobacco.tstorage.transport.totalWeight')" prop="totalWeight">
          <el-input-number v-model="formItem.totalWeight" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.sign')" prop="sign">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sign"/>
        </el-form-item>
      </el-col>-->
    </el-row>
    <!--仅用于测试，测试完成后删除-->
    <!--<el-form-item :label="$t('tobacco.tstorage.transport.control')" prop="control">
      <el-select v-model="formItem.control" style="width: 100%" disabled>
        <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
        </el-option>
      </el-select>
    </el-form-item>-->
    <!---->
    <el-form-item :label="$t('tobacco.tstorage.transport.desc')" prop="desc">
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

  import transportApi from '../../api/tstorage/api_transport';
  import categoryApi from '../../api/basic/api_category';
  import vehicleApi from '../../api/tstorage/api_vehicle';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        loading: false,
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'annual': '',
          'serial': '',
          'number': '',
          'barcode': '',
          'title': this.$t('tobacco.tstorage.transport.temp1'),
          'author': '',
          'date': '',
          'destinationId': '',
          'destinationCode': '',
          'destinationName': '',
          'vehicle': '',
          'driver': '',
          'countryId': '86',
          'countryName': '中国',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'totalAmount': '',
          'totalWeight': '',
          'depart': '',
          'arrive': '',
          'sign': '',
          'control': 1,
          'desc': '',
        },
        formData: {
          vehicleList: [],
          optionData: [],
        },
        controllist: [],
        ruleValidate: {
          destinationId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          vehicle: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          driver: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    components: {
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
      userOrgId2() {
        if (this.$store.state.user.organization === undefined) {
          return undefined;
        } else {
          return this.$store.state.user.organization.organizationId.slice(0, 4);
        }
      }
    },
    created() {
      this.load();
    },
    methods: {
      //查询驾驶人信息
      //查询驾驶人信息
      getInfo() {
        if (this.formItem.vehicle) {
          this.formData.optionData.forEach((item) => {
            if (item.license === this.formItem.vehicle) {
              this.formItem.driver = item.driver;
              this.formItem.driverMobile = item.mobile;
            }
          });
        }
      },
      remoteMethod(query) {
        if (query) {
          //清空填充数据
          this.formItem.driver = '';
          this.formItem.driverMobile = '';
          this.loading = true;
          // 获取车辆信息
          Promise.all([vehicleApi.getAll({
            size: 15,
            contains: 'license,driver,legalPerson,mobile:{keyword}:true'.format({keyword: query}),
          })])
            .then(([response]) => {
              let arr = [];
              this.formData.optionData = response.content;
              response.content.forEach(function (item) {
                arr.push({
                  'value': '[' + item.driver + ']' + item.license,
                  'id': item.license,
                  'mobile': item.mobile
                });
              });
              this.formData.vehicleList = arr;
              this.loading = false;
            })
            .catch(error => {
            });
        } else {
          this.formData.seContractList = [];
          this.formData.optionData = [];
          this.formData.vehicleList = [];
          this.loading = false;
        }
      },
      load() {
        Promise.all([
          categoryApi.getAll({sort: 'id', search: 'lead:EQ:ST_TR'})])
          .then(([response]) => {
            this.controllist = response.content;
          })
          .catch(error => {
          });
        this.formItem = JSON.parse(JSON.stringify(this.item));
        if (this.formItem.tyear !== null && this.formItem.tyear !== undefined) {
          this.formItem.tyear = this.formItem.tyear.toString();
        }
        if (this.formItem.annual !== null && this.formItem.annual !== undefined) {
          this.formItem.annual = this.formItem.annual.toString();
        }
        /*this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;*/
        if (this.formItem.control) {
          this.formItem.control = this.formItem.control.id;
        }
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      organizationOnchange2(label, value, values) {
        this.formItem.destinationId = value;
        this.formItem.destinationCode = value;
        this.formItem.destinationName = label;
      },
      onSubmitClick(name) {
        if (this.formItem.destinationId === '') {
          this.$message({
            message: '请填写到货单位',
            type: 'error',
          });
        } else {
          this.$refs[name].validate((valid) => {
            if (valid) {
              Promise.all([transportApi.updateTransport(this.formItem.id, this.formItem)])
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

        }
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
