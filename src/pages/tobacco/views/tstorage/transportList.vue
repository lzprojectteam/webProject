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
          <el-form-item label="是否在途" :placeholder="$t('base.pleaseSelect')">
            <el-select v-model="searchData.isOnTheWay">
              <el-option v-for="item in formData.optionList"
                         :label="item.label"
                         :value="item.value"
                         :key="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
          </el-form-item>
          <template v-if='expand'>
            <el-row>
              <el-form-item :label="$t('tobacco.tstorage.transport.depart')">
                <el-date-picker v-model="searchData.depart"
                                type="datetimerange"
                                value-format="yyyyMMddHHmmss"
                                :picker-options="dateoptions"
                                :range-separator="$t('base.titleDateTo')"
                                :start-placeholder="$t('base.titleDateBegin')"
                                :end-placeholder="$t('base.titleDateEnd')"
                                align="right"
                >
                </el-date-picker>
              </el-form-item>
            </el-row>
          </template>

        </el-form>
      </div>
      <div class='toolButton' style="min-width: 260px">
        <el-button-group>
          <el-button type='primary' @click='onExpandClick'>{{ $t('base.buttonFilter') }}</el-button>
          <el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary' @click='deleteButtonConfirm' :disabled="cantEdit">{{ $t('base.buttonDelete')
            }}
          </el-button>
        </el-button-group>
      </div>
    </div>
    <main>
      <el-table
        :height="tableHeight"
        highlight-current-row
        border
        @current-change="handleCurrentChange"
        :data="formData.transportList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <!--
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-row>
                      <el-col :span="8">
                        <el-table
                          highlight-current-row
                          label-position="left" inline class="demo-table-expand"
                          :data="props.row.tableData"
                          border>
                          <el-table-column prop="typeName" :label="$t('tobacco.tstorage.standWeightSet.typeName')"
                                           min-width="100"
                                           show-overflow-tooltip/>
                          <el-table-column prop="varietyName" :label="$t('tobacco.tstorage.standWeightSet.varietyName')"
                                           min-width="100"
                                           show-overflow-tooltip/>
                          <el-table-column prop="gradeName" :label="$t('tobacco.tstorage.standWeightSet.gradeName')"
                                           min-width="100"
                                           show-overflow-tooltip/>
                          <el-table-column prop="weight" :label="$t('tobacco.tstorage.standWeightSet.weight')"/>
                          <el-table-column prop="amount" label="件数" min-width="100"
                                           show-overflow-tooltip/>
                          <el-table-column prop="standard" :label="$t('tobacco.tstorage.stock.standard')">
                            <template slot-scope="scope">
                              <el-switch v-model="scope.row.standard" disabled></el-switch>
                            </template>
                          </el-table-column>
                          <el-table-column
                            fixed="right"
                            :label="$t('base.titleOperation')"
                            width="50">
                            <template slot-scope="scope">
                              <el-button @click="showInventoryButtonClick(scope.row,false)" type="text" size="small">
                                {{$t('base.buttonView')}}
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                      <el-col :span="1"><span>&nbsp;</span></el-col>
                    </el-row>
                  </template>
                </el-table-column>
        -->
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organizationName" :label="$t('org.organizationName')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="annual" :label="this.$t('tobacco.tstorage.transport.annual')"/>
        <el-table-column prop="serial" :label="this.$t('tobacco.tstorage.transport.serial')" width="150"
                         show-overflow-tooltip/>
        <el-table-column prop="number" :label="this.$t('tobacco.tstorage.transport.number')" width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="barcode" :label="this.$t('tobacco.tstorage.transport.barcode')" width="100"
                         show-overflow-tooltip/>
        <!-- <el-table-column prop="title" :label="this.$t('tobacco.tstorage.transport.title')"
                          width="220"
                          show-overflow-tooltip/>
         <el-table-column prop="author" :label="this.$t('tobacco.tstorage.transport.author')" width="100"
                          show-overflow-tooltip/>-->
        <el-table-column prop="date" :label="this.$t('tobacco.tstorage.transport.date')" width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="destinationName" :label="this.$t('tobacco.tstorage.transport.destinationName')"
                         width="200"
                         show-overflow-tooltip/>
        <el-table-column prop="vehicle" :label="this.$t('tobacco.tstorage.transport.vehicle')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="driver" :label="this.$t('tobacco.tstorage.transport.driver')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="driverMobile" label="联系电话" width="100"
                         show-overflow-tooltip/>
        <!--<el-table-column prop="countryId" :label="this.$t('tobacco.tstorage.transport.countryId')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="countryName" :label="this.$t('tobacco.tstorage.transport.countryName')" width="100"
                         show-overflow-tooltip/>-->
        <el-table-column prop="tyear" :label="this.$t('tobacco.tstorage.transport.tyear')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="ttypeName" :label="this.$t('tobacco.tstorage.transport.ttypeName')" width="100"
                         show-overflow-tooltip/>

        <el-table-column prop="tstatusName" :label="this.$t('tobacco.tstorage.transport.tstatusName')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="totalAmount" :label="this.$t('tobacco.tstorage.transport.totalAmount')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="totalWeight" :label="this.$t('tobacco.tstorage.transport.totalWeight')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="depart" :label="this.$t('tobacco.tstorage.transport.depart')" width="140"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{dateFormat(scope.row.depart,'yyyy-mm-dd')}}
          </template>
        </el-table-column>
        <el-table-column prop="arrive" :label="this.$t('tobacco.tstorage.transport.arrive')" width="140"
                         show-overflow-tooltip/>
        <el-table-column prop="sign" :label="this.$t('tobacco.tstorage.transport.sign')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="control.name" :label="this.$t('tobacco.tstorage.transport.control')" width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="desc" :label="this.$t('tobacco.tstorage.transport.desc')" width="100"
                         show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          :label="$t('base.titleOperation')"
          width="170">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text" size="small" @click="editButtonClick(scope.row,true)"
                       :disabled="checkEdit(scope.row.control)">{{$t('base.buttonEdit')}}
            </el-button>
            <el-button type="text" size="small" @click="exportButtonClick(scope.row)"
                       :disabled="checkExport(scope.row.control)">{{$t('base.export')}}
            </el-button>
            <el-button type="text" size="small" @click="reviewConfirm(scope.row)"
                       :disabled="checkReview(scope.row.control)">{{$t('base.buttonReview')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
    <div
      style="border-top: 1px solid gray;color: #606266;padding-left: 10px;font-size: 16px;font-weight: 600;line-height: 32px;">
      <span>调运明细</span>
      <div class="toolButton" min-width="280px" style="float: right;margin-top: -2px;">
        <el-button-group style="height: 30px">
          <el-dropdown>
            <el-button type="primary">
              操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type='primary' @click='childForm.addForm2=true' style="width:90px;" :disabled="cantEdit">{{
                  $t('base.buttonAdd')
                  }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="primary" style="width:90px;" :disabled="cantEdit"
                           @click="editButtonClick2()">
                  {{$t('base.buttonEdit')}}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type='primary' style="width:90px;" :disabled="cantEdit" @click='deleteButtonConfirm2'>{{
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
          <el-button type="primary" style="float: right; margin-top: 2px;" @click="onExpandClick2('formValidate')">
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
        @current-change="handleCurrentChange2"
        :data="formData.transportItemList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="typeName" :label="$t('tobacco.tstorage.standWeightSet.typeName')"
                         min-width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="varietyName" :label="$t('tobacco.tstorage.standWeightSet.varietyName')"
                         min-width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="gradeName" :label="$t('tobacco.tstorage.standWeightSet.gradeName')"
                         min-width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="weight" :label="$t('tobacco.tstorage.standWeightSet.weight')"/>
        <el-table-column prop="amount" label="件数" min-width="100"
                         show-overflow-tooltip/>
        <el-table-column prop="standard" label="全为标件">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.standard" disabled></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <template>
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose"
                 width="70%">
        <add-form/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose" width="70%">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick"
        />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose" width="70%">
        <edit-form :item=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
      <el-dialog title="调运烟包" :visible.sync="childForm.inventoryForm" top="10px" :fullscreen="true">
        <inventory-form :item=formData.viewSelect2 :isEdit=childForm.isEdit :visible.sync="childForm.inventoryForm"/>
      </el-dialog>
      <!--明细编辑-->
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm2" top="10px"
                 width="50%">
        <edit-form2 :item.sync=formData.viewSelect2 :isEdit=childForm.isEdit :visible.sync="childForm.editForm2" :selectRow.sync=formData.selectRow
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
  const AddForm = () => import('./transportAdd.vue');
  const EditForm = () => import('./transportEdit.vue');
  const AddForm2 = () => import('./transportItemAdd.vue');
  const EditForm2 = () => import('./transportItemEdit.vue');
  const InventoryForm = () => import('./tranport_inventory2.vue');
  const OrganizationForm = () => import('@/components/Organization');
  const path = require('path');

  import transportApi from '../../api/tstorage/api_transport';
  import transportItemApi from '../../api/tstorage/api_transportItem';
  

  export default {
    data() {
      return {
        cantEdit: true,
        tableHeight: 330, //设置主表高度
        tableHeight2: 100, //设置明细表高度
        rightWidth: 100, //主表右侧按钮宽度
        dataLength: 0, //明细表数据条数
        showText: '展开',
        expand: false,
        expand2: false,
        expandIcon: 'el-icon-arrow-down',
        expandIcon2: 'el-icon-arrow-up',
        childForm: {
          addForm: false,
          editForm: false,
          viewForm: false,
          isEdit: false,
          inventoryForm: false,
          addForm2: false,
          editForm2: false,
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
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        searchData: {
          'isOnTheWay': 0,
          'organizationId': this.$store.state.user.organization.organizationId,
          'annual': '',
          'serial': '',
          'number': '',
          'barcode': '',
          'title': '',
          'author': '',
          'date': '',
          'destinationId': '',
          'destinationCode': '',
          'destinationName': '',
          'vehicle': '',
          'driver': '',
          'contact': '',
          'countryId': '',
          'countryName': '',
          'tyear': '',
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'totalAmount': 0,
          'totalWeight': 0,
          'depart': '',
          'arrive': '',
          'sign': '',
          'control': 0,
          'desc': '',
        },
        formData: {
          optionList: [
            {label: '全部', value: 0},
            {label: '是', value: 1},
            {label: '否', value: 2},
          ],
          transportList: [],
          transportItemList: [],
          pagination: {//用于分页的变量
            currentPage: 1,
            pageSize: 6,
            total: 0,
            keyword: '',
            pageSizeOpts: [6, 10, 15, 20, 25, 30]
          },
          rowSelection: []
        },
      };
    },
    created() {
      this.onSearchButtonClick();
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
      OrganizationForm,
      'inventory-form': InventoryForm,
      'add-form2': AddForm2,
      'edit-form2': EditForm2,
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
      onExpandClick() {
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = 'el-icon-arrow-down';
        } else {
          this.expandIcon = 'el-icon-arrow-left';
        }
      },
      checkEdit2(item) {//判断能否进行编辑
        /*if (item === null || item === undefined || item === '') {
          this.cantEdit = true;
        } else if (item.control.id === 'ST_TR01') {
          this.cantEdit = false;
        } else {
          this.cantEdit = true;
        }*/
        if (item.control.id !== 'ST_TR04') {
          this.cantEdit = false;
        } else {
          this.cantEdit = true;
        }
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
      editButtonClick2() {
        if (!this.formData.selectRow2) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        // 判断能否编辑
        if (this.formData.selectRow2.standard === false) {
          this.$message({
            message: '此明细下包含非标件,不允许修改,若要修改,请删除此条数据重新添加',
            type: 'error',
            duration: 5000,
          });
        } else {
          this.childForm.editForm2 = true;
        }
      },
      onExpandClick2() {
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
      deleteButtonConfirm2(row) {
        this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
          confirmButtonText: this.$t('base.buttonOk'),
          cancelButtonText: this.$t('base.buttonCancel'),
          type: 'warning'
        }).then(() => {
          this.deleteButtonClick2(row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('message.cancel')
          });
        });
      },
      deleteButtonClick2() {
        if (this.formData.selectRow2 === null || this.formData.selectRow2 === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        Promise.all([transportItemApi.deleteTransportItem(this.formData.viewSelect2.id)])
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
        if (!val) {
          this.cantEdit = true;
        } else {
          this.cantEdit = false;
        }
        this.formData.selectRow = val;
        if (this.formData.selectRow) {
          Promise.all([transportItemApi.getAll({
            size: 500,
            search: 'transportId:EQ:{transportId};;'.format({
              transportId: this.formData.selectRow.id,
            })
          })])
            .then(([response]) => {
              this.dataLength = response.content.length;
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
              this.formData.transportItemList = response.content;
              if (this.expand2 === true) {//如果是展开状态，立即改变高度
                this.tableHeight = 210;//150是明细表显示5条数据时，主表的高度
                if (this.dataLength <= 2) {
                  this.tableHeight = this.tableHeight + 36 * 3;
                } else if (this.dataLength > 2 && this.dataLength < 5) {
                  this.tableHeight = this.tableHeight + 36 * (5 - this.dataLength);
                }
              }
              this.checkEdit2(this.formData.selectRow);
            })
            .catch(error => {
            });
        }
      },
      handleCurrentChange2(val) {
        if (val) {
          this.formData.viewSelect2 = val;
        }
        this.formData.selectRow2 = val;
      },

      /*  // 行展开事件
        dispatchDetails(row, expandedRows) {
          if (row.expanded === undefined || row.expanded === false) {
            row.expanded = true;
            row.inventoryData = [];
            //只展开一行回合判断展开关闭冲突
            Promise.all([transportItemApi.getAll({
              size: 500,
              search: 'transportId:EQ:{transportId}'.format(
                {
                  transportId: row.id
                })
            })])
              .then(([response]) => {
                row.tableData = response.content;
                this.$notify({
                  title: this.$t('base.hint'),
                  message: this.$t('base.loadingDone'),
                  duration: 1000,
                  position: 'bottom-right'
                });
              })
              .catch(error => {
              });
          } else {
            row.expanded = false;
          }
        },*/
      // 判断是否能审核
      checkReview(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id === 'ST_TR03') {
          return false;
        } else {
          return true;
        }
      },
      checkExport(item) {
        if (item === '' || item === null) {
          return true;
        } else if (item.id !== 'ST_TR01') {
          return false;
        } else {
          return true;
        }
      },
      checkEdit(item) {//判断能否进行编辑
        if (item === null || item === undefined || item === '') {
          return false;
        } else if (item.id === 'ST_TR04' || item.id === 'ST_TR05') {
          return true;
        } else {
          return false;
        }
      },
      reviewButtonClick(row) {
        Promise.all([transportApi.reviewTransport(row.id)])
          .then(([response]) => {
            this.onSearchButtonClick();
            this.$message({
              message: response.result,
              type: 'info'
            });
          })
          .catch(error => {
            console.log(error);
          });
      },
      exportButtonClick(row) {
        Promise.all([transportApi.export(row.id)])
          .then(([response]) => {
            let url = this.getfilePath(response);
            this.downloadXlsFile(url);
            console.log(url);
          })
          .catch(error => {
            console.log(error);
          });

      },
      downloadXlsFile(url) {
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.responseType = 'blob';
        x.onload = function (e) {
          require('downloadjs')(x.response, '调拨单.xls');
        };
        x.send();
      },
      getfilePath(filepath) {
        let isProduction = process.env.NODE_ENV === 'production';//如果是生产环境，前缀要发生变化
        if (
          filepath === undefined ||
          filepath === '' ||
          filepath === null
        ) {
          return '';
        }
        let pps = filepath;
        let root = '';
        root = path.join('/tobacco/upload', pps);
        let rootPath = process.env.VUE_APP_API_URL;
        if (isProduction) {
          rootPath = '';
        }
        root = '{rootPath}{path}'.format({path: root, rootPath: rootPath});
        return root;
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
      deleteButtonClick() {
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info',
          });
          return;
        }
        if (this.formData.selectRow.control.id !== 'ST_TR01') {
          this.$message({
            message: this.$t('message.cantDelete'),
            type: 'error',
          });
          return;
        }
        Promise.all([transportApi.deleteTransport(this.formData.selectRow.id)])
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
      reviewConfirm(row) {
        this.$confirm(this.$t('tobacco.tstorage.transport.reviewConfirm'), this.$t('base.titleTip'), {
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
      onSearchButtonClick() {
        // 重置明细表数据
        this.tableHeight = 330; //设置主表高度
        this.tableHeight2 = 100; //设置明细表高度
        this.dataLength = 0; //明细表数据条数
        this.showText = '展开';
        this.expand = false;
        this.expand2 = false;
        this.expandIcon = 'el-icon-arrow-down';
        this.expandIcon2 = 'el-icon-arrow-up';
        this.formData.transportItemList = [];
        Promise.all([transportApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          keyword: this.formData.pagination.keyword,
          organizationId: this.searchData.organizationId,
          startDate: (this.searchData.depart === '' || this.searchData.depart === null) ? '19700101000000' : this.searchData.depart[0],
          endDate: (this.searchData.depart === '' || this.searchData.depart === null) ? '29990101000000' : this.searchData.depart[1],
          isOnTheWay: this.searchData.isOnTheWay,
        })])
          .then(([response]) => {
            this.formData.pagination.total = parseFloat(response.totalElements);
            //为每条数据初始化一个tableData属性，用于存储展开行的数据
            let arr = response.content;
            arr.forEach(function (item) {
              item.tableData = [];
              item.inventoryData = [];
            });
            this.formData.transportList = arr;
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
<style scoped>
  .el-dropdown-menu__item {
    margin-bottom: 1px !important;
  }
</style>
