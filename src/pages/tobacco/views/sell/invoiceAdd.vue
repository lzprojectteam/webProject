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
          <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
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
          <el-select v-model='testData.test' style="width:100%;">
            <el-option v-for="item in  dateItem.modeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.basketCard')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.basketCard"/>
        </el-form-item>
      </el-col>

 
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.desc')">
          <el-input type="textarea" :rows="6" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
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
  //import gradeApi from '../../api/basic/api_grade';

  export default {
    props: ['dataitem', 'isEdit', 'visible'],
    data() {
      return {
        formItem: {
          typeId: '10',
          typeName: '烤烟',
          statusId: '101',
          statusName: '原烟',
          varietyId: '000',
          varietyName: '普通品种',
          gradeId: '001',
          gradeCode: 'C1F',
          gradeName: '中桔一',
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
          control: 5,
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
          sign: '',
          plan: '',
          pay: '',
          balanceId: '',
          balanceNumber: '',
          balanceName: '',
          arranged: '',
          rankId: '',
          rankName: '',
          gradeList: [],
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
          mode: '',
        },
        dateItem: {
          modeList: []
        },
        testData: {
          test: ''
        },
        ruleValidate: {
          code: [{required: true, message: '编码不能为空', trigger: 'blur'}],
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
      this.load();
      Promise.all([categoryApi.getAll({search: 'lead:EQ:SG_M', sort: 'id'})])
        .then(([response]) => {
          this.dateItem.modeList = response.content;
          console.log(this.dateItem.modeList);
        })
        .catch(error => {
        });
    },
    methods: {
      load() {
        let formItem_temp = this.dataitem;
        formItem_temp.varietyId = '000';
        formItem_temp.varietyName = '普通品种';
        formItem_temp.statusId = '101';
        formItem_temp.statusName = '原烟';
        formItem_temp.typeId = '10';
        formItem_temp.typeName = '烤烟';
        formItem_temp.gradeId = '001';
        formItem_temp.gradeName = '中桔一';
        formItem_temp.gradeCode = 'C1F';
        formItem_temp.mode = '';
        formItem_temp.control = 5;
        formItem_temp.delivery = formItem_temp.uid;
        this.formItem = formItem_temp;
        if (this.formItem.control) {
          this.formItem.control = this.formItem.control.id;
        }
        //console.log(this.formItem);
        this.formItem.organizationId = this.$store.state.user.organization.organizationId;
      },
      onSubmitClick(name) {
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
        this.formItem.mode = this.testData.test;
        this.formItem.setp = 4;
        this.formItem.control = 5;
        this.$refs[name].validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([invoiceApi.saveInvoice(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info'
                });
                this.$emit('refresh');
              })
              .catch(error => {
                loading.close();
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
