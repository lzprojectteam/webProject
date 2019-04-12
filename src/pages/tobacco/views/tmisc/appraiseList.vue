<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline
                 style="width:120%;">
          <el-form-item :label="$t('org.organizationName')">
            <el-select v-bind:placeholder="$t('base.pleaseInput')"
                       v-model="searchData.orgnization"
                       @keyup.enter.native="onSearchButtonClick">
              <el-option v-for="item in orgnizations"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
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
           style="min-width: 340px">
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
                :data="formData.appraiseList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="targetCode"
                         :label="this.$t('tobacco.tmisc.appraise.targetCode')" />
        <el-table-column prop="targetName"
                         :label="this.$t('tobacco.tmisc.appraise.targetName')" />
        <el-table-column prop="targetName"
                         :label="this.$t('org.organizationName')" />
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tmisc.appraise.annual')" />
        <el-table-column prop="rank"
                         :label="this.$t('tobacco.tmisc.appraise.rank')" />
        <el-table-column prop="title"
                         :label="this.$t('tobacco.tmisc.appraise.title')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmisc.appraise.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmisc.appraise.date')" />
        <el-table-column prop="summary"
                         :label="this.$t('tobacco.tmisc.appraise.summary')" />
        <el-table-column prop="content"
                         :label="this.$t('tobacco.tmisc.appraise.content')" />
        <el-table-column prop="total"
                         :label="this.$t('tobacco.tmisc.appraise.total')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmisc.appraise.desc')" />
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
const AddForm = () => import("./appraiseAdd.vue");
const EditForm = () => import("./appraiseEdit.vue");
import appraiseApi from "../../api/tmisc/api_appraise";
export default {
  data() {
    return {
      orgnizations: [
        {
          value: "1",
          label: "组织1"
        },
        {
          value: "2",
          label: "组织2"
        },
        {
          value: "",
          label: "全部"
        }
      ],
      expand: false,
      expandIcon: "el-icon-arrow-left",
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
        annual: "",
        serial: "",
        rank: "",
        title: "",
        author: "",
        date: "",
        targetId: "",
        targetCode: "",
        targetName: "",
        summary: "",
        content: "",
        total: "",
        desc: "",
        organization: ""
      },
      formData: {
        appraiseList: [],
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
    if (this.searchData.date) {
      console.info(this.searchData.date);
    } else {
      console.info("没有初始化好");
    }
  },
  mounted() {
    console.info("mounted");
    if (this.searchData.date) {
      console.info(this.searchData.date);
    } else {
      console.info("mount fail");
    }
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
  },
  methods: {
    dateChange() {
      if (this.searchData.date == null) {
        this.searchData.date = "1996-12-01 12:00:00";
      }
      console.info(this.searchData.date);
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

      Promise.all([appraiseApi.deleteAppraise(this.formData.selectRow.id)])
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
      console.info(this.searchData);
      Promise.all([
        appraiseApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "annual,serial,rank,title,author,date,targetCode,targetName,summary,content,total,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "annual:EQ:{annual};serial:EQ:{serial};rank:EQ:{rank};title:EQ:{title};author:EQ:{author};date:EQ:{date};targetCode:EQ:{targetCode};targetName:EQ:{targetName};summary:EQ:{summary};content:EQ:{content};total:EQ:{total};desc:EQ:{desc};".format(
            {
              annual: this.searchData.annual,
              serial: this.searchData.serial,
              rank: this.searchData.rank,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              targetId: this.searchData.targetId,
              targetCode: this.searchData.targetCode,
              targetName: this.searchData.targetName,
              summary: this.searchData.summary,
              content: this.searchData.content,
              total: this.searchData.total,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.appraiseList = response.content;
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