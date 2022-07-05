<template>
  <a-layout-sider
    class="prixa-sidebar"
    breakpoint="lg"
    collapsed-width="0"
    width="300"
  >
    <div class="p-sidebar-logo">
      <!-- <img :src="assetUrl + '/dashboard/prixa-logo.png'" height="33" /> -->
      <h5 class="color-white">Admin Dashboard</h5>
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
                        @click="setCurrentUrl(item.link)"
                      >
                        <router-link
                          :to="item.link"
                          class="sidebar-collapse-menu"
                          active-class="sidebar-menu-active"
                        >
                          <!-- <a-icon type='smile' theme='outlined'
                            class='sidebar-collapse-menu-icon'
                          /> -->
                          <img
                            :src="setSrc(item.key, item.link)"
                            class="sidebar-collapse-menu-icon"
                            style="width: 19px; height: 19px"
                          />
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
    <a-popover
      v-model="profileVisible"
      trigger="click"
      placement="topRight"
      class="sidebar-profile"
    >
      <template slot="content">
        <span @click="handleLogout" style="cursor: pointer">Keluar</span>
      </template>
      <div class="profile-box">
        <div class="profile-avatar"><a-avatar :size="40" icon="user" /></div>
        <div class="profile-title-wrapper">
          <div class="profile-title-container">
            <div class="profile-title">{{ getUserName }}</div>
            <div class="profile-subtitle">{{ getUserRole }}</div>
          </div>
          <div class="vertical-ellipsis"></div>
        </div>
      </div>
    </a-popover>
  </a-layout-sider>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { logOut } from '../../helpers/utils';

export default Vue.extend({
  data() {
    return {
      adminIconActive: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%202.png`,
      adminIcon: `${process.env.VUE_APP_ASSET_URL}pharmacy/Icon/Asset%2015.png`,
      apotekerIcon: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%208.png`,
      apotekerIconActive: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%203.png`,
      productIcon: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%209.png`,
      productIconActive: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%204.png`,
      stockProductIcon: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%2018.png`,
      stockProductIconActive: `${process.env.VUE_APP_ASSET_URL}pharmacy/Asset%205.png`,
      storeIcon: `${process.env.VUE_APP_ASSET_URL}pharmacy/Icon/Asset%2020.png`,
      storeIconActive: `${process.env.VUE_APP_ASSET_URL}pharmacy/Icon/Asset%207.png`,
      currentUrl: '',
      assetUrl: process.env.VUE_APP_ASSET_URL,
      collapsed: false,
      menus: [
        {
          title: 'Laporan',
          menuItems: {
            admin: [
              {
                key: 'transaction-history',
                link: '/transaction-history',
                title: 'Riwayat Transaksi'
              }
            ],
            staff: [
              {
                key: 'transaction-history',
                link: '/transaction-history',
                title: 'Riwayat Transaksi'
              }
            ]
          }
        },
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
                key: 'operator',
                link: '/pharmacist',
                title: 'Operator'
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
                key: 'operator',
                link: '/pharmacist',
                title: 'Operator'
              },
              {
                key: 'stock-product',
                link: '/stock-product',
                title: 'Stok Produk'
              }
            ]
          }
        }
      ],
      profileVisible: false
    };
  },
  computed: {
    ...mapGetters('UserStore', ['getUserName', 'getUserRole'])
  },
  methods: {
    ...mapActions('UserStore', ['getUserInfo']),
    setCurrentUrl(value) {
      this.currentUrl = value;
    },
    setSrc(key, link) {
      if (key === 'admin') {
        return this.currentUrl === link ? this.adminIconActive : this.adminIcon;
      }
      if (key === 'apoteker') {
        return this.currentUrl === link
          ? this.apotekerIconActive
          : this.apotekerIcon;
      }
      if (key === 'product-list') {
        return this.currentUrl === link
          ? this.productIconActive
          : this.productIcon;
      }
      if (key === 'store-list') {
        return this.currentUrl === link ? this.storeIconActive : this.storeIcon;
      }
      if (key === 'stock-product') {
        return this.currentUrl.includes(link)
          ? this.stockProductIconActive
          : this.stockProductIcon;
      }
      return this.currentUrl === link
        ? this.productIconActive
        : this.productIcon;
    },
    handleLogout() {
      logOut();
    }
  },
  mounted() {
    this.currentUrl = window.location.pathname;
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    this.getUserInfo(userId);
  }
});
</script>

<style lang="scss">
.list-section {
  overflow-y: scroll;
  height: calc(100% - 236px);

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}

