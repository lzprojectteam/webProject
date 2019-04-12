<template>
  <el-form :model="formItem"
           label-width="100px"
           :rules="ruleValidate"
           ref="formValidate">

    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.basic.card.content')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.content" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.basic.card.model')">
      <el-select v-model="formItem.model"
                 style="width: 100%">
        <el-option value="0"
                   label="烟框卡" />
        <el-option value="1"
                   label="等级卡" />
        <el-option value="2"
                   label="烟包卡" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.type')">
      <el-select v-model="formItem.type"
                 style="width: 100%">
        <el-option value="RFID"
                   label="RFID" />
        <el-option value="IC"
                   label="IC" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.usage')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.usage" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.basic.card.sheetName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sheetName" />
    </el-form-item>

    <el-form-item>
      <el-upload ref="upload"
                 style="text-align: center;"
                 :headers="header"
                 :data="formItem"
                 :auto-upload="false"
                 :limit="1"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                 drag
                 :action="uploadUrl"
                 :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip"
             slot="tip">只能上传xls/xlsx文件</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
const OrganizationForm = () => import("@/components/Organization");
import { getToken } from "@/utils/cookieUtils";
export default {
  data() {
    return {
      formItem: {
        content: "",
        model: "1",
        type: "RFID",
        usage: "",
        sheetName: "",
        organizationId: this.$store.state.user.organization.organizationId,
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.$store.state.user.organization.organizationId
      },
      header: {
        Authorization: getToken()
      },
      uploadUrl: this.getRootPath(),
      ruleValidate: {
        code: [{ required: true, message: "二维码不能为空", trigger: "blur" }],
        id: [{ required: true, message: "内码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem.organizationId = this.userOrgId;
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
    getRootPath() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/zuul/tobacco/api/basic/card/import/cards";
    },
    organizationOnchange(label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
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
        this.formItem.content === undefined ||
        this.formItem.content === null ||
        this.formItem.content === ""
      ) {
        this.$message({
          message: "请录入有效内容",
          type: "info"
        });
        return;
      }
      this.$refs.upload.submit();
    },
    onUploadSuccess(response, file, fileList) {
      this.$message({
        message: response.data,
        type: "info"
      });
    }
  }
};
</script>
