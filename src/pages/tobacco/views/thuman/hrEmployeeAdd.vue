<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.number')" prop="number">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber()"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')" prop="positionList">
          <el-select v-model="formItem.positionList" multiple placeholder="请选择" style="width:100%" collapse-tags>
            <el-option
              v-for="item in checkBoxData.positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.identity')" prop='identity'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.sex')" prop="sex">
          <el-select v-model='formItem.sex' style="width:100%">
            <el-option v-for="item in  checkBoxData.sexList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.birth')" prop="birth">
          <el-date-picker value-format="yyyy-MM-dd" v-model="formItem.birth" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.date')" prop="date">
          <el-date-picker value-format="yyyy-MM-dd" v-model="formItem.date" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.address')" prop="address">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.address"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.phone')" prop='phone'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model.number="formItem.phone"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.email')" prop="email">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.email"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.bankName')" prop="bankName">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.bankAccount')" prop="bankAccount">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.education')" prop="education">
          <el-select v-model='formItem.education' style="width:100%">
            <el-option v-for="item in  checkBoxData.educationList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.school')" prop="school">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.school"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.control')" id="team_radio">
          <el-select v-model="formItem.control" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="(val,key) in formItem.controlList"
              :key="key"
              :label="val"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.thuman.hrEmployee.specialty')" prop="specialty">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.specialty"/>
    </el-form-item>
    <br/>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import hrEmployeeApi from '../../api/thuman/api_hrEmployee';
  import categoryApi from '../../api/basic/api_category';

  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback();
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 9999999999 || value > 99999999999) {
            callback(new Error('手机号只能为11位'));
          } else {
            callback();
          }
        }
      };
      return {
        checkBoxData: {
          positionList: [],
          sexList: [],
          educationList: [],
          buttonDisabled: true
        },
        formItem: {
          organizationId: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          organizationOrder: '',
          organizationCode: this.$store.state.user.organization.organizationId,
          number: '',
          title: '',
          name: '',
          identity: '',
          birth: '',
          author: this.$store.state.user.userName,
          date: '',
          address: '',
          phone: '',
          email: '',
          bankName: '',
          bankAccount: '',
          school: '',
          specialty: '',
          loginId: 0,
          loginName: '',
          control: '1',
          desc: '',
          education: 'SC_E00',
          sex: 'SC_S00',
          controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
          positionList: []
        },
        ruleValidate: {
          identity: [
            {
              min: 18,
              max: 18,
              message: '身份证号码长度应为18位',
              trigger: 'blur'
            }
          ],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          phone: [{validator: checkPhone, trigger: 'blur'}]
        }
      };
    },
    created() {
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:SC_M'}),
        categoryApi.getAll({search: 'lead:EQ:SC_S', sort: 'id'}),
        categoryApi.getAll({search: 'lead:EQ:SC_E', sort: 'id'})
      ])
        .then(([response, response2, response3]) => {
          this.checkBoxData.positionList = response.content;
          this.checkBoxData.sexList = response2.content;
          this.checkBoxData.educationList = response3.content;
        })
        .catch(error => {
        });
      this.formItem.date = this.getNowFormatDate();
      this.formItem.birth = this.dateFormat(new Date(), 'yyyy-mm-dd ');
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
      OrganizationForm
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
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
        this.formItem.organizationCode = value;
      },
      checkNumber() {
        if (this.formItem.number === '') {
          this.$message({
            message: this.$t('工号不能为空'),
            type: 'error'
          });
          this.checkBoxData.buttonDisabled = true;
          return;
        }
        Promise.all([hrEmployeeApi.checkNumer(0, this.formItem.number)])
          .then(([response]) => {
            if (response) {
              this.$message({
                message: this.$t('工号重复，请重新输入'),
                type: 'error'
              });
              this.checkBoxData.buttonDisabled = true;
            } else {
              this.$message({
                message: this.$t('工号未重复，可继续填写信息'),
                type: 'info'
              });
              this.checkBoxData.buttonDisabled = false;
            }
          })
          .catch(error => {
          });
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            if (
              this.formItem.organizationId === null ||
              this.formItem.organizationId === ''
            ) {
              this.$message({
                message: this.$t('message.noOrganization'),
                type: 'error'
              });
              return;
            }
            var list = [];
            for (var x in this.formItem.positionList) {
              list.push({id: this.formItem.positionList[x]});
            }
            if (list.length !== 0) {
              this.formItem.positionList = list;
            } else {
              this.formItem.positionList = [];
            }
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([hrEmployeeApi.saveHrEmployee(this.formItem)])
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
