 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.processData.year')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.year" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.time')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.time" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.countryName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.countryName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.farmerNumber')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.farmerNumber" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.farmerName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.farmerName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.relatedNumber')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.relatedNumber" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.relatedName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.relatedName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.area')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.area" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.content" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.path')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.path" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.pictures')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.pictures" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.rate')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.rate" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.score')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.score" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.processData.desc')">
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
import processDataApi from "../../api/tfarm/apiProcessData";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        year: 0,
        title: "",
        author: "",
        date: "",
        time: "",
        countryName: "",
        farmerNumber: "",
        farmerName: "",
        relatedNumber: "",
        relatedName: "",
        amount: 0,
        area: 0,
        content: "",
        path: "",
        pictures: "",
        rate: 0,
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
          Promise.all([processDataApi.update(this.item.id, this.formItem)])
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
