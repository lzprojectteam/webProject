 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.pack.organization')">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.code')"
                  prop="code">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.name')"
                  prop="name">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.content" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.money" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.total')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.total" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.tempBegin')">
      <el-date-picker v-model="formItem.tempBegin"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.tempEnd')">
      <el-date-picker v-model="formItem.tempEnd"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.visible')">
      <el-checkbox v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.pack.desc')">
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
const OrganizationForm = () => import('@/components/Organization');
import packApi from "../../api/tmaterial/apiPack";
import moment from "moment";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId,
        serial: "",
        barcode: "",
        code: "",
        name: "",
        alphabet: "",
        title: "",
        author: "",
        date: "",
        content: "",
        money: 0,
        discount: 0,
        price: 0,
        tax: 0,
        freight: 0,
        total: 0,
        temporary: true,
        tempBegin: "",
        tempEnd: "",
        visible: true,
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
  components: {
      OrganizationForm
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
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
      this.formItem.organizationCode = value;
    },
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.formItem.date = moment().format("YYYY-MM-DD");
      this.formItem.tempBegin = moment(this.formItem.tempBegin).format("YYYY-MM-DD");
      this.formItem.tempEnd = moment(this.formItem.tempBegin).format("YYYY-MM-DD");
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([packApi.update(this.item.id, this.formItem)])
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
