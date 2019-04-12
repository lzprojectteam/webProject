<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item label="发货单位">
          <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.destinationName')">
          <organization-form :root="userOrgId2" @onchange="organizationOnchange2" :showRoot="false" style="width:100%"/>
        </el-form-item>
      </el-col>
    </el-row>
     <el-row>
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
     </el-row>
      <el-row>
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
      </el-row>
       <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.barcode')" prop="barcode">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode">
            <el-button slot="append" @click="readcard">读卡</el-button>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
       </el-row>
        <el-row>
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
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            style="width:100%;"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
        </el-row>
         <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transport.vehicle')" prop="vehicle">
          <el-select clearable v-model='formItem.vehicle'
                     filterable
                     allow-create
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
         </el-row>
          <el-row>
      <el-col :span="24">
        <el-form-item label="联系电话" prop="driver">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.driverMobile"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.transport.desc')" prop="desc">
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

  import transportApi from '../../api/tstorage/api_transport';
  import categoryApi from '../../api/basic/api_category';
  import vehicleApi from '../../api/tstorage/api_vehicle';

  export default {
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
          'author': this.$store.state.user.userName,
          'date': '',
          'destinationId': '',
          'destinationCode': '',
          'destinationName': '',
          'vehicle': '',
          'driver': '',
          'driverMobile': '',
          'countryId': '86',
          'countryName': '中国',
          'tyear': '',
          'ttypeId': '10',
          'ttypeName': '烤烟',
          'tstatusId': '901',
          'tstatusName': '把烟',
          'totalAmount': 0,
          'totalWeight': 0,
          'depart': '',
          'arrive': '',
          'sign': '',
          'control': 'ST_TR01',
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
      this.formItem.annual = new Date().getFullYear().toString();
      this.formItem.tyear = new Date().getFullYear().toString();
      this.formItem.date = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
      this.formItem.depart = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');

      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_TR'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });

    },
    methods: {
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
      readcard() {
        Promise.all([
          transportApi.readcard()])
          .then(([response]) => {
            console.log(response);
            if (response.code === 0) {
              this.formItem.barcode = response.data;//赋值
              this.$message({
                message: '读卡成功',
                type: 'success',
              });
            } else {
              this.$message({
                message: '读卡失败',
                type: 'error',
              });
            }
          })
          .catch(error => {
            this.$message({
              message: '读卡失败',
              type: 'error',
            });
          });
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
              const loading = this.$loading({
                lock: true,
                text: '处理中,请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              Promise.all([transportApi.saveTransport(this.formItem)])
                .then(([response]) => {
                  loading.close();
                  this.formReset('formValidate');
                  //重置表单，允许多次操作
                  this.formItem.ttypeId = '';
                  this.formItem.ttypeName = '';
                  this.formItem.tstatusId = '';
                  this.formItem.tstatusName = '';
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

        }
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },

    }
  };
</script>
