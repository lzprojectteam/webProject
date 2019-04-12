<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
          <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyPerson')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.applyPerson"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyDate')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.applyDate"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.contractNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.contractyNo')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractyNo" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="申请人">
          <el-input v-model="formItem.farmerName" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.recoveryDate')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.recoveryDate"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.applyExplain')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.applyExplain"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" v-if="formItem.control === 'SG_A04'">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examinePerson')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.examinePerson" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="formItem.control === 'SG_A04'">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examineDate')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.examineDate"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%" disabled>
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-if="formItem.control === 'SG_A04'">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.examineSuggestion')" disabled>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.examineSuggestion" disabled/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.applybreachofcontract.control')">
          <el-select v-model="formItem.control" style="width: 100%" disabled>
            <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item type="textarea" :label="$t('tobacco.tsell.applybreachofcontract.desc')">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"
          />
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
  const OrganizationForm = () => import('@/components/Organization');

  import categoryApi from '../../api/basic/api_category';
  import applybreachofcontractApi from '../../api/tsell/api_applybreachofcontract';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        cantEdit: false, //判断能否进行编辑
        controllist: [],
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': '',
          'organizationCode': this.$store.state.user.organization.organizationId,
          'applyPerson': this.$store.state.user.userName,
          'applyDate': '',
          'contractNumber': '',
          'contractyNo': '',
          'farmerName': '',
          'recoveryDate': '',
          'applyExplain': '',
          'examinePerson': '',
          'examineDate': '',
          'examineSuggestion': '',
          'desc': '',
          'control': 'SG_A01',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
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
      this.load();
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:SG_A'})])
        .then(([response]) => {
          this.controllist = response.content;
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
            if (new Date(this.formItem.recoveryDate) < new Date(this.formItem.applyDate)) {
              this.$message({
                message: '恢复日期不能小于填报日期',
                type: 'info',
              });
            } else {
              Promise.all([applybreachofcontractApi.updateApplybreachofcontract(this.formItem.id, this.formItem)])
                .then(([response]) => {
                  this.formReset('formValidate');
                  //重置表单，允许多次操作
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
            }
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn',
            });
          }
        });
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.formItem.control = this.formItem.control.id;
        //根据状态判断能否编辑，只有编辑状态才能编辑
        if (this.formItem.control === 'SG_A01') {
          this.cantEdit = false;
        } else {
          this.cantEdit = true;
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
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
