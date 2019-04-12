<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.transportItem.transportId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.transportNumber" disabled/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.year')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.year"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
      <status-select :label.sync="formItem.statusName" :value.sync="formItem.statusId" :key.sync="formItem.statusId"
                     style="width:100%;"/>
    </el-form-item>

    <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
      <type-variety-grade-select :varietyName.sync="formItem.varietyName" :varietyId.sync="formItem.varietyId"
                                 :typeId.sync="formItem.typeId" :typeName.sync="formItem.typeName"
                                 :gradeId.sync="formItem.gradeId" :gradeName.sync="formItem.gradeName"
                                 :gradeCode.sync="formItem.gradeCode" style="width:100%;"/>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.transportItem.standard')">
          <el-switch v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.standard" @change="standardChange"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.amount')" prop="amount">
      <el-input-number v-model="formItem.amount" style="width: 100%" :disabled="amountDisable" :min="1"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.weight')">
      <el-input-number v-model="formItem.weight" :min="formItem.standard?0:0.00001" style="width: 100%"
                       :disabled="weightDisable"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.transportItem.desc')" prop="desc">
      <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right" :disabled="cantSave"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import transportItemApi from '../../api/tstorage/api_transportItem';

  const statusSelect = () => import('../components/statusSelect');
  const rankSelect = () => import('../components/rankSelect');
  const typeVarietyGradeSelect = () => import('@/components/Tobacco/typeVarietyGradeSelect');

  export default {
    props: ['item', 'isEdit', 'visible'],
    data() {
      return {
        weightDisable: true, //重量能否编辑
        amountDisable: false, //数量能否编辑
        cantSave: true,
        formItem: {
          'transportNumber': '',
          'transportId': '',
          'itemId': 0,
          'countryId': '',
          'countryName': '',
          'year': '',
          'typeId': '10',
          'typeName': '烤烟',
          'statusId': '101',
          'statusName': '原烟',
          'varietyId': '000',
          'varietyName': '普通品种',
          'rankId': '',
          'rankName': '',
          'gradeId': '001',
          'gradeCode': 'C1F',
          'gradeName': '中桔一',
          'standard': true,
          'amount': 1,
          'weight': 0,
          'desc': '',
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
      //是否标件改变事件
      standardChange() {
        if (this.formItem.standard === true) {
          this.weightDisable = true;
          this.amountDisable = false;
          this.formItem.weight = 0;
          this.formItem.amount = 0;
        } else {
          this.weightDisable = false;
          this.amountDisable = true;
          this.formItem.weight = 1;
          this.formItem.amount = 1;
        }
      },
      load() {
        if (!this.item) {
          this.cantSave = true;
          this.formItem.transportId = '';
          this.formItem.transportNumber = '';
          /*this.$message({
            message: '请先选择调运单',
            type: 'info',
          });*/
          return;
        }
        this.cantSave = false;
        this.acceptData = JSON.parse(JSON.stringify(this.item));
        this.formItem.transportId = this.acceptData.id;
        this.formItem.transportNumber = this.acceptData.number;
        this.formItem.organizationId = this.acceptData.organizationId;
        this.formItem.organizationName = this.acceptData.organizationName;
        this.formItem.organizationCode = this.acceptData.organizationCode;
        this.formItem.organizationOrder = this.acceptData.organizationOrder;
        if (this.acceptData.annual) {
          this.formItem.year = this.acceptData.annual.toString();
        } else {
          this.formItem.year = new Date().getFullYear().toString();
        }
      },
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            // 校验烟叶相关必填数据
            if (!(this.formItem.varietyId && this.formItem.gradeId && this.formItem.typeId)) {
              this.$message({
                message: '请填写烟叶类型相关数据',
                type: 'info',
              });
              return;
            }
            Promise.all([transportItemApi.saveTransportItem(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });
                this.$emit('refresh2');
                if (this.amountDisable) {
                  this.formItem.amount = 1;
                }
              })
              .catch(error => {
                loading.close();
                console.log(error);
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
