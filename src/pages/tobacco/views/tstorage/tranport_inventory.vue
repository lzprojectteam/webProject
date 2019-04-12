<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
            <type-variety-grade-select :varietyName.sync="searchData.varietyName"
                                       :varietyId.sync="searchData.varietyId"
                                       :typeId.sync="searchData.typeId"
                                       :typeName.sync="searchData.typeName"
                                       :gradeId.sync="searchData.gradeId"
                                       :gradeName.sync="searchData.gradeName"
                                       :gradeCode.sync="searchData.gradeCode"
                                       style="width:100%;" />
          </el-form-item>
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
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tstorage.inventory.annual')"
                         min-width="50"
                         show-overflow-tooltip />
        <el-table-column prop="barcode"
                         :label="this.$t('tobacco.tstorage.inventory.barcode')"
                         width="150"
                         show-overflow-tooltip />
        <el-table-column prop="number"
                         :label="this.$t('tobacco.tstorage.inventory.number')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tstorage.inventory.farmerName')"
                         min-width="180">
          <template slot-scope="scope">
            <el-popover :open-delay='300'
                        placement="right"
                        trigger="hover">
              <el-table :data="scope.row.detailList">
                <el-table-column width="100"
                                 property="farmerName"
                                 label="姓名"></el-table-column>
                <el-table-column width="100"
                                 property="weight"
                                 label="重量"></el-table-column>
              </el-table>
              <el-button slot="reference"
                         style="border: none">{{scope.row.farmerName}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="year"
                         :label="this.$t('tobacco.tstorage.inventory.year')"
                         min-width="100"
                         show-overflow-tooltip />
        <!-- <el-table-column prop="printTimes" :label="this.$t('tobacco.tstorage.inventory.printTimes')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="statusName"
                         :label="this.$t('tobacco.tstorage.inventory.statusName')"
                         width="70"
                         show-overflow-tooltip />
        <el-table-column prop="varietyName"
                         :label="this.$t('tobacco.tstorage.inventory.varietyName')"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="rankName"
                         :label="this.$t('tobacco.tstorage.inventory.rankName')"
                         width="70"
                         show-overflow-tooltip />
        <el-table-column prop="gradeName"
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
            <el-switch v-model="scope.row.standard"
                       disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="weight"
                         :label="this.$t('tobacco.tstorage.inventory.weight')"
                         fixed="left" />
        <!--<el-table-column prop="picture" :label="this.$t('tobacco.tstorage.inventory.picture')" width="100"-->
        <!--show-overflow-tooltip/>-->
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tstorage.inventory.control')"
                         min-width="60"
                         show-overflow-tooltip />
        <!--<el-table-column prop="desc" :label="this.$t('tobacco.tstorage.inventory.desc')" width="100"
                         show-overflow-tooltip/>-->
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
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      Promise.all([
        inventoryApi.getInventoryListByRelationId({
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
            this.formData.inventoryList = response.content;
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

