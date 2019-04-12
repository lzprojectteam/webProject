<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import editorDashboard from './editor';
import tobaccoDashboard from './tobacco';
export default {
  name: 'dashboard',
  components: { editorDashboard, tobaccoDashboard },
  data() {
    return {
      currentRole: '',
      dashboardList: ['editorDashboard', 'tobaccoDashboard']
    };
  },
  computed: {
    ...mapGetters(['roles'])
  },
  beforeCreate() {},
  created() {
    let entry = this.$store.getters.system.entry;
    if (entry === undefined || entry === null) {
      this.currentRole = 'editorDashboard';
    } else {
      entry = entry.trim('/');
      for (let item of this.dashboardList) {
        if (item === entry) {
          this.currentRole = item;
          break;
        } else if (item === entry + 'Dashboard') {
          this.currentRole = item;
          break;
        }
      }
    }
    if (this.currentRole === '') {
      console.log('使用默认主页');
      this.currentRole = 'editorDashboard';
    }
  },
  methods: {}
};
</script>
