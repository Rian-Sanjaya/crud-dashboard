<template>
  <div id="app">
    <div v-if="$route.meta.plainLayout">
      <router-view />
    </div>
    <div v-else>
      <main-section />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MainSection from './components/layouts/MainSection.vue';

export default Vue.extend({
  data() {
    return {};
  },
  components: {
    MainSection
  }
});
</script>

<style lang="scss">
*::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

*::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 7px;
  -webkit-border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.15);
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}

*::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

*::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
