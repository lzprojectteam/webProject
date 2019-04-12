 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.measure.lead')">
      <el-cascader :options="measureList"
                   ref="measure"
                   :props="measureProps"
                   style="width:100%"
                   v-model="formItem.leads"
                   clearable
                   @change="handleChange">
      </el-cascader>
    </el-form-item>
    <el-form-item :label="$t('base.code')"
                  prop="id">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.id" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.measure.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.measure.convert')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.convert" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.measure.dividend')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.dividend" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.measure.divisor')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.divisor" />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmaterial.measure.leaf')">
          <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"
                       v-model="formItem.leaf" />
        </el-form-item>
      </el-col>
      <el-col :span="12">

        <el-form-item :label="$t('tobacco.tmaterial.measure.comm')">
          <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"
                       v-model="formItem.comm" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item :label="$t('tobacco.tmaterial.measure.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                type="textarea"
                :span="4"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import measureApi from "../../api/tmaterial/apiMeasure";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        comm: true,
        convert: 0,
        desc: "",
        dividend: 0,
        divisor: 0,
        leaf: true,
        mark: "",
        name: "",
        lead: ""
      },
      measureList: [],
      measureProps: {
        value: "id",
        label: "name"
      },
      ruleValidate: {
        id: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      Promise.all([measureApi.getTree(0)])
        .then(([response]) => {
          this.measureList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([measureApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {});
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
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
