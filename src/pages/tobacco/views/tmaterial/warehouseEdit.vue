 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           class="cas-flex-2 cas-group">
    <el-form-item :label="$t('tobacco.common.organization')">
      <organization-form :root="userOrgId"
                         style="width:100%"
                         :code.sync="formItem.organizationId"
                         @onchange="organizationOnchange" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.code')"
                  prop='code'>
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                disabled
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.serial')"
                  prop="serial">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.keeper')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.keeper" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.name')"
                  style="width: 100%">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.warehouse.tel')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.tel" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.warehouse.initialYearMonth')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.initialYearMonth" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.currentYearMonth')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.currentYearMonth" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.control')">
      <el-select clearable
                 v-model="formItem.control"
                 filterable
                 :placeholder="$t('base.pleaseSelect')"
                 style="width: 100%">
        <el-option v-for="item in statusList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.address')"
                  style="width: 100%;">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.address" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.warehouse.desc')"
                  style="width: 100%;">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                type="textarea"
                :row="4"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import warehouseApi from "../../api/tmaterial/apiWarehouse";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        serial: "",
        code: "",
        name: "",
        keeper: "",
        tel: "",
        address: "",
        initialYearMonth: "",
        currentYearMonth: "",
        control: 0,
        desc: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationIds: [this.$store.state.user.organization.organizationId],
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        serial: [{ required: true, message: "序号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      },
      statusList: [
        { value: 1, label: "初始化" },
        { value: 3, label: "盘点状态" },
        { value: 5, label: "启用" },
        { value: 7, label: "冻结" },
        { value: 9, label: "停用" }
      ]
    };
  },
  created() {
    this.load();
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  computed: {
    userOrgId() {
      if (this.$store.state.user.organization === undefined) {
        return undefined;
      } else {
        return this.$store.state.user.organization.organizationId;
      }
    }
  },
  methods: {
    organizationOnchange(label, value, labels, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationIds = values;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
    },
    load() {
      console.log(this.item);
      this.formItem = JSON.parse(JSON.stringify(this.item));
      console.log(this.formItem);
      this.formItem.organizationId = this.item.organization.organizationId;
      this.formItem.organizationIds = this.item.organization.organizationIds;
      this.formItem.organizationCode = this.item.organization.organizationCode;
      this.formItem.organizationName = this.item.organization.organizationName;
      this.formItem.organizationOrder = this.item.organization.organizationOrder;
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([warehouseApi.update(this.item.id, this.formItem)])
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
