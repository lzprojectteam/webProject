 <template>
  <el-form
    :model="formItem"
    label-width="80px"
    :rules="ruleValidate"
    ref="formValidate"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.serial')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.serial"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.number')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.number"
            readonly
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.title')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.title"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.type')">
          <el-select
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.type"
            style="width:100%;"
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.author')">
          <el-autocomplete
            v-model="formItem.author"
            :fetch-suggestions="querySearchAsync"
            :placeholder="$t('base.pleaseInput')"
            @select="handleSelect"
            style="width:100%;"
          ></el-autocomplete>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.date')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.date"
            format="yyyy-MM-dd"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.support')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.support"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.own')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.own"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.ownerName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.ownerName"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.contact')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.contact"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>

      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.begin')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.begin"
            style="width:100%;"
            format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.end')">
          <el-date-picker
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.end"
            style="width:100%"
            format="yyyy-MM-dd"
          />
        </el-form-item>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.summary')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.summary"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.cooperatorName')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.cooperatorName"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.photo')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.photo"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.infrastructure.pictures')">
          <el-input
            v-bind:placeholder="$t('base.pleaseInput')"
            v-model="formItem.pictures"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-col :span="12">
      <el-form-item :label="$t('tobacco.tmisc.infrastructure.control')">
        <el-input
          v-bind:placeholder="$t('base.pleaseInput')"
          v-model="formItem.control"
        />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item :label="$t('tobacco.tmisc.infrastructure.desc')">
        <el-input
          v-bind:placeholder="$t('base.pleaseInput')"
          v-model="formItem.desc"
        />
      </el-form-item>
    </el-col>
    <el-form-item>
      <el-button
        v-show='isEdit'
        type="primary"
        style="float: right"
        @click="onSubmitClick('formValidate')"
      >{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import infrastructureApi from '../../api/tmisc/api_infrastructure';
export default {
  props: ['item', 'isEdit', 'visible'],
  data() {
    return {
      timeout: null,
      restaurants: {},
      formItem: {
        serial: '',
        number: '',
        type: '',
        title: '',
        author: '',
        date: '',
        countryId: '',
        countryName: '',
        support: 0,
        own: '',
        ownerId: '',
        ownerNumber: '',
        ownerName: '',
        contact: '',
        summary: '',
        begin: 0,
        end: 0,
        photo: '',
        cooperatorId: '',
        cooperatorName: '',
        pictures: '',
        control: 0,
        desc: ''
      },
      ruleValidate: {
        code: [{ required: true, message: '编码不能为空', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.load();
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  computed: {
    editable() {
      return !this.isEdit;
    }
  },
  methods: {
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([
            infrastructureApi.updateInfrastructure(this.item.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info'
              });
              this.$emit('update:visible', false);
            })
            .catch(error => {});
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn'
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
