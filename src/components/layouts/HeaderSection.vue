<template>
  <a-layout-header
    style="
      background: #fff;
      padding: 16px 24px;
      border-top: 1px solid #f2f2f2;
      height: auto;
      line-height: 8px;
    "
  >
    <a-row type="flex" justify="space-between">
      <a-col>
        <div style="display: flex">
          <font-awesome-icon
            icon="angle-left"
            class="p-header-icon-back"
            v-show="
              $route.name === 'Update Stock' ||
              $route.name === 'TransactionHistoryDetail'
            "
            @click="$route.back()"
          />
          <h2 class="margin-baseT p-header-title">{{ headerTitle }}</h2>
        </div>
      </a-col>
      <a-col>
        <portal-target name="header-toolbar"></portal-target>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  computed: {
    headerTitle() {
      if (this.$route.params.name) return `${this.$route.params.name}`;
      if (this.$route.query.name)
        return `${this.$route.query.name} - ${this.$route.meta.title}`;
      if (this.$route.params.store)
        return `${this.titleCase(this.$route.params.store)}`;
      return String(this.$route.meta.title);
    }
  },
  methods: {
    titleCase(str) {
      const splitStr = str.toLowerCase().split('-');
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }
  }
});
</script>

<style lang="scss" scoped>
.p-header-icon-back {
  margin-top: 12px;
  margin-right: 16px;
  color: #0146ab;
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
}

.p-header-title {
  font-size: 32px;
  color: #4c4f54;
  line-height: 1.43;
  margin: 0;
}
</style>
