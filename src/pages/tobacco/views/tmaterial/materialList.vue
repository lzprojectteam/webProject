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
                     plain
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     plain
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     plain
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.materialList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tmaterial.material.serial')" />
        <el-table-column prop="category"
                         :label="this.$t('tobacco.tmaterial.material.category')">
          <template slot-scope="scope">
            {{
            scope.row.category === null || scope.row.category === undefined ? "" :scope.row.category.name
            }}
          </template>
        </el-table-column>
        <el-table-column prop="code"
                         :label="this.$t('tobacco.tmaterial.material.code')" />
        <el-table-column prop="name"
                         :label="this.$t('tobacco.tmaterial.material.name')" />
        <el-table-column prop="title"
                         :label="this.$t('tobacco.tmaterial.material.title')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmaterial.material.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmaterial.material.date')">
          <template slot-scope="scope">
            {{
            scope.row.date|parseDate('yyyy-mm-dd')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="manufacturer"
                         :label="this.$t('tobacco.tmaterial.material.manufacturer')" />
        <el-table-column prop="measure.name"
                         :label="this.$t('tobacco.tmaterial.material.measure')">
          <template slot-scope="scope">
            {{
            scope.row.measure === null || scope.row.measure === undefined ? "" :scope.row.measure.name
            }}
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('tobacco.tmaterial.material.visible')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.visible"
                       disabled>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmaterial.material.desc')" />
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
const AddForm = () => import("./materialAdd.vue");
const EditForm = () => import("./materialEdit.vue");
import materialApi from "../../api/tmaterial/apiMaterial";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
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
        serial: "",
        barcode: "",
        category: "",
        code: "",
        name: "",
        alphabet: "",
        title: "",
        author: "",
        date: "",
        brand: "",
        manufacturer: "",
        measureId: "",
        measureName: "",
        period: 0,
        picture: "",
        visible: true,
        desc: ""
      },
      formData: {
        materialList: [],
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

      Promise.all([materialApi.softDelete(this.formData.selectRow.id)])
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
        materialApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "code",
          contains: "serial,barcode,category,code,name,alphabet,title,author,brand,manufacturer,measure.name,period,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          )
        })
      ])
        .then(([response]) => {
          this.formData.materialList = response.content;
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