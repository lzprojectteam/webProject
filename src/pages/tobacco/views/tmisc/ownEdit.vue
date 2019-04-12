 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('base.id')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.id"
        readonly="true"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.own.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.own.entry')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.entry"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.own.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.own.visible')">
      <el-select v-model="formItem.visible">
        <el-option
          v-for="item in visibleoptions"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.own.desc')">
      <el-input
        type="textarea"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
        rows="4"
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
import ownApi from '../../api/tmisc/api_own';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      visibleoptions: [
        {
          value: true,
          label: '可见'
        },
        {
          value: false,
          label: '不可见'
        }
      ],
      formItem: {
        name: '',
        entry: '',
        visible: true,
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
          Promise.all([ownApi.updateOwn(this.item.id, this.formItem)])
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
