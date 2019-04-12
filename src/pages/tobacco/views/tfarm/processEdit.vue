 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.process.lead')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.lead" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.leaf')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.leaf" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code"
                disabled />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.begin')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.begin" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.end')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.end" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.from')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.from" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.to')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.to" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.target')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.target" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.sampling')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sampling" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.accurate')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.accurate" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.camera')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.camera" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.location')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.location" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.area')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.area" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.rate')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.rate" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.score')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.score" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.icon')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.icon" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.style')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.style" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.visible')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.position')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.position" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.process.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
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
import processApi from "../../api/tfarm/apiDesignScheme";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        lead: "",
        leaf: true,
        code: "",
        name: "",
        title: "",
        begin: 0,
        end: 0,
        from: 0,
        to: 0,
        target: 0,
        sampling: 0,
        accurate: 0,
        camera: 0,
        location: 0,
        amount: true,
        area: true,
        rate: true,
        score: true,
        icon: "",
        style: "",
        visible: true,
        position: 0,
        control: 0,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
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
      //移除不相关的
      this.formItem.parent = undefined;
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([processApi.updateProcess(this.item.id, this.formItem)])
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
