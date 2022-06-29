<template>
  <a-layout-sider
    class="prixa-sidebar"
    breakpoint="lg"
    collapsed-width="0"
    width="300"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
  >
    <div class="p-sidebar-logo">
      <!-- <img :src="assetUrl + '/dashboard/prixa-logo.png'" height="33" /> -->
      <h5 class="color-white">Farmasi</h5>
    </div>
    <a-divider class="menu-divider" />
    <div class="list-section">
      <ul class="sidebar-menu-container">
        <template v-for="menu in menus">
          <template v-if="menu.key">
            <div :key="menu.key">
              <li class="sidebar-menu">
                <router-link
                  :to="item.link"
                  exact-active-class="sidebar-menu-active"
                >
                  <span>{{ menu.title }}</span>
                </router-link>
              </li>
              <a-divider class="menu-divider" />
            </div>
          </template>
          <template v-else>
            <div :key="menu.title">
              <li class="sidebar-submenu">
                <a-collapse
                  expand-icon-position="right"
                  :bordered="false"
                  :default-active-key="
                    menu.title === 'Pengaturan' || menu.title === 'Laporan'
                      ? '1'
                      : ''
                  "
                >
                  <template #expandIcon="props">
                    <a-icon
                      class="sidebar-menu-icon"
                      type="up"
                      :rotate="props.isActive ? 0 : 180"
                    />
                  </template>
                  <a-collapse-panel
                    class="sidebar-menu-collapse"
                    key="1"
                    :header="menu.title"
                    style="border: none; box-shadow: none; font-size: 18px"
                  >
                    <ul v-if="menu.menuItems['admin']">
                      <li
                        v-for="item in menu.menuItems['admin']"
                        :key="item.key"
                      >
                        <router-link
                          :to="item.link"
                          class="sidebar-collapse-menu"
                          active-class="sidebar-menu-active"
                        >
                          <span class="sidebar-collapse-menu-title">
                            {{ item.title }}
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </a-collapse-panel>
                </a-collapse>
              </li>
              <a-divider class="menu-divider" />
            </div>
          </template>
        </template>
      </ul>
    </div>
  </a-layout-sider>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      menus: [
        {
          title: 'Pengaturan',
          menuItems: {
            admin: [
              {
                key: 'admin',
                link: '/admin',
                title: 'Admin'
              },
              {
                key: 'apoteker',
                link: '/pharmacist',
                title: 'Apoteker'
              },
              {
                key: 'product-list',
                link: '/product-list',
                title: 'Daftar Produk'
              },
              {
                key: 'stock-product',
                link: '/stock-product',
                title: 'Stok Produk'
              },
              {
                key: 'store-list',
                link: '/store-list',
                title: 'Daftar Cabang'
              }
            ],
            staff: [
              {
                key: 'apoteker',
                link: '/pharmacist',
                title: 'Apoteker'
              },
              {
                key: 'stock-product',
                link: '/stock-product',
                title: 'Stok Produk'
              }
            ]
          }
        }
      ]
    };
  },
  methods: {
    onCollapse(collapse, type) {
      console.log(collapse, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
});
</script>
