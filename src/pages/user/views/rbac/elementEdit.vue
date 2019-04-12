<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('element.belongSystem')"
                  prop="systemId">
      <el-select v-model='formItem.systemId'
                 style="width: 100%"
                 @change='onSystemChanged'>
        <el-option value='-'
                   key='-'>{{ $t('base.all') }} </el-option>
        <el-option v-for="item in  formData.systemList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('menu.parent')">
      <el-cascader :options='formData.menuList'
                   v-model='formData.selectMenu'
                   :props='menuProps'
                   @change="onMenuSelect"
                   style="width: 100%"></el-cascader>
    </el-form-item>
    <el-form-item :label="$t('element.type')">
      <el-select v-model='formItem.type'
                 style="width: 100%"
                 @change='onTypeChanged'>

        <el-option v-for="item in  formData.commonActionList"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id">
        </el-option>
      </el-select>

    </el-form-item>
    <el-form-item :label="$t('element.commonAction')">
      <el-select v-model='formData.action'
                 style="width: 100%"
                 @change='onActionChanged'>

        <el-option v-for="item in  formData.actionList"
                   :key="item.id"
                   :label="item.label"
                   :value="item.id">
        </el-option>
      </el-select>

    </el-form-item>
    <el-form-item :label="$t('base.code')"
                  prop="code">
      <el-input v-model="formData.inputCode"
                :placeholder="$t('base.pleaseInput')">
        <div slot="prepend"
             style="min-width: 40px;text-align: left;">
          <span>{{ formData.prefixCode}}</span>
        </div>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('base.icon')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.icon" />
    </el-form-item>
    <el-form-item :label="$t('base.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('base.sortBy')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.sortBy" />
    </el-form-item>

    <el-form-item :label="$t('element.url')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.url" />
    </el-form-item>
    <el-form-item :label="$t('base.visible')">
      <el-switch v-model="formItem.visible"
                 size="large">
        <span slot="open">{{ $t('base.true') }}</span>
        <span slot="close">{{ $t('base.false') }}</span>
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 v-show="isEdit"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
      <el-button plain type="primary"
                 style="float: right;margin-right: 10px"
                 v-show="isEdit"
                 @click="innerVisible=true">{{ $t('base.buttonSelectIcon') }}
      </el-button>
    </el-form-item>
    <el-dialog title="选择图标"
               :visible.sync="innerVisible"
               top="10px"
               append-to-body>
      <icon-list />
    </el-dialog>
  </el-form>
</template>
<script>
import elementApi from "../../api/apiElement";
import menuApi from "../../api/apiMenu";
import systemApi from "../../api/apiSystem";
import iconList from "@/components/Icon";

export default {
  props: ["item", "isEdit", "visible"],
  components: {
    "icon-list": iconList
  },
  data() {
    return {
      innerVisible: false,
      menuProps: {
        label: "title",
        // disabled: 'leaf',
        value: "id",
        children: "child"
      },
      formData: {
        systemList: [],
        menuList: [],
        topMenu: [],
        prefixCode: "",
        inputCode: "",
        action: "",
        actionList: [
          { id: "VIEW", label: this.$t("base.buttonView") },
          { id: "ADD", label: this.$t("base.buttonAdd") },
          { id: "EDIT", label: this.$t("base.buttonEdit") },
          { id: "DELETE", label: this.$t("base.buttonDelete") },
          { id: "REVIEW", label: this.$t("base.buttonReview") }
        ],
        commonActionList: [{ id: "BUTTON", label: "按钮" }]
      },
      formItem: {},
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    Promise.all([systemApi.getAll()])
      .then(([systems]) => {
        this.formData.systemList = systems.content;
      })
      .catch(error => {});
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      this.formItem.code.lastIndexOf(":");
      this.formItem.systemId = this.formItem.menu.systemId;
      this.formData.prefixCode = this.formItem.code.substr(
        0,
        this.formItem.code.lastIndexOf(":") + 1
      );
      this.formData.inputCode = this.formItem.code.substr(
        this.formItem.code.lastIndexOf(":") + 1
      );
      this.onSystemChanged();
      let exsit = this.formateAncestry(this.formItem.menu.ancestry);
      exsit.push(this.formItem.menu.id);
      this.formData.selectMenu = exsit;
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        // 进行前端检验
        if (valid) {
          Promise.all([elementApi.updateElement(this.item.id, this.formItem)])
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
    },
    onTypeChanged(value) {
      var item = this.formData.commonActionList.find(item => {
        return item.id === value;
      });
      this.formItem.typeName = item.label;
    },
    onActionChanged(value) {
      var item = this.formData.actionList.find(item => {
        return item.id === value;
      });
      this.formData.inputCode = value;
      this.formItem.name = item.label;
    },
    onSystemChanged() {
      this.formData.selectMenu = [];
      Promise.all([
        menuApi.getMenuTree(this.formItem.menu.systemId, {
          size: 400,
          number: 0,
          keyword: "%"
        })
      ])
        .then(([response]) => {
          //先将结果转化为JSON，操作完成后，再将JSON串转化数组
          this.formData.menuList = JSON.parse(
            JSON.stringify(response).replaceAll(',"child":\\[\\]', "")
          );
        })
        .catch(error => {});
    },
    onMenuSelect(value) {
      console.log(value);
      var currentId = value !== undefined ? value[value.length - 1] : "1";
      var currentItem;
      for (var item of this.formData.menuList) {
        currentItem = this.searchTree(item, currentId);
        if (currentItem !== null) {
          break;
        }
      }

      if (currentItem !== null) {
        this.formData.prefixCode = currentItem.mark + ":";
        this.formItem.menu = currentId;
      }
    },
    searchTree(element, id) {
      if (element.id === id) {
        return element;
      } else if (element.child != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < element.child.length; i++) {
          result = this.searchTree(element.child[i], id);
        }
        return result;
      }
      return null;
    },
    formateAncestry(data) {
      let topMenu = [];
      if (data === null || data === undefined || data === "") {
        return topMenu;
      }

      var jsoData = JSON.parse(data);
      for (var value of jsoData) {
        topMenu.push(value.id);
      }
      return topMenu;
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
