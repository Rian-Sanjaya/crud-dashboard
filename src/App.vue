<template>
  <div id="main">
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
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
