<template>
  <el-form :model="formItem" label-width="100px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billItem.billId')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.stack.stackId')">
          <el-select v-model="stack" style="width: 100%;">
            <el-option v-for="item in formData.stackList"
                       :value="item.id"
                       :label="item.name"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billIn.annual')" prop="year">
          <el-date-picker
            value-format="yyyy"
            v-model="formItem.year"
            type="year"
            :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" :key.sync="formItem.statusId"
                         style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <!--<el-col :span="12">
        <el-form-item label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankName" :value.sync="formItem.rankId" :key.sync="formItem.rankId"
                       style="width:100%;"/>
        </el-form-item>
      </el-col>-->
      <el-col :span="24" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.standard')" prop="standard">
          <el-switch v-model="formItem.standard" @change="standardChange"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.amount')" prop="amount">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount"
                           style="width: 100%;" :min="1" :disabled="amountDisable"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.weight')" prop="weight">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight"
                           style="width: 100%;" :min="minWeight" :disabled="weightDisable"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px">
        <el-form-item :label="$t('tobacco.tstorage.billItem.transfer')" prop="transfer">
          <el-select v-model="formItem.transfer" style="width: 100%">
            <el-option :value="1" label="是" key="0"></el-option>
            <el-option :value="0" label="否" key="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
         <el-form-item :label="$t('tobacco.tstorage.billItem.forkliftId')" prop="forkliftId">
           <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.forkliftId"/>
         </el-form-item>
       </el-col>-->
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billItem.forkliftName')" prop="forkliftName">
          <!-- <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.forkliftName"/>-->
          <el-select v-model="formItem.forkliftId" style="width: 100%;" @change="forkliftChange">
            <el-option v-for="item in formData.forkliftList"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.billItem.desc')" prop="desc">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="this.cantSave"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  import billItemApi from '../../api/tstorage/api_billItem';
  import stackApi from '../../api/tstorage/api_stack';
  import forkliftApi from '../../api/tstorage/api_forklift';

  export default {
    props: ['item'],
    data() {
      return {
        minWeight: 0,
        weightDisable: true, //重量能否编辑
        amountDisable: false, //数量能否编辑
        cantSave: true,
        stack: '',
        acceptData: {}, //主表的数据
        formItem: {
          'number': '', //仅用于显示单据号，不存入数据库
          'organizationId': '',
          'organizationName': '',
          'organizationCode': '',
          'organizationOrder': '',
          'warehouse': '',
          'region': '',
          'stack': '',
          'billId': '',
          'itemId': '',
          'countryId': '86',
          'countryName': '中国',
          'year': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'varietyId': '000',
          'varietyName': '普通品种',
          'gradeId': '001',
          'gradeCode': 'C1F',
          'gradeName': '中桔一',
          'rankId': '',
          'rankName': '',
          'standard': true,
          'amount': 1,
          'weight': 0,
          'transfer': 0,
          'forkliftId': '',
          'forkliftName': '',
          'desc': '',
        },
        formData: {
          stackList: [],
          forkliftList: [],
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        }
      };
    },
    created() {
      this.load();
    },
    components: {
      statusSelect,
      rankSelect,
      typeVarietyGradeSelect,
    },
    methods: {
      forkliftChange() {
        this.formItem.forkliftName = this.formData.forkliftList.find((item) => {
          return item.id === this.formItem.forkliftId;
        }).title;
      },
      //是否标件改变事件
      standardChange() {
        if (this.formItem.standard === true) {
          this.weightDisable = true;
          this.amountDisable = false;
          this.formItem.weight = 0;
          this.formItem.amount = 0;
          this.minWeight = 0; //标件重量为0
        } else {
          this.weightDisable = false;
          this.amountDisable = true;
          this.formItem.weight = 1;
          this.formItem.amount = 1;
          this.minWeight = 0.000001; //非标件重量不允许为0
        }
      },
      load() {
        /*this.$message({
          message: '当前组织下没有启用账套，请及时配置！',
          type: 'error',
        });*/
        if (!this.item) {
          this.cantSave = true;
          this.formItem.billId = '';
          return;
        }
        this.cantSave = false;
        this.stack = '';
        this.acceptData = JSON.parse(JSON.stringify(this.item));
        this.formItem.billId = this.acceptData.id;
        this.formItem.number = this.acceptData.number;
        this.formItem.organizationId = this.acceptData.organization.organizationId;
        this.formItem.organizationName = this.acceptData.organization.organizationName;
        this.formItem.organizationCode = this.acceptData.organization.organizationCode;
        this.formItem.organizationOrder = this.acceptData.organization.organizationOrder;
        if (this.acceptData.warehouse) {
          this.formItem.warehouse = this.acceptData.warehouse.id;
        }
        if (this.acceptData.region) {
          this.formItem.region = this.acceptData.region.id;
        }
        if (this.acceptData.annual) {
          this.formItem.year = this.acceptData.annual.toString();
        } else {
          this.formItem.year = new Date().getFullYear().toString();

        }
        this.getStack();
        this.getForklift();
      },
      getStack() {
        Promise.all([stackApi.getAll({
          sort: 'name',
          size: 500,
          search: 'region.id:EQ:{region};'.format({
            region: this.formItem.region,
          })
        })])
          .then(([response]) => {
            this.formData.stackList = response.content;
            if (this.formData.stackList.length > 0) {
              this.stack = this.formData.stackList[0].id;
            }
          })
          .catch(error => {
          });
      },
      getForklift() {
        Promise.all([forkliftApi.getAll({
          size: 500,
          sort: 'number,ASC',
          search: 'organization.organizationId:rlike:{orgid};'.format({
            orgid: this.formItem.organizationId,
          })
        })])
          .then(([response]) => {
            this.formData.forkliftList = response.content;
            if (this.formData.forkliftList.length > 0) {
              this.formItem.forkliftId = this.formData.forkliftList[0].id;
              this.formItem.forkliftName = this.formData.forkliftList[0].title;
            }
          })
          .catch(error => {
          });
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          // 校验烟叶相关必填数据
          if (!(this.formItem.varietyId && this.formItem.gradeId && this.formItem.typeId)) {
            this.$message({
              message: '请填写烟叶类型相关数据',
              type: 'info',
            });
            return;
          }
          let data = JSON.parse(JSON.stringify(this.formItem));
          data.stack = this.stack;
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([billItemApi.saveBillItem(data)])
              .then(([response]) => {
                loading.close();
                this.formReset('formValidate');
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.$emit('refresh2');
              })
              .catch(error => {
                loading.close();

              });
          } else {
            this.$message({
              message: this.$t('message.formValidate'),
              type: 'warn',
            });
          }
        });
      },

      formReset(name) {
        this.$refs[name].resetFields();
      },

    },
    watch: {
      item(curVal, oldVal) {
        this.load();
      },
    },
  };
</script>
