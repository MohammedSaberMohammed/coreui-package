import Vue from "vue";
import Vuetify from "./plugins/vuetify";

import * as components from "./components";

Vue.use(Vuetify);

Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== "default") {
    Vue.component(componentName, component);
  }
});

export { components };

// Export the library as a plugin
export default components;
