<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form label-width="60px" inline style="width:500px;">
          <el-button type='text' icon="el-icon-d-arrow-left" @click="onBackClick()">{{ $t('base.buttonBack') }}
          </el-button>
          <el-form-item label="合同">
            <el-select ref='userSelect' @change="farmerSelectChange" v-model='dataItem.farmerId' filterable remote placeholder="请输入烟农名称" :remote-method='remoteFarmerMethod' style="width:150px">
              <el-option v-for="item in tempdata.farmerList" :key="item.farmerId" :label="item.farmerName" :value="item.farmerId">
                <span style="float: left">{{ item.farmerName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.farmerPhone }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流水线">
            <el-select v-model='dataItem.balanceId' style="width:150px" @change="balanceselectChange">
              <el-option v-for="item in tempdata.balanceList" :key="item.id" :label="item.title" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton' style="min-width: 300px">
        <el-button-group>
          <el-button type='primary' :disabled="this.menuProps.buttonKaipiao" @click="kaipiaoBtn()">开票</el-button>
          <el-button type='primary' :disabled="this.menuProps.buttonAdd" @click="childForm.addForm=true">添加</el-button>
          <el-button type='primary' @click='createdReceiptBtn' style="width:90px;" :disabled="this.menuProps.buttonCreated">创建发票</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-form :model="dataItem" label-width="80px" class="demo-block" style="padding:5px 10px 10px 0px">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerName')">
              <el-input v-model="dataItem.farmerName" :readonly="this.menuProps.inputDisabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerIdentity')">
              <el-input v-model="dataItem.farmerIdentity" :readonly="this.menuProps.inputDisabled" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerPhone')">
              <el-input v-model="dataItem.farmerPhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.farmerAddress')">
              <el-input v-model="dataItem.farmerAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.bankName')">
              <el-input v-model="dataItem.bankName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('tobacco.tsell.seContract.bankAccount')">
              <el-input v-model="dataItem.bankAccount" />
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if='expand'>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.date')">
                <el-input v-model="dataItem.date" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.districtName')">
                <el-input v-model="dataItem.organization.districtName" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.farmerNumber')">
                <el-input v-model="dataItem.farmerNumber" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.typeName')">
                <el-input v-model="dataItem.typeName" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.signArea')">
                <el-input v-model="dataItem.signArea" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.signPlant')">
                <el-input v-model="dataItem.signPlant" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.signWeight')">
                <el-input v-model="dataItem.signWeight" :readonly="this.menuProps.inputDisabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tsell.seContract.subsidy')">
                <el-input v-model="dataItem.subsidy" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row :gutter="5">
          <div class="outerbox" style="position: relative;width: 0px;margin-left:840px;margin-top:10px;">
            <div :class="[expand ? class2 : class1,expand ? class4 : class3]" @click="handleWidth"></div>
          </div>
        </el-row>
      </el-form>
      <div class="demo-block">
        <el-tabs v-model="activeName" style="padding: 24px;">
          <el-tab-pane label="交售明细" name="1">
            <el-table highlight-current-row border @current-change="handleCurrentChange" :data="tempdata.invoiceList" style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column prop="annual" :label="this.$t('tobacco.tsell.invoice.annual')" show-overflow-tooltip />
              <el-table-column prop="arranged" :label="this.$t('tobacco.tsell.invoice.arranged')" width="100" show-overflow-tooltip fixed="left">
                <template slot-scope="scope">
                  <el-tooltip content="查看图片" placement="right" :open-delay='300'>
                    <el-button type="text" size="small" @click=getImgPath(scope.row.farmerName,scope.row.gradePicture) style="width: 100%;width: 100%;border: none;">
                      {{scope.row.arranged}}
                    </el-button>
                  </el-tooltip>
                </template>

              </el-table-column>
              <el-table-column prop="date" :label="this.$t('tobacco.tsell.invoice.date')" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{dateFormat(scope.row.date,'yyyy-mm-dd')}}
                </template>
              </el-table-column>
              <!--<el-table-column prop="contractNumber" :label="this.$t('tobacco.tsell.invoice.contractNumber')"-->
              <!--show-overflow-tooltip/>-->
              <el-table-column prop="contractCard" :label="this.$t('tobacco.tsell.invoice.contractCard')" width="200" show-overflow-tooltip />
              <el-table-column prop="farmerName" :label="this.$t('tobacco.tsell.invoice.farmerName')" show-overflow-tooltip />
              <el-table-column prop="farmerIdentity" :label="this.$t('tobacco.tsell.invoice.farmerIdentity')" width="150" show-overflow-tooltip />
              <!--<el-table-column prop="year" :label="this.$t('tobacco.tsell.invoice.year')" show-overflow-tooltip/>-->
              <el-table-column prop="areaName" :label="this.$t('tobacco.tsell.invoice.areaName')" show-overflow-tooltip />
              <el-table-column prop="typeName" :label="this.$t('tobacco.tsell.invoice.typeName')" show-overflow-tooltip />
              <el-table-column prop="varietyName" :label="this.$t('tobacco.tsell.invoice.varietyName')" show-overflow-tooltip />
              <el-table-column prop="statusName" :label="this.$t('tobacco.tsell.invoice.statusName')" show-overflow-tooltip />
              <el-table-column prop="rankName" :label="this.$t('tobacco.tsell.invoice.rankName')" show-overflow-tooltip />
              <el-table-column prop="gradeName" :label="this.$t('tobacco.tsell.invoice.gradeName')" show-overflow-tooltip />
              <el-table-column prop="price" :label="this.$t('tobacco.tsell.invoice.price')" show-overflow-tooltip />
              <el-table-column prop="weight" :label="this.$t('tobacco.tsell.invoice.weight')" show-overflow-tooltip />
              <el-table-column prop="money" :label="this.$t('tobacco.tsell.invoice.money')" show-overflow-tooltip />
              <el-table-column prop="tax" :label="this.$t('tobacco.tsell.invoice.tax')" show-overflow-tooltip />
              <el-table-column prop="allowance" :label="this.$t('tobacco.tsell.invoice.allowance')" show-overflow-tooltip />
              <el-table-column prop="total" :label="this.$t('tobacco.tsell.invoice.total')" show-overflow-tooltip />
              <el-table-column prop="tareWeight" :label="this.$t('tobacco.tsell.invoice.tareWeight')" show-overflow-tooltip />

              <!--<el-table-column prop="sorting" :label="this.$t('tobacco.tsell.invoice.sorting')" show-overflow-tooltip/>-->
              <el-table-column prop="basketCard" :label="this.$t('tobacco.tsell.invoice.basketCard')" width="150" show-overflow-tooltip />
              <!--<el-table-column prop="basketCode" :label="this.$t('tobacco.tsell.invoice.basketCode')"-->
              <!--show-overflow-tooltip/>-->
              <el-table-column prop="tag" :label="this.$t('tobacco.tsell.invoice.tag')" show-overflow-tooltip />

              <el-table-column prop="balanceName" :label="this.$t('tobacco.tsell.invoice.balanceName')" width="100" show-overflow-tooltip />

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

              <el-table-column prop="desc" :label="this.$t('tobacco.tsell.invoice.desc')" show-overflow-tooltip />
              <el-table-column fixed="right" :label="$t('base.titleOperation')" show-overflow-tooltip width="150">
                <template slot-scope="scope">
                  <el-button @click="editButtonClick(scope.row,false)" type="text" size="small">
                    {{$t('base.buttonView')}}
                  </el-button>
                  <el-button @click="editButtonClick(scope.row,true)" type="text" size="small" :disabled="buttonCan">
                    {{$t('base.buttonEdit')}}
                  </el-button>
                  <el-button type="text" size="small" @click="deleteButtonConfirm()" :disabled="buttonCan">
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
        <add-form :dataitem=dataItem :isEdit=childForm.isEdit :visible.sync="childForm.addForm" @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm" @refresh="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm" top="10px" :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
    <template>
      <el-dialog :title="formData.title" :visible.sync="formData.showImg" custom-class="tobaccoImg">
        <img :src="formData.imgSrc" alt="图片走丢了..." class="showImg" @click="hiddeImg">
      </el-dialog>
    </template>

  </div>
