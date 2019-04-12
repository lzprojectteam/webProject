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
                               @onchange="organizationOnchange" />
          </el-form-item>
          <template v-if='expand'>
            <el-form-item :label="$t('tobacco.thuman.hrEmployee.position')">
              <el-select v-model='selectData.positionId'
                         multiple
                         @change='onSystemChanged'>
                <el-option v-for="item in  selectData.positionList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('tobacco.thuman.hrEmployee.education')">
              <el-select v-model='selectData.educationId'
                         @change='onSystemChanged'>
                <el-option v-for="item in  selectData.educationList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>

        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 340px">
        <el-button-group>
          <el-button type='primary'
                     plain
                     @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary'
                     plain
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary'
                     plain
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary'
                     plain
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.hrEmployeeList"
                style="width: 100%"
                :row-class-name="tableRowClassName">

        <el-table-column type="expand"
                         fixed>
          <template slot-scope="props">
            <el-form label-position="left"
                     inline
                     class="table-expand">
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.birth')">
                <span>{{ props.row.birth|parseDate('yyyy-mm-dd') }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.author')">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.team')">
                <span>{{ props.row.team }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.education')">
                <span>{{ props.row.education.team }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.address')">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.email')">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.bankName')">
                <span>{{ props.row.bankName }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.thuman.hrEmployee.desc')">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         :label="this.$t('tobacco.thuman.hrEmployee.name')"
                         fixed
                         width="100"
                         show-overflow-tooltip />

        <el-table-column prop="number"
                         :label="this.$t('tobacco.thuman.hrEmployee.number')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         width="170"
                         show-overflow-tooltip />

        <el-table-column :label="this.$t('tobacco.thuman.hrEmployee.position')"
                         width="140"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in scope.row.positionList"
                  :key="item.id">
              {{ item.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="number"
                         :label="this.$t('tobacco.thuman.hrEmployee.number')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="identity"
                         :label="this.$t('tobacco.thuman.hrEmployee.identity')"
                         width="170" />

        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         width="180"
                         show-overflow-tooltip />
        <el-table-column prop="organization.districtName"
                         :label="this.$t('org.districtName')"
                         width="180"
                         show-overflow-tooltip />

        <el-table-column prop="phone"
                         :label="this.$t('tobacco.thuman.hrEmployee.phone')"
                         width="120" />

        <el-table-column prop="bankAccount"
                         :label="this.$t('tobacco.thuman.hrEmployee.bankAccount')"
                         width="180"
                         show-overflow-tooltip />
        <el-table-column prop="loginName"
                         :label="this.$t('tobacco.thuman.hrEmployee.loginName')"
                         width="120"
                         show-overflow-tooltip />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.thuman.hrEmployee.control')">
          <template slot-scope="scope">
            {{ controlList[scope.row.control]}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="220">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       plain
                       size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       plain
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text"
                       plain
                       size="small"
                       @click="showFarmer(scope.row,true)">查看烟农
            </el-button>
            <el-button v-if="!scope.row.loginName"
                       type="text"
                       size="small"
                       plain
                       @click='bindButtonClick(scope.row)'>{{
              $t('base.bindUser') }}
            </el-button>
            <el-button v-if="scope.row.loginName"
                       type="text"
                       size="small"
                       plain
                       @click='releaseBindConfirm(scope.row)'>{{
              $t('base.releaseBind') }}
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
                 :before-close="handleClose"
                 width="80%">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.bindUser')"
                 :visible.sync="childForm.bindForm"
                 top="10px"
                 :before-close="handleClose">
        <bind-form :item=formData.selectRow
                   :visible.sync="childForm.bindForm"
                   @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose"
                 width="80%">
        <edit-form :item.sync="formData.viewSelect"
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose"
                 width="80%">
        <edit-form :item="formData.viewSelect"
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog title="查看烟农"
                 :visible.sync="childForm.famerForm"
                 top="10px"
                 :before-close="handleClose"
                 width="50%">
        <farmer-form :item="formData.viewSelect"
                     :visible.sync="childForm.famerForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./hrEmployeeAdd.vue");
const EditForm = () => import("./hrEmployeeEdit.vue");
const BindForm = () => import("./bindUser.vue");
const OrganizationForm = () => import("@/components/Organization");
const famerForm = () => import("./hrEmployee_showFarmer.vue");

import dateFormat from "dateformat";
import categoryApi from "../../api/basic/api_category";
import hrEmployeeApi from "../../api/thuman/api_hrEmployee";

export default {
  data() {
    return {
      expand: false,
      expandIcon: "el-icon-arrow-left",
      controlList: { "1": "新增", "3": "质疑", "5": "核准", "7": "作废" },
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        bindForm: false,
        famerForm: false
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
        orgId: ""
      },
      selectData: {
        positionId: "",
        positionList: [],
        educationId: "",
        educationList: []
      },
      formData: {
        hrEmployeeList: [],
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
    Promise.all([
      categoryApi.getAll({ search: "lead:EQ:SC_M" }),
      categoryApi.getAll({ search: "lead:EQ:SC_E" })
    ])
      .then(([response, response2]) => {
        this.selectData.positionList = response.content;
        this.selectData.educationList = response2.content;
      })
      .catch(error => {});
    if (!(this.userOrgId === undefined)) {
      this.searchData.orgId = this.userOrgId;
    }
    this.onSearchButtonClick();
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
    "add-form": AddForm,
    "edit-form": EditForm,
    "bind-form": BindForm,
    "farmer-form": famerForm,
    OrganizationForm
  },
  methods: {
    //查看烟农
    showFarmer(row) {
      this.formData.viewSelect = row;
      console.log(row);
      this.childForm.famerForm = true;
    },
    onExpandClick() {
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = "el-icon-arrow-down";
      } else {
        this.expandIcon = "el-icon-arrow-left";
      }
    },
    onSystemChanged() {
      this.formData.pagination.currentPage = 1;
    },
    organizationOnchange(label, value, values) {
      console.info(value);
      this.searchData.orgId = value;
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
    bindButtonClick(row) {
      this.formData.selectRow = row;
      this.childForm.bindForm = true;
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
      Promise.all([hrEmployeeApi.deleteHrEmployee(this.formData.selectRow.id)])
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
    releaseBindClick() {
      Promise.all([hrEmployeeApi.releaseBind(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.releaseSuccess")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    releaseBindConfirm(row) {
      this.formData.selectRow = row;
      this.$confirm(
        "此操作将解除所有绑定的用户，是否继续",
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.releaseBindClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
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
      Promise.all([
        hrEmployeeApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "name,ASC",
          search: "positionList.id:IN:{positionids};education.id:EQ:{educationId};organization.organizationId:rlike:{orgid};(serial:LIKE:{keyword}:or;number:LIKE:{keyword}:or;title:LIKE:{keyword}:or;name:LIKE:{keyword}:or;identity:LIKE:{keyword})".format(
            {
              positionids: this.selectData.positionId,
              educationId: this.selectData.educationId,
              orgid: this.searchData.orgId,
              keyword: this.formData.pagination.keyword
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.hrEmployeeList = response.content;
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
    formatDate(date) {
      if (date === "" || date === undefined || date === null) {
        return "未设置";
      }
      return dateFormat(date, "yyyy/mm/dd");
    }
  }
};
</script>
