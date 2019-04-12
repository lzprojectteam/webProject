<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.annual')">
          <el-date-picker value-format="yyyy" v-model="formItem.annual" type="year" placeholder="选择年"
                          style="width:100%;">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.number')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber()"
                    disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.date')">
          <el-date-picker value-format="yyyy-MM-dd" v-model="formItem.date" type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width:100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.districtName')">
          <organization-form root="51" @onchange="directiveOnchange" model="district" style="width:100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('org.organizationName')">
          <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                             style="width:100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.farmerName')" style="width:100%">
          <el-select ref='userSelect' @change="selectChange" v-model='formItem.farmerName' filterable allow-create
                     remote placeholder="请输入关键词" :remote-method='remoteFarmerMethod' style="width:100%">
            <el-option v-for="item in selectData.farmerList" :key="item.id" :label="item.name" :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.farmerIdentity')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.backupIdentity')">
          <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.relativeIdentity"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.farmerNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.farmerPhone')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.farmerAddress')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.bankName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.bankAccount')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.backupBankAccount')">
          <el-input :disabled="this.menuProps.inputDisabled" v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.relativeBankAccount"/>
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
          <type-select :value.sync="formItem.typeId" @onchange="typeChange" style="width:100%"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.signArea')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.signArea"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.signPlant')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.signPlant"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.signWeight')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.signWeight"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.seContract.subsidy')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.subsidy"/>
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
          <el-select ref='employeeSelect' @change="selectEmployeeChange" v-model='formItem.technicianName' filterable
                     remote placeholder="请输入关键词" :remote-method='remoteEmployeeMethod' style="width:100%">
            <el-option v-for="item in selectData.employeeList" :key="item.id" :label="item.name" :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button :disabled="this.menuProps.buttonDisabled" v-show='isEdit' type="primary" style="float: right "
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
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
    props: ['item', 'isEdit', 'visible'],
    data() {
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
        menuProps: {
          label: 'title',
          disabled: 'leaf',
          value: 'id',
          children: 'child',
          buttonDisabled: false
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
          farmerPhone: '',
          farmerAddress: '',
          bankName: '',
          bankAccount: '',
          areaId: '',
          areaName: '',
          typeId: '',
          typeName: '',
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
          technicianId: '',
          technicianNumber: '',
          technicianName: '',
          card: 0,
          control: '',
          desc: '',
          organizationId: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          organizationOrder: 0,
          organizationCode: this.$store.state.user.organization.organizationId,
          districtId: '',
          districtName: '',
          districtOrder: '',
          districtCode: '',
          sign: '',
          plan: '',
          pay: ''
        },
        ruleValidate: {
          code: [{required: true, message: '编码不能为空', trigger: 'blur'}]
        }
      };
    },
    created() {
      Promise.all([
        tareaApi.getAll(),
        categoryApi.getAll({search: 'lead:EQ:SG_S'}),
        categoryApi.getAll({search: 'lead:EQ:SG_C'}),
        categoryApi.getAll({search: 'lead:EQ:SG_P'}),
        categoryApi.getAll({search: 'lead:EQ:SC_ST'})
      ])
        .then(([trea, cont, cont2, cont3, status]) => {
          this.selectData.tareaList = trea.content;
          this.selectData.signList = cont.content;
          this.selectData.planList = cont2.content;
          this.selectData.payList = cont3.content;
          this.selectData.controllist = status.content;
        })
        .catch(error => {
        });
      this.load();
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
      typeSelect,
      OrganizationForm
    },
    methods: {
      checkNumber() {
        if (this.formItem.number === '') {
          this.$message({
            message: this.$t('编号不能为空'),
            type: 'error'
          });
          this.menuProps.buttonDisabled = true;
          return;
        }
        Promise.all([seContractApi.checkNumer(1, this.formItem.number, {
          id: this.formItem.id
        })])
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
          .catch(error => {
          });
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = 0;
        this.formItem.organizationCode = value;
      },
      remoteEmployeeMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            Promise.all([
              hrEmployeeApi.getAll({
                search: 'name:like:{name}'.format(
                  {
                    name: query
                  }
                )
              })
            ])
              .then(([response]) => {
                this.selectData.employeeList = response.content;
                this.selectData.employeeList.unshift({id: '0', number: '<无>', name: '未指派'});
              })
              .catch(error => {
              });
          }, 200);
        } else {
          this.selectData.employeeList = [];
          this.selectData.employeeList.unshift({id: '0', number: '<无>', name: '未指派'});
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
                search: 'organizationInfo.organizationId:EQ:{orgid};name:like:{farmerName}'.format(
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
              .catch(error => {
              });
          }, 200);
        } else {
          this.selectData.farmerList = [];
        }
      },
      tareaChange(id) {
        let obj = {};
        obj = this.selectData.tareaList.find(item => {
          return item.areaId === id;
        });
        this.formItem.areaName = obj.name;
      },
      typeChange(value, label) {
        this.formItem.typeId = value;
        this.formItem.typeName = label;
      },
      selectChange(name) {
        let obj = {};
        obj = this.selectData.farmerList.find(item => {
          return item.name === name;
        });
        if (obj === undefined) {
          this.formItem.farmerId = 0;
          this.formItem.farmerName = '';
          this.formItem.farmerIdentity = '';
          this.formItem.farmerPhone = '';
          this.formItem.farmerNumber = '';
          this.formItem.farmerAddress = '';
          this.formItem.bankName = '';
          this.formItem.bankAccount = '';
        } else {
          this.formItem.farmerId = obj.id;
          this.formItem.farmerName = obj.name;
          this.formItem.farmerIdentity = obj.identity;
          this.formItem.farmerPhone = obj.phone;
          this.formItem.farmerNumber = obj.number;
          this.formItem.farmerAddress = obj.address;
          this.formItem.bankName = obj.bankName;
          this.formItem.bankAccount = obj.bankAccount;
        }
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        this.formItem.organizationCode = this.formItem.organization.organizationCode;
        this.formItem.districtId = this.formItem.organization.districtId;
        this.formItem.districtName = this.formItem.organization.districtName;
        this.formItem.districtOrder = this.formItem.organization.districtOrder;
        this.formItem.districtCode = this.formItem.organization.districtCode;
        this.formItem.annual = this.item.annual + '';
        // this.formItem.control = this.formItem.control.id;
        if (this.formItem.control !== '' && this.formItem.control !== null && this.formItem.control !== undefined) {
          this.formItem.control = this.formItem.control.id;
        }
        this.formItem.sign = this.formItem.sign.id;
        this.formItem.pay = this.formItem.pay.id;
        this.formItem.plan = this.formItem.plan.id;
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          //进行前端检验
          if (valid) {
            Promise.all([
              seContractApi.updateSeContract(this.item.id, this.formItem)
            ])
              .then(([response]) => {
                this.formReset(name);
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info'
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {
              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn'
            });
          }
        });
      },
      directiveOnchange(label, value, values) {
        this.formItem.districtId = value;
        this.formItem.districtName = label;
        this.formItem.districtOrder = 0;
      },
      farmerAddressOnchange(label, value, values) {
        this.formItem.farmerAddress = value;
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },
      selectEmployeeChange(name) {
        let obj = {};
        obj = this.selectData.employeeList.find(item => {
          return item.name === name;
        });
        this.formItem.technicianName = obj.name;
        this.formItem.technicianId = obj.id;
        this.formItem.technicianNumber = obj.number;
      }
    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      }
    }
  };
</script>
