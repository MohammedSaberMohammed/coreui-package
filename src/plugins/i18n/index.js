import Vue from "vue";
import VueI18n from "vue-i18n";
// Languages
import ar from "./ar";
import en from "./en";

Vue.use(VueI18n);

const messages = { ar, en };

const i18n = new VueI18n({
  locale: "ar", // set locale
  messages, // set locale messages
});

export default i18n;
