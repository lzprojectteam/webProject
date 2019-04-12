<template>
  <el-form :model="formItem" label-width="120px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId" @onchange="organizationOnchange" style="width:100%"/>
    </el-form-item>

    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.annual')">
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
        <el-form-item :label="$t('tobacco.tsell.preCheck.serial')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.barcode')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.barcode"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.number')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.p_author"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.date')">
          <el-date-picker type="date"
                          v-model="formItem.date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :placeholder="$t('base.pleaseSelect')" style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.contractId')" prop="contractId">
          <el-select clearable v-model='formItem.contractId'
                     filterable
                     clearable
                     remote
                     reserve-keyword
                     @change="getFarmer"
                     placeholder="请输入关键字进行查询"
                     :remote-method="remoteMethod"
                     :loading="loading"
                     style="width: 100%"
          >
            <el-option v-for="item in  formData.seContractList" :key="item.id" :label="item.value" :value="item.id">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sfz }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item :label="$t('tobacco.tsell.preCheck.reserveBegin')">
          <el-date-picker v-model="datetimes" type="datetimerange"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.farmerId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.farmerName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="业务年度">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select
            @handelTypeChange="getColorAndPart"
            :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusId" :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankId" :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.partName')">
          <el-select v-model="formItem.partId" style="width: 100%">
            <el-option v-for="item in formData.partList"
                       :value="item.name"
                       :label="item.name"
                       :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.colorName')">
          <el-select v-model="formItem.colorId" style="width: 100%">
            <el-option v-for="item in formData.colorList"
                       :value="item.name"
                       :label="item.name"
                       :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.tobaccoPack')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tobaccoPack"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.tobaccoPurity')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tobaccoPurity"
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.pack')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.pack" style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.amount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('tobacco.tsell.preCheck.weight')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" style="width: 100%"/>
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
  const typeSelect = () => import('@/components/Tobacco/typeSelect');
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const varietySelect = () => import('@/components/Tobacco/varietySelect');
  const typeVarietySelect = () => import('@/components/Tobacco/typeVarietySelect');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import preCheckApi from '../../api/tsell/api_preCheck';
  import seContractApi from '../../api/tsell/api_seContract';
  import partApi from '../../api/basic/api_part';
  import colorApi from '../../api/basic/api_color';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        firstLoad: false, //避免第一次加载颜色部位被清空
        loading: false,
        formItem: {
          organizationId: this.$store.state.user.organization.organizationId,
          organizationName: this.$store.state.user.organization.organizationName,
          organizationOrder: 0,
          organizationCode: this.$store.state.user.organization.organizationId,
          annual: '',
          serial: '',
          barcode: '',
          number: '',
          title: '',
          authorId: '',
          p_author: this.$store.state.user.userName,
          date: '',
          contractId: '',
          contractArea: 0,
          contractPlant: 0,
          contractWeight: 0,
          farmerId: '',
          farmerName: '',
          year: '',
          typeName: '',
          typeId: '',
          'statusId': '',
          'varietyId': '',
          'rankId': '',
          varietyName: '',
          statusName: '',
          partName: '',
          colorName: '',
          gradeCode: '',
          gradeId: '',
          gradeName: '',
          rankName: '',
          tobaccoPack: 0,
          tobaccoPurity: 0,
          pack: 0,
          amount: 0,
          weight: 0,
          reserveBegin: '',
          reserveEnd: '',
          technicianName: '',
          usageName: '',
          recheckDate: '',
          recheckerName: '',
          material: 0,
          impurity: 0,
          sampling: 0,
          qualified: 0,
          ratio: 0,
          pictures: ''
        },
        datetimes: [this.dateFormat(new Date(), 'yyyy-mm-hh HH:MM:ss'), this.dateFormat(new Date(), 'yyyy-mm-hh HH:MM:ss')],
        formData: {
          seContractList: [],
          partList: [],
          colorList: [],
          optionData: [], //存放下拉数据，用于反向查询
        },
        ruleValidate: {
          code: [{required: true, message: '编码不能为空', trigger: 'blur'}]
        }
      };
    },
    components: {
      OrganizationForm,
      typeGradeSelect,
      typeSelect,
      varietySelect,
      typeVarietySelect,
      statusSelect,
      rankSelect,
      'type-grade-select': typeGradeSelect,
      typeVarietyGradeSelect
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
    },
    methods: {
      getColorAndPart() {
        //由于类型等级回显，第一次加载会触发change事件，导致数据清空
        if (this.firstLoad) {
          //清空原有数据
          this.formItem.colorName = '';
          this.formItem.partName = '';
        }
        this.firstLoad = true;
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
        //获取颜色
        Promise.all([colorApi.getAll({
          'size': 500,
          sort: 'id,ASC',
          'search': 'typeId:EQ:{typeId}'.format({
            typeId: this.formItem.typeId
          })
        })])
          .then(([response]) => {
            this.formData.colorList = response.content;
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
        this.formItem.organizationId = this.formItem.organization.organizationId;
        this.formItem.organizationCode = this.formItem.organization.organizationId;
        this.formItem.organizationName = this.formItem.organization.organizationName;
        this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
        if (this.formItem.annual !== '' && this.formItem.annual !== null && this.formItem.annual !== undefined) {
          this.formItem.annual = this.formItem.annual.toString();
        }
        if (this.formItem.year !== '' && this.formItem.year !== null && this.formItem.year !== undefined) {
          this.formItem.year = this.formItem.year.toString();
        }
      },
      //查询烟农姓名和id
      getFarmer() {
        if (this.formItem.contractId !== '' && this.formItem.contractId !== null && this.formItem.contractId !== undefined) {
          this.formData.optionData.forEach((item) => {
            if (item.number === this.formItem.contractId) {
              this.formItem.farmerName = item.farmerName;
              this.formItem.farmerId = item.farmerId;
              this.formItem.contractArea = item.signArea;
              this.formItem.contractPlant = item.signPlant;
              this.formItem.contractWeight = item.signWeight;
              this.formItem.districtName = item.organization.organizationId;
            }
          });
        }
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          // 获取合同
          Promise.all([
            seContractApi.getAll({
              size: 10,
              sort: 'id,ASC',
              contains: 'title,farmerName,farmerNumber,farmerPhone,bankAccount:{keyword}:true'.format({keyword: query}),
              search: 'organization.organizationId:EQ:{orgId};annual:EQ:{annual};'.format(
                {
                  orgId: this.formItem.organizationId,
                  annual: new Date().getFullYear().toString(),
                }
              )
            })
          ])
            .then(([response]) => {
              let arr = [];
              this.formData.optionData = response.content;
              response.content.forEach(function (item) {
                arr.push({
                  'value': '[' + item.annual + ']' + item.farmerName,
                  'id': item.id,
                  'sfz': item.farmerNumber
                });
              });
              this.formData.seContractList = arr;
              this.loading = false;
            })
            .catch(error => {
            });
        } else {
          this.formData.seContractList = [];
          this.formData.optionData = [];
          this.loading = false;
        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.formItem.date = this.dateFormat(this.formItem.date, 'yyyy-mm-dd HH:MM:ss');
            this.formItem.reserveBegin = this.datetimes[0];
            this.formItem.reserveEnd = this.datetimes[1];
            this.formItem.date = this.dateFormat(this.formItem.date, 'yyyy-mm-dd HH:MM:ss');
            Promise.all([preCheckApi.updatePreCheck(this.formItem.id, this.formItem)])
              .then(([response]) => {
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info'
                });
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
