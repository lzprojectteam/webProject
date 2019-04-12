<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')">
            <organization-form :root="userOrgId"
                               @onchange="organizationOnchange"
                               v-model="searchData.organization"
                               style="width:150px" />
          </el-form-item>
          <!--model是用来设置组件代表行政单位的-->
          <el-form-item :label="$t('xbasic.district.districtId')">
            <organization-form :root="userDistrictId"
                               @onchange="directiveOnchange"
                               model="district"
                               style="width:150px" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick"
                      style="width:150px" />
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.thuman.hrFarmer.jobType')">
              <el-select v-model='searchData.positionId'
                         @change='onFarmerChanged'
                         style="width:150px">
                <el-option value=''
                           key='-'>{{ $t('base.all') }}</el-option>
                <el-option v-for="item in  searchData.plantList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('tobacco.thuman.hrFarmer.state')">
              <el-select v-model='searchData.stateId'
                         @change='onFarmerChanged'
                         style="width:150px">
                <el-option value=''
                           key='-'>{{ $t('base.all') }}</el-option>
                <el-option v-for="item in  formData.stateList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- <el-form-item :label="$t('tobacco.thuman.hrFarmer.SmokeGroup')" style="display:none">
            <el-select v-model='searchData.SmokeGroupId' @change='onFarmerChanged'>
              <el-option value='-' key='-'>{{ $t('base.all') }} </el-option>
              <el-option v-for="item in  searchData.SmokeGroupList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.thuman.hrFarmer.SmokeTechnician')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.SmokeTechnician" @keyup.enter.native="onSearchButtonClick" style="width:186px" />
          </el-form-item>
          <el-form-item :label="$t('org.districtName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="searchData.districtName" @keyup.enter.native="onSearchButtonClick" style="width:186px" />
          </el-form-item>-->
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 380px">
        <el-button-group>
          <el-button type='primary'
                     plain
                     @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary'
                     plain
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>

          <el-dropdown style="height:29px;">
            <el-button type="primary"
                       plain>
              更多操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type='text'
                           style="width:90px;"
                           @click='childForm.addForm=true'>{{ $t('base.buttonAdd')
                  }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='text'
                           style="width:90px;"
                           @click='deleteButtonConfirm'>{{ $t('base.buttonDelete')
                  }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='text'
                           style="width:90px;"
                           @click='bindButtonClick'>批量绑定
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='text'
                           style="width:90px;"
                           @click='bindAllButtonClick'>一键绑定
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='text'
                           style="width:90px;"
                           @click='setDirective'>行政单位归属
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                @current-change="handleCurrentChange"
                :data="formData.hrFarmerList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="selection"
                         :label="this.$t('base.index')"
                         width="55"
                         fixed="left">
        </el-table-column>
        <el-table-column type="expand"
                         fixed="left">
          <template slot-scope="props">
            <el-form label-position="left"
                     class="cas-group cas-flex-3">
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.title')">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.birth')">
                <span>{{ props.row.birth|parseDate('yyyy-mm-dd') }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.sex')">
                <span>{{ props.row.sex!==undefined&& props.row.sex!==null?props.row.sex.name:'' }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.jobType')">
                <span>{{ props.row.plant!==undefined&& props.row.plant!==null?props.row.plant.name:'' }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.education')">
                <span>{{ props.row.education!==undefined&& props.row.education!==null?props.row.education.name:'' }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.income')">
                <span>{{ props.row.income!==undefined&& props.row.income!==null?props.row.income.name:'' }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.labour')">
                <span>{{ props.row.labour }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.plowland')">
                <span>{{ props.row.plowland }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.author')">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.date')">
                <span>{{ props.row.date|parseDate('yyyy-mm-dd') }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.positionList')">
                <span v-for="item in props.row.positionList"
                      :key="item.id">
                  {{ item.name}}
                </span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.technician')">
                <span v-for="item in props.row.technician"
                      :key="item.id">
                  {{ item.name}}
                </span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrFarmer.desc')">
                <span>{{ props.row.desc}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column type="index" fixed="left">
        </el-table-column> -->
        <!-- <el-table-column prop="id" :label="this.$t('tobacco.thuman.hrFarmer.id')" /> -->
        <el-table-column prop="number"
                         :label="this.$t('tobacco.thuman.hrFarmer.number')"
                         width='160' />

        <el-table-column prop="name"
                         fixed="left"
                         :label="this.$t('tobacco.thuman.hrFarmer.name')"
                         show-overflow-tooltip
                         width='80' />
        <el-table-column prop="identity"
                         fixed="left"
                         :label="this.$t('tobacco.thuman.hrFarmer.identity')"
                         show-overflow-tooltip
                         width='180' />

        <!--  <el-table-column prop="birth" :label="this.$t('tobacco.thuman.hrFarmer.birth')" /> -->
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         show-overflow-tooltip />
        <el-table-column prop="organization.districtName"
                         :label="this.$t('org.districtName')"
                         show-overflow-tooltip />
        <el-table-column prop="phone"
                         :label="this.$t('tobacco.thuman.hrFarmer.phone')"
                         show-overflow-tooltip
                         fixed="left"
                         width='120' />
        <el-table-column prop="address"
                         :label="this.$t('tobacco.thuman.hrFarmer.address')"
                         show-overflow-tooltip />

        <el-table-column prop="bankName"
                         :label="this.$t('tobacco.thuman.hrFarmer.bankName')"
                         show-overflow-tooltip
                         width='100' />
        <el-table-column prop="bankAccount"
                         fixed="left"
                         :label="this.$t('tobacco.thuman.hrFarmer.bankAccount')"
                         show-overflow-tooltip
                         width='180' />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.thuman.hrFarmer.control')"
                         width='60'>
          <template slot-scope="scope">
            {{ controlList[scope.row.control]}}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="90">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize'
                     :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage'
                     @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts'
                     @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.addForm"
                 top="10px"
                 style="text-align:center"
                 :before-close="handleClose"
                 width="80%">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 style="text-align:center"
                 :before-close="handleClose"
                 width="80%">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 style="text-align:center"
                 :before-close="handleClose"
                 width="80%">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog :title="$t('tobacco.thuman.hrFarmer.bindTobaccoTec')"
                 :visible.sync="childForm.bindForm"
                 top="10px"
                 style="text-align:center"
                 :before-close="handleClose">
        <bind-form :hrFarmerData=relatiodata
                   :visible.sync="childForm.bindForm"
                   :organizeId="searchData.orgId"
                   :searchInfo="searchData2" />
      </el-dialog>
      <!--一键绑定条件选择-->
      <el-dialog :visible.sync="childForm.showCondition"
                 top="10px"
                 title="烟农筛选条件"
                 width="40%">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="归属方式"
                            style="margin-bottom: 20px;">
                <el-select v-model="searchData2.mark"
                           style="width: 100%"
                           @change="getOrganizationId">
                  <el-option v-for="item in formData.origin"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    v-if="searchData2.mark===0">
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.organization')"
                            style="margin-bottom: 20px;">
                <organization-form :root="userOrgId"
                                   @onchange="organizationOnchange_onekey"
                                   v-model="searchData2.organizationId"
                                   style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    v-if="searchData2.mark===1">
              <!--model是用来设置组件代表行政单位的-->
              <el-form-item :label="$t('xbasic.district.districtId')"
                            style="margin-bottom: 20px;">
                <organization-form :root="userDistrictId"
                                   @onchange="directiveOnchange_onekey"
                                   model="district"
                                   v-model="searchData2.organizationId"
                                   style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')"
                            style="margin-bottom: 20px;">
                <el-select v-model='searchData2.positionId'
                           style="width:100%">
                  <el-option v-for="item in  positionList"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="margin-top: 30px;">
            <el-button type="primary"
                       style="float: right"
                       @click="confirmCondition('formValidate')">下一步
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="childForm.setDirective"
                 top="10px"
                 title="行政单位归属">
        <el-form label-width="80px">
          <el-form-item :label="$t('xbasic.district.districtId')">
            <organization-form :root="userDistrictId"
                               @onchange="contentDirectiveOnchange"
                               :model="formItem.districtId"
                               style="width:100%"
                               model="district" />
          </el-form-item>
          <el-form-item style="margin-top: 30px;">
            <el-button type="primary"
                       style="float: right"
                       @click="confirmDirective('formValidate')">保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./hrFarmerAdd.vue");
const EditForm = () => import("./hrFarmerEdit.vue");
const OrganizationForm = () => import("@/components/Organization");
const bindForm = () => import("./hrFarmerbindHrEmployee.vue");
import hrFarmerApi from "../../api/thuman/api_hrFarmer";
import categoryApi from "../../api/basic/api_category";

export default {
  data() {
    return {
      expand: false,
      expandIcon: "el-icon-arrow-left",
      positionList: [],
      controlList: { "1": "新增", "3": "质疑", "5": "核准", "7": "作废" },
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        bindForm: false,
        showCondition: false,
        setDirective: false
      },
      dateoptions: {
        shortcuts: [
          {
            text: this.$t("base.today"),
            onClick: picker => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.yesterday"),

            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.oneWeek"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchData: {
        SmokeGroupId: "",
        SmokeGroupList: [],
        positionId: "",
        plantList: [],
        id: "",
        serial: "",
        number: "",
        name: "",
        identity: "",
        birth: "",
        author: "",
        date: "",
        countryId: "",
        countryName: "",
        email: "",
        phone: "",
        address: "",
        bankName: "",
        bankAccount: "",
        education: "",
        income: "",
        plant: "",
        control: 1,
        altitude: "",
        desc: "",
        SmokeTechnician: "",
        SmokeGroup: "",
        districtName: "",
        stateId: "",
        organization: "",
        orgId: "",
        districtId: ""
      },
      searchData2: {
        mark: 0,
        organizationId: this.$store.state.user.organization.organizationId,
        positionId: "SC_F020"
      },
      relatiodata: {
        data: []
      },
      formItem: {
        districtId: "",
        districtName: "",
        districtOrder: "",
        districtCode: ""
      },
      formData: {
        origin: [
          {
            label: "组织机构",
            value: 0
          },
          {
            label: "行政单位",
            value: 1
          }
        ],
        stateList: [
          { id: "1", name: "新增" },
          { id: "3", name: "质疑" },
          { id: "5", name: "核准" },
          { id: "7", name: "作废" }
        ],
        hrFarmerList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 20, 30, 50, 100, 200, 500]
        },
        rowSelection: []
      }
    };
  },
  created() {
    Promise.all([categoryApi.getAll({ search: "lead:EQ:SC_F", sort: "id" })])
      .then(([positionResponse]) => {
        this.positionList = positionResponse.content;
      })
      .catch(error => {});
    Promise.all([
      categoryApi.getAll({ search: "lead:EQ:SC_F" }),
      categoryApi.getAll({ search: "lead:EQ:SG_TM:or;lead:EQ:SG_WT" })
    ])
      .then(([response, response2]) => {
        this.searchData.plantList = response.content;
        this.searchData.SmokeGroupList = response2.content;
      })
      .catch(error => {});
    this.searchData.orgId = this.$store.state.user.organization.organizationId;
    this.onSearchButtonClick();
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.orgId = undefined;
        return undefined;
      } else {
        this.searchData.orgId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    },
    userDistrictId() {
      if (this.$store.state.user.detail.districtId === undefined) {
        return "0";
      } else {
        return this.$store.state.user.detail.districtId;
      }
    }
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "bind-form": bindForm,
    OrganizationForm
  },
  methods: {
    confirmDirective() {
      let data = {
        farmerIds: []
      };
      let employeeIds = [];
      this.relatiodata.data.forEach(item => {
        employeeIds.push(item.id);
      });
      data.farmerIds = employeeIds;
      Promise.all([
        hrFarmerApi.updateDistrictId(
          this.formItem.districtId,
          this.formItem.districtName,
          data
        )
      ])
        .then(([response]) => {
          console.log(1);
          this.$message({
            message: response,
            type: "success"
          });
          this.childForm.setDirective = false;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    setDirective() {
      if (
        this.relatiodata.data === null ||
        this.relatiodata.data.length === 0
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      } else {
        this.childForm.setDirective = true;
      }
    },
    confirmCondition() {
      this.childForm.bindForm = true;
      this.childForm.showCondition = false;
    },
    getOrganizationId() {
      /* if (this.searchData2.mark === 0) {
           this.searchData2.organizationId = this.$store.state.user.organization.organizationId;
         } else {
           if (this.$store.state.user.detail.districtId) {
             this.searchData2.organizationId = this.$store.state.user.detail.districtId;
           } else {
             this.searchData2.organizationId = '0';//中国
           }
         }*/
      console.log(1);
    },
    onExpandClick() {
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = "el-icon-arrow-down";
      } else {
        this.expandIcon = "el-icon-arrow-left";
      }
    },
    onFarmerChanged() {
      this.formData.pagination.currentPage = 1;
    },
    editButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick() {
      if (
        this.formData.selectRow === null ||
        this.formData.selectRow === undefined
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }
      Promise.all([hrFarmerApi.deleteHrFarmer(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    organizationOnchange(label, value, values) {
      this.searchData.orgId = value;
    },
    directiveOnchange(label, value, values) {
      this.searchData.districtId = value;
    },
    organizationOnchange_onekey(label, value, values) {
      this.searchData2.organizationId = value;
    },
    directiveOnchange_onekey(label, value, values) {
      this.searchData2.organizationId = value;
    },
    contentDirectiveOnchange(label, value, values) {
      this.formItem.districtId = value;
      this.formItem.districtName = label;
      this.formItem.districtOrder = 0;
      this.formItem.districtCode = value;
    },
    deleteButtonConfirm() {
      this.$confirm(
        this.$t("message.deleteConfirm"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.deleteButtonClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    bindButtonClick() {
      if (
        this.relatiodata.data === null ||
        this.relatiodata.data.length === 0
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      } else {
        this.childForm.bindForm = true;
      }
    },
    bindAllButtonClick() {
      this.childForm.showCondition = true;
      this.relatiodata.data = [];
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      Promise.all([
        hrFarmerApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "name,ASC",
          search: "organization.organizationId:LIKE:{orgid};positionList.id:in:{positionId};control:EQ:{control};team.id:EQ:{teamid};organization.districtId:rlike:{districtId};(serial:LIKE:{keyword}:or;number:LIKE:{keyword}:or;title:LIKE:{keyword}:or;name:LIKE:{keyword}:or;identity:LIKE:{keyword})".format(
            {
              orgid: this.searchData.orgId,
              positionId: this.searchData.positionId,
              control: this.searchData.stateId,
              teamid: this.searchData.SmokeGroupId,
              districtId: this.searchData.districtId,
              keyword: this.formData.pagination.keyword
            }
          ),
          contains: ""
        })
      ])
        .then(([response]) => {
          this.formData.hrFarmerList = response.content;
          this.formData.hrFarmerList.forEach(item => {
            item.technician = JSON.parse(item.technician);
          });
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
    },
    onPageChange(index) {
      this.formData.pagination.currentPage = index;
      this.onSearchButtonClick();
    },
    onPageSizeChange(size) {
      this.formData.pagination.pageSize = size;
      this.onSearchButtonClick();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleClose(done) {
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      this.childForm.bindForm = false;
      this.onSearchButtonClick();
      done();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.relatiodata.data = [];
      this.relatiodata.data = val;
      //console.log(this.multipleSelection);
      //console.log(JSON.parse(JSON.stringify(this.multipleSelection)));
    }
  }
};
</script>
