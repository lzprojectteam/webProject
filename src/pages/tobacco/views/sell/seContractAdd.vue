<template>
  <div>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.annual')">
            <el-date-picker value-format="yyyy" v-model="formItem.annual" type="year" placeholder="选择年" style="width:100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.number')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber()" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.author')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.title')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.date')">
            <el-date-picker value-format="yyyy-MM-dd" v-model="formItem.date" type="date" :placeholder="$t('base.pleaseSelect')" style="width:100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.districtName')">
            <organization-form root="51" @onchange="directiveOnchange" model="district" style="width:100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('org.organizationName')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.farmerName')" style="width:100%">
            <el-select ref='userSelect' @change="selectChange" v-model='formItem.farmerId' filterable allow-create remote placeholder="请输入关键词" :remote-method='remoteFarmerMethod' style="width:100%">
              <el-option v-for="item in selectData.farmerList" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.farmerIdentity')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.backupIdentity')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.relativeIdentity" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.farmerNumber')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.farmerPhone')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.farmerAddress')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.bankName')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.bankAccount')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount" />
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.backupBankAccount')">
            <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.relativeBankAccount" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.tareaName')">
            <el-select v-model='formItem.areaId' style="width:100%" @change="tareaChange">
              <el-option v-for="item in selectData.tareaList" :key="item.areaId" :label="item.name" :value="item.areaId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.typeName')">
            <type-select :value.sync="formItem.typeId" @onchange="typeChange" style="width:100%" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.signArea')" prop="signArea">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.signArea" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.signPlant')" prop="signPlant">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.signPlant" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.subsidy')" prop="subsidy">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.subsidy" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.sellWeight')" prop="sellWeight">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sellWeight" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.card')" prop="card">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.card" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.control')">
            <el-select v-model='formItem.control' style="width:100%">
              <el-option v-for="item in  selectData.controllist" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.sign')">
            <el-select v-model='formItem.sign' style="width:100%">
              <el-option v-for="item in  selectData.signList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.pay')">
            <el-select v-model='formItem.pay' style="width:100%">
              <el-option v-for="item in  selectData.payList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.plan')">
            <el-select v-model='formItem.plan' style="width:100%">
              <el-option v-for="item in  selectData.planList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tsell.seContract.technicianName')">
            <el-select ref='employeeSelect' @change="selectEmployeeChange" v-model='formItem.technicianId' filterable remote placeholder="请输入关键词" :remote-method='remoteEmployeeMethod' style="width:100%">
              <el-option v-for="item in selectData.employeeList" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('tobacco.tsell.seContract.desc')">
            <el-input v-model="formItem.desc" type="textarea" :rows="3" placeholder="请输入内容" style='width:100%'>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" style="float: right " @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import seContractApi from '../../api/tsell/api_seContract';
