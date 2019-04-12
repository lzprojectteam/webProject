<template>
  <el-form :model="formItem"
           label-width="120px"
           :rules="ruleValidate"
           class="flex"
           ref="formValidate">

    <el-form-item :label="$t('tobacco.tfarm.plantPlan.serial')"
                  prop="serial">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.farmerName')"
                  prop="farmerId">
      <el-select ref='userSelect'
                 @change="selectChange"
                 v-model='formItem.farmerId'
                 filterable
                 remote
                 placeholder="请输入关键词"
                 :remote-method='remoteFarmerMethod'
                 style="width:100%">
        <el-option v-for="item in farmerList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.annual')">
      <el-date-picker v-model="formItem.annual"
                      type="year"
                      style="width:100%"
                      value-format="yyyy"
                      :placeholder="$t('base.pleaseSelect')"></el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.typeName')">
      <el-select filterable
                 :disabled="formItem.planAreaEntityList.length>0"
                 style="width:100%"
                 @change="onTypeChange"
                 v-model="formItem.typeId">
        <el-option v-for="item in  typeList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.districtId')">
      <organization-form :root="userDistrictId"
                         style="width:100%"
                         :code.sync="formItem.districtId"
                         model="district" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.date')">
      <el-date-picker v-model="formItem.date"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width:100%;"
                      :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>

    <el-form-item :label="$t('tobacco.tfarm.plantPlan.area')">
      <el-input disabled
                v-model="formItem.area">
        <template slot="append">{{$t('unit.aeraMu')}}</template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.number')">
      <el-input disabled
                v-model="formItem.number">
        <template slot="append">{{$t('unit.plant')}}</template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPlan.yield')">
      <el-input disabled
                v-model="formItem.yield">
        <template slot="append">{{$t('unit.weightKg')}}</template>
      </el-input>
    </el-form-item>

    <el-form :model="formItem"
             :rules="ruleValidate"
             label-position="top"
             class="childTable">
      <el-form-item label-width="100%">
        <slot slot="label">
          <div>
            <span>烟叶信息</span>
            <span style="float:right"> {{$t('tobacco.common.unitInfo')}}</span>
          </div>

        </slot>
        <el-table highlight-current-row
                  border
                  :data="formItem.planAreaEntityList"
                  @current-change="onRowSelectChanged"
                  @selection-change="onSelectionChange"
                  style="width: 100%;minHeight:200px;">
          <el-table-column prop="varietyName"
                           :label="this.$t('tobacco.tfarm.plantPlanArea.varietyName')">
            <template slot-scope="scope">
              <el-select v-if="scope.row._edit"
                         filterable
                         @change="onVarietyChange"
                         v-model="scope.row.varietyId">
                <el-option v-for="item in  varietyList"
                           :key="item.varietyId"
                           :label="item.name"
                           :value="item.varietyId" />
              </el-select>
              <span v-else>{{scope.row.varietyName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="area"
                           :label="this.$t('tobacco.tfarm.plantPlanArea.area')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        @change="onAreaValueChanged"
                        v-model="scope.row.area" />
              <span v-else>{{scope.row.area }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number"
                           :label="this.$t('tobacco.tfarm.plantPlanArea.number')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        @change="onNumberValueChanged"
                        v-model="scope.row.number" />
              <span v-else>{{scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="yield"
                           :label="this.$t('tobacco.tfarm.plantPlanArea.yield')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        @change="onYieldValueChanged"
                        v-model="scope.row.yield" />
              <span v-else>{{scope.row.yield }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="money"
                           :label="this.$t('tobacco.tfarm.plantPlanArea.money')">
            <template slot-scope="scope">
              <el-input v-if="scope.row._edit"
                        v-model="scope.row.money" />
              <span v-else>{{scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="80">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row._edit"
                          class="item"
                          effect="dark"
                          :content="$t('base.buttonEdit')"
                          placement="bottom">
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          :content="$t('base.buttonDelete')"
                          placement="bottom">
                <el-button icon="el-icon-minus"
                           @click="onItemRemove(scope.row)"
                           type="text"
                           size="small" />
              </el-tooltip>
            </template>
            <template slot="header"
                      slot-scope="slot">
              <el-tooltip class="item"
                          effect="dark"
                          :content="$t('base.buttonAdd')"
                          placement="bottom">
                <el-button icon="el-icon-plus"
                           @click="createPlanArea()"
                           type="text"
                           size="small">{{$t('base.buttonAdd')}}</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <el-form-item style="width:100%">
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import plantPlanApi from '../../api/tfarm/api_plantPlan';
import hrFarmerApi from '../../api/thuman/api_hrFarmer';
import typeApi from '../../api/basic/api_type';
import varietyApi from '../../api/basic/api_variety';

export default {
  data() {
    return {
      farmerList: [],
      typeList: [],
      varietyList: [],
      controlList: [
        { key: 1, value: '烟技员未提交' },
        { key: 3, value: '烟技员已提交' },
        { key: 5, value: '上级驳回' },
        { key: 7, value: '站长审核通过' },
        { key: 9, value: '县公司终审通过' }
      ],
      formItem: {
        annual: new Date().getFullYear().toString(),
        serial: '',
        title: '',
        author: '',
        date: this.dateFormat(new Date(), 'yyyy-mm-dd'),
        farmerId: '',
        farmerName: '',
        typeId: '10',
        typeName: '烤烟',
        varietyName: '',
        plant: '',
        price: '',
        area: '',
        number: '',
        yield: '',
        money: '',
        icon: '',
        pictures: '',
        score: '',
        control: 1,
        desc: '',
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: 0,
        organizationCode: this.$store.state.user.organization.organizationId,
        districtId: '',
        districtCode: '',
        districtName: '',
        districtOrder: 0,
        planAreaEntityList: []
      },
      currentItem: {},
      ruleValidate: {
        serial: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
        farmerId: [
          { required: true, message: '必须选择烟农档案', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    Promise.all([
      typeApi.getAll({
        size: 500,
        page: 0,
        sort: 'id'
      }),
      varietyApi.getAll({
        size: 500,
        page: 0,
        sort: 'id',
        search: 'typeId:eq:10;visible:eq:true'
      })
    ])
      .then(([typeResponse, varietyResponse]) => {
        this.typeList = typeResponse.content;
        this.varietyList = varietyResponse.content;
      })
      .catch(error => {});
  },
  computed: {
    userDistrictId() {
      if (this.$store.state.user.detail.districtId === undefined) {
        return '0';
      } else {
        return this.$store.state.user.detail.districtId;
      }
    }
  },
  components: {
    OrganizationForm: () => import('@/components/Organization')
  },
  methods: {
    loadVarietyList(typeId) {
      Promise.all([
        varietyApi.getAll({
          size: 500,
          page: 0,
          sort: 'id',
          search: 'typeId:eq:' + typeId + ';visible:eq:true'
        })
      ])
        .then(([varietyResponse]) => {
          this.varietyList = varietyResponse.content;
        })
        .catch(error => {});
    },
    onTypeChange(value, fn) {
      this.varietyList = [];
      let item = this.typeList.find(function(item) {
        return item.id === value;
      });
      this.formItem.typeName = item.name;

      Promise.all([
        varietyApi.getAll({
          size: 500,
          page: 0,
          sort: 'id',
          search: 'typeId:eq:' + value
        })
      ])
        .then(([varietyResponse]) => {
          this.varietyList = varietyResponse.content;
        })
        .catch(error => {});
    },
    onVarietyChange(value) {
      let item = this.varietyList.find(function(item) {
        return item.varietyId === value;
      });
      this.currentItem.varietyName = item.name;
    },
    onRowSelectChanged(currentRow, oldCurrentRow) {
      this.resetItem();
      this.currentItem = currentRow;
      if (currentRow === undefined || currentRow === null) {
        return;
      }

      let selectIndex = this.formItem.planAreaEntityList.findIndex(function(
        item,
        index,
        arr
      ) {
        return item.areaId === currentRow.areaId;
      });
      if (selectIndex > -1) {
        this.paramItem = this.formItem.planAreaEntityList[selectIndex];
        this.paramItem._edit = true;
        this.formItem.planAreaEntityList.splice(selectIndex, 1);
        this.formItem.planAreaEntityList.splice(selectIndex, 0, this.paramItem);
      }
    },
    onSelectionChange(row) {
      console.log('table selection changed' + row);
    },
    selectChange(id) {
      let obj = this.farmerList.find(item => {
        return item.id === id;
      });
      console.log(obj);
      this.formItem.farmerName = obj.name;
      this.formItem.farmerIdentity = obj.identity;
      this.formItem.farmerPhone = obj.phone;
      this.formItem.farmerNumber = obj.number;
      this.formItem.farmerAddress = obj.address;
      this.formItem.bankName = obj.bankName;
      this.formItem.districtId = obj.organization.districtId;
      this.formItem.districtCode = obj.organization.districtCode;
      this.formItem.districtName = obj.organization.districtName;
      this.formItem.districtOrder = obj.organization.districtOrder;
    },

    remoteFarmerMethod(query) {
      if (
        this.formItem.organizationId === null ||
        this.formItem.organizationId === '' ||
        this.formItem.organizationId === undefined
      ) {
        this.$notify.error({
          title: '错误',
          message: '请先设置组织单位'
        });
        return;
      }
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          Promise.all([
            hrFarmerApi.getAll({
              search: 'organization.organizationId:EQ:{orgid};(name:like:{farmerName}:or;identity:like:{farmerName}:or;phone:like:{farmerName};)'.format(
                {
                  orgid: this.formItem.organizationId,
                  farmerName: query
                }
              )
            })
          ])
            .then(([response]) => {
              this.farmerList = response.content;
            })
            .catch(error => {});
        }, 200);
      } else {
        this.farmerList = [];
      }
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([plantPlanApi.savePlantPlan(this.formItem)])
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
    },
    createPlanArea() {
      this.resetItem();
      let entity = {
        plantPlanId: '',
        areaId: this.formItem.planAreaEntityList.length + 1,
        start: '',
        finish: '',
        typeId: this.formItem.typeId,
        typeName: this.formItem.typeName,
        varietyId: '',
        varietyName: '',
        area: 0,
        number: 0,
        yield: 0,
        money: 0,
        pictures: '',
        path: '',
        desc: '',
        _edit: true
      };
      this.currentItem = entity;
      this.formItem.planAreaEntityList.push(entity);
    },
    onItemRemove(row) {
      let index = this.formItem.planAreaEntityList.findIndex(item => {
        return item.areaId === row.areaId;
      });
      console.log(index);
      this.formItem.planAreaEntityList.splice(index, 1);
    },
    resetItem() {
      this.formItem.planAreaEntityList.forEach(item => {
        item._edit = false;
      });
      this.formItem.planAreaEntityList = this.formItem.planAreaEntityList;
    },
    onAreaValueChanged(value) {
      this.formItem.area =
        parseFloat(value) +
        (this.formItem.area === '' ? 0 : parseFloat(this.formItem.area));
    },
    onYieldValueChanged(value) {
      this.formItem.yield =
        parseFloat(value) +
        (this.formItem.yield === '' ? 0 : parseFloat(this.formItem.yield));
    },
    onNumberValueChanged(value) {
      this.formItem.number =
        parseFloat(value) +
        (this.formItem.number === '' ? 0 : parseFloat(this.formItem.number));
    }
  }
};
</script>
<style >
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex > div {
  width: 50%;
}
.childTable {
  width: 100%;
}
.childTable > div > label {
  width: 100%;
}
</style>
