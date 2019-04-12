<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formItem">

    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organization">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                         style="width: 100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.number')" prop='number' >
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber" disabled/>
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
        <el-form-item :label="$t('tobacco.thuman.hrTeam.start')" prop='date'>
          <el-date-picker v-model="formItem.start" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.finish')" prop='date'>
          <el-date-picker v-model="formItem.finish" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.loginName')" prop=''>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginName"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.loginId')" prop=''>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.loginId"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.temporary')">
          <el-radio-group v-model="formItem.temporary">
            <el-radio :label=true>是</el-radio>
            <el-radio :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.control')">
          <el-select v-model="formItem.control" :placeholder="$t('pleaseSelect')" style="width: 100%">
            <el-option
              v-for="item in controlList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
        <el-form-item :label="$t('tobacco.thuman.hrTeam.people')" prop=''>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.people"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.desc')">
      <el-input type="textarea" v-model="formItem.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="submitForm('formItem')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import hrTeamApi from '../../api/thuman/api_hrTeam';

  const OrganizationForm = () => import('@/components/Organization');
  export default {
    data() {
      //验证手机号
      let checkPhone = (rule, value, callback) => {
        let phoneNum = this.formItem.contact;
        if (!phoneNum) {
          callback();
        } else if (!(/^1[34578]\d{9}$/.test(phoneNum)) && !(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phoneNum))) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg8')));
        } else {
          callback();
        }
      };
      //验证组织
      let checkOrganization = (rule, value, callback) => {
        if (this.formItem.organizationId === null ||
          this.formItem.organizationId === '') {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg11')));
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
          author: '',
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
          organizationId: '',
          organizationName: '',
          organizationCode: '',
          organizationOrder: '',
        },
        isDisabled: false,
        controlList: [
          {
            value: '1',
            label: '新增'
          }, {
            value: '3',
            label: '质疑'
          }, {
            value: '5',
            label: '核准'
          }, {
            value: '7',
            label: '作废'
          }
        ],
        ruleValidate: {
          position:
            [
              {type: 'string', required: true, message: '请选择', trigger: 'blur'}
            ],
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
          contact:
            [
              {validator: checkPhone, trigger: 'blur'}
            ]
        }
      };
    },
    props: ['item', 'isEdit', 'visible', 'selectData'],
    created() {
      this.load();
    },
    mounted() {
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Promise.all([
              hrTeamApi.updateHrTeam(this.item.id, this.formItem)])
              .then(([response]) => {
                this.$message({
                  message: this.$t('tobacco.thuman.hrTeam.msg9'),
                  type: 'success'
                });
                //重置表单
                this.formReset('formItem');
                this.$emit('refresh');
                this.$emit('update:visible', false);
              })
              .catch(error => {
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
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        // 处理数据
        this.formItem.position = this.formItem.position.id;
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        this.formItem.control = this.formItem.control.toString();
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
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      }
    },
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

