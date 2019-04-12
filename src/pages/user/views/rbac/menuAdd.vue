<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           status-icon>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('menu.belongSystem')"
                      prop="systemId">
          <el-select v-model='formItem.systemId'
                     style="width: 100%"
                     @change='onSystemChanged'>
            <el-option v-show="false"
                       value='-'
                       key='-'>{{ $t('base.all') }}</el-option>
            <el-option v-for="item in  formData.systemList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>

          </el-select>

        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('menu.parent')">
          <el-cascader :options='formData.menuList'
                       change-on-select
                       v-model='formData.topMenu'
                       :props='menuProps'
                       @change='onTopChanged'
                       style="width: 100%"
                       clearable />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('base.code')">
          <el-input v-model="formData.inputCode"
                    :placeholder="$t('base.pleaseInput')">
            <div slot="prepend"
                 style="min-width: 40px;text-align: left;">
              <span>{{ formData.prefixCode}}</span>
            </div>
          </el-input>

        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('menu.shortTitle')">
          <el-input v-model="formItem.shortTitle"
                    :placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('menu.title')"
                  prop="title">
      <el-input v-model="formItem.title"
                :placeholder="$t('base.pleaseInput')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('menu.url')"
                  prop="url">
      <el-input v-model="formItem.url"
                :placeholder="$t('base.pleaseInput')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('menu.path')">
      <el-input v-model="formItem.path"
                :placeholder="$t('base.pleaseInput')"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('menu.icon')">
          <el-row>
            <el-col :span="16">
              <el-input v-model="formItem.icon"
                        :placeholder="$t('base.pleaseInput')" />
            </el-col>
            <el-col :span="2">
              <i :class="formItem.icon"
                 style="font-size: 24px;margin-left: 5px" />
            </el-col>

          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('menu.bigIcon')">
          <el-row>
            <el-col :span="16">
              <el-input v-model="formItem.bigIcon"
                        :placeholder="$t('base.pleaseInput')" />
            </el-col>
            <el-col :span="2">
              <i :class="formItem.bigIcon"
                 style="font-size: 24px;margin-left: 5px" />
            </el-col>

          </el-row>

        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item :label="$t('menu.mark')">
      <el-input v-model="formItem.mark"
                :placeholder="$t('base.pleaseInput')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('menu.templet')">
      <el-input v-model="formItem.templet"
                :placeholder="$t('base.pleaseInput')"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('menu.style')">
          <el-input v-model="formItem.style"
                    style="width: auto" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('menu.sortBy')">
          <el-input-number v-model="formItem.sortBy"
                           :min="1"
                           :max="1000"
                           style="width: auto" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item :label="$t('base.visible')">
          <el-switch v-model="formItem.visible"
                     size="large">
            <span slot="open">{{ $t('base.true') }}</span>
            <span slot="close">{{ $t('base.false') }}</span>
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('menu.leaf')">
          <el-switch v-model="formItem.leaf"
                     size="large">
            <span slot="open">{{ $t('base.true') }}</span>
            <span slot="close">{{ $t('base.false') }}</span>
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item :label="$t('menu.cache')">
          <el-switch v-model="formItem.cacheMenu"
                     size="large">
            <span slot="open">{{ $t('base.true') }}</span>
            <span slot="close">{{ $t('base.false') }}</span>
          </el-switch>
        </el-form-item>
      </el-col>

    </el-row>

    <el-form-item>
      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
      <el-button plain type="primary"
                 style="float: right;margin-right: 10px"
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
import systemApi from "../../api/apiSystem";
import menuApi from "../../api/apiMenu";
import iconList from "@/components/Icon";

export default {
  components: {
    "icon-list": iconList
  },
  data() {
    return {
      innerVisible: false,
      menuProps: {
        label: "title",
        disabled: "leaf",
        value: "id",
        children: "child"
      },
      formData: {
        systemList: [],
        menuList: [],
        topMenu: [],
        prefixCode: "",
        inputCode: ""
      },
      formItem: {
        systemId: "",
        code: "",
        title: "",
        shortTitle: "",
        url: "",
        sortBy: 999,
        icon: "iconfont el-iconfont-workbench_fill",
        bigIcon: "iconfont el-iconfont-shezhi",
        parentId: "",
        ancestry: "",
        mark: "",
        templet: "",
        visible: true,
        leaf: false,
        path: "",
        style: "",
        cacheMenu: true
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        systemId: [{ required: true, message: "必须选择", trigger: "blur" }],
        title: [{ required: true, message: "必须输入", trigger: "blur" }],
        url: [{ required: true, message: "必须输入", trigger: "blur" }]
      }
    };
  },
  created() {
    Promise.all([systemApi.getAll()])
      .then(([systems]) => {
        this.formData.systemList = systems.content;
      })
      .catch(error => {});
  },
  methods: {
    onSubmitClick(name) {
      if (
        this.formData.topMenu !== undefined &&
        this.formData.topMenu.length > 0
      ) {
        this.formItem.parentId = this.formData.topMenu[
          this.formData.topMenu.length - 1
        ];
      }
      if (
        this.formData.inputCode === null ||
        this.formData.inputCode === undefined ||
        this.formData.inputCode === ""
      ) {
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: h("i", { style: "color: teal" }, "编码不能为空")
        });
        return;
      }
      this.formItem.code = this.formData.prefixCode + this.formData.inputCode;
      this.$refs[name].validate(valid => {
        // 进行前端检验
        const h = this.$createElement;
        if (valid) {
          Promise.all([menuApi.saveMenu(this.formItem)])
            .then(([response]) => {
              //重置表单，允许多次操作
              this.formReset(name);
              this.formData.prefixCode = "";
              this.formData.inputCode = "";
              this.formItem.code = "";
              this.formItem.parentId = "";
              this.formData.topMenu = [];
              this.$notify({
                title: "提示",
                message: h("i", { style: "color: teal" }, "保存成功")
              });
            })
            .catch(error => {});
        } else {
          this.$notify({
            title: "提示",
            message: h("i", { style: "color: teal" }, "表单验证失败")
          });
        }
      });
    },
    onSystemChanged(data) {
      var item = this.formData.systemList.find(item => {
        return item.id === data;
      });
      if (
        this.formItem.code === null ||
        this.formItem.code === undefined ||
        this.formItem.code === ""
      ) {
        this.formData.prefixCode = item.code;
      }
      var systemId = data;
      if (systemId === undefined || systemId === "") {
        systemId = "-";
      }
      Promise.all([
        menuApi.getMenuTree(systemId, {
          size: 400,
          number: 0,
          keyword: "%"
        })
      ])
        .then(([menus]) => {
          this.formData.selectMenu = [];
          this.formData.menuList = menus;
        })
        .catch(error => {});
    },
    onTopChanged(ids) {
      var currentItem;
      for (var item of this.formData.menuList) {
        currentItem = this.searchTree(item, ids[ids.length - 1]);
        if (currentItem !== null) {
          break;
        }
      }
      this.formData.prefixCode = currentItem.code;
      this.formData.url = currentItem.url;
      if (currentItem.child === undefined) {
        this.formData.inputCode = "01";
      } else {
        let length = currentItem.child.length + 1;
        if (length < 10) {
          this.formData.inputCode = "0" + length;
        } else {
          this.formData.inputCode = length;
        }
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
    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
