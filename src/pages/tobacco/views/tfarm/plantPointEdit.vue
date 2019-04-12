 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.annual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.annual" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.number')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.number" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.countryId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.countryId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.countryName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.countryName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.manager')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.manager" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.contact')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.contact" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.area')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.area" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.shed')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.shed" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.box')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.box" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.plant')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.plant" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.grown')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.grown" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.sprout')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sprout" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.path')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.path" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.pictures')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.pictures" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.score')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.score" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.plantPoint.desc')">
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
import plantPointApi from "../../api/tfarm/apiPlantPoint";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        annual: 0,
        serial: "",
        number: "",
        title: "",
        author: "",
        date: "",
        countryId: "",
        countryName: "",
        manager: "",
        contact: "",
        area: 0,
        shed: 0,
        box: 0,
        plant: 0,
        grown: 0,
        sprout: 0,
        path: "",
        pictures: "",
        score: 0,
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
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([plantPointApi.update(this.item.id, this.formItem)])
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
