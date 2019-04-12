 <template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
        <el-row>
            <el-col :span="24">
                <el-form-item :label="$t('tobacco.tsell.payment.title')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.annual')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annual" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.control')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.number')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.number" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.serial')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.author')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.date')">
                    <el-date-picker v-model="formItem.date" type="date" style="width:100%;" :placeholder="$t('base.pleaseSelect')">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.countryId')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.countryName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.contractNumber')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.contractNumber" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.farmerId')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerId" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.farmerName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.farmerIdentity')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerIdentity" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.farmerPhone')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerPhone" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.farmerAddress')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.farmerAddress" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.bankName')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.bankAccount')">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bankAccount" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.weight')" prop="weight">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.money')" prop="money">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.money" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.price')" prop="price">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.price" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.tax')" prop="tax">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tax" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.allowance')" prop="allowance">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.allowance" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.payable')" prop="payable">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.payable" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.deduct')" prop="deduct">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.deduct" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('tobacco.tsell.payment.paid')" prop="paid">
                    <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.paid" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item :label="$t('tobacco.tsell.payment.desc')">
                    <el-input type="textarea" :rows="6" v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
            <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import paymentApi from '../../api/tsell/api_payment';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        annual: 0,
        serial: '',
        number: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        contractNumber: '',
        farmerId: '',
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
        payable: 0,
        deduct: 0,
        paid: 0,
        control: 0,
        desc: ''
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
        payable: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        deduct: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ],
        paid: [
          {
            pattern: /^\d+(?=\.{0,1}\d+$|$)/,
            message: '只能是数字',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([paymentApi.updatePayment(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset('formValidate');
              this.$message({
                message: this.$t('message.editAndExid'),
                type: 'success',
              });
              this.$emit('update:visible', false);
              this.$emit('refresh');
            })
            .catch(error => {});
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
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
