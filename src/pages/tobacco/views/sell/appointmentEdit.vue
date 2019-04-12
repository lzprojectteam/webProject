<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" :orgId='formItem.organizationId'
                         style="width:100%"/>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.annual')">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.annual"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.serial')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.barcode')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.number')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.date')">
          <el-date-picker v-model="formItem.date" type="date" style="width:100%;"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.contractSerial')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractSerial"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.contractNumber')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.farmerName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.year')">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.typeName')">
          <type-select :label.sync="formItem.typeName" :value.sync="formItem.typeId" :key.sync="formItem.typeId"
                       @change="getPart"
                       style="width: 100%;">
          </type-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.partName')">
          <el-select v-model="formItem.partName" style="width: 100%">
            <el-option v-for="item in formData.partList"
                       :value="item.name"
                       :label="item.name"
                       :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.weight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.begin')">
          <el-date-picker v-model="formItem.begin" type="date" style="width:100%;"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.end')">
          <el-date-picker v-model="formItem.end" type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%;" :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.control')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.contractArea')" style="height: 47px !important;">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractArea"
                           style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.contractPlant')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractPlant"
                           style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.contractWeight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractWeight"
                           style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.varietryNames')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.varietryNames"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.filePath')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.filePath"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.appointment.pictures')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.pictures"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.appointment.desc')">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
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
  import appointmentApi from '../../api/tsell/api_appointment';
  import partApi from '../../api/basic/api_part';

  const OrganizationForm = () => import('@/components/Organization');
  const typeSelect = () => import('@/components/Tobacco/typeSelect');

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        fisrtLoad: false,
        formItem: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'organizationName': this.$store.state.user.organization.organizationName,
          'organizationOrder': 0,
          'organizationCode': this.$store.state.user.organization.organizationId,
          annual: '',
          serial: '',
          barcode: '',
          number: '',
          title: '',
          author: this.$store.state.user.userName,
          date: '',
          countryId: '86',
          countryName: '中国',
          contractSerial: '',
          contractNumber: '',
          farmerName: '',
          year: '',
          typeName: '烤烟',
          typeId: '10',
          partName: '',
          weight: 0,
          begin: '',
          end: '',
          control: 0,
          contractArea: 0,
          contractPlant: 0,
          contractWeight: 0,
          varietryNames: '',
          filePath: '',
          pictures: '',
          desc: ''
        },
        formData: {
          partList: [],
        },
        ruleValidate: {
          code: [{required: true, message: '编码不能为空', trigger: 'blur'}]
        }
      };
    },
    components: {
      OrganizationForm,
      typeSelect
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
      this.getPart();
    },
    methods: {
      getPart() {
        // if (this.firstLoad) {
        //清空原有数据
        // }
        // this.firstLoad = true;
        this.formItem.partName = '';
        // 获取部位
        Promise.all([partApi.getAll({
          'size': 500,
          sort: 'code,ASC',
          'search': 'typeId:EQ:{typeId}'.format({
            typeId: this.formItem.typeId
          })
        })])
          .then(([response]) => {
            this.formData.partList = response.content;
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
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            Promise.all([appointmentApi.updateAppointment(this.formItem.id, this.formItem)])
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
              type: 'warn'
            });
          }
        });
      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        if (this.formItem.year !== '' && this.formItem.year !== null) {
          this.formItem.year = this.formItem.year.toString();
        }
        if (this.formItem.annual !== '' && this.formItem.annual !== null) {
          this.formItem.annual = this.formItem.annual.toString();
        }
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      },
      formReset(name) {
        this.$refs[name].resetFields();
      }
    },
    watch: {
      item(curVal, oldVal) {
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
