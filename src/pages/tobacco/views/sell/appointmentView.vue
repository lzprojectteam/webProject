 <template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.annual')">
                    <span>{{formItem.annual}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.serial')">
                    <span>{{formItem.serial}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.barcode')">
                    <span>{{formItem.barcode}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.number')">
                    <span>{{formItem.number}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.title')">
                    <span>{{formItem.title}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.author')">
                    <span>{{formItem.author}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.date')">
                    <span>{{dateFormat(formItem.date,'yyyy-mm-dd')}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.contractSerial')">
                    <span>{{formItem.contractSerial}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.contractNumber')">
                    <span>{{formItem.contractNumber}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.farmerName')">
                    <span>{{formItem.farmerName}}</span>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span=12>

                <el-form-item :label="$t('tobacco.tsell.appointment.year')">
                    <span>{{formItem.year}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.typeName')">
                    <span>{{formItem.typeName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.partName')">
                    <span>{{formItem.partName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.weight')">
                    <span>{{formItem.weight}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.begin')">
                    <span>
                        <span>{{dateFormat(formItem.begin,'HH:MM:ss')}}</span>
                    </span>
                </el-form-item>
            </el-col>
            <el-col :span=12>

                <el-form-item :label="$t('tobacco.tsell.appointment.end')">
                    <span>{{dateFormat(formItem.end,'HH:MM:ss')}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.control')">
                    <span>{{formItem.control}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.contractArea')">
                    <span>{{formItem.contractArea}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.contractPlant')">
                    <span>{{formItem.contractPlant}}</span>
                </el-form-item>
            </el-col>
            <el-col :span=12>
                <el-form-item :label="$t('tobacco.tsell.appointment.contractWeight')">
                    <span>{{formItem.contractWeight}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item :label="$t('tobacco.tsell.appointment.varietryNames')">
            <span>{{formItem.varietryNames}}</span>
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointment.desc')">
            <span>{{formItem.desc}}</span>
        </el-form-item>
    </el-form>
</template>
<script>
import appointmentApi from '../../api/tsell/api_appointment';
import dateFormat from 'dateformat';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        annual: 0,
        serial: '',
        barcode: '',
        number: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        contractSerial: '',
        contractNumber: '',
        farmerName: '',
        year: 0,
        typeName: '',
        partName: '',
        weight: 0,
        begin: '',
        end: '',
        control: 0,
        contractArea: 0,
        contractPlant: 0,
        contractWeight: 0,
        varietryNames: '',
        filePath: '',
        pictures: '',
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    dateFormat(date, pattern) {
      return dateFormat(date, pattern);
    },
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            appointmentApi.updateAppointment(this.item.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
              this.$emit('update:visible', false);
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
<style>

</style>
