<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item label="条码">
            <el-input v-model="searchData.barcode"
                      clearable
                      placeholder="请输入"
                      @keyup.enter.native="onSearchButtonClick">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 270px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.inventoryList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <!-- <el-table-column prop="organizationName" :label="this.$t('org.organizationName')" width="100"
                          show-overflow-tooltip/>
 -->
        <el-table-column prop="inventoryEntity.annual"
                         :label="this.$t('tobacco.tstorage.inventory.annual')"
                         min-width="50"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.barcode"
                         :label="this.$t('tobacco.tstorage.inventory.barcode')"
                         width="200"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.number"
                         :label="this.$t('tobacco.tstorage.inventory.number')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.farmerName"
                         :label="this.$t('tobacco.tstorage.inventory.farmerName')"
                         min-width="180">
          <template slot-scope="scope">
            <el-popover :open-delay='300'
                        placement="right"
                        trigger="hover">
              <el-table :data="scope.row.inventoryEntity.detailList">
                <el-table-column width="100"
                                 property="farmerName"
                                 label="姓名"></el-table-column>
                <el-table-column width="100"
                                 property="weight"
                                 label="重量"></el-table-column>
              </el-table>
              <el-button slot="reference">{{scope.row.inventoryEntity.farmerName}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="inventoryEntity.year"
                         :label="this.$t('tobacco.tstorage.inventory.year')"
                         min-width="100"
                         show-overflow-tooltip />
        <!-- <el-table-column prop="printTimes" :label="this.$t('tobacco.tstorage.inventory.printTimes')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="inventoryEntity.statusName"
                         :label="this.$t('tobacco.tstorage.inventory.statusName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.varietyName"
                         :label="this.$t('tobacco.tstorage.inventory.varietyName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.rankName"
                         :label="this.$t('tobacco.tstorage.inventory.rankName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="inventoryEntity.gradeName"
                         :label="this.$t('tobacco.tstorage.inventory.gradeName')"
                         width="100"
                         show-overflow-tooltip
                         fixed="left">
          <!--<template slot-scope="scope">
            <el-tooltip content="查看图片" placement="right" :open-delay='300'>
              <el-button type="text" size="small" @click=getImgPath(scope.row.farmerName,scope.row.picture)
                         style="width: 100%;width: 100%;border: none;">
                {{scope.row.gradeName}}
              </el-button>
            </el-tooltip>
          </template>-->
        </el-table-column>
        <el-table-column prop="standard"
                         :label="this.$t('tobacco.tstorage.inventory.standard')"
                         min-width="80"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.inventoryEntity.standard"
                       disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="weight"
                         :label="this.$t('tobacco.tstorage.inventory.weight')"
                         fixed="left"
                         width="100">
          <template slot-scope="scope">
            <p v-text="scope.row.weight"
               v-if="scope.row.cantEdit"
               style="margin: 0 0 0 14px;"></p>
            <el-input v-model="scope.row.weight"
                      v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="inventoryEntity.control"
                         :label="this.$t('tobacco.tstorage.inventory.control')"
                         min-width="60"
                         show-overflow-tooltip />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row)"
                       v-if="scope.row.showEdit">
              {{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="saveButtonClick(scope.row,true)"
                       v-if="!scope.row.showEdit">{{ $t('base.buttonSave') }}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click='deleteButtonConfirm(scope.row)'>{{ $t('base.buttonDelete') }}
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
      <el-dialog :title="formData.title"
                 :visible.sync="formData.showImg"
                 fullscreen
                 append-to-body
                 custom-class="tobaccoImg">
        <img :src="formData.imgSrc"
             alt="图片走丢了..."
             class="showImg"
             @click="hiddeImg">
      </el-dialog>
    </template>
  </div>
</template>
<script>
const OrganizationForm = () => import("@/components/Organization");
const typeVarietySelect = () =>
  import("@/components/Tobacco/typeVarietySelect");
const statusSelect = () => import("../components/statusSelect");
const typeVarietyGradeSelect = () =>
  import("@/components/Tobacco/typeVarietyGradeSelect");
const path = require("path");

import inventoryApi from "../../api/tstorage/api_inventory";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      readonly: true, //重量能否编辑
      expand: false,
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        detailForm: false,
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
        organizationId: this.$store.state.user.organization.organizationId,
        annual: "",
        serial: "",
        barcode: "",
        number: "",
        title: "",
        author: "",
        date: "",
        countryId: "",
        countryName: "",
        year: "",
        typeId: "",
        typeName: "",
        statusId: "",
        statusName: "",
        varietyId: "",
        varietyName: "",
        rankId: "",
        rankName: "",
        gradeId: "",
        gradeCode: "",
        gradeName: "",
        standard: true,
        weight: "",
        picture: "",
        control: "",
        desc: ""
      },
      formData: {
        title: "",
        showImg: false,
        imgSrc: "",
        relationId: "",
        inventoryList: [],
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
    this.load();
  },
  components: {
    OrganizationForm,
    typeVarietySelect,
    statusSelect,
    typeVarietyGradeSelect
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
    load() {
      console.log(this.item);
      if (!this.item) {
        return;
      }
      this.formData.relationId = JSON.parse(JSON.stringify(this.item)).id;
      this.onSearchButtonClick();
    },
    //获取图片路径
    getImgPath(name, src) {
      console.log(src);
      let isProduction = process.env.NODE_ENV === "production"; //如果是生产环境，前缀要发生变化
      this.formData.photoList = [];
      if (src === undefined || src === "" || src === null) {
        return "http://bpic.588ku.com/element_origin_min_pic/18/06/10/217da78e9f80484b354afea9bb8a6538.jpg";
      }
      let pps = src;
      let root = "";
      root = path.join("/upload", pps);
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
      this.formData.title = name;
      this.formData.imgSrc = root;
      this.showImg();
    },
    showImg() {
      this.formData.showImg = true;
    },
    hiddeImg() {
      this.formData.showImg = false;
    },
    onExpandClick() {
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = "el-icon-arrow-down";
      } else {
        this.expandIcon = "el-icon-arrow-left";
      }
    },
    organizationOnchange(label, value, values) {
      this.searchData.organizationId = value;
      this.searchData.organizationCode = value;
      this.searchData.organizationName = label;
      this.searchData.organizationOrder = "0";
    },
    editButtonClick(selectRow, isEdit) {
      this.formData.inventoryList.forEach(item => {
        item.showEdit = true;
        item.cantEdit = true;
      });
      selectRow.showEdit = false;
      selectRow.cantEdit = false;
    },
    saveButtonClick(selectRow, isEdit) {
      if (selectRow.weight && isNaN(selectRow.weight)) {
        this.$message({
          message: "请正确填写重量",
          type: "error"
        });
        return;
      }
      Promise.all([
        inventoryApi.updateInventory2(selectRow.id, selectRow.weight)
      ])
        .then(([response]) => {
          this.$message({
            type: "success",
            message: "编辑成功"
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
          selectRow.showEdit = true;
          selectRow.cantEdit = true;
        })
        .catch(error => {
          selectRow.showEdit = true;
          selectRow.cantEdit = true;
          this.$message({
            type: "error",
            message: "编辑失败"
          });
        });
    },
    deleteButtonClick(selectRow) {
      Promise.all([inventoryApi.deleteInventory2(selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteButtonConfirm(selectRow) {
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
          this.deleteButtonClick(selectRow);
        })
        .catch(e => {
          console.log(e);
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
        inventoryApi.getInventoryNewListByRelationId({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          relationId: this.formData.relationId,
          gradeId: this.searchData.gradeId,
          varietyId: this.searchData.varietyId,
          barcode: this.searchData.barcode
        })
      ])
        .then(([response]) => {
          this.formData.pagination.total = parseFloat(response.totalElements);
          if (response.content.length !== 0) {
            let tableData = response.content;
            tableData.forEach(item => {
              item.showEdit = true;
              item.cantEdit = true;
            });
            this.formData.inventoryList = tableData;
          } else {
            this.formData.inventoryList = [];
          }
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {
          console.log(error);
        });
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
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
}

.demonstration {
  text-align: left;
  font-weight: bold;
}

.main {
  width: 500px;
  display: inline-block;
  margin-bottom: 40px;
}

.block .left {
  float: left;
  width: 325px;
}

.content {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.block .left img {
  display: inline-block;
  width: 100%;
  height: 200px;
  line-height: 200px;
  vertical-align: middle;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}

.block .right {
  float: left;
  background-color: white;
}

.block .el-carousel {
  border: 1px solid gray;
}

.block .right p {
  padding-left: 15px;
  line-height: 25px;
  font-weight: bold;
  text-align: left !important;
}

.showImg {
  width: 70%;
  cursor: -webkit-zoom-out;
  cursor: zoom-out;
}

.tobaccoImg .el-dialog__header {
  text-align: center;
}

.tobaccoImg .el-dialog__body {
  text-align: center;
}
</style>

