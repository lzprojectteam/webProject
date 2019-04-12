 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('xbasic.organizationAlias.organizationId')">
      <organization-form root="0"
                         style="width:100%"
                         :code.sync="formItem.organizationId" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.aliasId')">
      <template>
        <el-select v-model="formItem.aliasId"
                   filterable
                   allow-create
                   default-first-option
                   style="width:100%">
          <el-option key="AMAP"
                     label="AMAP"
                     value="AMAP" />
          <el-option key="IOP"
                     label="IOP"
                     value="IOP" />
          <el-option key="HS"
                     label="海晟"
                     value="HS" />
        </el-select>
      </template>
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.key')"
                  prop="key">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.key" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.code')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('xbasic.organizationAlias.desc')">
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
import organizationAliasApi from "../../api/xbasic/apiOrganizationAlias";
export default {
  props: ["item", "isEdit", "visible"],
  components: {
    "organization-form": () => import("@/components/Organization")
  },
  data() {
    return {
      formItem: {
        organizationId: "",
        aliasId: "",
        key: "",
        code: "",
        name: "",
        desc: ""
      },
      ruleValidate: {
        key: [{ required: true, message: "别名编码不能为空", trigger: "blur" }]
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
      if (
        this.formItem.organizationId === undefined ||
        this.formItem.organizationId === null ||
        this.formItem.organizationId === ""
      ) {
        this.$message({
          message: "请正确选择组织单位",
          type: "info"
        });
        return;
      }
      if (
        this.formItem.aliasId === undefined ||
        this.formItem.aliasId === null ||
        this.formItem.aliasId === ""
      ) {
        this.$message({
          message: "请设置分类",
          type: "info"
        });
        return;
      }
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            organizationAliasApi.updateOrganizationAlias(
              this.item.id,
              this.formItem
            )
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
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
