<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <!--<el-form-item :label="$t('tobacco.tstorage.region.number')" @blur="checkNumber" prop="number">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number"/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organizationId">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')" prop="warehouse">
      <el-select v-model="formItem.warehouse" style="width: 100%">
        <el-option v-for="item in formData.whouseList"
                   :value="item.id"
                   :label="item.name"
                   :key="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.region.title')" prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.region.author')" prop="author">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.region.date')" prop="date">
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="formItem.date"
                      type="date"
                      :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.region.totalSpace')" prop="totalSpace">
          <el-input-number v-model="formItem.totalSpace" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.region.totalCapacity')" prop="totalCapacity">
          <el-input-number v-model="formItem.totalCapacity" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.region.picture')" prop="">
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
    <!--<el-form-item :label="$t('tobacco.tstorage.region.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control"/>
    </el-form-item>-->
    <el-form-item :label="$t('tobacco.tstorage.region.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="isDisabled"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  import regionApi from '../../api/tstorage/api_region';
  import warehouseApi from '../../api/tstorage/api_warehouse';

  export default {
    data() {
      return {
        isDisabled: false,
        fileList: [],
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'number': '',
          'warehouse': '',
          'title': '',
          'author': this.$store.state.user.userName,
          'date': '',
          'totalSpace': '',
          'totalCapacity': '',
          'picture': '',
          'control': 'ST_RG01',
          'desc': '',
        },
        formData: {
          whouseList: [],
        },
        ruleValidate: {
          warehouse: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          title: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],

        },
      };
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
    created() {
      this.formItem.date = new Date();
      this.getWhouse();
    },
    methods: {
      checkNumber() {
        if (this.formItem.number === '') {
          this.isDisabled = false;
        } else {
          Promise.all([warehouseApi.checkSerialno(this.formItem.serialno)])
            .then(([response]) => {
              this.isDisabled = false;
            })
            .catch(error => {
              this.$message({
                message: this.$t('tobacco.tstorage.books.codeRepeat'),
                type: 'error',
              });
              this.isDisabled = true;
            });
        }
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
        this.getWhouse();
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([regionApi.saveRegion(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
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
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'name',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.whouseList = response.content;
          })
          .catch(error => {
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
    }
  };
</script>
