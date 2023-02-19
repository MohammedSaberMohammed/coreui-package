import LabelAndValue from "../src/components/LabelAndValue/labelAndValue.vue";
import { argTypesConfigs } from "./argTypes/label-and-value";

const labelSlotName = "labelContent";
const valueSlotName = "valueContent";

export default {
  title: "Components/LabelAndValue",
  component: LabelAndValue,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { LabelAndValue },
  props: Object.keys(argTypes),
  template: `
  <LabelAndValue v-bind="propsWithoutSlots">
    <template 
      v-if="${labelSlotName in args}" 
      #${labelSlotName}
    >
      ${args[labelSlotName] || args.label}
    </template>    
    
    <template 
      v-if="${valueSlotName in args}" 
      #${valueSlotName}
    >
      ${args[valueSlotName] || args.value}
    </template>
  </LabelAndValue>
`,
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[labelSlotName];
      delete filteredProps[valueSlotName];

      return filteredProps;
    },
  },
});

export const Default = Template.bind({});
Default.args = {
  label: "ناجز",
  value: "Value",
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  row: false,
  isLoading: true,
};

export const RowState = Template.bind({});
RowState.args = {
  label: "Dummy Label",
  value: "Row Value",
  row: true,
};

export const CustomLabelWithLabelSlot = Template.bind({});
CustomLabelWithLabelSlot.args = {
  label: "Dummy Label",
  value: "Default Value",
  [labelSlotName]: '<v-badge content="I\'m custom label"></v-badge>',
};

export const CustomValueWithValueSlot = Template.bind({});
CustomValueWithValueSlot.args = {
  label: "Dummy Label",
  value: "Default Value",
  [valueSlotName]: '<v-badge content="I\'m custom value"></v-badge>',
};