import tareaApi from '@/api/tobacco/apiArea';
import categoryApi from '../../api/basic/api_category';
import hrFarmerApi from '../../api/thuman/api_hrFarmer';
import hrEmployeeApi from '../../api/thuman/api_hrEmployee';
const typeSelect = () => import('@/components/Tobacco/typeSelect');
const OrganizationForm = () => import('@/components/Organization');
export default {
  data() {
    var isNumber = (rule, value, callback) => {
      if (isNaN(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value <= 0) {
          callback(new Error('必须大于0'));
        } else {
          callback();
        }
      }
    };
    return {
      selectData: {
        farmerList: [],
        tareaList: [],
        controllist: [],
        planList: [],
        payList: [],
        signList: [],
        employeeList: []
      },
      innerVisible: false,
      menuProps: {
        label: 'title',
        disabled: 'leaf',
        value: 'id',
        children: 'child',
        buttonDisabled: true,
        inputDisabled: false
      },
      childForm: {},
      formData: {
        systemList: [],
        menuList: [],
        topMenu: [],
        prefixCode: '',
        inputCode: '',
        action: '',
        actionList: [
          { id: 'VIEW', label: this.$t('base.buttonView') },
          { id: 'ADD', label: this.$t('base.buttonAdd') },
          { id: 'EDIT', label: this.$t('base.buttonEdit') },
          { id: 'DELETE', label: this.$t('base.buttonDelete') },
          { id: 'REVIEW', label: this.$t('base.buttonReview') }
        ],
        commonActionList: [{ id: 'BUTTON', label: '按钮' }]
      },
      formItem: {
        annual: '2018',
        serial: '',
        number: '',
        title: '',
        author: this.$store.state.user.userName,
        date: '',
        countryId: '',
        countryName: '',
        farmerId: '',
        farmerNumber: '',
        farmerName: '',
        farmerIdentity: '',
        relativeIdentity: '',
        farmerPhone: '',
        farmerAddress: '',
        bankName: '',
        bankAccount: '',
        relativeBankAccount: '',
        year: 2018,
        areaId: '2',
        areaName: '二价区',
        typeId: '10',
        typeName: '烤烟',
        signArea: 0,
        signPlant: 0,
        signWeight: 0,
        subsidy: 0,
        sellWeight: 0,
        sellPrice: 0,
        sellMoney: 0,
        sellTax: 0,
        sellAllowance: 0,
        sellTotal: 0,
        finish: 0,
        debit: 0,
        deduct: 0,
        technicianId: '未指派',
        technicianNumber: '<无>',
        technicianName: '未指派',
        card: 0,
        control: 'SC_ST01',
        desc: '',
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: 0,
        organizationCode: this.$store.state.user.organization.organizationId,
        districtId: '',
        districtName: '',
        districtOrder: '',
        districtCode: '',
        sign: 'SG_S2',
        plan: 'SG_C1',
        pay: 'SG_P1'
      },
      ruleValidate: {
        sellWeight: [{ validator: isNumber, trigger: 'blur' }],
        signArea: [{ validator: isNumber, trigger: 'blur' }],
      }
    };
  },
  // 获取页面初始化的数据
  created() {
    Promise.all([
      tareaApi.getAll(),
      categoryApi.getAll({ search: 'lead:EQ:SG_S' }),
      categoryApi.getAll({ search: 'lead:EQ:SG_C' }),
      categoryApi.getAll({ search: 'lead:EQ:SG_P' }),
      categoryApi.getAll({ search: 'lead:EQ:SC_ST' })
    ])
      .then(([trea, cont, cont2, cont3, status]) => {
        this.selectData.tareaList = trea.content;
        this.selectData.signList = cont.content;
        this.selectData.planList = cont2.content;
        this.selectData.payList = cont3.content;
        this.selectData.controllist = status.content;
      })
      .catch(error => {});
    this.formItem.date = this.getNowFormatDate();
  },
  components: {
    typeSelect,
    OrganizationForm
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
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = '-';
      let seperator2 = ':';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month < 10) {
        month = '0' + month;
      }
      if (strDate < 10) {
        strDate = '0' + strDate;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minutes + seperator2 + seconds;
      return currentdate;
    },
    selectEmployeeChange(id) {
      let obj = {};
      obj = this.selectData.employeeList.find(item => {
        return item.id === id;
      });
      this.formItem.technicianName = obj.name;
      this.formItem.technicianId = obj.id;
      this.formItem.technicianNumber = obj.number;
    },
    tareaChange(id) {
      let obj = {};
      obj = this.selectData.tareaList.find(item => {
        return item.areaId === id;
      });
      this.formItem.areaName = obj.name;
    },
    selectChange(id) {
      let obj = {};
      obj = this.selectData.farmerList.find(item => {
        return item.id === id;
      });
      if (obj === undefined) {
        this.menuProps.inputDisabled = false;
        this.formItem.farmerName = '';
        this.formItem.farmerIdentity = '';
        this.formItem.farmerPhone = '';
        this.formItem.farmerNumber = '';
        this.formItem.farmerAddress = '';
        this.formItem.bankName = '';
        this.formItem.bankAccount = '';
      } else {
        this.menuProps.inputDisabled = true;
        this.formItem.farmerName = obj.name;
        this.formItem.farmerIdentity = obj.identity;
        this.formItem.farmerPhone = obj.phone;
        this.formItem.farmerNumber = obj.number;
        this.formItem.farmerAddress = obj.address;
        this.formItem.bankName = obj.bankName;
        this.formItem.bankAccount = obj.bankAccount;
      }
    },
    remoteEmployeeMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          Promise.all([
            hrEmployeeApi.getAll({
              search: 'name:like:{name}'.format({
                name: query
              })
            })
          ])
            .then(([response]) => {
              this.selectData.employeeList = response.content;
              this.selectData.employeeList.unshift({
                id: '0',
                number: '<无>',
                name: '未指派'
              });
            })
            .catch(error => {});
        }, 200);
      } else {
        this.selectData.employeeList = [];
        this.selectData.employeeList.unshift({
          id: '0',
          number: '<无>',
          name: '未指派'
        });
      }
    },
    remoteFarmerMethod(query) {
      if (
        this.formItem.organizationId === null ||
        this.formItem.organizationId === ''
      ) {
        this.$message({
          message: this.$t('请先选择组织单位'),
          type: 'error'
        });
        return;
      }
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          Promise.all([
            hrFarmerApi.getAll({
              search: 'organization.organizationId:EQ:{orgid};(name:like:{farmerName}:or;identity:like:{farmerName}:or;phone:like:{farmerName};)'.format(
                {
                  orgid: this.formItem.organizationId,
                  farmerName: query
                }
              )
            })
          ])
            .then(([response]) => {
              this.selectData.farmerList = response.content;
            })
            .catch(error => {});
        }, 200);
      } else {
        this.selectData.farmerList = [];
      }
    },
    typeChange(value, label) {
      this.formItem.typeId = value;
      this.formItem.typeName = label;
    },
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = 0;
      this.formItem.organizationCode = value;
    },
    directiveOnchange(label, value, values) {
      this.formItem.districtId = value;
      this.formItem.districtName = label;
      this.formItem.districtOrder = 0;
      this.formItem.districtCode = value;
    },
    checkNumber() {
      if (this.formItem.number === '') {
        this.$message({
          message: this.$t('编号不能为空'),
          type: 'error'
        });
        this.menuProps.buttonDisabled = true;
        return;
      }
      Promise.all([seContractApi.checkNumer(0, this.formItem.number)])
        .then(([response]) => {
          if (response) {
            this.$message({
              message: this.$t('编号重复，请重新输入'),
              type: 'error'
            });
            this.menuProps.buttonDisabled = true;
          } else {
            this.$message({
              message: this.$t('编号未重复，可继续填写信息'),
              type: 'info'
            });
            this.menuProps.buttonDisabled = false;
          }
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formItem.districtId === null || this.formItem.districtId === '') {
            this.$message({
              message: this.$t('请选择所属地区'),
              type: 'info'
            });
            return;
          }
          if (this.formItem.organizationId === null || this.formItem.organizationId === '') {
            this.$message({
              message: this.$t('请选择组织单位'),
              type: 'info'
            });
            return;
          }
          if (this.formItem.farmerId === null || this.formItem.farmerId === '') {
            this.$message({
              message: this.$t('请选择烟农'),
              type: 'info'
            });
            return;
          }
          if (this.formItem.technicianId === null || this.formItem.technicianId === '') {
            this.$message({
              message: this.$t('请选择烟技员'),
              type: 'info'
            });
            return;
          }
          const loading = this.$loading({
            lock: true,
            text: '处理中,请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          Promise.all([seContractApi.saveSeContract(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
              loading.close();
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
          });
        }
      });
    },
    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
