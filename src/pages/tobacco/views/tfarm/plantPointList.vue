<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>

          <el-form-item :label="$t('tobacco.tfarm.plantPoint.control')">
            <el-select v-model="searchData.control">
              <el-option value='-'
                         key='-'
                         :label="$t('base.all')">{{ $t('base.all') }} </el-option>
              <el-option v-for="item in formData.controlList"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
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
           style="min-width: 280px">
        <el-popover placement="bottom-start"
                    type='primary'
                    width="600"
                    trigger="click">
          <el-form label-position="top"
                   label-width="80px"
                   :model="searchData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('tobacco.common.organization')">
                  <organization-form :root="userOrgId"
                                     style="width:100%"
                                     :code.sync="searchData.organizationId" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('xbasic.district.districtId')">
                  <organization-form :root="userDistrictId"
                                     style="width:100%"
                                     :code.sync="searchData.districtId"
                                     model="district" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.date')">
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
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.area')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.areaGT')"
                                       suffix-icon="el-icon-edit"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       v-model="searchData.areaGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.areaLE')"
                                       v-model="searchData.areaLE"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.shed')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.shedGT')"
                                       suffix-icon="el-icon-edit"
                                       v-model="searchData.shedGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.shedLE')"
                                       v-model="searchData.shedLE"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.box')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.boxGT')"
                                       suffix-icon="el-icon-edit"
                                       v-model="searchData.boxGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.boxLE')"
                                       v-model="searchData.boxLE"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.plant')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.plantGT')"
                                       suffix-icon="el-icon-edit"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       v-model="searchData.plantGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.plantLE')"
                                       v-model="searchData.plantLE"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.grown')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.grownGT')"
                                       suffix-icon="el-icon-edit"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       :max="1"
                                       v-model="searchData.grownGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.grownLE')"
                                       v-model="searchData.grownLE"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       :max="1"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item :label="$t('tobacco.tfarm.plantPoint.sprout')">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.sproutGT')"
                                       suffix-icon="el-icon-edit"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       :max="1"
                                       v-model="searchData.sproutGT">
                      </el-input-number>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number :placeholder="$t('tobacco.tfarm.plantPoint.sproutLE')"
                                       v-model="searchData.sproutLE"
                                       :precision="2"
                                       :step="0.1"
                                       :min="0"
                                       :max="1"
                                       suffix-icon="el-icon-edit">
                      </el-input-number>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span=24>
                <div style="float:right;margin-top: 10px;">
                  <el-button @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
                  <el-button @click='onResetButtonClick'>{{ $t('base.buttonReset') }}</el-button>
                </div>
              </el-col>
            </el-row>

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
                   style="margin-left:3px"
                   plain
                   @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
        <el-button type='danger'
                   style="margin-left:3px"
                   plain
                   @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.plantPointList"
                style="width: 100%"
                :row-class-name="tableRowClassName">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"
                     inline
                     class="table-expand">
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.serial')">
                <span>{{ props.row.serial }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.number')">
                <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.author')">
                <span>{{ props.row.author }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.date')">
                <span>{{ props.row.date|parseDate('yyyy-mm-dd') }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.manager')">
                <span>{{ props.row.manager }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.contact')">
                <span>{{ props.row.contact }}</span>
              </el-form-item>
              <el-form-item :label="$t('tobacco.tfarm.plantPoint.desc')">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="title"
                         :label="this.$t('tobacco.tfarm.plantPoint.title')" />

        <el-table-column prop="area"
                         :label="this.$t('tobacco.tfarm.plantPoint.area')" />
        <el-table-column prop="shed"
                         :label="this.$t('tobacco.tfarm.plantPoint.shed')" />
        <el-table-column prop="box"
                         :label="this.$t('tobacco.tfarm.plantPoint.box')" />
        <el-table-column prop="plant"
                         :label="this.$t('tobacco.tfarm.plantPoint.plant')" />
        <el-table-column prop="grown"
                         :label="this.$t('tobacco.tfarm.plantPoint.grown')" />
        <el-table-column prop="sprout"
                         :label="this.$t('tobacco.tfarm.plantPoint.sprout')" />
        <el-table-column prop="score"
                         :label="this.$t('tobacco.tfarm.plantPoint.score')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tfarm.plantPoint.control')" />

        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="onShowMapClick(scope.row)"
                       type="text"
                       size="small">{{$t('tobacco.common.btnMap')}}</el-button>
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
      <el-dialog :title="$t('tobacco.common.btnMap')"
                 :visible.sync="childForm.mapForm"
                 top="10px"
                 :before-close="handleClose">
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

    </template>
  </div>
</template>
<script>
const AddForm = () => import("./plantPointAdd.vue");
const EditForm = () => import("./plantPointEdit.vue");
import plantPointApi from "../../api/tfarm/apiPlantPoint";
import constant from "../../lang/zh/constant";
export default {
  data() {
    return {
      map: {
        center: {
          lng: 102.2012757455,
          lat: 27.5935459576
        },
        content: "育苗点",
        zoom: 15
      },
      childForm: {
        addForm: false,
        editForm: false,
        mapForm: false,
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
        date: [],
        areaLE: "",
        areaGT: "",
        shedGT: "",
        shedLE: "",
        boxGT: "",
        boxLE: "",
        plantGT: "",
        plantLE: "",
        grownGT: "",
        grownLE: "",
        sproutGT: "",
        sproutLE: "",
        control: "-",
        districtId: "",
        organizationId: ""
      },
      formData: {
        plantPointList: [],
        controlList: [],
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
    this.searchData.organizationId = this.userOrgId;
    this.formData.controlList = constant.controlList;
  },
  filters: {
    controlFilter: function(key) {
      let it = constant.controlList.find(item => {
        return item.key === key;
      });
      return it === undefined ? "" : it.value;
    }
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
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm: () => import("@/components/Organization"),
    BaiduMap: () => import("vue-baidu-map/components/map/Map.vue")
  },
  methods: {
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
        this.childForm.mapForm = true;
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

      Promise.all([plantPointApi.softDelete(this.formData.selectRow.id)])
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
      let search = "organization.organizationId:like:{orgid}".format({
        orgid: this.searchData.organizationId
      });
      if (this.searchData.control !== "-") {
        search += ";control:eq:" + this.searchData.control;
      }

      if (
        this.searchData.districtId !== undefined &&
        this.searchData.districtId !== null &&
        this.searchData.districtId !== ""
      ) {
        search += ";organization.districtId:like:" + this.searchData.districtId;
      }
      if (
        this.searchData.date !== undefined &&
        this.searchData.date.length === 2
      ) {
        search +=
          ";date:BETWEEN:" +
          this.searchData.date[0] +
          "," +
          this.searchData.date[1];
      }
      if (
        this.validNumberSearch(this.searchData.areaGT, this.searchData.areaLE)
      ) {
        search +=
          ";area:BETWEEN:" +
          this.searchData.areaGT +
          "," +
          this.searchData.areaLE;
      }
      if (
        this.validNumberSearch(this.searchData.shedGT, this.searchData.shedLE)
      ) {
        search +=
          ";shed:BETWEEN:" +
          this.searchData.shedGT +
          "," +
          this.searchData.shedLE;
      }
      if (
        this.validNumberSearch(this.searchData.boxGT, this.searchData.boxLE)
      ) {
        search +=
          ";box:BETWEEN:" + this.searchData.boxGT + "," + this.searchData.boxLE;
      }
      if (
        this.validNumberSearch(this.searchData.plantGT, this.searchData.plantLE)
      ) {
        search +=
          ";plant:BETWEEN:" +
          this.searchData.plantGT +
          "," +
          this.searchData.plantLE;
      }
      if (
        this.validNumberSearch(this.searchData.grownGT, this.searchData.grownLE)
      ) {
        search +=
          ";grown:BETWEEN:" +
          this.searchData.grownGT +
          "," +
          this.searchData.grownLE;
      }

      if (
        this.validNumberSearch(
          this.searchData.sproutGT,
          this.searchData.sproutLE
        )
      ) {
        search +=
          ";sprout:BETWEEN:" +
          this.searchData.sproutGT +
          "," +
          this.searchData.sproutLE;
      }

      Promise.all([
        plantPointApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "annual,serial,number,title,author,date,countryId,countryName,manager,contact,control,desc:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.plantPointList = response.content;
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
    },
    onResetButtonClick() {
      this.searchData.districtId = "";
      this.searchData.date = [];
      this.searchData.areaLE = "";
      this.searchData.areaGT = "";
      this.searchData.shedGT = "";
      this.searchData.shedLE = "";
      this.searchData.boxGT = "";
      this.searchData.boxLE = "";
      this.searchData.plantGT = "";
      this.searchData.plantLE = "";
      this.searchData.grownGT = "";
      this.searchData.grownLE = "";
      this.searchData.sproutGT = "";
      this.searchData.sproutLE = "";
      this.searchData.author = "";
      this.searchData.farmerName = "";
    },
    //验证数字控件是不是需求提交后台验证
    validNumberSearch(gt, le) {
      if (
        gt === undefined ||
        gt === null ||
        gt === "" ||
        le === undefined ||
        le === null ||
        le === "" ||
        le === 0 ||
        gt > le
      ) {
        return false;
      }
      return true;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.map.center.lng = lng;
      this.map.center.lat = lat;
      this.map.zoom = e.target.getZoom();
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
