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
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totAmount" disabled
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.weight1')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight1" disabled
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原发金额">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.oriMoney" disabled
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samAmount')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samAmount" disabled
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="复检总重量">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totalWeight2" disabled
                           style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samBundle')">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samBundle"
                           @change="handleSamBundleChange"
                           style="width: 100%" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="复检等级">
          <type-grade-select
            :typeId.sync="formItem.typeId_temp" :typeName.sync="formItem.typeName_temp"
            :allData.sync="allData"
            :gradeId.sync="formItem.samGradeId" :gradeName.sync="formItem.samGradeName"
            :gradeCode.sync="formItem.samGradeCode" style="width:100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="height: 47px;">
        <el-form-item label="复检把数">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bundle" style="width: 100%"
                           @change="handleBundleChange"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="复检重量">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight2" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="复检金额">
          <el-input-number v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samMoney" style="width: 100%"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="所占比例">
          <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.percent">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.billCheckItem.desc')">
          <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
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
    props: ['item', 'items', 'isEdit', 'visible'],
    data() {
      return {
        allData: {},
        formItem: {
          oriMoney: 0,
          samMoney: 0,
          'totalWeight2': '',
          'countryId': '86',
          'countryName': '中国',
          'tyear': '',
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
        billCheckItemList: [],
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
      handleBundleChange(val) {
        this.formItem.weight2 = this.formItem.totalWeight2 * (val / this.formItem.samBundle);
        this.formItem.percent = val / this.formItem.samBundle * 100;
        this.formItem.weight2 = this.formItem.weight2.toFixed(2); //保留两位小数
        this.formItem.percent = this.formItem.percent.toFixed(2); //保留两位小数
      },
      handleSamBundleChange(val) {
        this.formItem.weight2 = this.formItem.totalWeight2 * (this.formItem.bundle / val);
        this.formItem.percent = this.formItem.bundle / val * 100;
        this.formItem.weight2 = this.formItem.weight2.toFixed(2); //保留两位小数
        this.formItem.percent = this.formItem.percent.toFixed(2); //保留两位小数

      },
      load() {
        this.formItem = JSON.parse(JSON.stringify(this.item));
        this.billCheckItemList = JSON.parse(JSON.stringify(this.items));
        if (this.formItem.tyear !== '' && this.formItem.tyear !== null) {
          this.formItem.tyear = this.formItem.tyear.toString();
        }
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
        this.$refs[name].validate((valid) => { //进行前端检验
          if (valid) {
            //已有数据执行更新操作
            if (this.item.itemIndex === '' || this.item.itemIndex === undefined) {
              Promise.all([billCheckItemApi.updateBillCheckItem(this.item.id, this.formItem)])
                .then(([response]) => {
                  this.$message({
                    message: this.$t('message.editAndExid'),
                    type: 'success',
                  });
                  for (var i = 0, len = this.billCheckItemList.length; i < len; i++) {
                    if (this.billCheckItemList[i].id === this.formItem.id) {
                      this.billCheckItemList[i] = this.formItem;
                      break;
                    }
                  }
                  this.$emit('refresh', this.billCheckItemList);
                  this.$emit('update:visible', false);
                })
                .catch(error => {
                });
            } else {// 临时数据执行保存操作
              for (var i = 0, len = this.billCheckItemList.length; i < len; i++) {
                if (this.billCheckItemList[i].itemIndex === this.formItem.itemIndex) {
                  this.billCheckItemList[i] = this.formItem;
                  break;
                }
              }
              this.$message({
                message: this.$t('message.editAndExid'),
                type: 'success',
              });
              this.$emit('refresh', this.billCheckItemList);
              this.$emit('update:visible', false);

            }
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
