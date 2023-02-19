<template>
  <v-input :rules="rules" :value="value" :hide-details="!rules.length">
    <div :class="['base-calendar-wrapper', { 'd-flex justify-end': row }]">
      <div
        :class="`d-flex align-center ${
          row ? 'justify-center mx-5' : 'justify-end mb-2'
        }`"
      >
        <p :class="[{ 'primary--text': !isHijri }, 'field-label my-0']">
          {{ texts.gregorian }}
        </p>

        <v-switch
          :id="switchActionId"
          v-model="isHijri"
          color="primary"
          :ripple="false"
          class="my-0 mx-2"
          :false-value="false"
          :true-value="true"
          hide-details
          @change="formatDate"
        />

        <p :class="[{ 'primary--text': isHijri }, 'field-label my-0']">
          {{ texts.hijri }}
        </p>
      </div>

      <v-menu
        ref="menu"
        v-model="isCalendarOpened"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-bind="attrs"
            :id="textFieldActionId"
            :value="previewedDates"
            outlined
            :hide-details="!hint"
            :hint="hint"
            :dense="dense"
            persistent-hint
            :label="label"
            append-icon="mdi-calendar"
            readonly
            clearable
            v-on="on"
            @click:clear="onClearSelection"
          />
        </template>

        <v-hijri-date-picker
          v-if="isHijri"
          v-bind="$attrs"
          :id="pickerWrapperId"
          v-model="date"
          no-title
          :range="range"
          :multiple="multiple"
          :weekday-format="dayFormat"
          :month-format="monthFormat"
        >
          <div
            class="base-calendar-action-wrapper d-flex align-center justify-space-between"
          >
            <v-btn
              :id="resetActionId"
              text
              color="red"
              @click="onClearSelection"
            >
              {{ texts.reset }}
            </v-btn>

            <div>
              <v-btn
                :id="cancelActionId"
                text
                color="primary"
                @click="onClosePicker"
              >
                {{ texts.cancel }}
              </v-btn>

              <v-btn
                :id="confirmActionId"
                color="primary"
                @click="$refs.menu.save(date)"
              >
                {{ texts.ok }}
              </v-btn>
            </div>
          </div>
        </v-hijri-date-picker>
        <v-date-picker
          v-else
          :id="pickerWrapperId"
          v-model="date"
          no-title
          scrollable
          :range="range"
          :multiple="multiple"
          :weekday-format="dayFormat"
          :month-format="monthFormat"
          v-bind="$attrs"
        >
          <div
            class="base-calendar-action-wrapper d-flex align-center justify-space-between"
          >
            <v-btn
              :id="resetActionId"
              text
              color="red"
              @click="onClearSelection"
            >
              {{ texts.reset }}
            </v-btn>

            <div>
              <v-btn
                :id="cancelActionId"
                text
                color="primary"
                @click="onClosePicker"
              >
                {{ texts.cancel }}
              </v-btn>

              <v-btn
                :id="confirmActionId"
                color="primary"
                @click="$refs.menu.save(date)"
              >
                {{ texts.ok }}
              </v-btn>
            </div>
          </div>
        </v-date-picker>
      </v-menu>
    </div>
  </v-input>
</template>

<script>
// components
import VHijriDatePicker from "@moj/vuetify-umalqura";
// utils
import moment from "moment-hijri";
import uq from "@umalqura/core";
import GregorianMonths from "../../services/monthsLookups";

export default {
  name: "Calendar",
  components: {
    VHijriDatePicker,
  },
  inheritAttrs: false,
  props: {
    switchActionId: {
      type: String,
      default: "",
    },
    textFieldActionId: {
      type: String,
      default: "",
    },
    pickerWrapperId: {
      type: String,
      default: "",
    },
    confirmActionId: {
      type: String,
      default: "",
    },
    cancelActionId: {
      type: String,
      default: "",
    },
    resetActionId: {
      type: String,
      default: "",
    },
    value: {
      type: String || Array,
      default: "",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    hijri: {
      type: Boolean,
      default: true,
    },
    localizations: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isCalendarOpened: false,
      hijriFormat: "iYYYY-iMM-iDD",
      gregorianFormat: "YYYY-MM-DD",
      date: this.initialDateValue,
      isHijri: true,
    };
  },
  computed: {
    initialDateValue() {
      return this.isSingleMode ? "" : [];
    },

    isSingleMode() {
      const { multiple, range } = this;

      return !multiple && !range;
    },

    previewedDates() {
      const multipleDates = this.date || [];

      return this.isSingleMode ? this.date : multipleDates.sort().reverse();
    },

    texts() {
      const { localizations } = this;

      return {
        gregorian: this.$t("gregorian"),
        hijri: this.$t("hijri"),
        cancel: this.$t("cancel"),
        reset: this.$t("reset"),
        ok: this.$t("ok"),
        ...localizations,
      };
    },
  },
  watch: {
    value: {
      handler() {
        const { value, date, isHijri, isSingleMode } = this;
        const { gregorian, hijri } = this.getValueDates(value);
        const dateClone = JSON.parse(JSON.stringify(date));
        const shouldUpdate =
          JSON.stringify(isHijri ? hijri : gregorian) !==
          JSON.stringify(isSingleMode ? dateClone : dateClone.sort());

        if (shouldUpdate) {
          this.date = isHijri ? hijri : gregorian;
        }
      },
      deep: true,
    },
    date() {
      const { date } = this;

      // 'Invalid date'
      return this.$emit("change", this.getHijriGregorianDates(date));
    },
  },
  mounted() {
    this.date = this.initialDateValue;
    this.isHijri = this.hijri;
  },
  methods: {
    getHijriGregorianDates(date) {
      const {
        isHijri,
        isSingleMode,
        convertToHijri,
        convertToGregorian,
      } = this;

      let hijri = "";
      let gregorian = "";

      if (isSingleMode) {
        hijri = isHijri ? date : convertToHijri(date);
        gregorian = isHijri ? convertToGregorian(date) : date;
      } else {
        const sortedDate = [...date].sort();

        hijri = isHijri
          ? sortedDate
          : sortedDate.map((selectedDate) => convertToHijri(selectedDate));
        gregorian = isHijri
          ? sortedDate.map((selectedDate) => convertToGregorian(selectedDate))
          : sortedDate;
      }

      return {
        hijri,
        gregorian,
      };
    },

    getValueDates(gregorian) {
      const { isSingleMode, convertToHijri } = this;

      let hijri = "";

      if (isSingleMode) {
        hijri = convertToHijri(gregorian);
      } else {
        const sortedDate = [...gregorian].sort();

        hijri = sortedDate.map((selectedDate) => convertToHijri(selectedDate));
      }

      return {
        hijri,
        gregorian,
      };
    },
    formatDate() {
      this.$emit("changeHijri", !this.isHijri);

      const { date } = this;

      if (date.length) {
        const { isHijri } = this;

        if (!this.isSingleMode) {
          this.date = date.map((selectedDate) =>
            isHijri
              ? this.convertToHijri(selectedDate)
              : this.convertToGregorian(selectedDate)
          );
        } else {
          this.date = isHijri
            ? this.convertToHijri(this.date)
            : this.convertToGregorian(this.date);
        }
      }
    },

    convertToGregorian(date) {
      return moment(date, this.hijriFormat)
        .locale("en")
        .format(this.gregorianFormat);
    },

    convertToHijri(date) {
      const hijriDate = uq(new Date(date));
      const hijriFormat = this.hijriFormat
        .replace(/i/g, "")
        .replace(/Y/g, "y")
        .replace(/D/g, "d");

      return hijriDate.format(hijriFormat, "en");
    },

    dayFormat(date) {
      uq.locale("ar");
      const daysFirstLetters = uq.daysShort();
      const uqDate = uq(new Date(date));

      return daysFirstLetters[uqDate.dayOfWeek];
    },

    monthFormat(date) {
      uq.locale("ar");
      const hijriMonthes = uq.months();
      const currentMonthNumber =
        Number(date.substring(date.indexOf("-") + 1)) - 1;

      return this.isHijri
        ? hijriMonthes[currentMonthNumber]
        : GregorianMonths[currentMonthNumber];
    },

    onClearSelection() {
      this.onClosePicker();
      setTimeout(() => {
        this.date = this.initialDateValue;
      });
    },

    onClosePicker() {
      this.isCalendarOpened = false;
    },
  },
};
</script>
