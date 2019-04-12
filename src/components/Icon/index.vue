<style scoped>
  @import "~@/styles/css/main-list.css";

  .icons-item {
    float: left;
    margin: 6px 6px 6px 0;
    width: 145px;
    text-align: center;
    list-style: none;
    cursor: pointer;
    height: 100px;
    color: #5c6b77;
    transition: all .2s ease;
    position: relative;
    padding-top: 10px;
  }

  .icons {
    overflow: hidden;
    zoom: 1;
  }

  .icons-item p {
    padding-top: 15px;
    margin: 5px;
    width: 100%;
    height: auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
</style>
<template>

  <div class="mainPanel">
    <div class="toolPanel">
      <div class="queryCriteria">
        <el-form inline >
         <el-form-item :label="$t('base.keywords')">
                <el-input v-bind:placeholder="$t('base.ipKeywords')"
                          v-model="keyword"
                          @keyup.enter.native="searchButtonClick"/>
              </el-form-item>
        </el-form>
      </div>
      <div class="toolButton">
        <el-button plain type="primary" @click="searchButtonClick">{{ $t('base.buttonSearch') }} </el-button>
      </div>
    </div>
    <main class="contentPanel">
      <div class="icons">
        <div class="icons-item" v-for="(item,index ) in currentList" :key="index">
          <div style="text-align:center" :data-clipboard-text="formatIcon(item)" class="itemClass"
               @click="toast($t('base.clipboard'))">
            <i :class="formatIcon(item)" style="font-size: 32px"/>
            <p>
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </main>
    <div class="footerPanel">

    </div>
  </div>

</template>
<script>
  /* eslint-disable no-unused-vars */

  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        iconList: [],
        keyword: '',
        page: 0,
        size: 10,
        currentList: [],
        searchLoading: false,
        pagination: {//用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
      };
    },
    mounted() {
      const clipboard = new Clipboard('.itemClass');
      this.checkIcon();
    },
    props: ['model'],
    computed: {},
    watch: {
      keyword: 'searchButtonClick'
    },
    methods: {
      checkIcon() {
        let styleSheets = document.styleSheets;
        for (var ss of styleSheets) {
          var cssList = ss.cssRules;
          for (var item of cssList) {

            if (item.selectorText !== undefined && item.selectorText.indexOf('.el-icon') === 0) { // 如果是以这个前缀开关的，则认为是图标文件
              var cssArray = item.selectorText.split('::');
              if (cssArray.length === 2 && !this.iconList.includes(cssArray[0])) {
                this.iconList.push(cssArray[0].substr(1));
              }
            }
          }
        }

        this.currentList = this.iconList;
      },
      searchButtonClick() {
        this.currentList = [];
        let key = this.keyword.split(' ');
        var kk = key[0];
        if (key.length === 2) {
          kk = key[1];
        }
        let tlist = [];
        for (var item of this.iconList) {
          if (item.indexOf(kk) !== -1) {
            tlist.push(item);
          }
        }
        this.currentList = tlist;
      },
      toast(message) {
        this.$message({
          message: message,
          type: 'info',
        });
      },
      formatIcon(icon) {
        if (icon.indexOf('el-iconfont') === 0) {
          return 'iconfont ' + icon;
        }
        return icon;
      },
    }
  };
</script>
