<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <el-input v-model="formItem.organization.organizationName" disabled=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="this.$t('tobacco.setup.balance.model')" prop="line">
          <el-select :placeholder="$t('base.pleaseSelect')"
                     v-model="formItem.line" clearable style="width: 100%" disabled>
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
          <el-date-picker
            v-model="formItem.date"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-form-item :label="$t('tobacco.setup.balance.host')" prop="host">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.host"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.balance.port')" prop="port">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.port"/>
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
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.balance.desc')" prop="desc">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>


</template>
<script>
  import balanceApi from '../../api/setup/api_balance';
  import lineApi from '../../api/setup/api_line';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      // 验证主机地址
      let checkHost = (rule, value, callback) => {
        if (value === '') {
          callback();
          return;
        }
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
          'serial': '',
          'number': '',
          'title': '',
          'author': '',
          'date': '',
          'alias': '',
          'host': '',
          'port': '',
          'picture': '',
          'control': '',
          'desc': '',
          'line': '',
          'organizationId': '',
          'organizationCode': '',
          'organizationName': '',
          'organizationOrder': '',
        },
        fileList: [],
        formData: {
          modelList: [],
          controlList: {'1': '新增', '3': '质疑', '5': '核准', '7': '作废'},
        },
        ruleValidate: {
          title: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          line: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          alias: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          host: [{validator: checkHost, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
          port: [{validator: checkPort, required: true, message: this.$t('message.incorrectFormat'), trigger: 'blur'}],
        }
      };
    },
    created() {
      Promise.all([lineApi.getAll()])
        .then(([response]) => {
          console.log(response);
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
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        if (!(this.formItem.control === '' || this.formItem.control === null)) {
          this.formItem.control = this.formItem.control.toString();
        }
        console.log(this.formItem.date);
        //注意接收
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.line !== '' && this.formItem.line !== null) {
          this.formItem.line = this.formItem.line.id;
        }
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([balanceApi.updateBalance(this.item.id, this.formItem)])
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

              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn',
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
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
    },
    components: {
      OrganizationForm
    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
