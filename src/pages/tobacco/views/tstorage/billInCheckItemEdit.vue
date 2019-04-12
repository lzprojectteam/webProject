<template>
  <el-form :model="formItem" label-width="120px" :rules="ruleValidate" ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.ttypeName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.ttypeName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tstatusName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tstatusName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tvarietyName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tvarietyName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.oriGradeName')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.oriGradeName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.totAmount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totAmount" disabled style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.amount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.weight1')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight1" disabled style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.weight2')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight2" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samGradeName')">
          <type-grade-select
            :typeId.sync="formItem.typeId_temp" :typeName.sync="formItem.typeName_temp"
            :allData.sync="allData"
            :gradeId.sync="formItem.samGradeId" :gradeName.sync="formItem.samGradeName"
            :gradeCode.sync="formItem.samGradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height:47px">
        <el-form-item label="合格件数">
          <el-input-number style="width: 100%;" v-model="formItem.qualifiedAmount"
                           @change="handleAmountChange"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合格重量">
          <el-input-number style="width: 100%;" v-model="formItem.qualifiedWeight"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="水分含量">
          <el-input-number style="width: 100%;" v-model="formItem.percent"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="水分超标件数">
          <el-input-number style="width: 100%;" v-model="formItem.moisture"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="合格率">
          <el-input style="width: 100%;" v-model="formItem.qualifiedPass">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="无使用">
          <el-input-number style="width: 100%;" v-model="formItem.unused"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.desc')">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"
                    style="width: 100%;"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  const typeGradeSelect = () => import('@/components/Tobacco/typeGradeSelect');
  import billCheckItemApi from '../../api/tstorage/api_billCheckItem';

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        allData: {},
        formItem: {
          'billId': '',
          'checkId': 0,
          'item_id': 0,
          'countryId': '86',
          'countryName': '中国',
          'tyear': 0,
          'ttypeId': '',
          'ttypeName': '',
          'tstatusId': '',
          'tstatusName': '',
          'tvarietyId': '',
          'tvarietyName': '',
          'trankId': '',
          'trankName': '',
          'desc': '',
          'oriGradeCode': '',
          'oriGradeId': '',
          'oriGradeName': '',
          'samGradeId': '',
          'samGradeCode': '',
          'samGradeName': '',
          'totAmount': 0,
          'amount': 0,
          'samAmount': 0,
          'weight1': 0,
          'weight2': 0,
          'samBundle': 0,
          'bundle': 0,
          'mildew': '',
          'insect': '',
          'hollowAmount': 0,
          'hollowWeight': '',
          'rainWetAmount': 0,
          'rainWetWeight': '',
          'unqualifiedAmount': 0,
          'unqualifiedWeight': '',
          'peculiarAmount': 0,
          'qualifiedAmount': 0,
          'qualifiedWeight': 0,
          'percent': 0,
          'moisture': 0,
          'qualifiedPass': 0,
          'unused': '',
          'typeId_temp': '',
          'typeName_temp': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
        }
      };
    },
    components: {
      typeGradeSelect,
    },
    created() {
      this.load();
    },
    methods: {
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        //先重置对象,不然组件watch不生效
        this.allData = {};
        //初始化烟叶类型等数据，用于回显
        this.allData['typeId'] = this.formItem.ttypeId;
        this.allData['gradeId'] = this.formItem.samGradeId;
        this.formItem.typeId_temp = this.formItem.ttypeId;
        this.formItem.typeName_temp = this.formItem.ttypeName;
      },
      handleAmountChange(val) {
        this.formItem.qualifiedWeight = this.formItem.weight1 / this.formItem.totAmount * val;
        this.formItem.qualifiedWeight = this.formItem.qualifiedWeight.toFixed(2); //保留两位小数
        this.formItem.qualifiedPass = val / this.formItem.totAmount * 100;
        this.formItem.qualifiedPass = this.formItem.qualifiedPass.toFixed(2); //保留两位小数
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {//进行前端检验
          if (valid) {
            Promise.all([billCheckItemApi.updateBillCheckItem(this.item.id, this.formItem)])
              .then(([response]) => {
                this.$message({
                  message: this.$t('message.editAndExid'),
                  type: 'success',
                });
                this.$emit('update:visible', false);
                this.$emit('refresh');
              })
              .catch(error => {

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
        this.formItem = JSON.parse(JSON.stringify(curVal));
        this.load();
      },
    },
  };
</script>
