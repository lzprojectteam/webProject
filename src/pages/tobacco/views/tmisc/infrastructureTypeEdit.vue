 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-form-item :label="$t('tobacco.tmisc.infrastructureType.lead')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.lead"
      />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmisc.infrastructureType.name')">
      <el-input
        v-bind:placeholder="$t('base.pleaseInput')"
        v-model="formItem.name"
      />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.shape')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.shape"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.entry')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.entry"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.icon')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.icon"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.style')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.style"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.position')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.position"
            type="number"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.control')">
          <el-select
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.control"
            style="width:100%;"
          >
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.leaf')">
          <el-select
            v-model="formItem.leaf"
            style="width:100%;"
          >
            <el-option
              v-for="item in leafoptions"
              :value="item.value"
              :key="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructureType.visible')">
          <el-select
            v-model="formItem.visible"
            style="width:100%;"
          >
            <el-option
              v-for="item in visibleoptions"
              :value="item.value"
              :key="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.tmisc.infrastructureType.desc')">
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
import infrastructureTypeApi from '../../api/tmisc/api_infrastructureType';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      status: [
        {
          value: 1,
          label: '新增'
        },
        {
          value: 3,
          label: '删除'
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
        },
        {
          value: '',
          label: '全部'
        }
      ],
      visibleoptions: [
        {
          value: true,
          label: '可见'
        },
        {
          value: false,
          label: '不可见'
        },
        {
          value: '',
          label: '全部'
        }
      ],
      formItem: {
        lead: '',
        leaf: true,
        name: '',
        shape: '',
        entry: '',
        icon: '',
        style: '',
        visible: true,
        position: 0,
        control: 0,
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
            infrastructureTypeApi.updateInfrastructureType(
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
