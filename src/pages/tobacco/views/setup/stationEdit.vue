<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.setup.station.stationName')" prop="organizationId">
      <organization-form :root="userOrgId"  :orgId="formItem.organizationId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.author')" prop="author">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.date')" prop="date">
      <el-date-picker
        v-model="formItem.date"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="date"
        :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.alias')" prop="alias">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.alias"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.host')" prop="host">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.host"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.station.port')" prop="port">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.port"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.control')" prop="control">
      <el-select v-model="formItem.control" :placeholder="$t('base.pleaseSelect')" style="width: 100%" clearable>
        <el-option
          v-for="(item,index) in formData.controlList"
          :key="index"
          :label="item"
          :value="index">
        </el-option>
      </el-select>
    </el-form-item>
    <!--
        <el-form-item :label="$t('tobacco.setup.station.heartbeat')" prop="heartbeat">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.heartbeat"/>
        </el-form-item>
    -->

    <el-form-item :label="$t('tobacco.setup.station.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>


</template>
<script>
  import stationApi from '../../api/setup/api_station';
  const OrganizationForm = () => import('@/components/Organization');
  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      //验证主机地址
      let checkHost = (rule, value, callback) => {
        let reg = /^(http|ftp|https):\/\/(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
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
          serial: '',
          title: '',
          organizationId: '',
          organizationCode: '',
          organizationName: '',
          author: '',
          date: '',
          alias: '',
          host: '',
          port: '',
          heartbeat: '',
          control: '',
          desc: ''
        },
        formData: {
          controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
        },
        ruleValidate: {
          alias: [{required: true, message: this.$t('base.mustInput'), trigger: 'blur'}],
          host: [{validator: checkHost, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
          port: [{validator: checkPort, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
        }
      };
    },
    created() {
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
      OrganizationForm
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (!(this.formItem.control === '' || this.formItem.control === null)) {
          this.formItem.control = this.formItem.control.toString();
        }
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          //进行前端检验
          if (valid) {
            Promise.all([stationApi.updateStation(this.item.id, this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success'
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
      formReset(name) {
        this.$refs[name].resetFields();
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
