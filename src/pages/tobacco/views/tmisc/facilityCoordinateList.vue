<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tmisc.facilityCoordinate.groupId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.groupId"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>

        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 300px">
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
                :data="formData.facilityCoordinateList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="layerId"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.layerId')" />
        <el-table-column prop="objectId"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.objectId')" />
        <el-table-column prop="groupId"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.groupId')" />
        <el-table-column prop="longitude"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.longitude')" />
        <el-table-column prop="latitude"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.latitude')" />
        <el-table-column prop="altitude"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.altitude')" />
        <el-table-column prop="angle"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.angle')" />
        <el-table-column prop="speed"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.speed')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmisc.facilityCoordinate.desc')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       plain>{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
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
    </template>
  </div>
</template>
<script>
const AddForm = () => import("./facilityCoordinateAdd.vue");
const EditForm = () => import("./facilityCoordinateEdit.vue");
import facilityCoordinateApi from "../../api/tmisc/api_facilityCoordinate";
export default {
  data() {
    return {
      expand: false,
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
        layerId: "",
        objectId: "",
        groupId: "",
        coord_id: "",
        longitude: "",
        latitude: "",
        altitude: "",
        angle: "",
        speed: "",
        desc: ""
      },
      formData: {
        facilityCoordinateList: [],
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
    onExpandClick() {
      this.expand = !this.expand;
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

      Promise.all([
        facilityCoordinateApi.deleteFacilityCoordinate(
          this.formData.selectRow.id
        )
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
        facilityCoordinateApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "layerId,objectId,groupId,longitude,latitude,altitude,angle,speed,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "layerId:EQ:{layerId};objectId:EQ:{objectId};groupId:EQ:{groupId};coord_id:EQ:{coord_id};longitude:EQ:{longitude};latitude:EQ:{latitude};altitude:EQ:{altitude};angle:EQ:{angle};speed:EQ:{speed};desc:EQ:{desc};".format(
            {
              layerId: this.searchData.layerId,
              objectId: this.searchData.objectId,
              groupId: this.searchData.groupId,
              coord_id: this.searchData.coord_id,
              longitude: this.searchData.longitude,
              latitude: this.searchData.latitude,
              altitude: this.searchData.altitude,
              angle: this.searchData.angle,
              speed: this.searchData.speed,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.facilityCoordinateList = response.content;
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