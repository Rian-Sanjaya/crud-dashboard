<template>
  <div class="p-bg-dashboard">
    <a-row class="p-login-container">
      <a-col
        class="p-login-main"
        :xs="{ span: 20, offset: 2 }"
        :md="{ span: 9, offset: 3 }"
      >
        <div>
          <!-- <div class="p-login-header">
            <img :src="assetUrl + '/dashboard/logo.png'" height="60" />
            <h1 class="color-secondary">Farmasi</h1>
          </div> -->
          <h6 class="p-title-small">{{ smallTitle }}</h6>
          <h2 class="p-title-medium">{{ title }}</h2>
          <div class="margin-baseT">
            <p>{{ subTitle }}</p>
          </div>
          <a-row>
            <a-col
              class="p-login-main margin-largeT"
              :xs="{ span: 24 }"
              :md="{ span: 14 }"
            >
              <slot></slot>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'LeftContentPage',
  data() {
    return {
      assetUrl: process.env.VUE_APP_ASSET_URL
    };
  },
  props: {
    smallTitle: {
      type: String
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    }
  }
});
</script>

<style lang="scss" scoped>
.p-bg-dashboard {
  // background: url('https://devassets.b-cdn.net/pharmacy/bg-pharmacy.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top right;
  background-size: auto 95%;
}
</style>
