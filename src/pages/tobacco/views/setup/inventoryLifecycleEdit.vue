<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.classify')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.classify"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.sort')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sort"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.type')" prop="type">
      <el-select v-model="formItem.type" style="width: 100%">
        <el-option v-for="item in formData.typeList" :value="item.id" :label="item.name" :key="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import inventoryLifecycleApi from '../../api/setup/api_inventoryLifecycle';
  import categoryApi from '../../api/basic/api_category';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          'classify': '',
          'sort': 0,
          'title': '',
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'type': '',
        },
        formData: {
          typeList: []
        },
        ruleValidate: {
          classify: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          sort: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          title: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
          type: [
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
        categoryApi.getAll({search: 'lead:EQ:ST_LF'})])
        .then(([response]) => {
          this.formData.typeList = response.content;
        })
        .catch(error => {
        });
      this.load();

    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.type = this.formItem.type.id;
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            Promise.all([inventoryLifecycleApi.updateInventoryLifecycle(this.formItem.id, this.formItem)])
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

      formReset(name) {
        this.$refs[name].resetFields();
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
