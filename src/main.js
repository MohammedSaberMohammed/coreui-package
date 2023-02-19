import Vue from "vue";
import i18n from "./plugins/i18n";
import App from "./App.vue";
// Plugins
import vuetify from "./plugins/vuetify";
// SVGs
import NSvg from "./components/Svgs/nSvg.vue";

Vue.config.productionTip = false;

Vue.component(NSvg.name, NSvg);

new Vue({
  components: { App },
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
