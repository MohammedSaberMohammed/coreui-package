import { configure, addDecorator } from "@storybook/vue";
import "!style-loader!css-loader!sass-loader!./scss-loader.scss";
import "vuetify/dist/vuetify.css";
import "@mdi/font/css/materialdesignicons.css";

import i18n from '../src/plugins/i18n';
import Vue from "vue";
import Vuetify from "vuetify";


Vue.prototype.$t = function(...args){
  return i18n.t(...args);
}

Vue.use(Vuetify);

addDecorator(() => ({
  i18n,
  vuetify: new Vuetify({
    rtl: true,
    icons: {
      iconfont: "mdi",
    }
  }),
  template:
    '<v-app style="background-color: white"><v-main><story/></v-main></v-app>',
}));

// automatically import all files ending in *.stories.js
configure(require.context("../stories", true, /\.stories\.js$/), module);