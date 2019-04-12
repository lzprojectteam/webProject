<template>
  <el-form label-width="100px">
    <el-form-item :label="$t('tobacco.setup.parameter.annual')">
      <el-date-picker value-format="yyyy" v-model="searchData.annual" type="year" :placeholder="$t('base.pleaseSelect')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.payment.dateRange')">
      <el-date-picker v-model="formData.beginAndEnd" type="daterange" range-separator="至" :start-placeholder="$t('tobacco.basic.annual.begin')" :end-placeholder="$t('tobacco.basic.annual.end')" style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{$t('tobacco.tsell.payment.export')}}
        </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import paymentApi from '../../api/tsell/api_payment';

export default {
  data() {
    return {
      searchData: {
        annual: '',
        beginDate: '',
        endDate: ''
      },
      formData: {
        beginAndEnd: [
          this.dateFormat(this.getFirstDate(), 'yyyy-mm-dd'),
          this.dateFormat(this.getLastDate(), 'yyyy-mm-dd')
        ]
      }
    };
  },
  created() {
    this.searchData.annual = new Date().getFullYear().toString();
  },
  components: {},
  methods: {
    onSubmitClick: function() {
      alert('导出成功！');
    }
  }
};
</script>
