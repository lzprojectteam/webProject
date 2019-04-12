 <template>
    <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
         <el-form-item :label="$t('tobacco.tsell.appointmentTime.title')" prop="title">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointmentTime.subtitle')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.subtitle" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointmentTime.startTime')" prop="startTime">

            <el-time-picker v-model="formItem.startTime" value-format="HH:mm:ss" style="width:100%;" :placeholder="$t('base.pleaseSelect')"/>

        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointmentTime.endTime')" prop="endTime">
            <el-time-picker v-model="formItem.endTime"  value-format="HH:mm:ss" style="width:100%;" :placeholder="$t('base.pleaseSelect')"/>
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointmentTime.position')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.position" />
        </el-form-item>
        <el-form-item :label="$t('tobacco.tsell.appointmentTime.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.desc" />
        </el-form-item>

        <el-form-item>
            <el-button v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import appointmentTimeApi from '../../api/tsell/api_appointmentTime';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        title: '',
        subtitle: '',
        startTime: '',
        endTime: '',
        position: 0,
        desc: ''
      },
      ruleValidate: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        startTime: [{ required: true, message: '开始时间未指定', trigger: 'blur' }],
        endTime: [{ required: true, message: '结束时间未指定', trigger: 'blur' }],
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
          Promise.all([
            appointmentTimeApi.updateAppointmentTime(
              this.item.id,
              this.formItem
            )
          ])
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