</template>
<script>
const AddForm = () => import('./invoiceAdd.vue');
const EditForm = () => import('./invoiceEdit.vue');
const OrganizationForm = () => import('@/components/Organization');
const path = require('path');


import deliveryApi from '../../api/tsell/api_delivery';
import balanceApi from '../../api/setup/api_balance';
import invoiceApi from '../../api/tsell/api_invoice';
import seContractApi from '../../api/tsell/api_seContract';
import receiptApi from '../../api/tsell/api_receipt';
export default {
  props: ['item'],
  data() {
    return {
      buttonCan: false,
      expand: false,
      class1: 'closeIcon',
      class2: 'openIcon',
      class3: 'el-icon-arrow-down',
      class4: 'el-icon-arrow-up',
      expand3: true,
      menuProps: {
        buttonAdd: true,
        buttonKaipiao: false,
        inputDisabled: true,
        buttonCreated: true
      },
      childForm: {
        isEdit: false,
        addForm: false,
        editForm: false,
        viewForm: false
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
        selectRow: '',
        viewSelect: '',
        showImg: false
      },
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
        mode: '',
        uid: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm,
    OrganizationForm
  },

  computed: {},
  created() {
    if (this.$store.state.user.organization === undefined) {
      this.dataItem.orgId = undefined;
    } else {
      this.dataItem.orgId = this.$store.state.user.organization.organizationId;
    }
    // this.dataItem.uid = JSON.parse(JSON.stringify(this.item)).uid;
    Promise.all([
      balanceApi.getAll({
        search: 'organization.organizationId:EQ:{orgid}'.format({
          orgid: this.dataItem.orgId
        })
      })
    ])
      .then(([response]) => {
        this.tempdata.balanceList = response.content;
        if (this.tempdata.balanceList.length === 0) {
          this.$message({
            message: this.$t('请先设置流水线'),
            type: 'info'
          });
          return;
        }
        this.dataItem.balanceId = this.tempdata.balanceList[0].id;
        this.dataItem.balanceNumber = this.tempdata.balanceList[0].number;
        this.dataItem.balanceName = this.tempdata.balanceList[0].title;
      })
      .catch(error => {});
  },
  methods: {
    //获取图片路径
    getImgPath(name, src) {
      console.log(src);
      let isProduction = process.env.NODE_ENV === 'production'; //如果是生产环境，前缀要发生变化
      this.formData.photoList = [];
      if (src === undefined || src === '' || src === null) {
        this.formData.title = name;
        this.formData.imgSrc =
          'http://bpic.588ku.com/element_origin_min_pic/18/06/10/217da78e9f80484b354afea9bb8a6538.jpg';
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
      root = '{rootPath}{path}'.format({ path: root, rootPath: rootPath });
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
      if (
        this.formData.selectRow === null ||
        this.formData.selectRow === undefined
      ) {
        this.$message({
          message: this.$t('message.unSelectAny'),
          type: 'info'
        });
        return;
      }
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
    },
    farmerSelectChange(id) {
      console.info(id);
      let obj = {};
      obj = this.tempdata.farmerList.find(item => {
        return item.farmerId === id;
      });
      var balanceId = this.dataItem.balanceId;
      var balanceName = this.dataItem.balanceName;
      var balanceNumber = this.dataItem.balanceNumber;
      var tempobj = JSON.parse(JSON.stringify(obj));
      if (obj === undefined) {
        this.dataItem = {};
        this.dataItem.contractId = '';
        this.dataItem.contractNumber = '';
        this.dataItem.contractCard = '';
        this.dataItem.contractName = '';
      } else {
        this.dataItem = tempobj;
        this.dataItem.balanceId = balanceId;
        this.dataItem.balanceName = balanceName;
        this.dataItem.balanceNumber = balanceNumber;
        this.dataItem.contractId = tempobj.id;
        this.dataItem.contractNumber = tempobj.number;
        this.dataItem.contractCard = tempobj.card;
        this.dataItem.contractName = tempobj.author;
        console.info(tempobj.number);
      }
      this.dataItem.date = this.dataItem.date.substring(0, 10);
    },
    remoteFarmerMethod(query) {
      if (query !== '') {
        if (this.$store.state.user.organization === undefined) {
          this.dataItem.orgId = undefined;
        } else {
          this.dataItem.orgId = this.$store.state.user.organization.organizationId;
        }
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
          .catch(error => {});
      } else {
        this.loading = false;
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
        this.dataItem.sign = this.dataItem.sign.id;
        this.dataItem.contractNumber = objData.contractNumber;
        Promise.all([deliveryApi.saveDelivery(this.dataItem)])
          .then(([response]) => {
            this.menuProps.buttonAdd = false;
            this.menuProps.buttonKaipiao = true;
            this.menuProps.buttonCreated = false;
            this.dataItem.serial = response.serial;
            this.dataItem.delivery = response.uid;
            this.dataItem.uid = response.uid;
            this.$message({
              message: '开票成功',
              type: 'info'
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    addInvoice() {},
    onSearchButtonClick() {
      Promise.all([
        invoiceApi.getAll({
          size: '500',
          sort: 'arranged',
          search: 'delivery:EQ:{deliveryId};'.format({
            deliveryId: this.dataItem.delivery
          })
        })
      ])
        .then(([response]) => {
          this.tempdata.invoiceList = response.content;
          this.$notify({
            title: this.$t('base.hint'),
            message: this.$t('base.loadingDone'),
            duration: 1000,
            position: 'bottom-right'
          });
        })
        .catch(error => {});
    },

    handleCurrentChange(val) {
      this.formData.selectRow = val;
      console.log(this.formData.selectRow);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    onBackClick() {
      this.$emit('update:visible', false);
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '处理中,请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          Promise.all([deliveryApi.saveDelivery(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
            })
            .catch(error => {
              loading.close();
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
    handleWidth() {
      this.expand = !this.expand;
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
    },
  }
};
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
