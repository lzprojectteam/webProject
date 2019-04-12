<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tfarm.plantPlan.annual')">
            <el-date-picker v-model="searchData.annual"
                            type="year"
                            value-format="yyyy"
                            placeholder="选择年"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.plantPlan.control')">
            <el-select v-model="searchData.control">
              <el-option value='-'
                         key='-'
                         :label="$t('base.all')">{{ $t('base.all') }} </el-option>
              <el-option v-for="item in formData.controlList"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 240px">
        <el-popover placement="bottom-start"
                    type='primary'
                    width="400"
                    trigger="click">
          <el-form label-position="top"
                   label-width="80px"
                   :model="searchData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('tobacco.common.organization')">
                  <organization-form :root="userOrgId"
                                     :code.sync="searchData.organizationId" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('xbasic.district.districtId')">
                  <organization-form :root="userDistrictId"
                                     :code.sync="searchData.districtId"
                                     model="district" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="日期">
                  <el-date-picker v-model="searchData.date"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  value-format="yyyyMMdd"
                                  range-separator="-"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :picker-options="dateoptions"
                                  style="width:100%">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span=24>
                <el-form-item label="意愿交售数量区间">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input placeholder="请输入大于公斤数"
                                suffix-icon="el-icon-edit"
                                v-model="searchData.gtPlant">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-input placeholder="请输入小于公斤数"
                                v-model="searchData.ltPlant"
                                suffix-icon="el-icon-edit">
                      </el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=24>
                <el-form-item label="意愿交售面积区间">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input placeholder="请输入大于公斤数"
                                v-model="searchData.gtArea"
                                suffix-icon="el-icon-edit">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-input placeholder="请输入小于公斤数"
                                v-model="searchData.ltArea"
                                suffix-icon="el-icon-edit">
                      </el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tobacco.tfarm.plantPlan.author')">
                  <el-input v-bind:placeholder="$t('base.pleaseInput')"
                            v-model="searchData.author"
                            @keyup.enter.native="onSearchButtonClick" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tobacco.tfarm.plantPlan.farmerName')">
                  <el-input v-bind:placeholder="$t('base.pleaseInput')"
                            v-model="searchData.farmerName"
                            @keyup.enter.native="onSearchButtonClick" />
                </el-form-item>
              </el-col>
              <el-col :span=24>
                <div style="float:right;margin-top: 10px;">
                  <el-button plain
                             @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
                  <el-button plain
                             @click='onResetButtonClick'>{{ $t('base.buttonReset') }}</el-button>
                </div>
              </el-col>
            </el-row>

          </el-form>
          <el-button plain
                     type='primary'
                     slot="reference">{{ $t('base.buttonFilter') }}</el-button>
        </el-popover>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.plantPlanList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tfarm.plantPlan.serial')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tfarm.plantPlan.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tfarm.plantPlan.date')" />
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tfarm.plantPlan.farmerName')" />
        <el-table-column prop="typeName"
                         :label="this.$t('tobacco.tfarm.plantPlan.typeName')" />
        <el-table-column prop="varietyName"
                         :label="this.$t('tobacco.tfarm.plantPlan.varietyName')" />
        <el-table-column prop="plant"
                         :label="this.$t('tobacco.tfarm.plantPlan.plant')" />
        <el-table-column prop="price"
                         :label="this.$t('tobacco.tfarm.plantPlan.price')" />
        <el-table-column prop="area"
                         :label="this.$t('tobacco.tfarm.plantPlan.area')" />
        <el-table-column prop="number"
                         :label="this.$t('tobacco.tfarm.plantPlan.number')" />
        <el-table-column prop="yield"
                         :label="this.$t('tobacco.tfarm.plantPlan.yield')" />
        <el-table-column prop="money"
                         :label="this.$t('tobacco.tfarm.plantPlan.money')" />
        <el-table-column prop="score"
                         :label="this.$t('tobacco.tfarm.plantPlan.score')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tfarm.plantPlan.control')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tfarm.plantPlan.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
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
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./plantPlanAdd.vue");
const EditForm = () => import("./plantPlanEdit.vue");
import plantPlanApi from "../../api/tfarm/api_plantPlan";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
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
            text: this.$t("base.threeMonth"),
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
        annual: new Date().getFullYear() + "",
        serial: "",
        title: "",
        author: "",
        date: "",
        farmerName: "",
        typeId: "-",
        varietyId: "-",
        gtPlant: "",
        ltPlant: "",
        price: 0,
        gtArea: "",
        ltArea: "",
        number: 0,
        yield: 0,
        money: 0,
        icon: "",
        pictures: "",
        score: 0,
        control: "-",
        desc: "",
        districtId: "",
        organizationId: ""
      },
      formData: {
        plantPlanList: [],
        controlList: [
          { key: 1, value: "烟技员未提交" },
          { key: 3, value: "烟技员已提交" },
          { key: 5, value: "上级驳回" },
          { key: 7, value: "站长审核通过" },
          { key: 9, value: "县公司终审通过" }
        ],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      }
    };
  },
  created() {
    this.searchData.organizationId = this.userOrgId;
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm: () => import("@/components/Organization")
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
  methods: {
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

      Promise.all([plantPlanApi.deletePlantPlan(this.formData.selectRow.id)])
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
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      if (
        this.searchData.organizationId === undefined ||
        this.searchData.organizationId === null ||
        this.searchData.organizationId === ""
      ) {
        this.$notify({
          title: this.$t("base.warn"),
          message: "未获取到组织单位信息",
          duration: 1000,
          type: "warning",
          position: "bottom-right"
        });
        return;
      }
      let search = "annual:EQ:{annual};organization.organizationId:like:{orgid}".format(
        {
          annual: this.searchData.annual,
          orgid: this.searchData.organizationId
        }
      );
      if (this.searchData.control !== "-") {
        search += ";control:eq:" + this.searchData.control;
      }
      if (
        this.searchData.author !== undefined &&
        this.searchData.author !== null &&
        this.searchData.author !== ""
      ) {
        search += ";author:NRE:" + this.searchData.author;
      }
      if (
        this.searchData.farmerName !== undefined &&
        this.searchData.farmerName !== null &&
        this.searchData.farmerName !== ""
      ) {
        search += ";farmerName:NRE:" + this.searchData.author;
      }
      if (
        this.searchData.districtId !== undefined &&
        this.searchData.districtId !== null &&
        this.searchData.districtId !== ""
      ) {
        search += ";organization.districtId:like:" + this.searchData.districtId;
      }
      if (
        this.searchData.date !== undefined &&
        this.searchData.date.length === 2
      ) {
        search +=
          ";date:BETWEEN:" +
          this.searchData.date[0] +
          "," +
          this.searchData.date[1];
      }
      if (
        this.searchData.gtPlant !== undefined &&
        this.searchData.gtPlant !== null &&
        this.searchData.gtPlant !== "" &&
        this.searchData.ltPlant !== undefined &&
        this.searchData.ltPlant !== null &&
        this.searchData.ltPlant !== ""
      ) {
        search +=
          ";plant:BETWEEN:" +
          this.searchData.gtPlant +
          "," +
          this.searchData.ltPlant;
      }
      if (
        this.searchData.gtArea !== undefined &&
        this.searchData.gtArea !== null &&
        this.searchData.gtArea !== "" &&
        this.searchData.ltArea !== undefined &&
        this.searchData.ltArea !== null &&
        this.searchData.ltArea !== ""
      ) {
        search +=
          ";plant:BETWEEN:" +
          this.searchData.gtArea +
          "," +
          this.searchData.ltArea;
      }
      Promise.all([
        plantPlanApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "id",
          contains: "annual,serial,title,author,date,farmerName,typeName,varietyName,desc:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.plantPlanList = response.content;
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
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      }
    },
    onPageSizeChange(size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      }
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
      this.onSearchButtonClick();
      done();
    },
    onResetButtonClick() {
      this.searchData.districtId = "";
      this.searchData.date = [];
      this.searchData.gtArea = "";
      this.searchData.ltArea = "";
      this.searchData.gtPlant = "";
      this.searchData.ltPlant = "";
      this.searchData.author = "";
      this.searchData.farmerName = "";
    }
  }
};
</script>
<style scoped>
.el-form--label-top .el-form-item__label {
  padding: unset !important;
}
</style>
