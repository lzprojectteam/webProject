<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billCheck.tyear')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.tyear"
              type="year"
              :placeholder="$t('base.pleaseSelect')"
              style="width: 100%">
            </el-date-picker>

          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if="expand">
            <el-form-item label="烟叶等级">
              <type-grade-select
                :typeId.sync="searchData.ttypeId" :typeName.sync="searchData.ttypeName"
                :gradeId.sync="searchData.tgradeId" :gradeName.sync="searchData.tgradeName"
                :gradeCode.sync="searchData.tgradeCode"
                style="width: 100%;">
              </type-grade-select>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 280px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}<i :class="expandIcon"></i>
          </el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <!-- <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>-->
          <el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main>
      <el-table
        highlight-current-row
        border
        :height="tableHeight"
        @current-change="handleCurrentChange"
        :data="formData.billCheckList"
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tyear" :label="this.$t('tobacco.tstorage.billCheck.tyear')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="ttypeName" :label="this.$t('tobacco.tstorage.billCheck.ttypeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tstatusName" :label="this.$t('tobacco.tstorage.billCheck.tstatusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tvarietyName" :label="this.$t('tobacco.tstorage.billCheck.tvarietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="tgradeName" :label="this.$t('tobacco.tstorage.billCheck.tgradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="trankName" :label="this.$t('tobacco.tstorage.billCheck.trankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.billCheck.amount')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.billCheck.weight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="sample" :label="this.$t('tobacco.tstorage.billCheck.sample')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="qualified" :label="this.$t('tobacco.tstorage.billCheck.qualified')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.billIn.control')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="rate" :label="this.$t('tobacco.tstorage.billCheck.rate')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.billCheck.desc')" width="100"
                         show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          :width="rightWidth">
          <template slot-scope="scope">
            <el-button @click.stop="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click.stop="applyConfirm(scope.row)"
                       :disabled="checkApply(scope.row.control)" v-show="showConfirm">确认
            </el-button>
            <el-button type="text" size="small" @click.stop="reviewConfirm(scope.row)"
                       :disabled="checkReview(scope.row.control)" v-show="showReview">{{$t('base.buttonReview')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel' id="footerPanel_bill">
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <div
      style="border-top: 1px solid gray;color: #606266;padding-left: 10px;font-size: 16px;font-weight: 600;line-height: 32px;margin-top: 1px;">
      <span>质检明细</span>
      <el-button type="primary" style="float: right;margin-top: 2px;" @click="detailOnExpandClick('formValidate')">
        {{showText}}<i :class="expandIcon2"></i>
      </el-button>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        :height="tableHeight2"
        @current-change="detailHandleCurrentChange"
        :data="formData.billCheckItemList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <!-- <el-table-column prop="tyear" :label="this.$t('tobacco.tstorage.billCheckItem.tyear')"/>-->
        <el-table-column prop="ttypeName" :label="this.$t('tobacco.tstorage.billCheckItem.ttypeName')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="tstatusName" :label="this.$t('tobacco.tstorage.billCheckItem.tstatusName')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="tvarietyName" :label="this.$t('tobacco.tstorage.billCheckItem.tvarietyName')" width="100"
                         show-overflow-tooltip/>
        <!-- <el-table-column prop="trankName" :label="this.$t('tobacco.tstorage.billCheckItem.trankName')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="oriGradeName" :label="this.$t('tobacco.tstorage.billCheckItem.oriGradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="totAmount" :label="this.$t('tobacco.tstorage.billCheckItem.totAmount')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.billCheckItem.amount')" width="100"
                         show-overflow-tooltip/>
        <!--  <el-table-column prop="samAmount" :label="this.$t('tobacco.tstorage.billCheckItem.samAmount')" width="100"
                           show-overflow-tooltip/>-->
        <el-table-column prop="weight1" :label="this.$t('tobacco.tstorage.billCheckItem.weight1')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="weight2" :label="this.$t('tobacco.tstorage.billCheckItem.weight2')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="samGradeName" :label="this.$t('tobacco.tstorage.billCheckItem.samGradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="qualifiedAmount" label="合格件数" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="qualifiedWeight" label="合格重量" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="percent" label="水分含量" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="moisture" label="水分超标件数" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="qualifiedPass" label="合格率" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="unused" label="无使用" width="100"
                         show-overflow-tooltip/>
        <!--  <el-table-column prop="weight2" :label="this.$t('tobacco.tstorage.billCheckItem.weight2')" width="100"
                           show-overflow-tooltip/>-->
        <!--        <el-table-column prop="samBundle" :label="this.$t('tobacco.tstorage.billCheckItem.samBundle')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="bundle" :label="this.$t('tobacco.tstorage.billCheckItem.bundle')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="percent" :label="this.$t('tobacco.tstorage.billCheckItem.percent')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="moisture" :label="this.$t('tobacco.tstorage.billCheckItem.moisture')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="mildew" :label="this.$t('tobacco.tstorage.billCheckItem.mildew')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="insect" :label="this.$t('tobacco.tstorage.billCheckItem.insect')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="hollowAmount" :label="this.$t('tobacco.tstorage.billCheckItem.hollowAmount')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="hollowWeight" :label="this.$t('tobacco.tstorage.billCheckItem.hollowWeight')" width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="rainWetAmount" :label="this.$t('tobacco.tstorage.billCheckItem.rainWetAmount')"
                                 width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="rainWetWeight" :label="this.$t('tobacco.tstorage.billCheckItem.rainWetWeight')"
                                 width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="unqualifiedAmount" :label="this.$t('tobacco.tstorage.billCheckItem.unqualifiedAmount')"
                                 width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="unqualifiedWeight" :label="this.$t('tobacco.tstorage.billCheckItem.unqualifiedWeight')"
                                 width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="peculiarAmount" :label="this.$t('tobacco.tstorage.billCheckItem.peculiarAmount')"
                                 width="100"
                                 show-overflow-tooltip/>
                <el-table-column prop="peculiarWeight" :label="this.$t('tobacco.tstorage.billCheckItem.peculiarWeight')"
                                 width="100"
                                 show-overflow-tooltip/>-->
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.billCheckItem.desc')" width="100"
                         show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" :disabled="cantEdit" @click="detailEditButtonClick(scope.row,true)">
              {{$t('base.buttonEdit')}}
            </el-button>
            <el-button @click="detailDeleteButtonConfirm(scope.row,false)" type="text" size="small" :disabled="cantEdit">
              {{$t('base.buttonDelete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <template>
      <!--质检明细编辑界面-->
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm2" top="10px" width="60%"
                 :before-close="handleClose">
        <edit-form2 :item.sync=formData.viewSelect2 :isEdit=childForm.isEdit :visible.sync="childForm.editForm2"
                    @refresh="handleCurrentChange(formData.selectRow)
"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const EditForm2 = () => import('./billInCheckItemEdit.vue');
  const EditForm = () => import('./billInCheckEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');

  import billCheckApi from '../../api/tstorage/api_billCheck';
  import billCheckItemApi from '../../api/tstorage/api_billCheckItem';

  export default {
    data() {
      return {
        tableHeight: 315, //设置主表高度
        tableHeight2: 100, //设置明细表高度
        dataLength: 0, //明细表数据条数
        rightWidth: 50, //主表右侧按钮宽度
        showConfirm: false, //是否显示确认按钮
        showReview: false, //是否显示审核按钮
        showText: '展开',
        cantEdit: true, //明细表能否编辑
        expand: false,
        expand2: false,
        expandIcon: 'el-icon-arrow-down',
        expandIcon2: 'el-icon-arrow-up',
        childForm: {
          addForm: false,
          editForm: false,
          editForm2: false,
          viewForm: false,
          isEdit: false
        },
        sumColumnNames: [
          {column: 'amount', unit: '件'},
          {column: 'weight', unit: '公斤'},
          {column: 'sample', unit: ' 件'},
          {column: 'qualified', unit: ' 件'},
        ],
        dateoptions: {
          shortcuts: [
            {
              text: this.$t('base.today'),

              onClick: (picker) => {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: this.$t('base.yesterday'),

              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: this.$t('base.oneWeek'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        searchData: {
          'organizationId': this.$store.state.user.organization.organizationId,
          'countryId': '',
          'countryName': '',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'tgradeId': '',
          'tgradeCode': '',
          'tgradeName': '',
          'trankId': '',
          'trankName': '',
          'amount': 0,
          'weight': 0,
          'sample': 0,
          'qualified': 0,
          'rate': 0,
          'desc': '',
        },
        formData: {
          billCheckList: [],
          billCheckItemList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 5,
            total: 0,
            keyword: '',
            pageSizeOpts: [5, 10, 15, 20, 25, 30]
          },
          rowSelection: []
        },
      };
    },
    created() {
      if (this.$store.getters.hasPermission('确认员')) {
        this.showConfirm = true;
        this.rightWidth = this.rightWidth + 40;
      }
      if (this.$store.getters.hasPermission('审核员')) {
        this.showReview = true;
        this.rightWidth = this.rightWidth + 40;
      }
      this.searchData.tyear = new Date().getFullYear().toString();
      this.onSearchButtonClick();
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
    components: {
      OrganizationForm,
      'edit-form2': EditForm2,
      'edit-form': EditForm,
      typeGradeSelect,
    },
    methods: {
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          let col = this.sumColumnNames.find(item => {
            return item.column === column.property;
          });
          if (col === undefined || col === null) {
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = this.$accounting.formatNumber(sums[index], 2) + ' ' + col.unit;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-up';
        } else {
          this.expandIcon = 'el-icon-arrow-down';
        }
      },
      detailOnExpandClick() {
        if (this.expand2) {
          this.expandIcon2 = 'el-icon-arrow-up';
          this.showText = '展开';
          this.tableHeight = 315;
        } else {
          this.expandIcon2 = 'el-icon-arrow-down';
          this.showText = '收起';
          this.tableHeight = 150;//150是明细表显示5条数据时，主表的高度
          if (this.dataLength <= 2) {
            this.tableHeight = this.tableHeight + 45 * 3;
          } else if (this.dataLength > 2 && this.dataLength < 5) {
            this.tableHeight = this.tableHeight + 45 * (5 - this.dataLength);
          }
        }
        this.expand2 = !this.expand2;
      },
      checkEdit(item) {//判断能否进行编辑
        if (item === null || item === undefined || item === '') {
          this.cantEdit = true;
        } else if (item.control.id === 'ST_CK01') {
          this.cantEdit = false;
        } else {
          this.cantEdit = true;
        }
      },
      // 判断是否能确认
      checkApply(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id === 'ST_CK01') {
          return false;
        } else {
          return true;
        }
      },
      // 判断是否能审核
      checkReview(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id === 'ST_CK02') {
          return false;
        } else {
          return true;
        }
      },
      //确认
      applyConfirm(row) {
        this.$confirm('确认后明细将不能编辑,是否继续？', this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.applyButtonClick(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      //确认
      applyButtonClick(row) {
        Promise.all([billCheckApi.approval(row.id, 0)])
          .then(([response]) => {
            this.$message({
              message: response.message,
              type: 'info',
            });
            this.cantEdit = true;
            this.onSearchButtonClick();
          })
          .catch(error => {
            this.$message({
              message: error,
              type: 'info',
            });
          });
      },
      //审核确认
      reviewConfirm(row) {
        this.$confirm('确认审核？', this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.reviewButtonClick(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      //审核
      reviewButtonClick(row) {
        Promise.all([billCheckApi.approval(row.id, 1)])
          .then(([response]) => {
            this.$message({
              message: response.message,
              type: 'info',
            });
            this.onSearchButtonClick();
          })
          .catch(error => {
            this.$message({
              message: error,
              type: 'info',
            });
          });
      },
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
        this.searchData.organizationCode = value;
        this.searchData.organizationName = label;
        this.searchData.organizationOrder = '0';
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
      detailEditButtonClick(selectRow, isEdit) {
        this.formData.viewSelect2 = selectRow;
        this.childForm.editForm2 = true;
      },
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }

        Promise.all([billCheckApi.deleteBillCheck(this.formData.selectRow.id)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.formData.selectRow = null;
            this.onSearchButtonClick();

          })
          .catch(error => {

          });
      },
      deleteButtonConfirm() {
        this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.deleteButtonClick();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      //明细删除确认
      detailDeleteButtonConfirm(row) {
        this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.detailDeleteButtonClick(row);
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      detailDeleteButtonClick(row) {
        Promise.all([billCheckItemApi.deleteBillCheckItem(row.id)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.handleCurrentChange(this.formData.selectRow);
          })
          .catch(error => {
          });
      },
      handleCurrentChange(val) {
        this.formData.selectRow = val;
        if (this.formData.selectRow !== '' && this.formData.selectRow !== null) {
          Promise.all([billCheckApi.getItem(this.formData.selectRow.id)])
            .then(([response]) => {
              this.formData.billCheckItemList = response;
              this.dataLength = response.length;
              this.tableHeight2 = 100;//显示两行的高度
              if (this.dataLength <= 1) {
                this.tableHeight2 = this.tableHeight2; //45是一行的高度，明细表的高度也需要动态设置才不会出现两个滚动条
              } else if (this.dataLength > 1 && this.dataLength < 5) {
                this.tableHeight2 = this.tableHeight2 + 45 * (this.dataLength - 1);
              } else {
                this.tableHeight2 = this.tableHeight2 + 45 * 4;
              }
              //如果是展开状态，立即改变高度
              if (this.expand2 === true) {
                this.tableHeight = 150;//150是明细表显示5条数据时，主表的高度
                if (this.dataLength <= 2) {
                  this.tableHeight = this.tableHeight + 45 * 3;
                } else if (this.dataLength > 2 && this.dataLength < 5) {
                  this.tableHeight = this.tableHeight + 45 * (5 - this.dataLength);
                }
              }
              this.checkEdit(this.formData.selectRow);
              this.$notify({
                title: this.$t('base.hint'),
                message: this.$t('base.loadingDone'),
                duration: 1000,
                position: 'bottom-right'
              });
            })
            .catch(error => {
            });
        }
      },
      detailHandleCurrentChange(val) {
        this.formData.selectRow2 = val;
      },
      onSearchButtonClick() {
        console.log(this.searchData);
        // 重置明细表数据
        this.tableHeight = 315; //设置主表高度
        this.tableHeight2 = 100; //设置明细表高度
        this.dataLength = 0; //明细表数据条数
        this.showText = '展开';
        this.expand = false;
        this.expand2 = false;
        this.expandIcon = 'el-icon-arrow-down';
        this.expandIcon2 = 'el-icon-arrow-up';
        this.formData.billCheckItemList = [];
        Promise.all([billCheckApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: 'tyear,ttypeId,ttypeName,tstatusId,tstatusName,tvarietyId,tvarietyName,tgradeId,tgradeCode,tgradeName,trankId,trankName,amount,weight,sample,qualified,rate,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'organization.organizationId:rlike:{orgid};tyear:EQ:{tyear};ttypeId:EQ:{ttypeId};ttypeName:EQ:{ttypeName};tstatusId:EQ:{tstatusId};tstatusName:EQ:{tstatusName};tvarietyId:EQ:{tvarietyId};tvarietyName:EQ:{tvarietyName};tgradeId:EQ:{tgradeId};tgradeCode:EQ:{tgradeCode};tgradeName:EQ:{tgradeName};billType:EQ:Q101'.format({
            orgid: this.searchData.organizationId,
            tyear: this.searchData.tyear === null ? '' : this.searchData.tyear,
            ttypeId: this.searchData.ttypeId,
            ttypeName: this.searchData.ttypeName,
            tstatusId: this.searchData.tstatusId,
            tstatusName: this.searchData.tstatusName,
            tvarietyId: this.searchData.tvarietyId,
            tvarietyName: this.searchData.tvarietyName,
            tgradeId: this.searchData.tgradeId,
            tgradeCode: this.searchData.tgradeCode,
            tgradeName: this.searchData.tgradeName,
          })
        })])
          .then(([response]) => {
            this.formData.billCheckList = response.content;
            this.formData.pagination.total = parseFloat(response.totalElements);
            this.$notify({
              title: this.$t('base.hint'),
              message: this.$t('base.loadingDone'),
              duration: 1000,
              position: 'bottom-right'
            });
          })
          .catch(error => {
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
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
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
