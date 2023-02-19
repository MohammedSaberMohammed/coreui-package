## **Description**
Highly customizable pkg for managing Hijri - Gregorian Calendar DatePicker

### **Features**
- [x] Pick Hijri Date
- [x] Pick Gregorian Date
- [x] Pick Date Range
- [x] Hijri - Gregorian Switcher
- [x] Customization for all strings
- [x] Customization for hints section
- [x] Customization for list rendering
- [x] Customization for errors

## Example
```vue
<template>
  <div
    id="app"
  >
    <calendar
      color="primary"
      label="تصفية بالتاريخ"
      :row="true"
      :range="true"
      :hijri="isHijri"
      :value="date"
      hint="يرجى ادخال فترة زمنية"
      dense
      @change="changeDate"
      @changeHijri="changeHijriState"
    />
  </div>
</template>

<script>
import Calendar from "./components/Calendar/calendar.vue";
export default {
  name: "App",
  components: { 
    Calendar 
  },
  data() {
    return {
      isHijri: true,
      date: [],
    }
  },
  methods: {
    changeDate(newDate) {
      if (newDate.gregorian.length === 2) {
      this.date = this.isHijri ? newDate.hijri : newDate.gregorian;
      this.filterDate = newDate.gregorian;
      } else {
      this.date = [];
      this.filterDate = [];
      }
    },
    changeHijriState() {
      this.isHijri = !this.isHijri;
    },

  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@change** | *function that exposes Datepicker input change* | **event** | ***@select="changeDate"*** | **true**
| **@changeHijri** | *function that exposes Hijri State change* | **event** | ***@changeHijri="changeHijriState"*** | **true**
| **switchActionId** | *HTML id attribute of Hijri - Gregorian State switcher* | **String** | **_""_** | **false**
| **focusActionId** | *HTML id attribute of datepicker input focus* | **String** | **_""_** | **false**
| **changeDateActionId** | *HTML id attribute of datepicker calendar* | **String** | **_""_** | **false**
| **confirmActionId** | *HTML id attribute of datepicker calendar confirm button* | **String** | **_""_** | **false**
| **cancelActionId** | *HTML id attribute of datepicker calendar cancel button* | **String** | **_""_** | **false**
| **resetActionId** | *HTML id attribute of datepicker calendar reset button* | **String** | **_""_** | **false**
| **value** | *date to update the ui in the **and it differs when range mode is enabled*** | **Array \|| String** | ***[] \|| ""*** | **true**
| **label** | *label for input field* | **String** | ***""*** | **false**
| **dense** | *to make input height small* | **Boolean** | ***false*** | **false**
| **rules** | *input validation rules* | **Array** | ***[]*** | **false**
| **multiple** | *selecting multiple dates* | **Boolean** | ***false*** | **false**
| **range** | *selecting date range* | **Boolean** | ***false*** | **false**
| **row** | *show the switcher with the input in row mode (the same line)* | **Boolean** | ***false*** | **false**
| **hint** | *add hint at the bottom of datepicker input* | **String** | **_""_** | **false**
| **hijri** | *Switch between hijri / gregorian date* | **Boolean** | ***false*** | **false**
| **localizations** | *for checnging all the desired strings* | **Object** | ***{}*** | **false**

## Behavior
  1. *User focus on the calendar input, then*
  2. *calendar popup will open to choose date or date range if it active or multiple if multiple mode is active or all of both: then*
  3. *date will be typed in the input field and the value of input will be changed also you can use it in filter by date*
  4. *if user switch from hijri to gregorian or gregorian to hijri the package will convert the date using (moment-hijri.js).*

## Available localizations
| Prop | default | hint |
| --- | --- | --- |
| **gregorian** | ***this.$t("gregorian") === ميلادي*** | *text of gregorian word in the switcher* |
| **hijri** | ***this.$t("hijri") === هجري*** | *text of hijri word in the switcher* | 
| **cancel** | ***this.$t("cancel") === إلغاء*** | *text of cancel button in the calendar popup* |
| **reset** | ***this.$t("reset") === اعادة ضبط*** | *text of reset button in the calendar popup* |
| **ok** | ***this.$t("ok") === تأكيد*** | *text of confirm button in the calendar popup* |

## Notes: 
- ***value*** : *must be Array of date if ( range = true ), else it must be date string in "YYYY-MM-DD" format*
- ***@change*** : *function that exposes an object of { hijri: "iYYYY-iMM-iDD", gregorian: "YYYY-MM-DD" }*
- ***hijri value*** : we are use moment-hijri as a third-party plugin to generate and convert hijri date [Docs](https://github.com/xsoh/moment-hijri)