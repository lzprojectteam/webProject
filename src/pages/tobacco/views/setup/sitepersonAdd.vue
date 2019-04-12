<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.webmaster')" prop="webmaster">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.webmaster"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.clerk')" prop="clerk">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.clerk"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.ratingstaff')" prop="ratingstaff">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.ratingstaff"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.overweight')" prop="overweight">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.overweight"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.packer')" prop="packer">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.packer"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.qualitymanager')" prop="qualitymanager">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.qualitymanager"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.precheck')" prop="precheck">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.precheck"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.infomanager')" prop="infomanager">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.infomanager"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.siteperson.other')" prop="other">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.other"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.setup.siteperson.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="cantSave"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import sitepersonApi from '../../api/setup/api_siteperson';

  const OrganizationForm = () => import('@/components/Organization');

  export default {
    data() {
      return {
        cantSave: true,
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'webmaster': '',
          'clerk': '',
          'ratingstaff': '',
          'overweight': '',
          'packer': '',
          'qualitymanager': '',
          'other': '',
          'desc': '',
        },
        ruleValidate: {
          webmaster: [
            {required: true, message: this.$t('base.mustInput'), trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.checkSave();
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
      //判断能否进行保存
      checkSave() {
        Promise.all([sitepersonApi.getAll({
          search: 'organization.organizationId:EQ:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            if (response.content.length !== 0) {
              this.cantSave = true;
              this.$message({
                message: '当前组织下已有数据,无需增加',
                type: 'error',
              });
            } else {
              this.cantSave = false;
            }
          })
          .catch(error => {
          });
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
        this.formReset('formValidate');
        this.checkSave();
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
            Promise.all([sitepersonApi.saveSiteperson(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.cantSave = true;
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
