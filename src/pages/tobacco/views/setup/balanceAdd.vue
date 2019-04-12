<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organizationId">
      <organization-form :root="userOrgId" :changeOnSelect="false" :showRoot="false" @onchange="organizationOnchange"
                         style="width:100%"/>
    </el-form-item>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" @focus="getStation"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="this.$t('tobacco.setup.balance.model')" prop="line">
          <el-select :placeholder="$t('base.pleaseSelect')"
                     v-model="formItem.line" clearable style="width: 100%">
            <el-option
              v-for="item in formData.modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.author')" prop="author">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.date')" prop="date">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.balance.alias')" prop="alias">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.alias"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.host')" prop="tempHost">
          <el-input v-bind:placeholder="$t('tobacco.setup.station.exp1')" v-model="formItem.tempHost">
            <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.port')" prop="port">
          <el-input v-bind:placeholder="$t('tobacco.setup.station.exp2')" v-model="formItem.port"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.balance.picture')" prop="picture">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.balance.control')" prop="control">
          <el-select v-model="formItem.control" :placeholder="$t('base.pleaseSelect')" style="width: 100%" clearable>
            <el-option
              v-for="(item,index) in formData.controlList"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.balance.desc')" prop="desc">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import balanceApi from '../../api/setup/api_balance';
  import lineApi from '../../api/setup/api_line';
  import stationApi from '../../api/setup/api_station';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    data() {
      let checkHost = (rule, value, callback) => {
        if (value === '') {
          callback();
          return;
        }
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
        if (value === '') {
          callback();
          return;
        }
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
          'organizationId': '',
          'organizationName': '',
          'organizationOrder': '',
          'organizationCode': '',
          'serial': '',
          'number': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'alias': '',
          'host': '',
          'port': '',
          'picture': '',
          'control': '1',
          'desc': '',
          'line': '1',
          'station': '',
          'tempHost': '',
        },
        fileList: [],
        formData: {
          modelList: [],
          controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
          cantSave: true
        },
        ruleValidate: {
          title: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          alias: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          line: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          organizationId: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          tempHost: [{validator: checkHost, trigger: 'blur'}],
          port: [{validator: checkPort, trigger: 'blur'}],
        }
      };
    },
    created() {
      Promise.all([lineApi.getAll()])
        .then(([response]) => {
          let arr = [];
          for (var k in response.content) {
            arr.push({
              'label': response.content[k].name,
              'value': response.content[k].id
            });
          }
          this.formData.modelList = arr;
        })
        .catch(error => {
        });
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
      getStation() {
        this.formItem.tempHost = '';
        this.formItem.port = '';
        if (this.formItem.organizationId !== '') {
          Promise.all([
            stationApi.getAll({
              search: 'organization.organizationId:EQ:{organizationId};'.format(
                {
                  organizationId: this.formItem.organizationId
                }
              )
            })
          ])
            .then(([response]) => {
              console.log(response.content);
              if (response.content.length !== 0) {
                let data = response.content[0];
                this.formItem.tempHost = data.host.slice(7);
                this.formItem.port = data.port;
                this.formItem.station = data.id;
                this.formItem.alias = data.alias;
                this.formData.cantSave = false;
              } else {
                this.formData.cantSave = true;
                this.$message({
                  message: this.$t('tobacco.setup.balance.noStation'),
                  type: 'error',
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('tobacco.setup.balance.selectOrganization'),
            type: 'message',
          });

        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formItem.tempHost !== '') {
              this.formItem.host = 'http://' + this.formItem.tempHost;
            }
            console.log(this.formItem.host);
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([balanceApi.saveBalance(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
                this.formItem.tempHost = '';
                //重置表单，允许多次操作
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
      },
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },
    },
  };
</script>
