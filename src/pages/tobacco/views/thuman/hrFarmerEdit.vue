<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.title')" prop="title">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.number')" prop="number">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.name')" prop="name">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.sex')">
          <el-select v-model="formItem.sex" v-bind:placeholder="$t('tobacco.thuman.hrFarmer.sex')" style="width:100%">
            <el-option v-for="item in  sex.sexList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.identity')" prop='identity'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.birth')">
          <el-date-picker alue-format="yyyy-MM-dd" type="date" v-bind:placeholder="$t('base.date')"
                          v-model="formItem.birth" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.email')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.email"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.phone')" prop='phone'>
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model.number="formItem.phone"/>
        </el-form-item>
      </el-col>

      <el-col :span="16">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.bankName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.bankAccount')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.address')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.address"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('org.organizationName')">
          <organization-form :root="userOrgId" :orgId='formItem.organizationId' @onchange="organizationOnchange"
                             style="width:100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('org.districtName')">
          <organization-form root="51" @onchange="directiveOnchange" model="district" style="width:100%"/>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.education')">
          <el-select v-model='formItem.education' style="width:100%">
            <el-option v-for="item in  education.educationList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.income')">
          <el-select v-model='formItem.income' style="width:100%">
            <el-option v-for="item in  income.incomeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.labour')" prop='labour'>
          <el-input v-bind:placeholder="$t('0')" v-model="formItem.labour"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height: 47px">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.plant')">
          <el-select v-model='formItem.plant' style="width:100%">
            <el-option v-for="item in  plant.plantList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8" style="height: 47px">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.plowland')" prop='plowland'>
          <el-input v-bind:placeholder="$t('0.0')" v-model="formItem.plowland"/>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="height: 47px">
        <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')">
          <el-select v-model='education.positionId' multiple style="width:100%">
            <el-option value='-' key='-'>{{ $t('base.all') }}</el-option>
            <el-option v-for="item in  education.positionList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <!--  <el-form-item :label="$t('tobacco.thuman.hrFarmer.jobType')">
        <el-select v-model='formItem.jobTypeId' style="width:100%">
            <el-option value='-' key='-'>{{ $t('base.all') }} </el-option>
            <el-option v-for="item in  jobType.jobTypeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        </el-form-item> -->
      </el-col>
      <el-col :span="8">
        <!-- <el-form-item :label="$t('tobacco.thuman.hrFarmer.SmokeGroup')">
            <el-select v-model='formItem.team' style="width:100%">
                <el-option value='-' key='-'>{{ $t('base.all') }} </el-option>
                <el-option v-for="item in teamGroup.teamList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item> -->
      </el-col>

      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.date')">
          <el-date-picker alue-format="yyyy-MM-dd" type="date" v-bind:placeholder="$t('base.date')"
                          v-model="formItem.date" style="width:100%"></el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.facilities')">
          <el-input type="textarea" :rows="2" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.facility">
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item :label="$t('tobacco.thuman.hrFarmer.desc')">
          <el-input type="textarea" :rows="2" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
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
  import hrFarmerApi from '../../api/thuman/api_hrFarmer';
  import categoryApi from '../../api/basic/api_category';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      //验证手机号
      let checkPhones = (rule, value, callback) => {
        let phoneNum = this.formItem.phone;
        if (!phoneNum) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg7')));
        } else if (
          !/^1[34578]\d{9}$/.test(phoneNum) &&
          !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(phoneNum)
        ) {
          callback(new Error(this.$t('tobacco.thuman.hrTeam.msg8')));
        } else {
          callback();
        }
      };
      let checkidentity = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('请输入身份证号码！')));
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
          callback(new Error(this.$t('身份证号格式不正确！')));
        } else {
          callback();
        }
      };
      return {
        sex: {
          sexId: '',
          sexList: []
        },
        education: {
          educationId: '',
          educationList: [],
          positionId: '',
          positionList: ''
        },
        income: {
          incomeId: '',
          incomeList: []
        },
        plant: {
          plantId: '',
          plantList: []
        },
        jobType: {
          jobTypeId: '',
          jobTypeList: []
        },
        teamGroup: {
          teamId: '',
          teamList: []
        },
        formItem: {
          id: '',
          serial: '',
          number: '',
          title: '',
          name: '',
          identity: '',
          sex: '',
          birth: '',
          author: '',
          date: '',
          countryId: '',
          countryName: '',
          email: '',
          phone: '',
          address: '',
          bankName: '',
          bankAccount: '',
          education: '',
          income: '',
          plant: '',
          control: 0,
          altitude: '',
          desc: '',
          facility: '',
          labour: '',
          plowland: '',
          facilities: '',
          team: '',
          jobTypeId: '',
          organizationId: '',
          organizationName: '',
          organizationOrder: '',
          organizationCode: '',
          districtId: '',
          districtName: '',
          districtOrder: '',
          districtCode: '',
          positionList: []
        },
        ruleValidate: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          phone: [{required: true, validator: checkPhones, trigger: 'blur'}],
          identity: [
            {required: true, validator: checkidentity, trigger: 'blur'}
          ],
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          number: [{required: true, message: '请输入档案号', trigger: 'blur'}],
          labour: [
            {pattern: /^(\d){0,}$/, message: '只能是数字', trigger: 'blur'}
          ],
          plowland: [
            {pattern: /^(\d){0,}$/, message: '只能是数字', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      Promise.all([
        // categoryApi.getAll({ search: 'lead:EQ:SC_F' }),
        categoryApi.getAll({search: 'lead:EQ:SC_S'}),
        categoryApi.getAll({search: 'lead:EQ:SC_E'}),
        categoryApi.getAll({search: 'lead:EQ:SC_I'}),
        categoryApi.getAll({search: 'lead:EQ:SC_P'}),
        //categoryApi.getAll({ search: 'lead:EQ:SG_TM:or;lead:EQ:SG_WT' }),
        categoryApi.getAll({search: 'lead:EQ:SC_F'})
      ])
        .then(([//jobTypeResponse,
          sexResponse, educationResponse, incomeResponse, plantResponse, positionResponse]) => { //SmokeGroupResponse,
          //this.jobType.jobTypeList = jobTypeResponse.content;
          this.sex.sexList = sexResponse.content;
          this.education.educationList = educationResponse.content;
          this.income.incomeList = incomeResponse.content;
          this.plant.plantList = plantResponse.content;
          //this.teamGroup.teamList = SmokeGroupResponse.content;
          this.education.positionList = positionResponse.content;
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
    components: {
      OrganizationForm
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        var list = [];
        for (var x in this.formItem.positionList) {
          list.push(this.formItem.positionList[x].id);
        }
        this.formItem.technician = JSON.stringify(this.formItem.technician);
        this.education.positionId = list;
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        this.formItem.organizationCode = this.formItem.organization.organizationCode;
        this.formItem.districtId = this.formItem.organization.districtId;
        this.formItem.districtName = this.formItem.organization.districtName;
        this.formItem.districtOrder = this.formItem.organization.districtOrder;
        this.formItem.districtCode = this.formItem.organization.districtCode;
      },
      organizationOnchange(label, value, values) {
        this.formItem.organizationId = value;
        this.formItem.organizationName = label;
        this.formItem.organizationOrder = 0;
        this.formItem.organizationCode = value;
      },
      directiveOnchange(label, value, values) {
        this.formItem.districtId = value;
        this.formItem.districtName = label;
        this.formItem.districtOrder = 0;
        this.formItem.districtCode = value;
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
            for (var x in this.education.positionId) {
              list.push({id: this.education.positionId[x]});
            }
            if (list.length !== 0) {
              this.formItem.positionList = list;
            } else {
              this.formItem.positionList = [];
            }
            Promise.all([hrFarmerApi.updateHrFarmer(this.item.id, this.formItem)])
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
