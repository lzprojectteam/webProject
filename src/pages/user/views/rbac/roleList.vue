<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline
                 :show-message=false>
          <el-form-item :label="$t('base.keywords')"
                        :inline-message="true">
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
      <el-table border
                highlight-current-row
                @current-change="handleCurrentChange"
                :data="formData.roleList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('base.code')" />
        <el-table-column prop="name"
                         :label="this.$t('base.name')"
                         show-overflow-tooltip />
        <el-table-column prop="title"
                         :label="this.$t('role.title')"
                         show-overflow-tooltip />
        <el-table-column :label="this.$t('role.parent')">
          <template slot-scope="scope">
            <el-tag size="medium">{{formateAncestryToParent(scope.row.ancestry)}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="ancestry"
                         :label="this.$t('role.ancestry')">
          <template slot-scope="scope">
            <el-tag size="medium">{{formateAncestry(scope.row.ancestry)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark"
                         :label="this.$t('base.remark')" />
        <el-table-column :label="$t('base.visible')"
                         width="60">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.visible"
                         disabled />
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="140px">
          <template slot-scope="scope">

            <el-button plain
                       @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">
              {{$t('base.buttonView')}}
            </el-button>
            <el-button plain
                       type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
            <el-button plain
                       type="text"
                       size="small"
                       @click="assignButtonClick(scope.row)">
              {{$t('role.assignMenu')}}
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
      <el-dialog :title="$t('role.assignMenu')"
                 :visible.sync="childForm.assignForm"
                 top="10px">
        <assign-menu :roleId=formData.roleId
                     roleType="ROLE" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./roleAdd.vue");
const EditForm = () => import("./roleEdit.vue");

import AssignMenu from "./assignMenu.vue";
import roleApi from "../../api/apiRole";

export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        assignForm: false
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
        code: "",
        name: "",
        title: ""
      },
      formData: {
        roleList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        viewSelect: null,
        roleId: ""
      }
    };
  },
  created() {},
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "assign-menu": AssignMenu
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
    assignButtonClick(row) {
      this.formData.roleId = row.id;
      this.childForm.assignForm = true;
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

      Promise.all([roleApi.deleteRole(this.formData.selectRow.id)])
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
      Promise.all([
        roleApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          keyword: this.formData.pagination.keyword,
          search: "code:like:{keyword}:or;name:like:{keyword}:or;title:like:{keyword}".format(
            { keyword: this.formData.pagination.keyword }
          )
        })
      ])
        .then(([response]) => {
          this.formData.roleList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
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
      this.onSearchButtonClick();
      done();
    },
    formateAncestry(data) {
      if (data === null || data === undefined || data === "") {
        return "无";
      }

      var jsoData = JSON.parse(data);
      var title = "";
      for (var value of jsoData) {
        title += value.name + "/";
        //console.log(value.title);
      }
      return title.substr(0, title.length - 1);
    },
    formateAncestryToParent(data) {
      if (data === null || data === undefined || data === "") {
        return "无";
      }
      var jsoData = JSON.parse(data);
      return jsoData[jsoData.length - 1].name;
    }
  }
};
</script>
