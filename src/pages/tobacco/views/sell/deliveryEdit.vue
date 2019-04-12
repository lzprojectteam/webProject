<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form label-width="60px" inline style="width:500px;">
          <el-button type='text' icon="el-icon-d-arrow-left" @click="onBackClick()">{{ $t('base.buttonBack') }}
          </el-button>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 300px">
        <el-button-group>
          <el-button type='primary' @click="childForm.addForm=true" v-if="this.isEdit" :disabled="this.menuProps.buttonCreated">添加</el-button>
             <el-button type='primary' @click='createdReceiptBtn' style="width:90px;" v-if="this.isEdit" :disabled="this.menuProps.buttonCreated">创建发票</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-form :model="dataItem" label-width="80px" class="demo-block" style="padding:5px 10px 10px 0px">
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.annual')">
              <el-input v-model="dataItem.annual" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.number')">
              <el-input v-model="dataItem.number" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.author')">
              <el-input v-model="dataItem.author" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <!--<el-col :span="4">-->
          <!--<el-form-item :label="$t('tobacco.tsell.seContract.title')">-->
          <!--<el-input v-model="dataItem.title" :disabled="this.menuProps.inputDisabled"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.date')">
              <el-input value-format="yyyy-MM-dd" v-model="dataItem.date" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.districtName')">
              <el-input v-model="dataItem.organization.districtName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item :label="$t('org.organizationName')">
              <el-input v-model="dataItem.organization.organizationName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerName')">
              <el-input v-model="dataItem.farmerName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerIdentity')">
              <el-input v-model="dataItem.farmerIdentity" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerNumber')">
              <el-input v-model="dataItem.farmerNumber" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerPhone')">
              <el-input v-model="dataItem.farmerPhone" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerAddress')">
              <el-input v-model="dataItem.farmerAddress" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.bankName')">
              <el-input v-model="dataItem.bankName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.bankAccount')">
              <el-input v-model="dataItem.bankAccount" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.tareaName')">
              <el-input v-model="dataItem.areaName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.typeName')">
              <el-input v-model="dataItem.typeName" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.signArea')">
              <el-input v-model="dataItem.signArea" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.signPlant')">
              <el-input v-model="dataItem.signPlant" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.signWeight')">
              <el-input v-model="dataItem.signWeight" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.subsidy')">
              <el-input v-model="dataItem.subsidy" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellWeight')">
              <el-input v-model="dataItem.sellWeight" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellPrice')">
              <el-input v-model="dataItem.sellPrice" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellMoney')">
              <el-input v-model="dataItem.sellMoney" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellTax')">
              <el-input v-model="dataItem.sellTax" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellAllowance')">
              <el-input v-model="dataItem.sellAllowance" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.sellTotal')">
              <el-input v-model="dataItem.sellTotal" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.debit')">
              <el-input v-model="dataItem.debit" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.deduct')">
              <el-input v-model="dataItem.deduct" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.finish')">
              <el-input v-model="dataItem.finish" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('tobacco.tsell.seContract.card')">
              <el-input v-model="dataItem.card" :disabled="this.menuProps.inputDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="5">
            <el-col :span="4">
                <el-form-item :label="$t('tobacco.tsell.seContract.control')">
                    <el-input v-model="dataItem.control.name" :disabled="this.menuProps.inputDisabled" />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item :label="$t('tobacco.tsell.seContract.sign')">
                    <el-input v-model="dataItem.sign.name" :disabled="this.menuProps.inputDisabled" />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item :label="$t('tobacco.tsell.seContract.pay')">
                    <el-input v-model="dataItem.pay.name" :disabled="this.menuProps.inputDisabled" />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item :label="$t('tobacco.tsell.seContract.plan')">
                    <el-input v-model="dataItem.plan.name" :disabled="this.menuProps.inputDisabled" />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item :label="$t('tobacco.tsell.seContract.technicianName')">
                    <el-input v-model="dataItem.technicianName" :disabled="this.menuProps.inputDisabled" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item :label="$t('tobacco.tsell.seContract.desc')">
                    <el-input v-model="dataItem.desc" :disabled="this.menuProps.inputDisabled" type="textarea" :rows="3" />
                </el-form-item>
            </el-col>
        </el-row> -->
      </el-form>
      <div class="demo-block">
        <el-tabs v-model="activeName" style="padding: 24px;">
          <el-tab-pane label="交售明细" name="1">
            <el-table
              highlight-current-row
              border
              @current-change="handleCurrentChange"
              :data="tempdata.invoiceList"
              style="width: 100%"
              :row-class-name="tableRowClassName">
              <el-table-column prop="annual" :label="this.$t('tobacco.tsell.invoice.annual')" show-overflow-tooltip
              />
              <!--<el-table-column prop="serial" :label="this.$t('tobacco.tsell.invoice.serial')" show-overflow-tooltip
                               fixed="left" width="60">
              </el-table-column>-->
              <!--<el-table-column prop="number" :label="this.$t('tobacco.tsell.invoice.number')" show-overflow-tooltip/>-->
              <el-table-column prop="arranged" :label="this.$t('tobacco.tsell.invoice.arranged')"
                               width="100" show-overflow-tooltip fixed="left">
                <template slot-scope="scope">
                  <el-tooltip content="查看图片" placement="right" :open-delay='300'>
                    <el-button type="text" size="small" @click=getImgPath(scope.row.farmerName,scope.row.gradePicture)
                               style="width: 100%;width: 100%;border: none;">
                      {{scope.row.arranged}}
                    </el-button>
                  </el-tooltip>
                </template>

              </el-table-column>
              <el-table-column prop="date" :label="this.$t('tobacco.tsell.invoice.date')" width="100"
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
                </template>
              </el-table-column>
              <!--<el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.invoice.contractNumber')"-->
              <!--show-overflow-tooltip/>-->
              <el-table-column prop="contractCard" :label="this.$t('tobacco.tsell.invoice.contractCard')"
                               width="200" show-overflow-tooltip/>
              <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.invoice.farmerName')"
                               show-overflow-tooltip/>
              <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.invoice.farmerIdentity')"
                               width="150" show-overflow-tooltip/>
              <!--<el-table-column prop="year" :label="this.$t('tobacco.tsell.invoice.year')" show-overflow-tooltip/>-->
              <el-table-column prop="areaName" :label="this.$t('tobacco.tsell.invoice.areaName')"
                               show-overflow-tooltip/>
              <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.invoice.typeName')"
                               show-overflow-tooltip/>
              <el-table-column prop="varietyName" :label="this.$t('tobacco.tsell.invoice.varietyName')"
                               show-overflow-tooltip/>
              <el-table-column prop="statusName" :label="this.$t('tobacco.tsell.invoice.statusName')"
                               show-overflow-tooltip/>
              <el-table-column prop="rankName" :label="this.$t('tobacco.tsell.invoice.rankName')"
                               show-overflow-tooltip/>
              <el-table-column prop="gradeName" :label="this.$t('tobacco.tsell.invoice.gradeName')"
                               show-overflow-tooltip/>
              <el-table-column prop="price" :label="this.$t('tobacco.tsell.invoice.price')" show-overflow-tooltip/>
              <el-table-column prop="weight" :label="this.$t('tobacco.tsell.invoice.weight')" show-overflow-tooltip/>
              <el-table-column prop="money" :label="this.$t('tobacco.tsell.invoice.money')" show-overflow-tooltip/>
              <el-table-column prop="tax" :label="this.$t('tobacco.tsell.invoice.tax')" show-overflow-tooltip/>
              <el-table-column prop="allowance" :label="this.$t('tobacco.tsell.invoice.allowance')"
                               show-overflow-tooltip/>
              <el-table-column prop="total" :label="this.$t('tobacco.tsell.invoice.total')" show-overflow-tooltip/>
              <el-table-column prop="tareWeight" :label="this.$t('tobacco.tsell.invoice.tareWeight')"
                               show-overflow-tooltip/>

              <!--<el-table-column prop="sorting" :label="this.$t('tobacco.tsell.invoice.sorting')" show-overflow-tooltip/>-->
              <el-table-column prop="basketCard" :label="this.$t('tobacco.tsell.invoice.basketCard')"
                               width="150" show-overflow-tooltip/>
              <!--<el-table-column prop="basketCode" :label="this.$t('tobacco.tsell.invoice.basketCode')"-->
              <!--show-overflow-tooltip/>-->
              <el-table-column prop="tag" :label="this.$t('tobacco.tsell.invoice.tag')" show-overflow-tooltip/>

              <el-table-column prop="balanceName" :label="this.$t('tobacco.tsell.invoice.balanceName')"
                               width="100" show-overflow-tooltip/>

              <!--<el-table-column prop="picture" :label="this.$t('tobacco.tsell.invoice.picture')" show-overflow-tooltip/>-->
              <el-table-column prop="step" :label="this.$t('tobacco.tsell.invoice.step')" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.step===4?'确认':'其它'}}
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="control" :label="this.$t('tobacco.tsell.invoice.control')" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>
                    {{ scope.row.control===3?'退框':scope.row.control===5?'正常':'未知' }}
                  </span>
                </template>
              </el-table-column>

              <el-table-column prop="desc" :label="this.$t('tobacco.tsell.invoice.desc')" show-overflow-tooltip/>
              <el-table-column fixed="right" :label="$t('base.titleOperation')" show-overflow-tooltip :width="this.isEdit ? 150:50">
                <template slot-scope="scope">
                  <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">
                    {{$t('base.buttonView')}}
                  </el-button>
                  <el-button @click="editButtonClick(scope.row,true)" type="text" size="small" v-if="isEdit">
                    {{$t('base.buttonEdit')}}
                  </el-button>
                  <el-button type="text" size="small" @click="deleteButtonConfirm()" v-if="isEdit">
                    {{$t('base.buttonDelete')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <template>
      <!-- <el-dialog :title="$t('base.bindFarmer')" :visible.sync="childForm.bindForm" top="10px" style="text-align:center" :before-close="handleClose">
      <bind-form :item=formData.selectRow :visible.sync="childForm.bindForm" />
  </el-dialog> -->
      <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px" :before-close="handleClose">
        <add-form :dataitem=dataItem :isEdit=childForm.isEdit :visible.sync="childForm.addForm"
                  @refresh="onSearchButtonClick"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick"/>
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm"/>
      </el-dialog>
    </template>
    <template>
      <el-dialog
        :title="formData.title"
        :visible.sync="formData.showImg"
        
        custom-class="tobaccoImg">
        <img :src="formData.imgSrc" alt="图片走丢了..." class="showImg"
             @click="hiddeImg">
      </el-dialog>
    </template>

  </div>
</template>
<script>
  const AddForm = () => import('./invoiceAdd.vue');
  const EditForm = () => import('./invoiceEdit.vue');
  const path = require('path');

  
  import deliveryApi from '../../api/tsell/api_delivery';
  import balanceApi from '../../api/setup/api_balance';
  import invoiceApi from '../../api/tsell/api_invoice';
  import seContractApi from '../../api/tsell/api_seContract';
  import receiptApi from '../../api/tsell/api_receipt';
  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        menuProps: {
          buttonAdd: true,
          buttonKaipiao: false,
          inputDisabled: true,
          buttonCreated: false
        },
        farmerId: '',
        deliveryId: '',
        childForm: {
          isEdit: false,
          addForm: false,
          editForm: false,
          viewForm: false,
        },
        activeName: '1',
        tempdata: {
          farmerList: [],
          invoiceList: [],
          balanceList: []
        },
        loading: false,
        loading2: false,
        formData: {
          pagination: {
            //用于分页的变量
            currentPage: 1,
            pageSize: 1000,
            total: 0,
            keyword: '',
            pageSizeOpts: [10, 15, 20, 25, 30]
          },
          showImg: false,
          selectRow: '',
          viewSelect: ''
        },
        /* formItem: {
          annual: 0,
          serial: '',
          title: '',
          author: '',
          date: '',
          regionId: '',
          regionName: '',
          countryId: '',
          countryName: '',
          contractId: '',
          contractNumber: '',
          contractCard: '',
          farmerId: '',
          farmerNumber: '',
          farmerName: '',
          farmerIdentity: '',
          farmerPhone: '',
          farmerAddress: '',
          bankName: '',
          bankAccount: '',
          year: 0,
          areaId: '',
          areaName: '',
          typeId: '',
          typeName: '',
          varietyId: '',
          varietyName: '',
          signWeight: 0,
          restWeight: 0,
          dealWeight: 0,
          balanceId: '',
          balanceNumber: 0,
          balanceName: '',
          filePath: '',
          picture: '',
          print: 0,
          control: 0,
          desc: '',
          organizationId: '',
          organizationName: '',
          organizationOrder: '',
          organizationCode: '',
          organization: '',
          districtId: '',
          districtName: '',
          districtOrder: '',
          districtCode: ''
        }, */
        dataItem: {
          annual: '',
          serial: '',
          number: '',
          title: '',
          author: '',
          date: '',
          regionId: '',
          regionName: '',
          countryId: '',
          countryName: '',
          contractId: '',
          contractNumber: '',
          contractCard: '',
          farmerId: '',
          farmerNumber: '',
          farmerName: '',
          farmerIdentity: '',
          farmerPhone: '',
          farmerAddress: '',
          bankName: '',
          bankAccount: '',
          year: '',
          areaId: '',
          areaName: '',
          typeId: '',
          typeName: '',
          varietyId: '',
          varietyName: '',
          signWeight: '',
          restWeight: '',
          dealWeight: '',
          signArea: '',
          signPlant: '',
          subsidy: '',
          sellWeight: '',
          sellPrice: '',
          sellMoney: '',
          sellTax: '',
          sellAllowance: '',
          sellTotal: '',
          finish: '',
          debit: '',
          deduct: '',
          technicianId: '',
          technicianNumber: '',
          technicianName: '',
          filePath: '',
          picture: '',
          print: '',
          card: '',
          control: '',
          desc: '',
          organizationId: '',
          organizationName: '',
          organizationOrder: '',
          organizationCode: '',
          organization: '',
          districtId: '',
          districtName: '',
          districtOrder: '',
          districtCode: '',
          orgId: '',
          sign: '',
          plan: '',
          pay: '',
          balanceId: '',
          balanceNumber: '',
          balanceName: '',
          choiceId: '',
          choiceName: '',
          arranged: '',
          statusName: '',
          rankName: '',
          gradeCode: '',
          gradeName: '',
          price: '',
          weight: '',
          money: '',
          tax: '',
          allowance: '',
          total: '',
          tareWeight: '',
          delivery: '',
          sorting: '',
          basketCard: '',
          basketCode: '',
          tag: '',
          receiptid: '',
          receiptNumber: '',
          paymentNumber: '',
          step: '',

          rankId: '',
          statusId: '',
          gradeId: '',
          mode: ''
        },
        ruleValidate: {
          code: [{required: true, message: '编码不能为空', trigger: 'blur'}]
        }
      };
    },
    components: {
      'add-form': AddForm,
      'edit-form': EditForm,
    },
    created() {
      console.info(this.isEdit);
      this.load();
    },
    computed: {
      userOrgId() {
        if (this.$store.state.user.organization === undefined) {
          this.dataItem.organizationId = undefined;
          return undefined;
        } else {
          this.dataItem.organizationId = this.$store.state.user.organization.organizationId;
          return this.$store.state.user.organization.organizationId;
        }
      }
    },
    methods: {
      //获取图片路径
      getImgPath(name, src) {
        console.log(src);
        let isProduction = process.env.NODE_ENV === 'production';//如果是生产环境，前缀要发生变化
        this.formData.photoList = [];
        if (
          src === undefined ||
          src === '' ||
          src === null
        ) {
          this.formData.title = name;
          this.formData.imgSrc = 'http://bpic.588ku.com/element_origin_min_pic/18/06/10/217da78e9f80484b354afea9bb8a6538.jpg';
          this.showImg();
          return;
        }
        let pps = src;
        let root = '';
        root = path.join('/upload', pps);
        let rootPath = process.env.VUE_APP_API_URL;
        if (isProduction) {
          rootPath = '';
        }
        root = '{rootPath}{path}'.format({path: root, rootPath: rootPath});
        this.formData.title = name;
        this.formData.imgSrc = root;
        console.log('路径啊');
        console.log(root);
        this.showImg();
      },
      showImg() {
        this.formData.showImg = true;
      },
      hiddeImg() {
        this.formData.showImg = false;
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
        //console.log(this.formData.selectRow);
        if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
          //console.log('空');
          this.$message({
            message: this.$t('message.unSelectAny'),
            type: 'info'
          });
          return;
        }
        //console.log(this.formData.selectRow);
        Promise.all([invoiceApi.deleteInvoice(this.formData.selectRow.uid)])
          .then(([response]) => {
            this.$message({
              type: 'info',
              message: this.$t('message.deleteOk')
            });
            this.formData.selectRow = null;
            this.onSearchButtonClick();
          })
          .catch(error => {
            console.log(error);
          });
      },
      deleteButtonConfirm() {
        this.$confirm(
          this.$t('message.deleteConfirm'),
          this.$t('base.titleTip'),
          {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }
        )
          .then(() => {
            this.deleteButtonClick();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      },

      balanceselectChange(id) {
        let obj = {};
        obj = this.tempdata.balanceList.find(item => {
          return item.id === id;
        });
        //console.log(JSON.parse(JSON.stringify(obj)));
        var balanceObj = JSON.parse(JSON.stringify(obj));
        if (obj === undefined) {
          this.dataItem.balanceId = '';
          this.dataItem.balanceNumber = '';
          this.dataItem.balanceName = '';
        } else {
          this.dataItem.balanceId = balanceObj.id;
          this.dataItem.balanceNumber = balanceObj.number;
          this.dataItem.balanceName = balanceObj.title;
        }
        //console.log(JSON.parse(JSON.stringify(this.dataItem)));
      },
      remoteBalanceMethod(query) {
        if (query !== '') {
          this.loading = true;
          Promise.all([
            balanceApi.getAll({
              search: '(title:LIKE:{keyword}:or;alias:LIKE:{keyword}:or;line.name:LIKE:{keyword}:or;serial:LIKE:{keyword})'.format(
                {
                  keyword: query
                }
              )
            })
          ])
            .then(([response]) => {
              this.tempdata.balanceList = response.content;
              this.loading = false;
            })
            .catch(error => {
            });

        } else {
          this.tempdata.balanceList = [];
        }
      },
      farmerSelectChange(id) {
        console.log(1232313);
        let obj = {};
        obj = this.tempdata.farmerList.find(item => {
          return item.farmerId === id;
        });
        var tempobj = JSON.parse(JSON.stringify(obj));
        if (obj === undefined) {
          this.dataItem = {};
          this.dataItem.contractId = '';
          this.dataItem.contractNumber = '';
          this.dataItem.contractCard = '';
          this.dataItem.contractName = '';
        } else {
          this.dataItem = obj;
          this.dataItem.contractId = tempobj.id;
          this.dataItem.contractNumber = tempobj.number;
          this.dataItem.contractCard = tempobj.card;
          this.dataItem.contractName = tempobj.author;
        }
      },
      remoteFarmerMethod(query) {
        if (this.$store.state.user.organization === undefined) {
          this.dataItem.orgId = undefined;
        } else {
          this.dataItem.orgId = this.$store.state.user.organization.organizationId;
        }
        if (query !== '') {
          this.loading2 = true;
          Promise.all([
            seContractApi.getAll({
              search: 'control.id:EQ:{control};organization.organizationId:EQ:{orgid};farmerName:like:{farmerName}'.format(
                {
                  orgid: this.dataItem.orgId,
                  control: 'SC_ST05',
                  farmerName: query
                }
              )
            })
          ])
            .then(([response]) => {
              this.tempdata.farmerList = response.content;
              this.loading2 = false;
            })
            .catch(error => {
            });

        } else {
          this.tempdata.farmerList = [];
        }
      },
      kaipiaoBtn() {
        if (this.dataItem.farmerId === '' || this.dataItem.farmerId === null) {
          this.$message({
            message: '合同不能为空！',
            type: 'warn'
          });
        } else if (
          this.dataItem.balanceId === null ||
          this.dataItem.balanceId === '' ||
          this.dataItem.balanceId === undefined
        ) {
          this.$message({
            message: '流水不能为空！',
            type: 'warn'
          });
        } else {
          var objData = JSON.parse(JSON.stringify(this.dataItem));
          this.dataItem.control = 1;
          this.dataItem.organizationId = objData.organization.organizationId;
          this.dataItem.organizationName = objData.organization.organizationName;
          this.dataItem.organizationOrder = objData.organization.organizationOrder;
          this.dataItem.organizationCode = objData.organization.organizationCode;
          this.dataItem.districtId = objData.organization.districtId;
          this.dataItem.districtName = objData.organization.districtName;
          this.dataItem.districtOrder = objData.organization.districtOrder;
          this.dataItem.districtCode = objData.organization.districtCode;
          this.dataItem.countryId = '86';
          this.dataItem.countryName = '中国';
          this.dataItem.desc = '';
          this.dataItem.control = 1;
          //console.log(JSON.parse(JSON.stringify(this.dataItem)));
          Promise.all([deliveryApi.saveDelivery(this.dataItem)])
            .then(([response]) => {
              this.menuProps.buttonAdd = false;
              this.menuProps.buttonKaipiao = true;
              this.dataItem.serial = response.serial;
              this.dataItem.delivery = response.uid;
              this.$message({
                message: this.$t('开票成功！'),
                type: 'info'
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      addInvoice() {
      },
      onSearchButtonClick() {
        Promise.all([
          invoiceApi.getAll({
            size: '500',
            sort: 'arranged',
            search: 'delivery:EQ:{deliveryId};'.format({
              deliveryId: this.item.uid
            })
          })
        ])
          .then(([response]) => {
            this.tempdata.invoiceList = response.content;
            console.log(this.tempdata.invoiceList);
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

      handleCurrentChange(val) {
        this.formData.selectRow = val;
        //console.log(this.formData.selectRow);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      onBackClick() {
        this.$emit('update:visible', false);
        this.$emit('refresh');
      },
      onSubmitClick(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            Promise.all([deliveryApi.saveDelivery(this.formItem)])
              .then(([response]) => {
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn'
            });
          }
        });
      },
      formReset(name) {
        this.$refs[name].resetFields();
      },
      handleClose(done) {
        this.childForm.addForm = false;
        this.onSearchButtonClick();
        //this.onSearchButtonClick();
        done();
      },
      load() {
        this.farmerId = JSON.parse(JSON.stringify(this.item)).farmerId;
        this.balanceId = JSON.parse(JSON.stringify(this.item)).balanceId;
        Promise.all([
          seContractApi.getAll({
            search: 'farmerId:EQ:{farmerId};'.format(
              {
                farmerId: this.farmerId
              }
            )
          })
        ])
          .then(([response]) => {
            if (response.content.length === 0) {
              this.dataItem = {};
              this.dataItem.organization = {};
              return;
            }
            this.dataItem = response.content[0];
            this.dataItem.uid = this.item.uid;
            this.onSearchButtonClick();
          })
          .catch(error => {
          });
      },
      createdReceiptBtn() {
        this.$confirm(
          this.$t('创建发票后将无法编辑，是否继续'),
          this.$t('base.titleTip'),
          {
            confirmButtonText: this.$t('base.buttonOk'),
            cancelButtonText: this.$t('base.buttonCancel'),
            type: 'warning'
          }
        )
          .then(() => {
            Promise.all([receiptApi.createReceipt(this.dataItem.uid)])
              .then(([response]) => {
                this.$message({
                  type: 'info',
                  message: '创建发票成功'
                });
                // 刷新页面，将按钮置灰
                this.menuProps.buttonCreated = true;
                this.menuProps.buttonAdd = true;
                this.buttonCan = true;
              })
              .catch(error => {
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('message.cancel')
            });
          });
      }
    },
    watch: {
      item(curVal, oldVal) {
        this.dataItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      }
    }

  }
  ;
</script>
<style scoped>
  @import '~@/styles/css/main-list.css';

  .demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    margin: 5px;
  }

  .contentPanel .el-col {
    min-height: 30px;
  }

  .contentPanel .el-row {
    margin-bottom: 3px;
    font-size: 13px;
  }

  .contentPanel .el-row:last-child {
    margin-bottom: 0;
  }
</style>
