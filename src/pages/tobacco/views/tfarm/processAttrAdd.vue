<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">

    <div class="flex"
         style="    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    margin: 5px; padding:10px">
      <el-form-item :label="$t('tobacco.tfarm.processAttr.code')"
                    prop="code">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.code" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.label')"
                    prop="label">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.label" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.classify')">
        <el-select v-model="formItem.classify"
                   style="width: 100%">
          <el-option v-for="item in formData.classifyList"
                     :value="item.id"
                     :label="item.name"
                     :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tfarm.processAttr.unit')">
        <el-select v-model="formItem.unit"
                   allow-create
                   clearable>
          <el-option v-for="item in formData.unitList"
                     :value='item.key'
                     :key='item.key'
                     :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.type')">
        <el-select v-model="formItem.type">
          <el-option v-for="item in formData.componentTypeList"
                     :value='item.key'
                     :key='item.key'
                     :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.dataSourceType')">
        <el-select v-model="formItem.dataSourceType">
          <el-option v-for="item in formData.dataSourceList"
                     :value='item.key'
                     :key='item.key'
                     :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.hintInput')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.hintInput" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.hintPoint')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.hintPoint" />
      </el-form-item>
    </div>

    <div style="border: 1px solid #ebebeb;    border-radius: 3px;    transition: 0.2s;    margin: 5px; padding:10px">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.require')">
            <el-select v-model="formItem.require">
              <el-option v-for="item in formData.trueOrFalse"
                         :value='item.key'
                         :key='item.key'
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.point')">
            <el-select v-model="formItem.point">
              <el-option v-for="item in formData.pointTypeList"
                         :value='item.key'
                         :key='item.key'
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.show')">
            <el-select v-model="formItem.show">
              <el-option v-for="item in formData.trueOrFalse"
                         :value='item.key'
                         :key='item.key'
                         :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.min')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.min" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.max')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.max" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.formula')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.formula" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.weight')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.weight" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.pattern')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.pattern" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.position')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.position" />
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item :label="$t('tobacco.tfarm.processAttr.dataSource')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  :readonly="formItem.dataSourceType===1"
                  @focus="onSetDatasource"
                  v-model="formItem.dataSource" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tfarm.processAttr.desc')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="formItem.desc" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   style="float: right"
                   @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
        </el-button>

      </el-form-item>

    </div>
    <template>
      <el-dialog title="设置数据源"
                 :visible.sync="formData.setDatasourceForm"
                 top="10px"
                 append-to-body>
        <el-form :model="enumItem"
                 label-width="80px"
                 :rules="ruleValidate"
                 class="flex"
                 ref="enumForm">

          <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.key')"
                        prop="key">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="enumItem.key" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.value')"
                        prop="value">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="enumItem.value" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.processAttrEnum.point')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="enumItem.point" />
          </el-form-item>
          <el-form-item label="默认">
            <el-select v-model="enumItem.default">
              <el-option v-for="item in formData.trueOrFalse"
                         :value='item.key'
                         :key='item.key'
                         :label="item.label" />
            </el-select>
          </el-form-item>

          <el-form-item style="width:100%">
            <el-button type="primary"
                       style="float: right"
                       @click="onAtrEnumSubmitClick('enumForm')">{{ $t('base.buttonSave') }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-table highlight-current-row
                  border
                  :data="formData.enumList"
                  style="width: 100%;minHeight:200px;minWidth:600px">
          <el-table-column type="index">
          </el-table-column>

          <el-table-column prop="key"
                           :label="this.$t('tobacco.tfarm.processAttrEnum.key')" />
          <el-table-column prop="value"
                           :label="this.$t('tobacco.tfarm.processAttrEnum.value')" />
          <el-table-column prop="point"
                           :label="this.$t('tobacco.tfarm.processAttrEnum.point')" />
          <el-table-column prop="default"
                           label="默认">
            <template slot-scope="slot">
              {{slot.row.default?"是":"否"}}
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="100">
            <template slot-scope="scope">

              <el-tooltip class="item"
                          effect="dark"
                          :content="$t('base.buttonDelete')"
                          placement="bottom">
                <el-button icon="el-icon-minus"
                           type="text"
                           size="small"
                           @click="onAtrEnumDeleteClick(scope.row.key)" />
              </el-tooltip>
            </template>

          </el-table-column>
        </el-table>

      </el-dialog>

    </template>
  </el-form>
</template>
<script>
import processAttrApi from "../../api/tfarm/apiProcessAttr";
import categoryApi from "../../api/basic/api_category";
import index from "@/router";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        code: "",
        label: "",
        hintInput: "",
        hintPoint: "",
        unit: "",
        type: 1,
        require: true,
        min: 0,
        max: 0,
        point: 0,
        formula: "",
        weight: 0,
        pattern: "",
        position: 0,
        show: true,
        classify: "",
        dataSourceType: 0,
        dataSource: "",
        desc: ""
      },
      enumItem: {},
      formData: {
        enumList: [],
        trueOrFalse: [{ key: true, label: "是" }, { key: false, label: "否" }],
        componentTypeList: [
          { key: 1, label: "枚举" },
          { key: 2, label: "整数" },
          { key: 3, label: "浮点数" },
          { key: 4, label: "文本" },
          { key: 5, label: "日期" },
          { key: 6, label: "布尔" },
          { key: 7, label: "输入选择" }
        ],
        pointTypeList: [
          { key: 0, label: "不计分" },
          { key: 1, label: "自动计算" },
          { key: 2, label: "手动录入" },
          { key: 3, label: "选项计分" }
        ],
        unitList: [
          { key: "元", label: "元" },
          { key: "千克", label: "千克" },
          { key: "公斤", label: "公斤" },
          { key: "株", label: "株" },
          { key: "亩", label: "亩" },
          { key: "米", label: "米" }
        ],
        dataSourceList: [
          { key: 0, label: "未设置" },
          { key: 1, label: "手动指定" },
          { key: 2, label: "接口" }
        ],
        classifyList: [],
        dataTypeList: [],
        setDatasourceForm: false,
        dbObject: []
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        label: [
          { required: true, message: "显示名称不能为空", trigger: "blur" }
        ],
        key: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        value: [{ required: true, message: "显示值不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.item !== undefined)
      this.formItem = JSON.parse(JSON.stringify(this.item));
    Promise.all([categoryApi.getAll({ search: "lead:EQ:SC_PD", sort: "id" })])
      .then(([response]) => {
        this.formData.classifyList = response.content;
        if (this.formData.classifyList.length > 0) {
          this.formItem.classify = this.formData.classifyList[0].id;
        }
      })
      .catch(error => {});
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
    }
  },
  methods: {
    onSetDatasource() {
      if (this.formItem.dataSourceType === 1) {
        this.formData.setDatasourceForm = true;
        this.createAttrEnum();
        try {
          this.formData.enumList = [];
          this.formData.enumList = JSON.parse(this.formItem.dataSource);
        } catch (error) {
          console.log(error);
        }
      }
    },
    createAttrEnum() {
      return (this.enumItem = {
        attrId: this.formItem.attrId,
        enumId: "",
        key: "",
        value: "",
        default: false,
        point: 0
      });
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([processAttrApi.saveOrUpdate(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },
    onAtrEnumSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let index = this.formData.enumList.findIndex(item => {
            return item.key === this.enumItem.key;
          });
          if (index === -1) {
            this.formData.enumList.push(this.enumItem);
            this.formItem.dataSource = JSON.stringify(this.formData.enumList);
            this.createAttrEnum();
          } else {
            this.$message({
              message: this.$t("编码已经存在"),
              type: "info"
            });
          }
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },
    onAtrEnumDeleteClick(key) {
      let index = this.formData.enumList.findIndex(item => {
        return item.key === this.enumItem.key;
      });
      this.formData.enumList.splice(index, 1);
    },
    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex > div {
  width: 50%;
}
.el-select {
  width: 100%;
}
</style>

