<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organizationId">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.author')" prop="author">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.date')" prop="date">
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="formItem.date"
        type="date"
        :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.alias')" prop="alias">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.alias"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.host')" prop="tempHost">
      <el-input v-bind:placeholder="$t('tobacco.setup.station.exp1')" v-model="formItem.tempHost">
        <template slot="prepend">http://</template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.port')" prop="port">
      <el-input v-bind:placeholder="$t('tobacco.setup.station.exp2')" v-model="formItem.port"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.control')" prop="control">
      <el-select v-model="formItem.control" :placeholder="$t('base.pleaseSelect')" style="width: 100%" >
        <el-option
          v-for="(val,key) in controlList"
          :key="key"
          :label="val"
          :value="key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import stationApi from '../../api/setup/api_station';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    data() {
      //验证主机地址
      let checkHost = (rule, value, callback) => {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        let result = reg.test(value);
        if (result) {
          callback();
        } else {
          callback(new Error(this.$t('message.incorrectFormat')));
        }
      };
      //验证端口
      let checkPort = (rule, value, callback) => {
        let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        let result = reg.test(value);
        if (result) {
          callback();
        } else {
          callback(new Error(this.$t('message.incorrectFormat')));
        }
      };
      return {
        formItem: {
          serial: '', //数据后台生成
          organizationId: this.$store.state.user.organization.organizationId,
          organizationCode: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          author: this.$store.state.user.userName,
          date: '',
          alias: '',
          host: '',
          tempHost: '',
          port: '',
          control: '1',
          desc: ''
        },
        controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
        ruleValidate: {
          title: [{required: true, message: this.$t('base.mustInput'), trigger: 'blur'}],
          alias: [{required: true, message: this.$t('base.mustInput'), trigger: 'blur'}],
          tempHost: [{validator: checkHost, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
          port: [{validator: checkPort, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
        }
      };
    },
    created() {
      this.formItem.date = this.getNowFormatDate();
    },
    components: {
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
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            if (this.formItem.tempHost !== '') {
              this.formItem.host = 'http://' + this.formItem.tempHost;
            }
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([stationApi.saveStation(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formItem.tempHost = '';
                this.formReset('formValidate');
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
  }
  ;
</script>
