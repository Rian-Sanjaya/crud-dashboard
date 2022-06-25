import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Row,
  Col,
  Layout,
  Menu,
  Button,
  Divider,
  Icon,
  Collapse,
  Popover,
  Avatar,
  Form,
  FormModel,
  Input,
  Radio,
  Checkbox,
  Table,
  Dropdown,
  Tag,
  Modal,
  Select,
  Spin,
  Alert,
  Steps,
  Card,
  TimePicker,
  Skeleton,
  AutoComplete,
  Tabs,
  Badge,
  List,
  Transfer,
  DatePicker
} from 'ant-design-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMapMarkedAlt,
  faMapMarkerAlt,
  faFileAlt,
  faTrash,
  faDownload,
  faFileInvoiceDollar,
  faCrosshairs,
  faPlus,
  faChevronLeft,
  faUser,
  faStickyNote,
  faShoppingBag,
  faHistory,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.component('a-row', Row);
Vue.component('a-col', Col);
Vue.component('a-layout', Layout);
Vue.component('a-layout-sider', Layout.Sider);
Vue.component('a-layout-header', Layout.Header);
Vue.component('a-layout-content', Layout.Content);
Vue.component('a-menu', Menu);
Vue.component('a-sub-menu', Menu.SubMenu);
Vue.component('a-menu-item', Menu.Item);
Vue.component('a-menu-divider', Menu.Divider);
Vue.component('a-button', Button);
Vue.component('a-divider', Divider);
Vue.component('a-icon', Icon);
Vue.component('a-collapse', Collapse);
Vue.component('a-collapse-panel', Collapse.Panel);
Vue.component('a-popover', Popover);
Vue.component('a-avatar', Avatar);
Vue.component('a-form', Form);
Vue.component('a-form-item', Form.Item);
Vue.component('a-form-model', FormModel);
Vue.component('a-form-model-item', FormModel.Item);
Vue.component('a-input', Input);
Vue.component('a-textarea', Input.TextArea);
Vue.component('a-input-password', Input.Password);
Vue.component('a-input-search', Input.Search);
Vue.component('a-radio-group', Radio.Group);
Vue.component('a-radio-button', Radio.Button);
Vue.component('a-checkbox', Checkbox);
Vue.component('a-checkbox-group', Checkbox.Group);
Vue.component('a-table', Table);
Vue.component('a-dropdown', Dropdown);
Vue.component('a-tag', Tag);
Vue.component('a-modal', Modal);
Vue.component('a-select', Select);
Vue.component('a-select-opt-group', Select.OptGroup);
Vue.component('a-select-option', Select.Option);
Vue.component('a-spin', Spin);
Vue.component('a-alert', Alert);
Vue.component('a-steps', Steps);
Vue.component('a-step', Steps.Step);
Vue.component('a-auto-complete', AutoComplete);
Vue.component('a-card', Card);
Vue.component('a-time-picker', TimePicker);
Vue.component('a-skeleton', Skeleton);
Vue.component('a-auto-complete', AutoComplete);
Vue.component('a-tabs', Tabs);
Vue.component('a-tab-pane', Tabs.TabPane);
Vue.component('a-badge', Badge);
Vue.component('a-list', List);
Vue.component('a-list-item', List.Item);
Vue.component('a-list-item-meta', List.Item.Meta);
Vue.component('a-transfer', Transfer);
Vue.component('a-date-picker', DatePicker);

/* vue fontawesome import */
library.add(
  faMapMarkedAlt,
  faMapMarkerAlt,
  faFileAlt,
  faTrash,
  faDownload,
  faFileInvoiceDollar,
  faCrosshairs,
  faPlus,
  faChevronLeft,
  faUser,
  faStickyNote,
  faShoppingBag,
  faHistory,
  faAngleLeft
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
