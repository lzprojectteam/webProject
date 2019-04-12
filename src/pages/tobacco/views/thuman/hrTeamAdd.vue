<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formItem">

    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organization">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" v-model="formItem.orgId"
                         style="width: 100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.start')" prop='date'>
          <el-date-picker v-model="formItem.start" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.number')" prop='number'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.title')" prop='title'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.author')" prop='author'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.date')" prop='date'>
          <el-date-picker v-model="formItem.date" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.positionType')" prop='position'>
          <el-select v-model="formItem.position" :placeholder="$t('base.pleaseSelect')" style="width: 100%">
            <el-option
              v-for="item in selectData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.leader')" prop='leader'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.leader"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.loginName')" prop='loginName'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginName"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.loginId')" prop='loginId'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginId"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.temporary')">
          <el-radio v-model="formItem.temporary" :label=true>是</el-radio>
          <el-radio v-model="formItem.temporary" :label=false>否</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.control')" id="team_radio">
          <el-select v-model="formItem.control" placeholder="请选择" style="width:100%">
            <el-option
              v-for="(val,key) in controlList"
              :key="key"
              :label="val"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.contact')" prop='contact'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contact"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.people')" prop='people'>
          <el-input-number  v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.people" style="width:100%"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.desc')" prop='desc'>
      <el-input type="textarea" v-model="formItem.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="submitForm('formItem')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import hrTeamApi from '../../api/thuman/api_hrTeam';
  import dateFormat from 'dateformat';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    data() {
      //验证手机号
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          callback();
        } else if (!(/^1[34578]\d{9}$/.test(value)) && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg8')));
        } else {
          callback();
        }
      };
      //验证组织
      let checkOrganization = (rule, value, callback) => {
        if (value === null || value === '') {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg11')));
        } else {
          callback();
        }
      };
      // 验证人数
      let checkPeople = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg13')));
        } else if (isNaN(value)) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg13')));
        } else if (parseInt(value) <= 0) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg13')));
        } else {
          callback();
        }
      };
      let checkLoginId = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if (isNaN(value)) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg14')));
        } else {
          callback();
        }
      };

      return {
        formItem: {
          serial: '',
          barcode: '',
          number: '',
          card: '',
          title: '',
          author: this.$store.state.user.userName,
          date: '',
          leader: '',
          members: '',
          people: '',
          contact: '',
          task: '',
          temporary: true,
          start: '',
          finish: '',
          picture: '',
          loginId: '',
          loginName: '',
          control: '1',
          desc: '',
          positon: '',
          options: [],
          organizationId: this.$store.state.user.organization.organizationId,
          organizationCode: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          organizationOrder: '',
        },
        isDisabled: true,
        controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},

        ruleValidate: {
          organization:
            [
              {validator: checkOrganization, trigger: 'blur', required: true}],
          title:
            [
              {type: 'string', required: true, message: this.$t('tobacco.thuman.hrTeam.msg2'), trigger: 'blur'}
            ],
          number:
            [
              {type: 'string', required: true, message: this.$t('tobacco.thuman.hrTeam.msg1'), trigger: 'blur'}
            ],
          author:
            [
              {type: 'string', required: true, message: this.$t('tobacco.thuman.hrTeam.msg3'), trigger: 'blur'}
            ],
          position:
            [
              {type: 'string', required: true, message: '请选择', trigger: 'blur'}
            ],
          contact:
            [
              {validator: checkPhone, trigger: 'blur'}
            ],
          people:
            [
              {validator: checkPeople, trigger: 'blur', required: true, message: this.$t('tobacco.thuman.hrTeam.msg13')}
            ],
          loginId:
            [
              {
                validator: checkLoginId,
                trigger: 'blur',
                required: true,
                message: this.$t('tobacco.thuman.hrTeam.msg14')
              }
            ]
        }
      };
    },
    created() {
      this.formItem.date = this.getNowFormatDate();
      this.formItem.start = this.dateFormat(new Date(), 'yyyy-mm-dd');
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([
              hrTeamApi.saveHrTeam(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.$message({
                  message: this.$t('tobacco.thuman.hrTeam.msg9'),
                  type: 'success'
                });
                //重置表单
                this.formReset('formItem');
              })
              .catch(error => {
                loading.close();
                console.log(error);
              });
          } else {
            this.$message({
              message: this.$t('tobacco.thuman.hrTeam.msg10'),
              type: 'error'
            });
            return false;
          }
        });
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      formatDate(date) {
        if (date === '' || date === undefined || date === null) {
          return '未设置';
        }
        return dateFormat(date, 'yyyy-mm-dd');
      },
      checkNumber() {
        if (this.formItem.number === '') {
          this.isDisabled = true;
          this.$message({
            message: this.$t(this.$t('tobacco.thuman.hrTeam.msg1')),
            type: 'error'
          });
          return;
        }
        Promise.all([hrTeamApi.checkNumer(0, this.formItem.number)])
          .then(([response]) => {
            if (response) {
              this.$message({
                message: this.$t(this.$t('tobacco.thuman.hrTeam.msg12')),
                type: 'error'
              });
              this.isDisabled = true;
            } else {
              this.isDisabled = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    props: ['selectData'],
    components:
      {
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
    }
  };
</script>
<style scoped>
  #team_radio .el-radio {
    margin-left: 2px !important;
  }

  #team_radio .el-radio__label {
    padding-left: 2px;
  }
</style>

