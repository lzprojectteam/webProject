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
          <el-input v-model="formItem.systemName"
                    disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('menu.parent')">
          <el-cascader :options='formData.menuList'
                       change-on-select
                       v-model='formData.topMenu'
                       :props='menuProps'
                       @change='onTopChanged'
                       style="width: 100%"></el-cascader>
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
    <el-form-item label="入库类型"
                  v-if="billType">
      <el-select v-model="formItem.path"
                 style="width: 100%"
                 placeholder="选择后将自动填充路径">
        <el-option v-for="item in formData.billTypeList"
                   :key="item.label"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('menu.url')"
                  prop="url">
      <el-input v-model="formItem.url_temp"
                :placeholder="$t('base.pleaseInput')">
        <template slot="append">{{'/' + formData.alias}}</template>
      </el-input>
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
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
      <el-button type="primary"
                 style="float: right;margin-right: 10px"
                 @click="innerVisible=true">{{
        $t('base.buttonSelectIcon') }}
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
import menuApi from "@/api/base/apiMenu";
import iconList from "@/components/Icon";

export default {
  props: ["item", "isEdit", "visible"],
  components: {
    "icon-list": iconList
  },
  data() {
    return {
      billType: false,
      innerVisible: false,
      menuProps: {
        label: "title",
        disabled: "leaf",
        value: "id",
        children: "child"
      },
      formData: {
        billTypeList: [
          {
            label: "同步入库",
            value: "/tobacco/tstorage/billInList"
          },
          {
            label: "异步入库",
            value: "/tobacco/tstorage/billIn_asynList"
          },
          {
            label: "异步移库入库",
            value: "/tobacco/tstorage/billIn_RemoveList"
          }
        ], //入库类型
        systemList: [],
        menuList: [],
        topMenu: [],
        prefixCode: "",
        inputCode: "",
        alias: ""
      },
      formItem: {
        systemId: "",
        systemName: "",
        code: "",
        title: "",
        shortTitle: "",
        url: "",
        url_temp: "",
        sortBy: 999,
        icon: "iconfont el-iconfont-workbench_fill",
        bigIcon: "iconfont el-iconfont-shezhi",
        parentId: "",
        ancestry: "",
        mark: "",
        templet: "",
        visible: true,
        leaf: true,
        path: "",
        style: "",
        cacheMenu: false
      },
      acceptData: {},
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        systemId: [{ required: true, message: "必须选择", trigger: "blur" }],
        title: [{ required: true, message: "必须输入", trigger: "blur" }],
        url_temp: [{ required: true, message: "必须输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem.systemId = this.$store.state.user.system.id;
    this.formItem.systemName = this.$store.state.user.system.name;
    this.formData.prefixCode = this.formItem.systemId;
    Promise.all([
      menuApi.getMenuTree(this.formItem.systemId, {
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
    this.load();
    /*Promise.all([systemApi.getAll()])
        .then(([systems]) => {
          this.formData.systemList = systems.content;
        })
        .catch(error => {});*/
  },
  methods: {
    load() {
      //接收数据拷贝
      this.acceptData = JSON.parse(JSON.stringify(this.item));
      /*
               判断当前在配置那种类型的页面
        */
      if (this.acceptData.balance === 1) {
        //入库
        this.formItem.url_temp = "/tstorage/billIn";
        if (this.acceptData.alias === "E101") {
          // 实收入库
          this.formItem.path = "/tobacco/tstorage/billIn_ssrkList";
          this.billType = false;
        } else {
          this.formItem.path = "";
          this.billType = true;
        }
        /*else if (this.acceptData.immediate) {
            if (this.acceptData.relationId) {//同步移库入库
              this.formItem.path = '/tobacco/tstorage/billIn_RemoveList';
            } else {//同步入库
              this.formItem.path = '/tobacco/tstorage/billInList';
            }
          } else {//异步移库入库
            this.formItem.path = '/tobacco/tstorage/billIn_asynList';
          }*/
      } else if (this.acceptData.balance === -1) {
        //出库
        this.billType = false;
        this.formItem.url_temp = "/tstorage/billOut";
        if (this.acceptData.immediate) {
          if (this.acceptData.relationId) {
            //同步移库出库
            this.formItem.path = "/tobacco/tstorage/billOut_RemoveList";
          } else {
            //同步出库
            this.formItem.path = "/tobacco/tstorage/billOutList";
          }
        } else {
          //异步移库出库
          this.formItem.path = "/tobacco/tstorage/billOut_RemoveList";
        }
      } else {
        this.formItem.url_temp = "请先配置出入库类型";
      }
      this.formData.alias = this.acceptData.alias; //显示的路由后面追加的
      this.formItem.title = this.acceptData.name;
      this.formItem.shortTitle = this.acceptData.name;
    },
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
      this.formItem.url = this.formItem.url_temp + "/" + this.formData.alias; // 拼接path
      this.formItem.code = this.formData.prefixCode + this.formData.inputCode;
      this.$refs[name].validate(valid => {
        // 进行前端检验
        const h = this.$createElement;
        if (valid) {
          Promise.all([menuApi.saveMenu(this.formItem)])
            .then(([response]) => {
              //重置表单，允许多次操作
              // this.formData.prefixCode = this.formItem.systemId;
              /*this.formItem.url_temp = '';
                this.formItem.url = '';*/
              this.formItem.title = "";
              this.formItem.shortTitle = "";
              /*this.formReset(name);
                this.formData.inputCode = '';
                this.formItem.code = '';
                this.formItem.parentId = '';
                this.formData.topMenu = [];*/
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
  },
  watch: {
    item(curVal, oldVal) {
      this.acceptData = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
