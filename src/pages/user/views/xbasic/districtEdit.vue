 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.district.lead')">
      <organization-form root="51"
                         @onchange="organizationOnchange"
                         model="district"
                         style="width:100%" />
    </el-form-item>

    <el-form-item :label="$t('xbasic.district.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code"
                disabled="true" />
    </el-form-item>

    <el-form-item :label="$t('xbasic.district.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.sname')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sname" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.iname')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.iname" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.ids')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.ids" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.names')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.names" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.snames')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.snames" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.inames')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.inames" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.alpha')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.alpha" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.district.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item>
      <el-button plain v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import districtApi from "../../api/xbasic/apiDistrict";
const OrganizationForm = () => import("@/components/Organization");
export default {
  props: ["item", "isEdit", "visible"],
  components: {
    OrganizationForm
  },
  data() {
    return {
      formItem: {
        countryId: "",
        districtId: "",
        code: "",
        lead: "",
        leaf: true,
        name: "",
        sname: "",
        iname: "",
        ids: "",
        names: "",
        snames: "",
        inames: "",
        alpha: "",
        desc: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    organizationOnchange(label, value, labels, values) {
      this.formItem.districtId = value;
      let codes = value.split("_");
      this.formItem.code = codes[codes.length - 1];
      let names = "";
      for (let ll of labels) {
        names += ll + "-";
      }
      this.formItem.names = names;
    },
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([districtApi.updateDistrict(this.item.id, this.formItem)])
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
