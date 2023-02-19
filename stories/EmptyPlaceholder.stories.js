import EmptyPlaceholder from "../src/components/EmptyPlaceholder/emptyPlaceholder.vue";
import { argTypesConfigs } from "./argTypes/empty-placeholder";
import {
  customActionWithActionSlotParams,
  customIconWithIconSlotParams,
} from "./code/EmptyPlaceholder";

const actionsSlotName = "actions";
const iconSlotName = "iconContent";

export default {
  title: "Components/EmptyPlaceholder",
  component: EmptyPlaceholder,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { EmptyPlaceholder },
  props: Object.keys(argTypes),
  template: `
  <EmptyPlaceholder v-bind="propsWithoutSlots">
    <template 
      v-if="${iconSlotName in args}" 
      #${iconSlotName}
    >
      ${args[iconSlotName]}
    </template>
    <template 
      v-if="${actionsSlotName in args}" 
      #${actionsSlotName}
    >
      ${args[actionsSlotName]}
    </template>
  </EmptyPlaceholder>
`,
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[iconSlotName];
      delete filteredProps[actionsSlotName];

      return filteredProps;
    },
  },
});

export const Default = Template.bind({});
Default.args = {};

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  primaryText: "النص الرئيسي",
};

export const SecondaryText = Template.bind({});
SecondaryText.args = {
  primaryText: "النص الرئيسي",
  secondaryText: "النص الفرعي",
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: "mdi-check",
};

export const CustomIconWithIconSlot = Template.bind({});
CustomIconWithIconSlot.parameters = customIconWithIconSlotParams;
CustomIconWithIconSlot.args = {
  [iconSlotName]: "<img src='https://place-hold.it/250x150'>",
};

export const CustomActionWithActionSlot = Template.bind({});
CustomActionWithActionSlot.parameters = customActionWithActionSlotParams;
CustomActionWithActionSlot.args = {
  [actionsSlotName]: "<v-btn color='info'>Click Me !</v-btn>",
};
