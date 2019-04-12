<template>
  <el-form :model="formItem"
           label-width="0px"
           ref="formValidate"
           v-if="formType">
    <el-form-item>
      <el-input type="textarea"
                v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.inputData"
                :autosize="{ minRows: 8, maxRows: 16}"
                style="width: 100%"
                autofocus
                ref="inputForm" />
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="20"><span style="font-size:12px;"
                v-if="type"> * 若要配置组织单位查询参数 格式为必须 url?属性名={organizationId}</span>
          <span style="font-size:12px;"
                v-else>&nbsp;</span>
        </el-col>
        <el-col :span="4">
          <el-button plain type="primary"
                     style="float: right"
                     @click="onSubmitClick('formValidate')">{{
            $t('base.buttonSave') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <el-form :model="formItem"
           ref="formValidate"
           label-width="80px"
           v-else>
    <el-row>
      <el-col :span="10">
        <el-form-item label="key/value">
          <el-input v-model="formItem.propKey"
                    v-bind:placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="label">
          <el-input v-model="formItem.propLabel"
                    v-bind:placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-button plain type="primary"
                   style="float: right"
                   @click="onSubmitClick('formValidate')">{{
          $t('base.buttonSave') }}
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: ["item", "isEdit", "visible", "form", "type"],
  data() {
    return {
      formType: false,
      formItem: {
        inputData: "",
        propKey: "",
        propLabel: ""
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      if (this.form !== "propForm") {
        this.formType = true;
        this.formItem.inputData = JSON.parse(JSON.stringify(this.item)).data;
      } else {
        if (
          JSON.parse(JSON.stringify(this.item)).props !== "" &&
          JSON.parse(JSON.stringify(this.item)).props !== null &&
          JSON.parse(JSON.stringify(this.item)).props !== undefined
        ) {
          this.formItem.propKey = JSON.parse(
            JSON.parse(JSON.stringify(this.item)).props
          ).key;
          this.formItem.propLabel = JSON.parse(
            JSON.parse(JSON.stringify(this.item)).props
          ).label;
        } else {
          this.formItem.propKey = "";
          this.formItem.propLabel = "";
        }
      }
    },
    onSubmitClick() {
      if (this.formType) {
        this.item.data = this.formItem.inputData;
      } else {
        var props = {};
        props.key = this.formItem.propKey;
        props.label = this.formItem.propLabel;
        this.item.props = JSON.stringify(props);
      }
      this.$emit("update:item", this.item);
      this.$emit("update:visible", false);
    }
  },
  watch: {
    item(curVal, oldVal) {
      this.load();
      if (this.formType) {
        this.$refs["inputForm"].focus(); //使输入框获得焦点
      }
    }
  }
};
</script>
