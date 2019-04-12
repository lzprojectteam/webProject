<template>
  <el-form label-width="80px"
           ref="formValidate">

    <el-form-item :label="$t('menu.belongSystem')">
      <el-select v-model="formData.systemId"
                 @change="onSystemChanged"
                 style="width: 100%">
        <el-option v-for="item in formData.systemList"
                   :value="item.id"
                   :key="item.id"
                   :label="item.name">
          <span>{{ item.name }}</span>
          <span style="float:right;color:#ccc">[{{ item.code }}]</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('role.menuTree')">
          <el-tree ref="menuTree"
                   :data="formData.menuList"
                   show-checkbox
                   accordion
                   style="min-height: 300px"
                   node-key="id"
                   :indent='32'
                   :default-checked-keys="formData.menuSelect"
                   @node-click="onMenuSelectListener" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('role.menuElement')">
          <el-row>
            <el-col>
              <el-checkbox :label="$t('base.allSelect')"
                           @on-change="onElementAllCheckedListener"
                           style="float: left"
                           v-model="formData.elementCheckedAll">
                <i class="android-checkbox-outline"></i>
                <span>{{$t('base.allSelect')}}</span>
              </el-checkbox>
              <el-button plain type="ghost"
                         icon="iconfont el-iconfont-brush"
                         @click="onSubmitElementClick('')"
                         style="float: right"
                         size="small"></el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-checkbox-group v-model="formData.elementSelect"
                                 @on-change="onElementSelectListener">
                <el-checkbox v-for="item in formData.elementList"
                             :label="item.id"
                             :key="item.id">
                  <i :class="item.icon"></i>
                  <span>{{ item.name}}</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>

        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>

      <el-button plain type="primary"
                 style="float: right"
                 @click="onSubmitMenuClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import systemApi from "../../api/apiSystem";
import menuApi from "../../api/apiMenu";
import userApi from "@/api/base/apiUser";

export default {
  props: ["roleId", "roleType"],
  data() {
    return {
      formData: {
        systemList: [],
        menuList: [],
        menuSelect: [],
        elementList: [],
        systemId: "",
        elementSelect: [],
        elementCheckedAll: false,
        menuId: ""
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
  watch: {
    roleId(curVal, oldVal) {
      //this.formData.systemList = [];
      this.formData.menuList = [];
      this.formData.menuSelect = [];
      this.formData.elementList = [];
      this.formData.elementSelect = [];
      this.formData.systemId = "";
      this.formData.menuId = "";
      this.formData.elementCheckedAll = false;
    }
  },
  methods: {
    onSubmitMenuClick(name) {
      var selectItemList = this.$refs["menuTree"].getCheckedNodes(true);
      let resIds = [];
      for (var item of selectItemList) {
        resIds.push(item.id);
      }
      this.onSubmit("MENU", resIds);
    },
    onSubmitElementClick(name) {
      var selectItemList = this.formData.elementSelect;
      let resIds = [];
      for (var item of selectItemList) {
        resIds.push(item);
      }
      if (resIds.length === 0) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }
      Promise.all([
        userApi.saveElementPrivilege(
          this.roleId,
          this.roleType,
          this.formData.systemId,
          this.formData.menuId,
          { resourceIds: resIds }
        )
      ])
        .then(([response]) => {
          //重置表单，允许多次操作
          this.$message({
            message: this.$t("message.saveAndContinue"),
            type: "info"
          });
        })
        .catch(error => {
          console.log(error);
          this.$Message.info({
            content: error,
            duration: 10,
            closable: true
          });
        });
    },
    onSubmit(resourceType, resrouceIds) {
      Promise.all([
        userApi.savePrivilege(
          this.roleId,
          this.roleType,
          this.formData.systemId,
          resourceType,
          { resourceIds: resrouceIds }
        )
      ])
        .then(([response]) => {
          this.$message({
            message: this.$t("message.saveAndContinue"),
            type: "info"
          });
        })
        .catch(error => {});
    },
    onSystemChanged(data) {
      this.formData.menuList = [];
      this.formData.menuSelect = [];
      //查询对应系统的全部菜单和已经存在的菜单
      Promise.all([
        menuApi.getValidMenuTree(this.formData.systemId, this.roleId, {
          size: 400,
          number: 0,
          keyword: "%"
        }),
        userApi.getMenuPrivilege(this.roleId, this.roleType)
      ])
        .then(([menuList, exsitMenuList]) => {
          let menuTree = [];
          for (var item of menuList) {
            var menu = {};
            menu.id = item.id;
            menu.label = item.title;
            menu.leaf = item.leaf;
            if (item.child.length > 0) {
              menu.children = this.buildMenuTree(item);
            } else {
              menu.children = [];
            }
            menuTree.push(menu);
          }
          for (var it of exsitMenuList) {
            this.formData.menuSelect.push(it.resourceId);
          }
          this.formData.menuList = menuTree;
        })
        .catch(error => {
          console.log(error);
        });
    },
    buildMenuTree(item) {
      let list = [];
      for (var it of item.child) {
        var menu = {};
        menu.id = it.id;
        menu.label = it.title;
        menu.leaf = it.leaf;
        if (it.child.length > 0) {
          menu.children = this.buildMenuTree(it);
        }
        list.push(menu);
      }
      return list;
    },
    onMenuSelectListener(data) {
      console.log(data);
      this.formData.menuId = "";
      this.formData.elementSelect = [];
      this.formData.elementCheckedAll = false;
      if (data.leaf) {
        Promise.all([
          menuApi.getElementByMenuId(data.id, {
            size: 400,
            number: 0,
            keyword: "%"
          }),
          userApi.getElementPrivilege(this.roleId, this.roleType, data.id)
        ])
          .then(([elementList, exsitElementList]) => {
            this.formData.menuId = data.id;
            this.formData.elementList = elementList.content;

            for (var item of exsitElementList) {
              this.formData.elementSelect.push(item.resourceId);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.formData.elementList = [];
      }
    },

    onElementSelectListener(data) {
      if (
        this.formData.elementSelect !== undefined &&
        this.formData.elementSelect.length === this.formData.elementList.length
      ) {
        this.formData.elementCheckedAll = true;
      } else {
        this.formData.elementCheckedAll = false;
      }
    },

    onElementAllCheckedListener(data) {
      if (data) {
        // 如果是全选
        let elementSelect = [];
        for (var item of this.formData.elementList) {
          elementSelect.push(item.id);
        }
        this.formData.elementSelect = elementSelect;
      } else {
        // 取消全选
        this.formData.elementSelect = [];
      }
    }
  }
};
</script>
