<template>
  <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.billId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.billId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.checkId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.checkId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.item_id')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.item_id"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.countryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.countryName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.countryName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tyear')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tyear"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.ttypeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.ttypeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.ttypeName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.ttypeName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tstatusId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tstatusId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tstatusName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tstatusName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tvarietyId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tvarietyId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.tvarietyName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.tvarietyName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.trankId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.trankId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.trankName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.trankName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.oriGradeCode')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.oriGradeCode"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.oriGradeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.oriGradeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.oriGradeName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.oriGradeName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samGradeId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samGradeId"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samGradeCode')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samGradeCode"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samGradeName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samGradeName"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.totAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.totAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.amount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.weight1')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight1"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.weight2')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.weight2"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.samBundle')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.samBundle"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.bundle')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.bundle"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.percent')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.percent"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.moisture')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.moisture"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.mildew')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.mildew"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.insect')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.insect"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.hollowAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.hollowAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.hollowWeight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.hollowWeight"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.rainWetAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rainWetAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.rainWetWeight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.rainWetWeight"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.unqualifiedAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.unqualifiedAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.unqualifiedWeight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.unqualifiedWeight"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.peculiarAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.peculiarAmount"/>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tstorage.billCheckItem.peculiarWeight')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.peculiarWeight"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import billCheckItemApi from '../../api/tstorage/api_billCheckItem';

  export default {
    data() {
      return {
        formItem: {
          'billId': '',
          'checkId': 0,
          'item_id': 0,
          'countryId': '',
          'countryName': '',
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
          'percent': '',
          'moisture': '',
          'mildew': '',
          'insect': '',
          'hollowAmount': 0,
          'hollowWeight': '',
          'rainWetAmount': 0,
          'rainWetWeight': '',
          'unqualifiedAmount': 0,
          'unqualifiedWeight': '',
          'peculiarAmount': 0,
          'peculiarWeight': '',
        },
        ruleValidate: {
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],

        }
      };
    },
    created() {

    },
    methods: {
      onSubmitClick(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '处理中,请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            Promise.all([billCheckItemApi.saveBillCheckItem(this.formItem)])
              .then(([response]) => {
                loading.close();
                this.formReset(name);
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t('message.saveAndContinue'),
                  type: 'info',
                });

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

    }
  };
</script>
