<template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
        <el-row>
            <el-col :span="24">
                <el-form-item :label="$t('tobacco.tsell.receipt.title')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.annual')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annual" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.type')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.type" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.serial')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.number')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.author')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.date')">
                    <el-date-picker v-model="formItem.date" type="date" style="width:100%;" :placeholder="$t('base.pleaseSelect')">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.countryId')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.countryName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.contractId')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.contractNumber')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerId')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerNumber')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerIdentity')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerPhone')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.farmerAddress')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.bankName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.bankAccount')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.weight')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.money')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.price')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.tax')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tax" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.allowance')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.allowance" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.total')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.total" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.sign')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sign" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.file')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.file" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.delivery')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.delivery" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.tag')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tag" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.receipt.control')">
                    <el-select v-model='formItem.control' style="100%">
                        <el-option v-for="item in  selectData.controls" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control" /> -->
                </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item type="textarea" :rows="6" :label="$t('tobacco.tsell.receipt.desc')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
                </el-form-item>
            </el-col>
        </el-row>
        <!-- <el-form-item :label="$t('tobacco.tsell.receipt.annual')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annual" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.serial')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.number')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.type')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.type" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.title')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.author')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.date')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.date" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.countryId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.countryName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.contractId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.contractNumber')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerNumber')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerNumber" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerIdentity')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerPhone')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.farmerAddress')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.bankName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.bankAccount')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.weight')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.money')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.price')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.tax')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tax" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.allowance')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.allowance" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.total')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.total" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.sign')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.sign" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.file')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.file" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.delivery')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.delivery" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.tag')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tag" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.control')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.receipt.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
        </el-form-item> -->

        <el-form-item>
            <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import receiptApi from '../../api/tsell/api_receipt';
export default {
  data() {
    return {
      selectData: {
        controls: [
          { id: 1, name: '交售' },
          { id: 3, name: '作废单' },
          { id: 5, name: '正常单' },
          { id: 6, name: '冲红单' },
          { id: 7, name: '冲红原始单' }
        ]
      },
      formItem: {
        annual: 0,
        serial: '',
        number: '',
        type: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        contractId: '',
        contractNumber: '',
        farmerId: '',
        farmerNumber: '',
        farmerName: '',
        farmerIdentity: '',
        farmerPhone: '',
        farmerAddress: '',
        bankName: '',
        bankAccount: '',
        weight: 0,
        money: 0,
        price: 0,
        tax: 0,
        allowance: 0,
        total: 0,
        sign: '',
        file: '',
        delivery: '',
        tag: 0,
        control: 0,
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '处理中,请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          Promise.all([receiptApi.saveReceipt(this.formItem)])
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
