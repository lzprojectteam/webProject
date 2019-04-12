<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.common.annual')">
            <el-date-picker v-model="searchData.year"
                            type="year"
                            :clearable=false
                            value-format="yyyy"
                            style="width:100px"
                            :placeholder="$t('base.pleaseSelect')"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.organization')">
            <organization-form :root="userOrgId"
                               style="width:100%"
                               :code.sync="searchData.organizationId" />
          </el-form-item>
          <el-form-item :label="$t('xbasic.district.districtId')">
            <organization-form :root="userDistrictId"
                               style="width:100%"
                               :code.sync="searchData.districtId"
                               model="district" />
          </el-form-item>

        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 280px">
        <el-popover placement="bottom-start"
                    type='primary'
                    width="400"
                    trigger="click">
          <el-form label-position="top"
                   label-width="80px"
                   :model="searchData">
            <div>
              <el-form-item :label="$t('tobacco.tfarm.processData.date')">
                <el-date-picker v-model="searchData.date"
                                type="daterange"
                                align="right"
                                unlink-panels
                                value-format="yyyyMMdd"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="dateoptions"
                                style="width:100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.collectObject')">
                <el-input v-bind:placeholder="$t('tobacco.tfarm.processData.authorHint')"
                          v-model="searchData.farmerName"
                          clearable
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>

              <el-form-item :label="$t('tobacco.tfarm.processData.author')">
                <el-input v-bind:placeholder="$t('tobacco.tfarm.processData.authorHint')"
                          v-model="searchData.author"
                          clearable
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>

              <el-form-item :label="$t('tobacco.tfarm.processData.control')"
                            v-show="false">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.control"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
              <el-form-item :label="$t('base.keywords')">
                <el-input v-bind:placeholder="$t('base.ipKeywords')"
                          v-model="formData.pagination.keyword"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
            </div>
            <div style="text-align: right;">
              <el-button plain
                         @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
              <el-button plain
                         @click='onResetButtonClick'>{{ $t('base.buttonReset') }}</el-button>
            </div>
          </el-form>
          <el-button plain
                     type='primary'
                     slot="reference">{{ $t('base.buttonFilter') }}</el-button>
        </el-popover>
        <el-button type='primary'
                   style="margin-left:3px"
                   plain
                   @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
        <el-button type='primary'
                   v-show="false"
                   style="margin-left:3px"
                   plain
                   @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
        <el-button type='primary'
                   v-show="false"
                   style="margin-left:3px"
                   plain
                   @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.processDataList"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand"
                         label='更多'
                         v-if="false">
          <template slot-scope="props">
            <el-form label-position="left"
                     inline
                     class="table-expand">
              <el-form-item :label="$t('tobacco.tfarm.processData.time')">
                <span>{{ props.row.time|parseDate('HH:MM:ss') }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.farmerName')">
                <span>{{ props.row.farmerName }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.relatedName')">
                <span>{{ props.row.relatedName }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.desc')">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.amount')">
                <span>{{ props.row.amount }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.area')">
                <span>{{ props.row.area }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.rate')">
                <span>{{ props.row.rate }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.processData.score')">
                <span>{{ props.row.score }}</span>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>

        <el-table-column prop="title"
                         :label="this.$t('tobacco.tfarm.processData.title')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tfarm.processData.author')" />
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tfarm.processData.collectObject')" />
        <el-table-column prop="date"
                         width="100"
                         :label="this.$t('tobacco.tfarm.processData.date')">
          <template slot-scope="scope">
            {{scope.row.date|parseDate('yyyy-mm-dd')}}
          </template>
        </el-table-column>

        <el-table-column v-for=" item in this.formData.dynamicColumns"
                         :key="item.id"
                         :label="item.label">
          <template slot-scope="scope">

            <el-tooltip v-if="item.dataType==='image'"
                        class="item"
                        effect="dark"
                        content="查看图片"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-picture"
                         plain
                         @click="onShowPhotoClick(scope.row.path,scope.row.columns[item.attrId] )"></el-button>
            </el-tooltip>
            <el-tooltip v-else-if="item.dataType==='gps'"
                        class="item"
                        effect="dark"
                        content="地图"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-location"
                         plain
                         @click="onShowMapClick(scope.row)"></el-button>
            </el-tooltip>
            <span v-else-if="item.dataType==='date'||item.dataType==='datetime'||item.dataType==='time'">{{ scope.row.columns[item.attrId]|parseDate(item.pattern===''?'yyyy-mm-dd':item.pattern) }}</span>
            <span v-else>{{ scope.row.columns[item.attrId] }}</span>

          </template>
        </el-table-column>
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tfarm.processData.control')">
          <template slot-scope="scope">
            {{formatStatus(scope.row.control)}}
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100"
                         v-if="false">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       plain
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       plain
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
      <el-dialog :title="$t('tobacco.common.btnMap')"
                 :visible.sync="childForm.mapForm"
                 top="10px">
        <baidu-map class="map"
                   :scroll-wheel-zoom="true"
                   :center="map.center"
                   :zoom="map.zoom"
                   @moving="syncCenterAndZoom"
                   @moveend="syncCenterAndZoom"
                   @zoomend="syncCenterAndZoom">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                          :showAddressBar="true"
                          :autoLocation="true"></bm-geolocation>
          <bm-marker :position="map.center"
                     animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="map.content"
                      :labelStyle="{color: 'red', fontSize : '24px'}"
                      :offset="{width: -35, height: 30}" />
          </bm-marker>
        </baidu-map>
      </el-dialog>
      <el-dialog :visible.sync="childForm.imageForm"
                 top="10px"
                 width="600px">
        <cas-image :photoList="formData.photoList" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./processDataAdd.vue");
const EditForm = () => import("./processDataEdit.vue");
import processDataApi from "../../api/tfarm/apiProcessData";
import processDataItemApi from "../../api/tfarm/apiProcessDataItem";
import processAttrApi from "../../api/tfarm/apiProcessAttr";
const path = require("path");
export default {
  data() {
    return {
      map: {
        center: {
          lng: 102.2012757455,
          lat: 27.5935459576
        },
        content: "采集点",
        zoom: 15
      },
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        mapForm: false,
        imageForm: false
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
        year: this.$store.state.system.annual.toString(),
        organizationId: "",
        districtId: "",
        date: [],
        author: "",
        farmerName: "",
        relatedName: "",
        amount: 0,
        area: 0,
        rate: 0,
        score: 0,
        control: 0,
        designSchemeCode: "",
        processCode: ""
      },
      formData: {
        processDataList: [],
        dynamicColumns: [],
        photoList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: [],
        attrrMap: []
      }
    };
  },
  created() {
    this.searchData.organizationId = this.userOrgId;
    console.log(this.$route.query);
    this.onLoad();
    //根据市一级来查询对应的方案信息
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm: () => import("@/components/Organization"),
    BaiduMap: () => import("vue-baidu-map/components/map/Map.vue"),
    "cas-image": () => import("../../components/carouselImage")
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        this.searchData.orgId = undefined;
        return undefined;
      } else {
        this.searchData.orgId = this.$store.state.user.organization.organizationId;
        return this.$store.state.user.organization.organizationId;
      }
    },
    userDistrictId() {
      if (this.$store.state.user.detail.districtId === undefined) {
        return "0";
      } else {
        return this.$store.state.user.detail.districtId;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.meta.file !== undefined &&
        to.meta.file.indexOf("processDataList") !== -1
      ) {
        this.onLoad();
      }
    }
  },
  methods: {
    onLoad() {
      //如果不相同，保存d原来的数值

      this.searchData.designSchemeCode = this.$route.query.designScheme;
      this.searchData.processCode = this.$route.query.process;

      let item = this.getColumnsList();
      this.formData.processDataList = item ? item.data : [];
    },
    onShowPhotoClick(relativePath, photos) {
      let isProduction = process.env.NODE_ENV === "production";
      this.formData.photoList = [];
      if (photos === undefined || photos === "" || photos === null) {
        this.$message({
          type: "info",
          message: "没有可用照片"
        });
        return;
      }
      let pps = photos.split(",");
      if (pps.length > 0) {
        let pts = [];
        for (var item of pps) {
          let root = "";
          root = path.join("/upload", relativePath);
          root = path.join(root, item);
          let rootPath = process.env.VUE_APP_API_URL;
          if (isProduction) {
            rootPath = "";
          }
          root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
          pts.push(root);
        }
        this.formData.photoList = pts;
        this.childForm.imageForm = true;
      }
    },
    onShowMapClick(row) {
      if (row.gps.longitude === row.gps.latitude && row.gps.longitude === 0) {
        this.$notify({
          title: this.$t("base.warn"),
          message: "未获取到" + row.title + "地理信息",
          duration: 1000,
          type: "warning",
          position: "bottom-right"
        });
      } else {
        this.map.center.lng = row.gps.longitude;
        this.map.center.lat = row.gps.latitude;
        this.map.centent = row.title;
        this.childForm.mapForm = true;
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

      Promise.all([processDataApi.softDelete(this.formData.selectRow.id)])
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
    beforeSearch() {
      if (
        this.searchData.organizationId === undefined ||
        this.searchData.organizationId === null ||
        this.searchData.organizationId === ""
      ) {
        this.$notify({
          title: this.$t("base.warn"),
          message: "未获取到组织单位信息",
          duration: 1000,
          type: "warning",
          position: "bottom-right"
        });
        return;
      }
      //设置组织单位
      let search = "organization.organizationId:like:{orgid}".format({
        orgid: this.searchData.organizationId
      });
      //设置年度
      search += ";year:eq:" + this.searchData.year;
      //设置方案编码
      search += ";processCode:eq:" + this.searchData.processCode;
      //设置流程编码
      search += ";designSchemeCode:eq:" + this.searchData.designSchemeCode;
      //设置行政单位
      if (
        this.searchData.districtId !== undefined &&
        this.searchData.districtId !== null &&
        this.searchData.districtId !== "" &&
        this.userDistrictId !== this.searchData.districtId
      ) {
        search += ";organization.districtId:like:" + this.searchData.districtId;
      }
      if (
        this.searchData.date !== undefined &&
        this.searchData.date !== null &&
        this.searchData.date.length === 2
      ) {
        search +=
          ";date:BETWEEN:" +
          this.searchData.date[0] +
          "," +
          this.searchData.date[1];
      }
      if (
        this.searchData.author !== undefined &&
        this.searchData.author !== null &&
        this.searchData.author !== ""
      ) {
        search += ";author:like:" + this.searchData.author;
      }
      return search;
    },
    onSearchButtonClick() {
      let search = this.beforeSearch();
      Promise.all([
        processDataApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "title,author,countryName,farmerNumber,farmerName,relatedNumber,relatedName:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          //  this.formData.processDataList = response.content;
          let total = parseFloat(response.totalElements);
          let orginProcessData = response.content;
          let that = this;
          let item = this.formData.attrrMap.find(it => {
            return (
              it.year === that.searchData.year &&
              it.designSchemeCode === that.$route.query.designScheme &&
              it.processCode === that.$route.query.process
            );
          });
          //如果动态列没有请求过，请求一次
          if (item === undefined && orginProcessData.length > 0) {
            item = this.onLoadAttr(orginProcessData[0].processId);
          }
          orginProcessData.forEach(item => {
            let columns = [];
            item.dataItemEntityList.forEach(it => {
              switch (it.dataType) {
                case "string":
                  columns[it.attrId] = it.display ? it.display : it.valueText;
                  break;
                case "int":
                  columns[it.attrId] = it.valueInt;
                  break;
                case "double":
                  columns[it.attrId] = it.valueDouble.toFixed(2);
                  break;
                case "date":
                  columns[it.attrId] = it.valueDate;
                  break;
                case "time":
                  columns[it.attrId] = it.valueDate;
                  break;
                case "datetime":
                  columns[it.attrId] = it.valueDate;
                  break;
                case "boolean":
                  columns[it.attrId] = it.valueBool ? "是" : "否";
                  break;
                case "image":
                  columns[it.attrId] = it.valueText;
                  break;
                case "gps":
                  columns[it.attrId] = it.valueText;
                  break;
                case "enum":
                  columns[it.attrId] = it.display ? it.display : it.valueText;
                  break;
              }
            });
            item.columns = columns;
          });
          this.formData.processDataList = orginProcessData;
          if (item !== undefined) item.data = orginProcessData;
          this.formData.pagination.total = total;
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
    },
    async onLoadAttr(processId) {
      let attrList = await processAttrApi.getByProcessId(processId);
      attrList = attrList.sort(function(a, b) {
        return a.position - b.position;
      });
      let item = {
        year: this.searchData.year,
        attrList: attrList,
        designSchemeCode: this.$route.query.designScheme,
        processCode: this.$route.query.process
      };
      this.formData.attrrMap.push(item);
      this.formData.dynamicColumns = attrList.filter(t => {
        return t.classify !== "SC_PD01";
      });
      return item;
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
    },
    onResetButtonClick() {},
    getColumnsList() {
      let that = this;
      let item = this.formData.attrrMap.find(it => {
        return (
          it.year === that.searchData.year &&
          it.designSchemeCode === that.$route.query.designScheme &&
          it.processCode === that.$route.query.process
        );
      });
      if (item === undefined) {
        this.formData.dynamicColumns = [];
      } else {
        this.formData.dynamicColumns = item.attrList.filter(t => {
          return t.classify !== "SC_PD01";
        });
      }
      return item;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.map.center.lng = lng;
      this.map.center.lat = lat;
      this.map.zoom = e.target.getZoom();
      console.log(this.map.center.lng, this.map.center.lat);
    },
    formatStatus(status) {
      switch (status) {
        case 1:
          return "未提交";

        case 5:
          return "已提交";

        default:
          return "其它";
      }
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
.map {
  width: 100%;
  height: 400px;
}
</style>
