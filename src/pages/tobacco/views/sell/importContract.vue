<template>
  <el-form label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.common.organization')">
      <organization :root="userOrgId"
                    style="width:100%"
                    :code.sync="formData.organizationId"
                    :name.sync="formData.organizationName" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.common.area')">
      <area-select :value.sync="formData.areaId"
                   :label.sync="formData.areaName"
                   style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.common.type')">
      <type-variety :type-id.sync="formData.typeId"
                    :type-name.sync="formData.typeName"
                    :variety-id.sync="formData.varietyId"
                    :variety-name.sync="formData.varietyName" />
    </el-form-item>
    <el-form-item>
      <el-upload ref="upload"
                 style="text-align: center;"
                 :headers="header"
                 :data="formData"
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
                 style="float: right "
                 @click="submitUpload('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import { getToken } from "@/utils/cookieUtils";
export default {
  props: ["visible"],
  components: {
    organization: () => import("@/components/Organization"),
    "type-variety": () => import("@/components/Tobacco/typeVarietySelect"),
    "area-select": () => import("../components/areaSelect")
  },
  data() {
    return {
      formData: {
        organizationId: "",
        organizationName: "",
        typeId: "",
        typeName: "",
        varietyId: "",
        varietyName: "",
        areaId: "",
        areaName: ""
      },
      header: {
        Authorization: getToken()
      },
      uploadUrl: this.getRootPath(),
      ruleValidate: {
        organizationId: [
          { required: true, message: "请选择组织单位", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择烟叶类型", trigger: "blur" }
        ],
        varietyId: [
          { required: true, message: "请选择烟叶品种", trigger: "blur" }
        ],
        areaId: [{ required: true, message: "请选择烟叶价区", trigger: "blur" }]
      }
    };
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
  // 获取页面初始化的数据
  created() {},
  methods: {
    submitUpload(name) {
      if (
        this.formData.organizationId === undefined ||
        this.formData.organizationId === null ||
        this.formData.organizationId === ""
      ) {
        this.$message({
          message: "请正确选择组织单位",
          type: "info"
        });
        return;
      }
      if (
        this.formData.typeId === undefined ||
        this.formData.typeId === null ||
        this.formData.typeId === ""
      ) {
        this.$message({
          message: "请正确选择烟叶类型",
          type: "info"
        });
        return;
      }
      if (
        this.formData.varietyId === undefined ||
        this.formData.varietyId === null ||
        this.formData.varietyId === ""
      ) {
        this.$message({
          message: "请正确选择烟叶品种",
          type: "info"
        });
        return;
      }
      if (
        this.formData.areaId === undefined ||
        this.formData.areaId === null ||
        this.formData.areaId === ""
      ) {
        this.$message({
          message: "请正确选择烟叶价区",
          type: "info"
        });
        return;
      }
      this.$refs.upload.submit();
    },
    getRootPath() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/zuul/tobacco/api/tsell/seContract/upload/contract";
    },
    onUploadSuccess(response, file, fileList) {
      console.log(response);
      this.$message({
        message: response.data,
        type: "info"
      });
    }
  }
};
</script>
