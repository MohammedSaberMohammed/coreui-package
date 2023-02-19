import Calendar from "../src/components/Calendar/calendar.vue";
import { argTypesConfigs } from "./argTypes/calendar";
import { RulesParams } from "./code/Calendar";

export default {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => {
  console.log({ argTypes });

  return {
    components: { Calendar },
    props: Object.keys(argTypes),
    template: `
    <div class='storybook-calendar-wrapper'>
      <Calendar v-bind="$props" />
    </div>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "اختر تاريخ",
};

export const Hint = Template.bind({});
Hint.args = {
  hint: "Custom hint ",
};

export const MultipleValues = Template.bind({});
MultipleValues.args = {
  multiple: true,
};

export const RangeValues = Template.bind({});
RangeValues.args = {
  range: true,
};

export const InlineAlignment = Template.bind({});
InlineAlignment.args = {
  row: true,
};

export const HijriAndGregorianDates = Template.bind({});
HijriAndGregorianDates.args = {
  hijri: false,
};

export const Rules = Template.bind({});
Rules.parameters = RulesParams;
Rules.args = {
  rules: [(value) => !!value || "Required."],
  value: "",
};
