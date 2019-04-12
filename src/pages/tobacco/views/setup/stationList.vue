<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId"
                               @onchange="organizationOnchange"
                               v-model="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.control')">
            <el-select v-model="searchData.control"
                       :placeholder="$t('base.pleaseSelect')"
                       style="width: 100%"
                       clearable>
              <el-option v-for="(item,index) in formData.controlList"
                         :key="index"
                         :label="item"
                         :value="index">
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
          <el-button plain
                     type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button plain
                     type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button plain
                     type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.stationList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.setup.station.serial')"
                         width="130"
                         show-overflow-tooltip />
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('tobacco.setup.station.stationName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.setup.station.author')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.setup.station.date')">
          <template slot-scope="scope">
            {{ formatDate(scope.row.date)}}
          </template>
        </el-table-column>

        <el-table-column prop="alias"
                         :label="this.$t('tobacco.setup.station.alias')"
                         width="100"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="host"
                         :label="this.$t('tobacco.setup.station.host')"
                         width="150"
                         show-overflow-tooltip />
        <el-table-column prop="port"
                         :label="this.$t('tobacco.setup.station.port')" />
        <!--<el-table-column prop="heartbeat" :label="this.$t('tobacco.setup.station.heartbeat')" min-width="100"
                         show-overflow-tooltip/>-->
        <el-table-column prop="control"
                         :label="this.$t('tobacco.setup.station.control')">
          <template slot-scope="scope">
            {{ formatControl(scope.row.control)}}
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.setup.station.desc')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       plain>{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)"
                       plain>{{$t('base.buttonEdit')}}
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
                   :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick" />
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
const AddForm = () => import("./stationAdd.vue");
const EditForm = () => import("./stationEdit.vue");
const OrganizationForm = () => import("@/components/Organization");

import stationApi from "../../api/setup/api_station";
import dateFormat from "dateformat";

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
        serial: "",
        author: "",
        date: "",
        alias: "",
        host: "",
        port: "",
        heartbeat: "",
        control: "",
        desc: "",
        organizationId: ""
      },
      formData: {
        stationList: [],
        controlList: { 1: "新增", 3: "质疑", 5: "核准", 7: "作废" },
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
    if (!(this.userOrgId === undefined)) {
      this.searchData.organizationId = this.userOrgId;
    }
    this.onSearchButtonClick();
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm
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

  methods: {
    organizationOnchange(label, value, values) {
      this.searchData.organizationId = value;
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

      Promise.all([stationApi.deleteStation(this.formData.selectRow.id)])
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
        stationApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "serial,ASC",
          contains: "title,host,port,desc,alias,:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: "control:EQ:{control};organization.organizationId:rlike:{organizationId};".format(
            {
              control: this.searchData.control,
              organizationId: this.searchData.organizationId
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.stationList = response.content;
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
    formatDate(date) {
      if (date === "" || date === undefined || date === null) {
        return "未设置";
      }
      return dateFormat(date, "yyyy-mm-dd");
    },
    //格式化状态显示
    formatControl(control) {
      switch (control) {
        case 1:
          return "新增";
        case 3:
          return "质疑";
        case 5:
          return "核准";
        case 7:
          return "作废";
        default:
          return "未设置";
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

