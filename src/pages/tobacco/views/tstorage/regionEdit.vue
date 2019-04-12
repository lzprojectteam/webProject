<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.region.number')" prop="number">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')" prop="organizationId">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                         style="width:100%"/>
    </el-form-item>
    <el-form-item :label="this.$t('tobacco.tstorage.region.whouseId')" prop="warehouse">
      <el-select  disabled  v-model="formItem.warehouse" style="width: 100%">
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
    <el-form-item :label="$t('tobacco.tstorage.region.control')">
      <el-select v-model="formItem.control" style="width: 100%">
        <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.region.desc')">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  import regionApi from '../../api/tstorage/api_region';
  import warehouseApi from '../../api/tstorage/api_warehouse';
  import categoryApi from '../../api/basic/api_category';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        fileList: [],
        controllist: [],
        formItem: {
          'warehouse': '',
          'number': '',
          'title': '',
          'author': '',
          'date': '',
          'totalSpace': '',
          'totalCapacity': '',
          'picture': '',
          'control': '',
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,

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

        }
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
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_RG'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
      this.getWhouse();
      this.load();
    },
    methods: {
      getWhouse() {
        Promise.all([warehouseApi.getAll({
          sort: 'id',
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
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        if (this.formItem.control !== null && this.formItem.control !== '') {
          this.formItem.control = this.formItem.control.id;
        }
        if (this.formItem.warehouse !== null && this.formItem.warehouse !== '') {
          this.formItem.warehouse = this.formItem.warehouse.id;
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;

      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([regionApi.updateRegion(this.item.id, this.formItem)])
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
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
