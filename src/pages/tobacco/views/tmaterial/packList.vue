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
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.packList"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                row-key="id"
                @expand-change="expandChange"
                :expand-row-keys="expandKeys">
        <el-table-column type="expand"
                         v-loading="loading">
          <template>
            <el-table :data="formData.packItemList"
                      style="margin-left: 3%;font-size: 12px;color: black;">
              <el-table-column type="index">
              </el-table-column>

              <el-table-column prop="pack.name"
                               :label="this.$t('tobacco.tmaterial.packItem.pack')" />
              <el-table-column prop="price.material.name"
                               :label="this.$t('tobacco.tmaterial.packItem.material')" />
              <el-table-column prop="price.materialUnit.measureName"
                               :label="this.$t('tobacco.tmaterial.packItem.materialUnit')" />
              <el-table-column prop="amount"
                               :label="this.$t('tobacco.tmaterial.packItem.amount')" />
              <el-table-column prop="money"
                               :label="this.$t('tobacco.tmaterial.packItem.money')" />
              <el-table-column prop="desc"
                               :label="this.$t('tobacco.tmaterial.packItem.desc')" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tmaterial.pack.serial')" />
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('tobacco.tmaterial.pack.organization')" />
        <el-table-column prop="code"
                         :label="this.$t('tobacco.tmaterial.pack.code')" />
        <el-table-column prop="name"
                         :label="this.$t('tobacco.tmaterial.pack.name')" />
        <el-table-column prop="content"
                         :label="this.$t('tobacco.tmaterial.pack.content')" />
        <el-table-column prop="money"
                         :label="this.$t('tobacco.tmaterial.pack.money')" />
        <el-table-column prop="total"
                         :label="this.$t('tobacco.tmaterial.pack.total')" />

        <el-table-column prop="tempBegin"
                         :label="this.$t('tobacco.tmaterial.pack.tempBegin')">
          <template slot-scope="scope">
            {{
            scope.row.tempBegin|parseDate('yyyy-mm-dd')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="tempEnd"
                         :label="this.$t('tobacco.tmaterial.pack.tempEnd')">
          <template slot-scope="scope">
            {{
            scope.row.tempEnd|parseDate('yyyy-mm-dd')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="visible"
                         :label="this.$t('tobacco.tmaterial.pack.visible')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible"
                       disabled>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmaterial.pack.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmaterial.pack.date')">
          <template slot-scope="scope">
            {{
            scope.row.date|parseDate('yyyy-mm-dd')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmaterial.pack.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="160">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="itemsManageButtonClick(scope.row,true)">{{$t('base.buttonItemsManage')}}</el-button>
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
      <el-dialog :title="$t('base.buttonItemsManage')"
                 :visible.sync="childForm.itemsForm"
                 top="10px"
                 :before-close="handleClose">
        <items-form :item.sync=formData.viewSelect
                    :isEdit=childForm.isEdit
                    :visible.sync="childForm.itemsForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./packAdd.vue");
const EditForm = () => import("./packEdit.vue");
const ItemsForm = () => import("./packItemList.vue");
import packApi from "../../api/tmaterial/apiPack";
import packItemApi from "../../api/tmaterial/apiPackItem";
import moment from "moment";
import { convertToObject } from "typescript";
export default {
  data() {
    return {
      expandKeys: [] /** 新增 **/,
      loading: true,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        itemsForm: false,
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
      searchData: {},
      formData: {
        packList: [],
        packItemList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        viewSelect: {}
      }
    };
  },
  created() {},
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    "items-form": ItemsForm
  },
  methods: {
    expandChange(row, expandedRows) {
      console.log(row);
      if (this.expandKeys.indexOf(row.id) >= 0) {
        //收起当前行
        this.expandKeys.shift();
        return;
      }
      let _this = this;
      //恢复默认值
      _this.loading = true;
      _this.formData.packItemList = [];
      //加载数据
      Promise.all([
        packItemApi.getAll({
          search: "pack.id:EQ:{packId};".format({
            packId: row.id
          })
        })
      ])
        .then(([response]) => {
          _this.formData.packItemList = response.content;
          _this.loading = false;
          _this.expandKeys.shift(); /** 新增 **/
          _this.expandKeys.push(row.id); /** 新增 **/
        })
        .catch(error => {});
      if (expandedRows.length > 1) {
        //只展开当前选项
        expandedRows.shift();
      }
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
    itemsManageButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.itemsForm = true;
      } else {
        this.childForm.itemsForm = true;
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

      Promise.all([packApi.softDelete(this.formData.selectRow.id)])
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
        packApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "serial,code,name,title,author,date,content,desc,:{keyword}".format(
            { keyword: this.formData.pagination.keyword }
          )
        })
      ])
        .then(([response]) => {
          this.formData.packList = response.content;
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
    }
  }
};
</script>