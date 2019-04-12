<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('user.assignOrginization')">
            <el-cascader :options='organizationList'
                         style="width:100%"
                         change-on-select
                         trigger='hover'
                         :props="props"
                         @change="organizationSelect"
                         :show-all-levels="false"
                         clearable />

          </el-form-item>
          <el-form-item :label="$t('user.state')">
            <el-select v-model="searchData.state">
              <el-option value=0
                         :label="$t('user.state0')" />
              <el-option value=1
                         :label="$t('user.state1')" />
              <el-option value=5
                         :label="$t('user.state5')" />
              <el-option value=7
                         :label="$t('user.state7')" />
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
           style="min-width: 210px">
        <el-button-group>
          <el-button plain
                     type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button plain
                     type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button plain
                     type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.userList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="name"
                         :label="this.$t('user.name')"
                         show-overflow-tooltip />
        <el-table-column prop="loginName"
                         :label="this.$t('user.loginName')" />
        <el-table-column prop="mobile"
                         :label="this.$t('user.mobile')" />
        <el-table-column prop="no"
                         :label="this.$t('user.no')" />
        <el-table-column prop="phone"
                         :label="this.$t('user.phone')" />
        <el-table-column prop="email"
                         :label="this.$t('user.email')" />
        <el-table-column prop="state"
                         :label="this.$t('user.state')">
          <template slot-scope="scope">
            <el-tag>{{formateState(scope.row.state)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         header-align="center"
                         :label="$t('base.titleOperation')"
                         width="220px">
          <template slot-scope="scope">

            <el-button plain
                       type="text"
                       @click="editButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
            <el-button plain
                       type="text"
                       @click="showDialog(scope.row,'assignMenuForm')">
              {{$t('user.assignMenu')}}
            </el-button>
            <el-button plain
                       type="text"
                       @click="showDialog(scope.row,'roleForm')">
              {{$t('user.assignRole')}}
            </el-button>
            <el-button plain
                       type="text"
                       @click="showDialog(scope.row,'assignOrginizationForm')">
              {{$t('user.assignOrginization')}}
            </el-button>
            <el-button plain
                       type="text"
                       @click="showDialog(scope.row,'AssignUserInfoExtForm')">
              {{$t('user.userInfoExt')}}
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
                 width="600px"
                 :before-close="handleClose"
                 v-center>
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 width="600px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('user.assignRole')"
                 :visible.sync="childForm.roleForm"
                 top="10px"
                 width="800px"
                 :before-close="handleClose">
        <assign-role :userId=formData.viewSelect.loginName
                     :visible.sync="childForm.roleForm" />
      </el-dialog>
      <el-dialog :title="$t('user.assignOrginization')"
                 :visible.sync="childForm.assignOrginizationForm"
                 top="10px"
                 width="800px"
                 :before-close="handleClose">
        <assign-orginization :userId=formData.viewSelect.id
                             :loginName=formData.viewSelect.loginName
                             :displayName=formData.viewSelect.name
                             :visible.sync="childForm.assignOrginizationForm" />
      </el-dialog>
      <el-dialog :title="$t('user.assignMenu')"
                 :visible.sync="childForm.assignMenuForm"
                 top="10px"
                 width="800px"
                 :before-close="handleClose">
        <assign-menu :roleId=formData.viewSelect.id
                     roleType="USER"
                     :visible.sync="childForm.assignMenuForm" />
      </el-dialog>
      <el-dialog :title="$t('user.userInfoExt')"
                 :visible.sync="childForm.AssignUserInfoExtForm"
                 top="10px"
                 width="800px"
                 :before-close="handleClose">
        <assign-user-info-ext :userId=formData.viewSelect.id
                              :loginName=formData.viewSelect.loginName
                              :visible.sync="childForm.AssignUserInfoExtForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./userAdd.vue");
const EditForm = () => import("./userEdit.vue");
const AssignRole = () => import("./assignRole.vue");
const AssignMenu = () => import("./assignMenu.vue");
const AssignOrginization = () => import("./assignOrginization.vue");
const AssignUserInfoExt = () => import("./assignUserInfoExt.vue");
import userApi from "@/api/base/apiUser";
import organizationApi from "@/api/xbasic/apiOrganization";

export default {
  data() {
    return {
      organizationList: [],
      props: {
        value: "id",
        label: "name"
      },
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        roleForm: false,
        assignOrginizationForm: false,
        assignMenuForm: false,
        AssignUserInfoExtForm: false
      },
      searchData: {
        name: "",
        loginName: "",
        mobile: "",
        no: "",
        phone: "",
        state: "0",
        organizationId: "0"
      },
      formData: {
        userList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        viewSelect: { id: "" }
      }
    };
  },
  created() {
    Promise.all([organizationApi.getByRootLead("0", 0)])
      .then(([organizationResponse, orgResponse]) => {
        this.organizationList = organizationResponse;
      })
      .catch(error => { });
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "assign-role": AssignRole,
    "assign-menu": AssignMenu,
    "assign-orginization": AssignOrginization,
    "assign-user-info-ext": AssignUserInfoExt
  },
  methods: {
    organizationSelect(value) {
      this.searchData.organizationId =
        value !== undefined && value.length > 0 ? value[value.length - 1] : "0";
      //  console.log(this.searchData.organizationId);
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
    showDialog(row, form) {
      this.childForm[form] = true;
      this.formData.viewSelect = row;
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

      Promise.all([userApi.deleteUser(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => { });
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
      var search =
        "(loginName:LIKE:{kw}:or;mobile:LIKE:{kw}:or;name:LIKE:{kw}:or;email:LIKE:{kw}:or;phone:LIKE:{kw}:or;)";
      if (this.searchData.state !== "0") {
        search += ";state:EQ:{state}";
      }
      Promise.all([
        userApi.findAllByOrgId(this.searchData.organizationId, {
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "name,asc",
          search: search.format({
            state: this.searchData.state,
            kw: this.formData.pagination.keyword
          })
        })
      ])
        .then(([response]) => {
          this.formData.userList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
        })
        .catch(error => { });
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
      this.onSearchButtonClick();
      done();
    },
    formateState(data) {
      var res = "";
      switch (data) {
        case 1:
          res = this.$t("user.state1");
          break;
        case 5:
          res = this.$t("user.state5");
          break;
        case 7:
          res = this.$t("user.state7");
          break;
        default:
          res = this.$t("user.state999");
          break;
      }
      return res;
    }
  }
};
</script>
