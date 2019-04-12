 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.typeId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.typeId"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.attributeId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.attributeId"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.enumId')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.enumId"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.key')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.key"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.value')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.value"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.facilityAttributeEnum.desc')">
      <el-input
        type="textarea"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        v-show='isEdit'
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import facilityAttributeEnumApi from '../../api/tmisc/api_facilityAttributeEnum';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      formItem: {
        typeId: '',
        attributeId: 0,
        enumId: 0,
        key: '',
        value: '',
        position: 0,
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
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            facilityAttributeEnumApi.updateFacilityAttributeEnum(
              this.item.id,
              this.formItem
            )
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
