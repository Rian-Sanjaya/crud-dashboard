<template>
  <a-layout id="components-layout-demo-custom-trigge" style="height: 100vh">
    <sidebar-section />
  </a-layout>
</template>

<script>
import Vue from 'vue';
import SidebarSection from './SidebarSection.vue';

export default Vue.extend({
  data() {
    return {
      rightSidebarVisible: false
    };
  },
  components: {
    SidebarSection
  }
});
</script>
