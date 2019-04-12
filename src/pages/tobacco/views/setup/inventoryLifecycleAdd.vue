<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.classify')" prop="classify">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.classify"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.sort')" prop="sort">
      <el-input-number  style="width: 100%" v-model="formItem.sort"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.title')" prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.setup.inventoryLifecycle.type')" prop="type">
      <el-select v-model="formItem.type" style="width: 100%">
        <el-option v-for="item in formData.typeList" :value="item.id" :label="item.name" :key="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import inventoryLifecycleApi from '../../api/setup/api_inventoryLifecycle';
  import categoryApi from '../../api/basic/api_category';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    data() {
      return {
        formItem: {
          'classify': '',
          'sort': '',
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
    },
    methods: {
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
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
            Promise.all([inventoryLifecycleApi.saveInventoryLifecycle(this.formItem)])
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

      formReset(name) {
        this.$refs[name].resetFields();
      },

    }
  };
</script>
