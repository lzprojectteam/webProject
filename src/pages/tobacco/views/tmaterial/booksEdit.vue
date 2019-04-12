 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.books.code')"
                  prop='code'>
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.code" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.name')"
                  prop='name'>
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.annual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.annual" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.month')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.month" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.startAnnual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.startAnnual" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.startMonth')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.startMonth" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.createDate')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.createDate" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.status')">
      <el-select clearable
                 v-model="formItem.status"
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
    <el-form-item :label="$t('tobacco.tmaterial.books.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.leader')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.leader" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.books.telphone')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.telphone" />
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
import booksApi from "../../api/tmaterial/apiBooks";
const status = [
  { value: 0, label: "编辑" },
  { value: 5, label: "启用" },
  { value: 7, label: "冻结" },
  { value: 9, label: "停用" }
];
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      statusList: status,
      formItem: {
        code: "",
        name: "",
        annual: 0,
        month: 0,
        startAnnual: 0,
        startMonth: 0,
        createDate: "",
        status: 0,
        author: "",
        leader: "",
        telphone: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
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
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([booksApi.update(this.item.id, this.formItem)])
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