ul.sidebar-menu-container {
  list-style-type: none;
  padding: 0;
  color: #fff;
  margin-bottom: 0;
}

li.sidebar-submenu ul {
  list-style-type: none;
  padding: 0;
}

#components-layout-demo-custom-trigger {
  .ant-menu-inline-collapsed {
    .ant-menu-item,
    .ant-menu-item-group {
      display: none;
    }
  }

  .ant-layout-sider-collapsed {
    .p-sidebar-logo,
    .ant-menu-inline-collapsed {
      display: none;
    }
  }
}

.ant-menu-inline {
  max-height: calc(100vh - 140px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
}

.ant-layout-sider-trigger {
  display: flex;
  align-items: center;
  padding-left: 24px;
  background: inherit !important;
  i.anticon.anticon-left {
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      margin-left: 8px;
      content: 'Sembunyikan';
      font-size: 14px;
    }
    svg {
      width: 16px;
      height: 16px;
      border: 1px solid;
      border-radius: 100%;
      padding: 2.5px;
    }
  }
}

.p-sidebar-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 24px 24px 40px;

  img {
    border-right: 1px solid #d7d7d9;
    margin-right: 8px;
    padding-right: 8px;
    filter: brightness(0) invert(1);
    height: 39px;
  }

  h5 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
    font-size: 28px;
    margin-top: 4px;
    line-height: 1.21;
  }
}

.ant-collapse-icon-position-right
  > .sidebar-menu-collapse.ant-collapse-item
  > .ant-collapse-header {
  padding: 0 24px;
  font-size: 18px;
  line-height: 1.33;
}

.ant-collapse
  .sidebar-menu-collapse
  .ant-collapse-header
  .sidebar-menu-icon.ant-collapse-arrow {
  font-size: 18px;
  font-weight: 900;
  right: 24px;
}

.ant-collapse-borderless
  > .sidebar-menu-collapse.ant-collapse-item
  > .ant-collapse-content
  > .ant-collapse-content-box {
  padding: 16px 24px 6px;
}

.sidebar-collapse-menu {
  display: flex;
  padding: 15px 16px 14px;

  .sidebar-collapse-menu-icon {
    font-size: 20px;
    color: #ccdaee;
    margin-right: 15px;
  }

  .sidebar-collapse-menu-title {
    font-size: 16px;
    color: #ccdaee;
    line-height: 1.38;
    margin-left: 10px;
  }
}

.sidebar-collapse-menu.sidebar-menu-active {
  background-color: #fff;
  border-radius: 8px;

  .sidebar-collapse-menu-icon {
    font-weight: bold;
    color: #0146ab;
  }

  .sidebar-collapse-menu-title {
    font-weight: bold;
    color: #0146ab;
  }
}

.sidebar-pharmacy-list-header {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;

  .title {
    font-size: 18px;
    color: #fff;
    font-weight: 700;
  }

  .icon-container {
    margin-top: 3px;
  }

  .icon {
    font-size: 18px;
    color: #fff;
    font-weight: 900;
  }
}

.sidebar-pharmacy-list {
  list-style-type: none;
  color: #fff;
  padding: 16px 24px 0;
  margin-bottom: 0;
}

.sidebar-profile {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(204, 218, 238, 0.16);
  border-radius: 8px;
  padding: 16px 16.4px 16px 16px;

  &.profile-box {
    display: flex;
    cursor: pointer;

    .profile-avatar {
      display: flex;
      align-items: center;
      margin-right: 8px;
    }

    .profile-title-wrapper {
      display: flex;
      flex: 1;

      .profile-title-container {
        flex: 1;
        margin-right: 10px;

        .profile-title {
          font-size: 16px;
          font-weight: bold;
          line-height: 1.38;
          color: #fff;
        }
        .profile-subtitle {
          font-size: 14px;
          font-weight: normal;
          line-height: 1.43;
          color: #ccdaee;
        }
      }

      .vertical-ellipsis {
        position: relative;
        color: white;

        &:after {
          content: '•••';
          position: absolute;
          top: 50%;
          right: -14px;
          transform: translate(-50%, -50%) rotate(90deg);
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
.icon-img {
  width: 33px;
  height: 30px;
  margin-left: -10px;
  margin-right: 5px;
  margin-top: -4px;
  text-align: center;
  line-height: 24px;
}
.icon-img img {
  height: auto;
  width: auto;
  margin-top: 4px;
  max-height: 18px;
  max-width: 18px;
}
</style>
