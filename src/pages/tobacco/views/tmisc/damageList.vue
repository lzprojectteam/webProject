<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline
                 style="width:120%;">
          <el-row>
            <el-form-item :label="$t('tobacco.tmisc.damage.annual')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        v-model="searchData.annual"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
            <el-form-item :label="$t('tobacco.tmisc.damage.date')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        v-model="searchData.date"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
            <el-form-item :label="$t('tobacco.tmisc.damage.control')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        v-model="searchData.control"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
            <el-form-item :label="$t('base.keywords')">
              <el-input v-bind:placeholder="$t('base.ipKeywords')"
                        v-model="formData.pagination.keyword"
                        @keyup.enter.native="onSearchButtonClick" />
            </el-form-item>
          </el-row>
          <template v-if="expand">

            <el-row>
              <el-form-item :label="$t('tobacco.tmisc.damage.plantArea')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.plantArea"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmisc.damage.plantNumber')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.plantNumber"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmisc.damage.lostArea')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.lostArea"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item :label="$t('tobacco.tmisc.damage.lostNumber')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.lostNumber"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmisc.damage.repairArea')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.repairArea"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmisc.damage.repairNumber')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="searchData.repairNumber"
                          @keyup.enter.native="onSearchButtonClick" />
              </el-form-item>
            </el-row>
          </template>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 300px">
        <el-button-group>
          <el-button type='primary'
                     plain
                     @click='onExpandClick'>{{ $t('base.buttonFilter') }} </el-button>
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
                :data="formData.damageList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tmisc.damage.annual')" />
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tmisc.damage.serial')" />
        <el-table-column prop="disasterDegree"
                         :label="this.$t('tobacco.tmisc.damage.disasterDegree')" />
        <el-table-column prop="title"
                         :label="this.$t('tobacco.tmisc.damage.title')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmisc.damage.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmisc.damage.date')" />
        <el-table-column prop="countryId"
                         :label="this.$t('tobacco.tmisc.damage.countryId')" />
        <el-table-column prop="countryName"
                         :label="this.$t('tobacco.tmisc.damage.countryName')" />
        <el-table-column prop="farmerId"
                         :label="this.$t('tobacco.tmisc.damage.farmerId')" />
        <el-table-column prop="farmerNumber"
                         :label="this.$t('tobacco.tmisc.damage.farmerNumber')" />
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tmisc.damage.farmerName')" />
        <el-table-column prop="typeId"
                         :label="this.$t('tobacco.tmisc.damage.typeId')" />
        <el-table-column prop="typeName"
                         :label="this.$t('tobacco.tmisc.damage.typeName')" />
        <el-table-column prop="varietyId"
                         :label="this.$t('tobacco.tmisc.damage.varietyId')" />
        <el-table-column prop="varietyName"
                         :label="this.$t('tobacco.tmisc.damage.varietyName')" />
        <el-table-column prop="plantArea"
                         :label="this.$t('tobacco.tmisc.damage.plantArea')" />
        <el-table-column prop="plantNumber"
                         :label="this.$t('tobacco.tmisc.damage.plantNumber')" />
        <el-table-column prop="lostArea"
                         :label="this.$t('tobacco.tmisc.damage.lostArea')" />
        <el-table-column prop="lostNumber"
                         :label="this.$t('tobacco.tmisc.damage.lostNumber')" />
        <el-table-column prop="repairArea"
                         :label="this.$t('tobacco.tmisc.damage.repairArea')" />
        <el-table-column prop="repairNumber"
                         :label="this.$t('tobacco.tmisc.damage.repairNumber')" />
        <el-table-column prop="content"
                         :label="this.$t('tobacco.tmisc.damage.content')" />
        <el-table-column prop="affirm"
                         :label="this.$t('tobacco.tmisc.damage.affirm')" />
        <el-table-column prop="paid"
                         :label="this.$t('tobacco.tmisc.damage.paid')" />
        <el-table-column prop="photo"
                         :label="this.$t('tobacco.tmisc.damage.photo')" />
        <el-table-column prop="pictures"
                         :label="this.$t('tobacco.tmisc.damage.pictures')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tmisc.damage.control')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmisc.damage.desc')" />
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
const AddForm = () => import("./damageAdd.vue");
const EditForm = () => import("./damageEdit.vue");
import damageApi from "../../api/tmisc/api_damage";
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
        annual: 0,
        serial: "",
        disasterDegree: 0,
        title: "",
        author: "",
        date: "",
        countryId: "",
        countryName: "",
        farmerId: "",
        farmerNumber: "",
        farmerName: "",
        typeId: "",
        typeName: "",
        varietyId: "",
        varietyName: "",
        plantArea: 0,
        plantNumber: 0,
        lostArea: 0,
        lostNumber: 0,
        repairArea: 0,
        repairNumber: 0,
        content: "",
        affirm: 0,
        paid: 0,
        photo: "",
        pictures: "",
        control: 0,
        desc: ""
      },
      formData: {
        damageList: [],
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

      Promise.all([damageApi.deleteDamage(this.formData.selectRow.id)])
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
        damageApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "annual,serial,disasterDegree,title,author,date,countryId,countryName,farmerId,farmerNumber,farmerName,typeId,typeName,varietyId,varietyName,plantArea,plantNumber,lostArea,lostNumber,repairArea,repairNumber,content,affirm,paid,photo,pictures,control,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "annual:EQ:{annual};serial:EQ:{serial};disasterDegree:EQ:{disasterDegree};title:EQ:{title};author:EQ:{author};date:EQ:{date};countryId:EQ:{countryId};countryName:EQ:{countryName};farmerId:EQ:{farmerId};farmerNumber:EQ:{farmerNumber};farmerName:EQ:{farmerName};typeId:EQ:{typeId};typeName:EQ:{typeName};varietyId:EQ:{varietyId};varietyName:EQ:{varietyName};plantArea:EQ:{plantArea};plantNumber:EQ:{plantNumber};lostArea:EQ:{lostArea};lostNumber:EQ:{lostNumber};repairArea:EQ:{repairArea};repairNumber:EQ:{repairNumber};content:EQ:{content};affirm:EQ:{affirm};paid:EQ:{paid};photo:EQ:{photo};pictures:EQ:{pictures};control:EQ:{control};desc:EQ:{desc};".format(
            {
              annual: this.searchData.annual,
              serial: this.searchData.serial,
              disasterDegree: this.searchData.disasterDegree,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              countryId: this.searchData.countryId,
              countryName: this.searchData.countryName,
              farmerId: this.searchData.farmerId,
              farmerNumber: this.searchData.farmerNumber,
              farmerName: this.searchData.farmerName,
              typeId: this.searchData.typeId,
              typeName: this.searchData.typeName,
              varietyId: this.searchData.varietyId,
              varietyName: this.searchData.varietyName,
              plantArea: this.searchData.plantArea,
              plantNumber: this.searchData.plantNumber,
              lostArea: this.searchData.lostArea,
              lostNumber: this.searchData.lostNumber,
              repairArea: this.searchData.repairArea,
              repairNumber: this.searchData.repairNumber,
              content: this.searchData.content,
              affirm: this.searchData.affirm,
              paid: this.searchData.paid,
              photo: this.searchData.photo,
              pictures: this.searchData.pictures,
              control: this.searchData.control,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.damageList = response.content;
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