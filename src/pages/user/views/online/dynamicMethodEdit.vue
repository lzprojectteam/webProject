<template>
  <div>
    <el-row>
      <el-col :span="2">{{$t('dynamicMethod.query')}}</el-col>
      <el-col :span="22">
        <codemirror v-model="formItem.query"
                    :options="cmOptions"></codemirror>
      </el-col>
    </el-row>

    <el-form :model="formItem"
             label-width="80px"
             :rules="ruleValidate"
             ref="formValidate"
             inline
             style="margin-top: 10px">

      <el-form-item :label="$t('dynamicMethod.method')"
                    prop="method">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.method" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.privilege')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.privilege" />
      </el-form-item>

      <el-form-item :label="$t('dynamicMethod.version')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.versions" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.template')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.template" />
      </el-form-item>
      <el-form-item :label="$t('dynamicMethod.status')">
        <el-select v-model="formItem.status">
          <el-option value='0'
                     label="编辑"></el-option>
          <el-option value='5'
                     label="发布"></el-option>
          <el-option value='9'
                     label="作废"></el-option>
        </el-select>
      </el-form-item>

      <br />
      <el-form-item>
        <el-button plain 
                   v-show='isEdit'
                   type="primary"
                   style="float: right"
                   @click="onSubmitClick('formValidate')">{{
          $t('base.buttonSave') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import dynamicMethodApi from "../../api/online/apiDynamicMethod";
import { codemirror } from "vue-codemirror";
// require styles
import "codemirror/lib/codemirror.css";

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        dynamicSqlId: "",
        method: "",
        privilege: "",
        parameterType: "",
        resultMap: "",
        versions: 0,
        resultType: "",
        flushCache: true,
        timeout: 0,
        fetchSize: 0,
        statementType: "",
        resultSetType: "",
        databaseId: "",
        resultOrdered: true,
        resultSets: "",
        query: "",
        status: 0,
        template: ""
      },
      ruleValidate: {
        method: [{ required: true, message: "方法名不能为空", trigger: "blur" }]
      },
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "htmlmixed",
        htmlMode: true,
        matchClosing: true,
        theme: "base16-dark",
        lineNumbers: true,
        lineWrapping: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },
  components: {
    codemirror
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
          Promise.all([
            dynamicMethodApi.updateDynamicMethod(this.item.id, this.formItem)
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
