<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <!-- <el-col :span="12">
           <el-form-item :label="$t('tobacco.tsell.invoice.arranged')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.arranged" />
           </el-form-item>
       </el-col>-->
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
              <rank-select :label.sync="formItem.rankName" :value.sync="formItem.rankId" style="width:100%;" />
          </el-form-item>
      </el-col>-->

      <el-col :span="24">
        <el-form-item label="烟叶属性">
          <type-variety-grade-select :allData.sync="allData" :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.price')" prop="price">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price" />
          </el-form-item>
      </el-col>-->
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.weight')" prop="weight">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight"/>
        </el-form-item>
      </el-col>

      <!--  <el-col :span="12">
            <el-form-item :label="$t('tobacco.tsell.invoice.money')" prop="money">
                <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money" />
            </el-form-item>
        </el-col>-->
      <!--<el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.tax')" prop="tax">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tax" />
          </el-form-item>
      </el-col>-->

      <!--
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tsell.invoice.allowance')" prop="allowance">
                <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.allowance"/>
              </el-form-item>
            </el-col>
      -->
      <!-- <el-col :span="12">
           <el-form-item :label="$t('tobacco.tsell.invoice.total')" prop="total">
               <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.total" />
           </el-form-item>
       </el-col>-->

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.tareWeight')" prop="tareWeight">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tareWeight"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.mode')">
          <el-select v-model='formItem.mode' style="width:100%;">
            <el-option v-for="item in  dateItem.modeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <!--<el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.sorting')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sorting" />
          </el-form-item>
      </el-col>-->
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.basketCard')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.basketCard"/>
        </el-form-item>
      </el-col>

      <!--<el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.basketCode')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.basketCode" />
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.tag')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tag" />
          </el-form-item>
      </el-col>

      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.paymentNumber')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.paymentNumber" />
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.step')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.step" />
          </el-form-item>
      </el-col>

      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.receiptId')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.receiptId" />
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.receiptNumber')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.receiptNumber" />
          </el-form-item>
      </el-col>

      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.choiceId')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.choiceId" />
          </el-form-item>
      </el-col>
      <el-col :span="12">
          <el-form-item :label="$t('tobacco.tsell.invoice.choiceName')">
              <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.choiceName" />
          </el-form-item>
      </el-col>
-->
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.desc')">
          <el-input type="textarea" :rows="6" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>

 
</template>
<script>
import invoiceApi from '../../api/tsell/api_invoice';
import categoryApi from '../../api/basic/api_category';

const rankSelect = () => import('../components/rankSelect');
//const areaSelect = () => import('../components/areaSelect');
const typeSelect = () => import('@/components/Tobacco/typeSelect');
const statusSelect = () => import('../components/statusSelect');
const varietySelect = () => import('@/components/Tobacco/varietySelect');
const typeVarietyGradeSelect = () =>
  import('@/components/Tobacco/typeVarietyGradeSelect');
const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      allData: {},
      formItem: {
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
        balanceNumber: 0,
        balanceName: '',
        arranged: '',
        statusName: '',
        rankId: '',
        rankName: '',
        statusId: '',
        gradeList: [],
        gradeId: '',
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
        choiceName: '',
        receiptid: '',
        receiptNumber: '',
        paymentNumber: '',
        step: '',
        mode: ''
      },
      dateItem: {
        modeList: []
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
        price: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        weight: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        money: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        tax: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        allowance: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        total: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        tareWeight: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  components: {
    rankSelect,
    //areaSelect,
    statusSelect,
    'type-grade-select': typeGradeSelect,
    typeSelect,
    varietySelect,
    typeVarietyGradeSelect
  },
  /* computed: {}, */
  created() {

    Promise.all([categoryApi.getAll({ search: 'lead:EQ:SG_M', sort: 'id' })])
      .then(([response]) => {
        //console.log(response.content);
        this.dateItem.modeList = response.content;
      })
      .catch(error => {});
    this.load();
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      if (this.formItem.mode) {
        this.formItem.mode = this.formItem.mode.id;
      }
      console.log(this.formItem);
      //初始化烟叶类型等数据，用于回显
      this.allData = {};
      this.allData['typeId'] = this.formItem.typeId;
      this.allData['varietyId'] = this.formItem.varietyId;
      this.allData['gradeId'] = this.formItem.gradeId;
      console.info(this.allData);
      this.formItem.organizationId = this.formItem.organization.organizationId;
      this.formItem.organizationName = this.formItem.organization.organizationName;
      this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
      this.formItem.organizationCode = this.formItem.organization.organizationCode;
    },
    onSubmitClick(name) {
      if (this.formItem.rankId === null || this.formItem.rankId === '') {
        this.$message({
          message: this.$t('烟叶大等级不能为空'),
          type: 'error'
        });
        return;
      }
      if (this.formItem.typeId === null || this.formItem.typeId === '') {
        this.$message({
          message: this.$t('烟叶类型不能为空'),
          type: 'error'
        });
        return;
      }
      if (this.formItem.statusId === null || this.formItem.statusId === '') {
        this.$message({
          message: this.$t('烟叶形态不能为空'),
          type: 'error'
        });
        return;
      }
      if (this.formItem.varietyId === null || this.formItem.varietyId === '') {
        this.$message({
          message: this.$t('烟叶品种不能为空'),
          type: 'error'
        });
        return;
      }
      if (this.formItem.gradeId === null || this.formItem.gradeId === '') {
        this.$message({
          message: this.$t('烟叶等级不能为空'),
          type: 'error'
        });
        return;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([
            invoiceApi.updateInvoice(this.formItem.uid, this.formItem)
          ])
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
    }
  }
};
</script>
