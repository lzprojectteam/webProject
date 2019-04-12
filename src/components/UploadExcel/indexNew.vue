<template>
  <div>
    <input type="file" multiple="false" id="sheetjs-input" accept="' + SheetJSFT + '" @change="onchange" />
    <br />
    <el-button plain type="button" id="export-table" style="visibility:hidden" @click="onexport">Export to XLSX</el-button>
    <br />
    <div id="out-table"></div>
     <collapse>
      <v-table v-show="isActive" :width="1000" :columns="columns" :table-data="tableData" :show-vertical-border="false"></v-table>
    </collapse>
    <button @click="isActive = true">展开/折叠</button>
   

  </div>

</template>

<script>
import XLSX from 'xlsx';
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable';
import collapse from '../../utils/collapse.js';
export default {
  components: { VTable, VPagination, collapse },
  data() {
    return {
      loading: false,
      isActive: false,
      excelData: {
        header: null,
        results: null
      },
      SheetJSFT: this.formateJSFT(),
      tableData: [
        {
          name: '赵伟',
          tel: '156*****1987',
          hobby: '钢琴、书法、唱歌',
          address: '上海市黄浦区金陵东路569号17楼'
        },
        {
          name: '李伟',
          tel: '182*****1538',
          hobby: '钢琴、书法、唱歌',
          address: '上海市奉贤区南桥镇立新路12号2楼'
        },
        {
          name: '孙伟',
          tel: '161*****0097',
          hobby: '钢琴、书法、唱歌',
          address: '上海市崇明县城桥镇八一路739号'
        },
        {
          name: '周伟',
          tel: '197*****1123',
          hobby: '钢琴、书法、唱歌',
          address: '上海市青浦区青浦镇章浜路24号'
        },
        {
          name: '吴伟',
          tel: '183*****6678',
          hobby: '钢琴、书法、唱歌',
          address: '上海市松江区乐都西路867-871号'
        }
      ],
      columns: [
        {
          field: 'name',
          title: '姓名',
          width: 100,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'tel',
          title: '手机号码',
          width: 260,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'hobby',
          title: '爱好',
          width: 330,
          titleAlign: 'center',
          columnAlign: 'center'
        },
        {
          field: 'address',
          title: '地址',
          titleAlign: 'center',
          columnAlign: 'left'
        }
      ]
    };
  },
  methods: {
    formateJSFT() {
      return [
        'xlsx',
        'xlsb',
        'xlsm',
        'xls',
        'xml',
        'csv',
        'txt',
        'ods',
        'fods',
        'uos',
        'sylk',
        'dif',
        'dbf',
        'prn',
        'qpw',
        '123',
        'wb*',
        'wq*',
        'html',
        'htm'
      ]
        .map(function(x) {
          return '.' + x;
        })
        .join(',');
    },
    onchange: function(evt) {
      var file;
      var files = evt.target.files;

      if (!files || files.length === 0) return;

      file = files[0];

      var reader = new FileReader();
      reader.onload = function(e) {
        // pre-process data
        var binary = '';
        var bytes = new Uint8Array(e.target.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        /* read workbook */
        var wb = XLSX.read(binary, { type: 'binary' });

        /* grab first sheet */
        var wsname = wb.SheetNames[0];
        var ws = wb.Sheets[wsname];

        /* generate HTML */
        var HTML = XLSX.utils.sheet_to_html(ws);

        /* update table */
        document.getElementById('out-table').innerHTML = HTML;
        /* show export button */
        document.getElementById('export-table').style.visibility = 'visible';
      };

      reader.readAsArrayBuffer(file);
    },
    onexport: function(evt) {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      /* generate file and force a download*/
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }
  }
};
</script>

<style scoped>
#excel-upload-input {
  display: none;
  z-index: -9999;
}

#drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
table {
  border: solid 1px #add9c0;
}
table,
table tr th,
table tr td {
  border: 1px solid #0094ff;
}
table {
  width: 200px;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-collapse: collapse;
}

/*========bordered table========*/
.bordered {
  border: solid #ccc 1px;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  -webkit-box-shadow: 0 1px 1px #ccc;
  -moz-box-shadow: 0 1px 1px #ccc;
  box-shadow: 0 1px 1px #ccc;
}

.bordered tr {
  -o-transition: all 0.1s ease-in-out;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}

.bordered .highlight,
.bordered tr:hover {
  background: #fbf8e9;
}

.bordered td,
.bordered th {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.bordered td:first-child,
.bordered th:first-child {
  border-left: none;
}

.bordered th:first-child {
  -moz-border-radius: 6px 0 0 0;
  -webkit-border-radius: 6px 0 0 0;
  border-radius: 6px 0 0 0;
}

.bordered th:last-child {
  -moz-border-radius: 0 6px 0 0;
  -webkit-border-radius: 0 6px 0 0;
  border-radius: 0 6px 0 0;
}

.bordered tr:last-child td:first-child {
  -moz-border-radius: 0 0 0 6px;
  -webkit-border-radius: 0 0 0 6px;
  border-radius: 0 0 0 6px;
}

.bordered tr:last-child td:last-child {
  -moz-border-radius: 0 0 6px 0;
  -webkit-border-radius: 0 0 6px 0;
  border-radius: 0 0 6px 0;
}

/*----------------------*/
.zebra td,
.zebra th {
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}

.zebra .alternate,
.zebra tbody tr:nth-child(even) {
  background: #f5f5f5;
  -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
  -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
}

.zebra th:first-child {
  -moz-border-radius: 6px 0 0 0;
  -webkit-border-radius: 6px 0 0 0;
  border-radius: 6px 0 0 0;
}

.zebra th:last-child {
  -moz-border-radius: 0 6px 0 0;
  -webkit-border-radius: 0 6px 0 0;
  border-radius: 0 6px 0 0;
}

.zebra tfoot td {
  border-bottom: 0;
  border-top: 1px solid #fff;
  background-color: #f1f1f1;
}

.zebra tfoot td:first-child {
  -moz-border-radius: 0 0 0 6px;
  -webkit-border-radius: 0 0 0 6px;
  border-radius: 0 0 0 6px;
}

.zebra tfoot td:last-child {
  -moz-border-radius: 0 0 6px 0;
  -webkit-border-radius: 0 0 6px 0;
  border-radius: 0 0 6px 0;
}
</style>
