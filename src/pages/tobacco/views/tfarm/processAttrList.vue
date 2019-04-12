<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tfarm.processAttr.classify')">
            <el-select v-model="searchData.classify "
                       style="width: 100%">
              <el-option v-for="item in formData.classifyList"
                         :value="item.id"
                         :label="item.name"
                         :key="item.id">
              </el-option>
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
                :data="formData.processAttrList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
                     inline
                     class="table-expand">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.min')">
                <span>{{ props.row.min }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.max')">
                <span>{{ props.row.max }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.point')">
                <span>{{ props.row.point }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.formula')">
                <span>{{ props.row.formula }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.weight')">
                <span>{{ props.row.weight }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.pattern')">
                <span>{{ props.row.pattern }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.position')">
                <span>{{ props.row.position }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processAttr.show')">
                <span>{{ props.row.show }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="code"
                         :label="this.$t('tobacco.tfarm.processAttr.code')" />
        <el-table-column prop="label"
                         :label="this.$t('tobacco.tfarm.processAttr.label')" />
        <el-table-column prop="hintInput"
                         :label="this.$t('tobacco.tfarm.processAttr.hintInput')" />
        <el-table-column prop="hintPoint"
                         :label="this.$t('tobacco.tfarm.processAttr.hintPoint')" />
        <el-table-column prop="unit"
                         :label="this.$t('tobacco.tfarm.processAttr.unit')" />
        <el-table-column prop="type"
                         :label="this.$t('tobacco.tfarm.processAttr.type')" />
        <el-table-column prop="require"
                         :label="this.$t('tobacco.tfarm.processAttr.require')">
          <template slot-scope="scope">
            {{scope.row.require?"是":"否"}}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">

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
                 :modal-append-to-body=false
                 :modal=false
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form :item.sync=formData.viewSelect
                  :isEdit=childForm.isEdit
                  :visible.sync="childForm.editForm" />
      </el-dialog>

    </template>
  </div>
</template>
<script>
const AddForm = () => import("./processAttrAdd.vue");
import processAttrApi from "../../api/tfarm/apiProcessAttr";
import categoryApi from "../../api/basic/api_category";
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
        processId: "",
        attrId: 0,
        code: "",
        label: "",
        hintInput: "",
        hintPoint: "",
        unit: "",
        type: 0,
        require: true,
        min: 0,
        max: 0,
        point: 0,
        formula: "",
        weight: 0,
        pattern: "",
        position: 0,
        show: true,
        desc: ""
      },
      formData: {
        classifyList: [],
        processAttrList: [],
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
    Promise.all([categoryApi.getAll({ search: "lead:EQ:SC_PD", sort: "id" })])
      .then(([response]) => {
        this.formData.classifyList = response.content;
        if (this.formData.classifyList.length > 0) {
          this.searchData.classify = this.formData.classifyList[0].id;
        }
      })
      .catch(error => {});
  },
  components: {
    "add-form": AddForm
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

      Promise.all([
        processAttrApi.deleteProcessAttr(this.formData.selectRow.id)
      ])
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
        processAttrApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "processId,attrId,code,label,hintInput,hintPoint,unit,type,require,min,max,point,formula,weight,pattern,position,show,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: ""
        })
      ])
        .then(([response]) => {
          this.formData.processAttrList = response.content;
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
<style scoped>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33.33%;
}
</style>
