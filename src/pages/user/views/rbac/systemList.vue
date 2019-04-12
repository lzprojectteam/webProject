<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
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
          <el-button plain type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button plain type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button plain type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>

      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.systemList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('base.code')" />
        <el-table-column prop="name"
                         :label="this.$t('base.name')">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         :label="this.$t('system.title')" />
        <el-table-column prop="banner"
                         :label="this.$t('system.banner')" />

        <el-table-column prop="entry"
                         :label="this.$t('system.entry')"
                         show-overflow-tooltip />

        <el-table-column prop="status"
                         :label="this.$t('system.status')">
          <template slot-scope="scope">
            <el-tag size="medium">
              {{statusList[scope.row.status]}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="token"
                         :label="this.$t('system.token')"
                         width="60" />
        <el-table-column prop="visible"
                         :label="this.$t('base.visible')">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.visible"
                         disabled />
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         header-align="center"
                         width="140">
          <template slot-scope="scope">
            <el-button plain @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">
              {{$t('base.buttonView')}}
            </el-button>
            <el-button plain type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
            <el-button plain v-if="scope.row.status!==5"
                       @click="onChangeStatus(scope.row,true)"
                       type="text"
                       size="small">
              {{$t('base.buttonStart')}}
            </el-button>
            <el-button plain v-else
                       type="text"
                       size="small"
                       @click="onChangeStatus(scope.row,false)">
              {{$t('base.buttonStop')}}
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
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./systemAdd.vue");
const EditForm = () => import("./systemEdit.vue");

import systemApi from "../../api/apiSystem";

export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },
      searchData: {},
      formData: {
        systemList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      },
      statusList: { 1: "新建", 5: "启用", 9: "停用" }
    };
  },
  created() {},
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
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

      Promise.all([systemApi.deleteSystem(this.formData.selectRow.id)])
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
        systemApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          keyword: this.formData.pagination.keyword,
          sort: "code,asc",
          search: "banner:like:{keyword}:or;code:like:{keyword}:or;entry:like:{keyword}:or;icon:like:{keyword}:or;name:like:{keyword}:or;title:like:{keyword}:or;".format(
            { keyword: this.formData.pagination.keyword }
          )
        })
      ])
        .then(([response]) => {
          this.formData.systemList = response.content;
          this.formData.pagination.total =
            parseFloat(response.totalElements) === undefined
              ? parseFloat(response.totalElements)
              : parseFloat(response.totalElements);
        })
        .catch(error => {});
    },
    onChangeStatus(row, isStart) {
      if (isStart) {
        row.status = "5";
      } else {
        row.status = "9";
      }
      Promise.all([systemApi.updateSystem(row.id, row)])
        .then(([response]) => {
          this.$notify({
            message: this.$t("message.startOk"),
            type: "success"
          });

          this.onSearchButtonClick();
        })
        .catch(error => {
          this.$notify.error({
            title: this.$t("message.notifyError"),
            message: this.$t("message.startFailed")
          });
        });
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
    }
  }
};
</script>
