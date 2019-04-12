<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
      <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                         style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.number')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" @blur="checkNumber()"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height:47px">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')" prop="positionList">
          <el-select v-model="formItem.positionList" multiple placeholder="请选择" style="width:100%" collapse-tags>
            <el-option
              v-for="item in checkBoxData.positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.identity')" prop='identity'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.sex')">
          <el-select v-model='formItem.sex' style="width:100%">
            <el-option v-for="item in  checkBoxData.sexList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.birth')">
          <el-date-picker v-model="formItem.birth" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.date')">
          <el-date-picker value-format="yyyy-MM-dd" v-model="formItem.date" type="date" style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.address')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.address"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.phone')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.phone"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.email')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.email"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.bankName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.bankAccount')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.education')">
          <el-select v-model='formItem.education' style="width:100%">
            <el-option v-for="item in  checkBoxData.educationList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.school')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.school"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.thuman.hrEmployee.specialty')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.specialty"/>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="this.checkBoxData.buttonDisabled" v-show='isEdit' type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const OrganizationForm = () => import('@/components/Organization');
  import hrEmployeeApi from '../../api/thuman/api_hrEmployee';
  import categoryApi from '../../api/basic/api_category';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback();
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 9999999999 || value > 99999999999) {
            callback(new Error('手机号只能为11位'));
          } else {
            callback();
          }
        }
      };
      return {
        checkBoxData: {
          positionList: [],
          sexList: [],
          educationList: [],
          teamList: [],
          buttonDisabled: false
        },
        formItem: {
          organizationId: '',
          organizationName: '',
          organizationOrder: '',
          organizationCode: '',
          number: '',
          title: '',
          name: '',
          identity: '',
          birth: '',
          author: '',
          date: '',
          address: '',
          phone: '',
          email: '',
          bankName: '',
          bankAccount: '',
          school: '',
          specialty: '',
          loginId: 0,
          loginName: '',
          control: 0,
          desc: '',
          education: '',
          sex: '',
          positionList: []
        },
        ruleValidate: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          identity: [
            {
              min: 18,
              max: 18,
              message: '身份证号码长度应为18位',
              trigger: 'blur'
            }
          ],
          phone: [{validator: checkPhone, trigger: 'blur'}]
        }
      };
    },
    created() {
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:SC_M'}),
        categoryApi.getAll({search: 'lead:EQ:SC_S'}),
        categoryApi.getAll({search: 'lead:EQ:SC_E'})
      ])
        .then(([response, response2, response3, response4]) => {
          this.checkBoxData.positionList = response.content;
          this.checkBoxData.sexList = response2.content;
          this.checkBoxData.educationList = response3.content;
        })
        .catch(error => {
        });
      this.load();
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
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = '0';
        this.formItem.organizationCode = value;
      },
      checkNumber() {
        if (this.formItem.number === '') {
          this.$message({
            message: this.$t('工号不能为空'),
            type: 'error'
          });
          this.checkBoxData.buttonDisabled = true;
          return;
        }
        Promise.all([
          hrEmployeeApi.checkNumer(1, this.formItem.number, {
            id: this.formItem.id
          })
        ])
          .then(([response]) => {
            if (response > 0) {
              this.$message({
                message: this.$t('工号重复，请重新输入'),
                type: 'error'
              });
              this.checkBoxData.buttonDisabled = true;
            } else {
              this.$message({
                message: this.$t('工号未重复，可继续填写信息'),
                type: 'info'
              });
              this.checkBoxData.buttonDisabled = false;
            }
          })
          .catch(error => {
          });
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        var list = [];
        for (var x in this.formItem.positionList) {
          list.push(this.formItem.positionList[x].id);
        }
        this.formItem.positionList = list;
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        this.formItem.organizationCode = this.formItem.organization.organizationCode;
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          //进行前端检验
          if (valid) {
            if (
              this.formItem.organizationId === null ||
              this.formItem.organizationId === ''
            ) {
              this.$message({
                message: this.$t('message.noOrganization'),
                type: 'error'
              });
              return;
            }
            var list = [];
            for (var x in this.formItem.positionList) {
              list.push({id: this.formItem.positionList[x]});
            }
            if (list.length !== 0) {
              this.formItem.positionList = list;
            } else {
              this.formItem.positionList = [];
            }
            Promise.all([
              hrEmployeeApi.updateHrEmployee(this.item.id, this.formItem)
            ])
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
