<style scoped>
@import "~@/styles/css/main-list.css";

  #footerPanel_bill {
    position: relative;
    width: 100%;
    background-color: white;
  }
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId" @onchange="organizationOnchange"/>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billIn.annual')">
            <el-date-picker
              value-format="yyyy"
              v-model="searchData.annual"
              type="year"
              :placeholder="$t('base.pleaseSelect')" style="width: 100px">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tstorage.billOut.control')" prop="control">
            <el-select v-model="searchData.control" style="width: 100px" clearable>
              <el-option v-for="item in controllist" :value="item.id" :label="item.name" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if='expand'>
            <el-row>
              <el-form-item :label="$t('tobacco.tstorage.billIn.date')">
                <el-date-picker v-model="searchData.date"
                                type="daterange"
                                value-format="yyyyMMddHHmmss"
                                :picker-options="dateoptions"
                                :range-separator="$t('base.titleDateTo')"
                                :start-placeholder="$t('base.titleDateBegin')"
                                :end-placeholder="$t('base.titleDateEnd')"
                                align="right">
                </el-date-picker>
              </el-form-item>
            </el-row>
          </template>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 280px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}<i :class="expandIcon"></i>
          </el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary' :disabled="cantEdit" @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main>
      <el-table
        show-summary
        :summary-method="getSummaries"
        highlight-current-row
        border
        :height="tableHeight"
        @current-change="handleCurrentChange"
        :data="formData.billInList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName" :label="this.$t('org.organizationName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="warehouse.name" :label="this.$t('tobacco.tstorage.facility.whouseid')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="region.title" :label="this.$t('tobacco.tstorage.stack.regionId')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="annual" :label="this.$t('tobacco.tstorage.billIn.annual')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.billIn.serial')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="number" :label="this.$t('tobacco.tstorage.billIn.number')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="title" :label="this.$t('tobacco.tstorage.billIn.title')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="author" :label="this.$t('tobacco.tstorage.billIn.author')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="date" :label="this.$t('tobacco.tstorage.billIn.date')" width="100" show-overflow-tooltip
        >
          <template slot-scope="scope"> {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" :label="this.$t('tobacco.tstorage.billIn.operation')" width="100"
                         show-overflow-tooltip
        >
          <template slot-scope="scope">{{formData.operationName}}</template>
        </el-table-column>
        <el-table-column prop="tobaccoYear" :label="this.$t('tobacco.tstorage.billIn.tobaccoYear')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.billIn.typeName')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.billIn.statusName')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="totalAmount" :label="this.$t('tobacco.tstorage.billIn.totalAmount')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="totalWeight" :label="this.$t('tobacco.tstorage.billIn.totalWeight')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="lostAmount" :label="this.$t('tobacco.tstorage.billIn.lostAmount')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="lostWeight" :label="this.$t('tobacco.tstorage.billIn.lostWeight')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="transfer" :label="this.$t('tobacco.tstorage.billIn.transfer')" width="100"
                         show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.transfer === 1? '是': '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="riseAmount" :label="this.$t('tobacco.tstorage.billIn.riseAmount')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="riseWeight" :label="this.$t('tobacco.tstorage.billIn.riseWeight')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="sourceBillId" :label="this.$t('tobacco.tstorage.billIn.sourceBillId')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="sourceOrganizationName"
                         :label="this.$t('tobacco.tstorage.billIn.sourceOrganizationName')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.billIn.control')" width="100"
                         show-overflow-tooltip
        />
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.billIn.desc')" width="100" show-overflow-tooltip
        />
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          :width="rightWidth">
          <template slot-scope="scope">
            <el-button @click.stop="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" :disabled="checkEdit(scope.row.control)"
                       @click.stop="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
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
      <span>入库明细</span>
      <div class="toolButton" min-width="280px" style="float: right;margin-top: -2px;">
        <el-button-group style="height: 30px">
          <el-dropdown>
            <el-button type="primary">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type='primary' :disabled="cantEdit" @click='childForm.addForm2=true' style="width:90px;">{{ $t('base.buttonAdd')
                  }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="primary" style="width:90px;" :disabled="cantEdit"
                           @click="detailEditButtonClick()">
                  {{$t('base.buttonEdit')}}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='primary' style="width:90px;" :disabled="cantEdit" @click='detailDeleteButtonConfirm'>{{
                  $t('base.buttonDelete')
                  }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button @click="showInventoryButtonClick()" type="primary" style="width:90px;">
                  查看烟包
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" style="float: right;margin-top:2px;" @click="detailOnExpandClick('formValidate')">
            {{showText}}<i :class="expandIcon2"></i>
          </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table
        highlight-current-row
        border
        :height="tableHeight2"
        @current-change="detailHandleCurrentChange"
        :data="formData.billInItemList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="year" :label="this.$t('tobacco.tstorage.billItem.year')"/>
        <el-table-column prop="typeName" :label="this.$t('tobacco.tstorage.billItem.typeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="statusName" :label="this.$t('tobacco.tstorage.billItem.statusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="this.$t('tobacco.tstorage.billItem.varietyName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="this.$t('tobacco.tstorage.billItem.gradeName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="rankName" :label="this.$t('tobacco.tstorage.billItem.rankName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="standard" :label="this.$t('tobacco.tstorage.billItem.standard')">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.standard"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="this.$t('tobacco.tstorage.billItem.amount')"/>
        <el-table-column prop="weight" :label="this.$t('tobacco.tstorage.billItem.weight')"/>
        <el-table-column prop="transfer" :label="this.$t('tobacco.tstorage.billItem.transfer')">
          <template slot-scope="scope">
            {{scope.row.transfer === 1? '是': '否'}}
          </template>
        </el-table-column>
        <!--<el-table-column prop="forkliftId" :label="this.$t('tobacco.tstorage.billItem.forkliftId')"/>-->
        <!-- <el-table-column prop="forkliftName" :label="this.$t('tobacco.tstorage.billItem.forkliftName')"/>
         <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.billItem.desc')" width="100"
                          show-overflow-tooltip/>-->
      </el-table>
    </main>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose"
                 width="80%">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="80%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="80%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
      <el-dialog title="烟包信息" :visible.sync="childForm.inventoryForm" top="10px" :fullscreen="true">
        <inventory-form :item=formData.viewSelect2 :isEdit=childForm.isEdit :visible.sync="childForm.inventoryForm"/>
      </el-dialog>
      <!--明细编辑-->
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm2" top="10px"
                 width="50%">
        <edit-form2 :item.sync=formData.viewSelect2 :isEdit=childForm.isEdit :visible.sync="childForm.editForm2"
                    @refresh2="handleCurrentChange(formData.selectRow)"
        />
      </el-dialog>
      <!--明细新增-->
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm2"
                 top="10px"
                 width="50%">
        <add-form2 :item.sync=formData.selectRow :visible.sync="childForm.addForm2"
                   @refresh2="handleCurrentChange(formData.selectRow)"/>
      </el-dialog>
    </template>
  </div>
</template>
<script>
  const AddForm = () => import('./billInAdd.vue');
  const EditForm = () => import('./billInEdit.vue');
  const AddForm2 = () => import('./billItemAdd.vue');
  const EditForm2 = () => import('./billItemEdit.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const InventoryForm = () => import('./tranport_inventory.vue');
  import categoryApi from '../../api/basic/api_category';
  import billInApi from '../../api/tstorage/api_billIn';
  import operationApi from '../../api/tstorage/api_operation';
  import billItemApi from '../../api/tstorage/api_billItem';

  export default {
    data() {
      return {
        cantEdit: true,
        controllist: [],
        tableHeight: 330, //设置主表高度
        tableHeight2: 100, //设置明细表高度
        rightWidth: 100, //主表右侧按钮宽度
        showConfirm: false, //是否显示确认按钮
        showReview: false, //是否显示审核按钮
        dataLength: 0, //明细表数据条数
        showText: '展开',
        expand: false,
        expand2: false,
        expandIcon: 'el-icon-arrow-down',
        expandIcon2: 'el-icon-arrow-up',
        childForm: {
          addForm: false,
          editForm: false,
          addForm2: false,
          editForm2: false,
          viewForm: false,
          isEdit: false,
          inventoryForm: false,
        },
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
          'region': '',
          'warehouse': '',
          'stack': '',
          'annual': '',
          'serial': '',
          'number': '',
          'title': '',
          'author': '',
          'date': '',
          'alias': '',
          'tobaccoYear': '',
          'typeId': '',
          'typeName': '',
          'statusId': '',
          'statusName': '',
          'totalAmount': '',
          'totalWeight': '',
          'lostAmount': '',
          'lostWeight': '',
          'sign': '',
          'transfer': '',
          'riseAmount': '',
          'riseWeight': '',
          'control': '',
          'desc': '',
          'organizationId': this.$store.state.user.organization.organizationId,
        },
        formData: {
          operationName: '', //存储单据名
          billInList: [],
          billInItemList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 5,
            total: 0,
            keyword: '',
            pageSizeOpts: [5, 10, 15, 20, 25, 30]
          },
          rowSelection: []
        },
        sumColumnNames: [
          {column: 'totalAmount', unit: '件'},
          {column: 'totalWeight', unit: '公斤'},
          {column: 'lostAmount', unit: ' 件'},
          {column: 'lostWeight', unit: ' 公斤'},
          {column: 'riseAmount', unit: ' 件'},
          {column: 'riseWeight', unit: ' 公斤'},
        ],
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
      this.searchData.annual = new Date().getFullYear().toString();
      //获取状态列表
      Promise.all([
        categoryApi.getAll({search: 'lead:EQ:ST_IN'})])
        .then(([response]) => {
          this.controllist = response.content;
        })
        .catch(error => {
        });
      this.load();
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
      'add-form': AddForm,
      'edit-form': EditForm,
      'inventory-form': InventoryForm,
      'add-form2': AddForm2,
      'edit-form2': EditForm2,
      OrganizationForm
    },
    methods: {
      detailCheckEdit(item) {//判断能否进行编辑
        if (item === null || item === undefined || item === '') {
          this.cantEdit = true;
        } else if (item.control.id === 'ST_IN01') {
          this.cantEdit = false;
        } else {
          this.cantEdit = true;
        }
      },
      detailEditButtonClick() {
        if (this.formData.selectRow2 === null || this.formData.selectRow2 === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        this.childForm.editForm2 = true;
      },
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
      load() {
        let arr = this.$route.path.split('/');
        this.searchData.alias = arr[arr.length - 1];//通过路由获取流程id
        // 重置明细表数据
        this.tableHeight = 330; //设置主表高度
        this.tableHeight2 = 100; //设置明细表高度
        this.dataLength = 0; //明细表数据条数
        this.showText = '展开';
        this.expand = false;
        this.expand2 = false;
        this.expandIcon = 'el-icon-arrow-down';
        this.expandIcon2 = 'el-icon-arrow-up';
        this.formData.billInItemList = [];
        //获取id对应的业务流程名称
        Promise.all([operationApi.getAll({
          search: 'alias:EQ:{alias};'.format({
            alias: this.searchData.alias,
          })
        })])
          .then(([response]) => {
            this.formData.operationName = response.content[0].name;
          })
          .catch(error => {
          });
        this.onSearchButtonClick();
      },
      organizationOnchange(label, value, values) {
        this.searchData.organizationId = value;
        this.searchData.organizationCode = value;
        this.searchData.organizationName = label;
        this.searchData.organizationOrder = '0';
      },
      showInventoryButtonClick() {
        if (this.formData.selectRow2 === null || this.formData.selectRow2 === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        this.childForm.inventoryForm = true;
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
          this.tableHeight = 330;
        } else {
          this.expandIcon2 = 'el-icon-arrow-down';
          this.showText = '收起';
          this.tableHeight = 210;//150是明细表显示5条数据时，主表的高度
          if (this.dataLength <= 2) {
            this.tableHeight = this.tableHeight + 36 * 3;
          } else if (this.dataLength > 2 && this.dataLength < 5) {
            this.tableHeight = this.tableHeight + 36 * (5 - this.dataLength);
          }
        }
        this.expand2 = !this.expand2;
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
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        Promise.all([billInApi.deleteBillIn(this.formData.selectRow.id)])
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
      checkEdit(item) {//判断能否进行编辑
        if (item === null || item === undefined || item === '') {
          return false;
        } else if (item.id === 'ST_IN01') {
          return false;
        } else {
          return true;
        }
      },
      // 判断是否能确认
      checkApply(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id === 'ST_IN01') {
          return false;
        } else {
          return true;
        }
      },
      // 判断是否能审核
      checkReview(item) {
        if (item === '' || item === null) {//必须做非空判断
          return true;
        } else if (item.id === 'ST_IN02') {
          return false;
        } else {
          return true;
        }
      },
      //确认的确认
      applyConfirm(row) {
        this.$confirm('确认后将不能编辑,是否继续？', this.$t('base.titleTip'), {
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
        Promise.all([billInApi.approval(row.id, 0)])
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
        Promise.all([billInApi.approval(row.id, 1)])
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      detailDeleteButtonClick() {
        if (this.formData.selectRow2 === null || this.formData.selectRow2 === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        Promise.all([billItemApi.deleteBillItem(this.formData.viewSelect2.id)])
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
          Promise.all([billInApi.getItem(this.formData.selectRow.id)])
            .then(([response]) => {
              this.dataLength = response.length;
              let height = 73;//显示两行的高度
              if (this.dataLength === 0) {
                this.tableHeight2 = 100;
              } else if (this.dataLength === 1) {
                this.tableHeight2 = height; //36是一行的高度，明细表的高度也需要动态设置才不会出现两个滚动条
              } else if (this.dataLength > 1 && this.dataLength < 5) {
                this.tableHeight2 = height + 36 * (this.dataLength - 1);
              } else {
                this.tableHeight2 = height + 36 * 4;
              }
              this.formData.billInItemList = response;
              if (this.expand2 === true) {//如果是展开状态，立即改变高度
                this.tableHeight = 210;//150是明细表显示5条数据时，主表的高度
                if (this.dataLength <= 2) {
                  this.tableHeight = this.tableHeight + 36 * 3;
                } else if (this.dataLength > 2 && this.dataLength < 5) {
                  this.tableHeight = this.tableHeight + 36 * (5 - this.dataLength);
                }
              }
              this.detailCheckEdit(this.formData.selectRow);
            })
            .catch(error => {
            });
        }
      },
      detailHandleCurrentChange(val) {
        if (val) {
          this.formData.viewSelect2 = val;
        }
        this.formData.selectRow2 = val;
      },
      onSearchButtonClick() {
        if (this.searchData.annual === null) {
          this.searchData.annual = '';
        }
        // 重置明细表数据
        this.tableHeight = 330; //设置主表高度
        this.tableHeight2 = 100; //设置明细表高度
        this.dataLength = 0; //明细表数据条数
        this.showText = '展开';
        this.expand = false;
        this.expand2 = false;
        this.expandIcon = 'el-icon-arrow-down';
        this.expandIcon2 = 'el-icon-arrow-up';
        this.formData.billInItemList = [];
        Promise.all([billInApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: 'number,DESC',
          contains: 'annual,serial,number,title,author,date,operation,tobaccoYear,typeId,typeName,statusId,statusName,totalAmount,totalWeight,lostAmount,lostWeight,sign,transfer,riseAmount,riseWeight,control,desc,:{keyword}:true'.format({keyword: this.formData.pagination.keyword}),
          search: 'annual:EQ:{annual};control.id:EQ:{control};date:BETWEEN:{start},{end};operation:EQ:{operation};organization.organizationId:rlike:{orgid};'.format({
            orgid: this.searchData.organizationId,
            annual: this.searchData.annual,
            control: this.searchData.control,
            operation: this.searchData.alias,
            start: (this.searchData.date === '' || this.searchData.date === null) ? '19700101000000' : this.searchData.date[0],
            end: (this.searchData.date === '' || this.searchData.date === null) ? '29990101000000' : this.searchData.date[1],
          })
        })])
          .then(([response]) => {
            this.formData.billInList = response.content;
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
    },
    watch: {//监听路由变化
      $route: {
        handler: function (val, oldVal) {
          this.load();
        },
        // 深度观察监听
        deep: true
      }
    },
  };
</script>
