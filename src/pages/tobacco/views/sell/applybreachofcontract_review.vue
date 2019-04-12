<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examinePerson')" prop="examinePerson">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.examinePerson"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examineDate')" prop="examineDate">
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      v-model="formItem.examineDate"
                      type="date"
                      :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="是否通过" prop="flag">
      <el-switch v-model="formItem.flag"></el-switch>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examineSuggestion')" prop="examineSuggestion">
      <el-input type="textarea" :rows='5' v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.examineSuggestion"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');

  import applybreachofcontractApi from '../../api/tsell/api_applybreachofcontract';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        acceptData: '',
        formItem: {
          'id': '',
          'examinePerson': this.$store.state.user.userName,
          'examineDate': '',
          'examineSuggestion': '无',
          'flag': true,
        },
        ruleValidate: {
          examineSuggestion: [
            {required: true, message: '审核意见不能为空', trigger: 'blur'}
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
      this.formItem.examineDate = new Date();
      this.load();
    },
    methods: {
      load() {
        this.acceptData = JSON.parse(JSON.stringify(this.item));
        this.formItem.id = this.acceptData.id;
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationCode = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          this.formItem.examineDate = this.dateFormat(this.formItem.examineDate, 'yyyy-mm-dd HH:MM:ss');
          if (valid) {
            Promise.all([applybreachofcontractApi.approval(this.formItem.id, this.formItem.examinePerson, this.formItem.examineSuggestion, this.formItem.examineDate, this.formItem.flag)])
              .then(([response]) => {
                this.formReset('formValidate');
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
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
        this.load();
      }
    }
  };
</script>
