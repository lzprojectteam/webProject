<template>
  <el-tabs ref="tab"
           v-model="editableTabsValue"
           type="card"
           @tab-click="onTabClick"
           class="tab-wrap"
           @edit="handleTabsEdit">
    <el-tab-pane v-for="tag in visitedViews"
                 :key="tag.path"
                 :label="tag.title"
                 :name="tag.path"
                 class="tags-view-item"
                 :data="tag"
                 :closable="tag.path!=='/dashboard'"
                 @contextmenu.prevent.native="openMenu(tag,$event)" />
  </el-tabs>
</template>
<script >
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "首页",
          name: "1",
          path: "/",
          closable: false
        }
      ],
      visible: false,
      top: 0,
      left: 0,
      selectedTag: { path: "" }
    };
  },
  mounted() {
    console.log("激活");
    this.addViewTags();
  },
  computed: {
    visitedViews() {
      return this["$store"].state.tagsView.visitedViews;
    }
  },
  watch: {
    $route() {
      this.addViewTags();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  methods: {
    onTabClick(item) {
      this.$router.push(item.$attrs.data.fullpath);
    },
    generateRoute() {
      if (this.$route.name || this.$route.meta.id) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return (
        this.$route.meta.id === route.name ||
        route.path === this.$route.path ||
        route.name === this.$route.name
      );
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.editableTabsValue = route.path;
      this.$store.dispatch("addVisitedViews", route);
    },

    closeSelectedTag(view) {
      this.$store.dispatch("delVisitedViews", view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.fullpath);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {});
    },
    closeAllTags() {
      this.$store.dispatch("delAllViews");
      this.$router.push("/");
    },
    handleTabsEdit(targetName, action) {
      //console.log("删除");
      if (action === "remove") {
        let tabs = this.visitedViews;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          let item = tabs.find((tab, index) => {
            return tab.path === targetName;
          });
          this.closeSelectedTag(item);
        }

        //   this.editableTabsValue = activeName;
      }
    },
    openMenu(tag, e) {
      this.visible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    }
  }
});
</script>
<style scoped >
.tab-wrap {
  margin: 3px 5px;
  height: 40px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
//reset element css of el-icon-close

.tags-view-item {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
