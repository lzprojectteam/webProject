 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">

    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.material')">
      <el-autocomplete class="inline-input"
                       style="width:100%"
                       :value="this.formItem.material.name"
                       :fetch-suggestions="querySearch"
                       placeholder="请输入物资名称过滤"
                       @select="handleSelect">
        <template slot-scope="{ item }">
          <span style="float: left;width:20%; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          <span style="float: left;">{{ item.name }}</span>
          <span style="float: right; color: #8492a6;">{{ item.manufacturer }}</span>
          <span style="float: right;width:30%; color: #8492a6;">{{ item.title }}</span>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.measureName')">
      <el-select v-model='formItem.measureId'
                 @change="selectChange"
                 style="width:100%">
        <el-option v-for="measure in  formData.measureList"
                   :key="measure.id"
                   :label="measure.name"
                   :value="measure.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.convert')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.convert" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.divider')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.divider" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.visible')">
      <el-checkbox v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item>
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import measureApi from "../../api/tmaterial/apiMeasure";
import materialApi from "../../api/tmaterial/apiMaterial";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
       formData: {
        measureList: [],
        materialList: []
      },
      formItem: {
        material: {
          id: "",
          name: ""
        },
        measureId: "",
        measureName: "",
        convert: 1,
        divider: 1,
        visible: false,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
     Promise.all([
      measureApi.getAll({ search: "leaf:eq:true", size: 100 }),
      materialApi.getAll({ size: 500,sort:'code' })
    ])
      .then(([measureResponse, materialResponse]) => {
        this.formData.measureList = measureResponse.content;
        this.formData.materialList = materialResponse.content;
      })
      .catch(error => {});
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    selectChange(value) {
      var name = this.formData.measureList.find(item => {
        return item.id === value;
      }).name;
      this.formItem.measureName = name;
    },
    querySearch(queryString, cb) {
      var materials = this.formData.materialList;
      var results = queryString
        ? materials.filter(this.createFilter(queryString))
        : materials;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return material => {
        return (
          material.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      this.formItem.material = JSON.parse(JSON.stringify(item));
      console.log(this.formItem.material);
    },
    onSubmitClick(name) {
      this.formItem.material = this.formItem.material.id;
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([materialUnitApi.update(this.item.id, this.formItem)])
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
