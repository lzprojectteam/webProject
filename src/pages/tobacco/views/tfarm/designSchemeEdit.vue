 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tfarm.designScheme.code')"
                  prop="code">
      <el-input placeholder="格式：年度+编号"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.shortName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.shortName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.classify')">
      <el-select v-model="formItem.classify"
                 style="width:100%">
        <el-option v-for="item in formData.classifyList"
                   :value='item.id'
                   :key='item.id'
                   :label="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.startAnnual')">
      <el-date-picker v-model="formItem.startAnnual"
                      style="width:100%"
                      type="year"
                      :clearable=false
                      value-format="yyyy"
                      :placeholder="$t('base.pleaseSelect')"></el-date-picker>

    </el-form-item>

    <el-form-item :label="$t('tobacco.tfarm.designScheme.level')">

      <el-select v-model="formItem.level"
                 style="width:100%">
        <el-option v-for="item in formData.levelList"
                   :value='item.id'
                   :key='item.id'
                   :label="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.minLevel')">

      <el-select v-model="formItem.minLevel"
                 style="width:100%">
        <el-option v-for="item in formData.levelList"
                   :value='item.id'
                   :key='item.id'
                   :label="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.allowExtend')">
      <el-checkbox v-bind:placeholder="$t('base.pleaseInput')"
                   v-model="formItem.allowExtend" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.control')">
      <el-select v-model="formItem.control"
                 style="width:100%">
        <el-option v-for="item in $t('tobacco.tfarm.designScheme.controlList')"
                   :value='item.key'
                   :key='item.key'
                   :label="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tfarm.designScheme.desc')">
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
import designSchemeApi from "../../api/tfarm/apiDesignScheme";
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
import levelApi from "@/api/xbasic/apiLevel";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        code: "",
        name: "",
        shortName: "",
        startAnnual: this.$store.state.system.annual.toString(),
        finishAnnual: 0,
        level: "",
        minLevel: "",
        allowExtend: true,
        control: 0,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "方案名称不能为空", trigger: "blur" }]
      },
      formData: {
        classifyList: [],
        levelList: []
      }
    };
  },
  created() {
    this.load();
    Promise.all([
      designSchemeClassifyApi.getAll({
        size: 500,
        page: 0,
        sort: "id,asc",
        search: "".format({})
      }),
      levelApi.getAll({
        size: 500,
        page: 0,
        sort: "id",
        search: "lead:eq:11"
      })
    ])
      .then(([response, levelResponse]) => {
        this.formData.classifyList = response.content;
        this.formData.levelList = levelResponse.content;
      })
      .catch(error => {});
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      Object.assign(this.formItem, this.formItem.organization);
      console.log(this.formItem);
      this.formItem.startAnnual = this.formItem.startAnnual.toString();
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            designSchemeApi.updateDesignScheme(this.item.id, this.formItem)
          ])
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
      //  this.formItem = JSON.parse(JSON.stringify(curVal));

      this.load();
    }
  }
};
</script>
