<template>
  <a-layout id="components-layout-demo-custom-trigge" style="height: 100vh">
    <sidebar-section />
    <a-layout>
      <header-section />
      <a-layout-content>
        <div :style="layoutStyle">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Vue from 'vue';
import SidebarSection from './SidebarSection.vue';
import HeaderSection from './HeaderSection.vue';

export default Vue.extend({
  components: {
    SidebarSection,
    HeaderSection
  },
  data() {
    return {
      rightSidebarVisible: false
    };
  },
  computed: {
    layoutStyle() {
      return this.$route.name === 'Pharmacy'
        ? {
            padding: '10px',
            margin: '0',
            background: this.backgroundComputed,
            borderRadius: '0',
            height: '100%'
          }
        : {
            padding: this.paddingSizeComputed,
            margin: '24px 16px',
            background: this.backgroundComputed,
            borderRadius: '16px'
          };
    },
    backgroundComputed() {
      return this.$route.name !== 'Update Stock' &&
        this.$route.name !== 'TransactionHistoryDetail'
        ? '#fff'
        : 'transparent';
    },
    paddingSizeComputed() {
      return this.$route.name !== 'Update Stock' &&
        this.$route.name !== 'TransactionHistoryDetail'
        ? '24px'
        : '0';
    }
  }
});
</script>
