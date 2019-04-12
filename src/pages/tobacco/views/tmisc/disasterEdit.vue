 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.disaster.lead')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.lead"
      />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmisc.disaster.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.detail')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.detail"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.picture')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.picture"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.icon')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.icon"
      />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.disaster.position')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.position"
        type="number"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.disaster.visible')">
          <el-select
            v-model="formItem.visible"
            style="width:100%;"
          >

            <el-option
              v-for="item in visibleOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.disaster.leaf')">
          <el-select
            v-model="formItem.leaf"
            style="width:100%;"
          >

            <el-option
              v-for="item in leafoptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item :label="$t('tobacco.tmisc.disaster.desc')">
      <el-input
        type="textarea"
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.desc"
        rows="4"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import disasterApi from '../../api/tmisc/api_disaster';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      visibleOptions: [
        {
          value: true,
          label: '可见'
        },
        {
          value: false,
          label: '不可见'
        }
      ],
      leafoptions: [
        {
          value: true,
          label: '节点'
        },
        {
          value: false,
          label: '非节点'
        }
      ],
      formItem: {
        lead: '',
        leaf: true,
        name: '',
        detail: '',
        picture: '',
        icon: '',
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
          Promise.all([disasterApi.updateDisaster(this.item.id, this.formItem)])
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
