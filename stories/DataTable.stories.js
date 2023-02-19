import { action } from "@storybook/addon-actions";
import DataTable from "../src/components/DataTable/DataTable.vue";
import { argTypesConfigs } from "./argTypes/data-table";
import {
  clickEventParams,
  fieldCutomizationParams,
  withoutSpacerParams,
} from "./code/DataTable";

const rows = [
  { id: "1", name: "ناجز أفراد", color: "اللون الأخضر" },
  { id: "2", name: "ناجز أعمال", color: "اللون الأزرق" },
  { id: "3", name: "ناجز حكومة", color: "اللون البني" },
  { id: "4", name: "ناجز محامين", color: "اللون الأصفر" },
];

const columns = [
  { field: "id", title: "الترتيب" },
  { field: "color", title: "اللون" },
  { field: "name", title: "الجهة" },
];

const dynamicSlotName = columns[0]?.field;

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => {
  console.log({ args, dynamicSlotName });
  return {
    components: { DataTable },
    props: Object.keys(argTypes),
    template: `
    <DataTable v-bind="propsWithoutSlots">
      <template 
        v-if="${dynamicSlotName in args}" 
        #${dynamicSlotName}
      >
        ${args[dynamicSlotName]}
      </template>
    </DataTable>
  `,
    computed: {
      propsWithoutSlots() {
        const filteredProps = this.$props;

        delete filteredProps[dynamicSlotName];

        return filteredProps;
      },
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  rows,
  columns,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  rows,
  columns,
  isLoading: true,
};

export const primaryField = Template.bind({});
primaryField.args = {
  rows,
  columns,
  primaryField: "id",
};

export const ClickEvent = Template.bind({});
ClickEvent.parameters = clickEventParams;
ClickEvent.args = {
  rows,
  columns,
  primaryField: "id",
  onClick: action("onRowClicked"),
};

export const WithoutSpacer = Template.bind({});
WithoutSpacer.parameters = withoutSpacerParams;
WithoutSpacer.args = {
  rows,
  columns,
  noSpacer: true,
  primaryField: "id",
  onClick: action("onRowClicked"),
};

export const FieldCutomization = Template.bind({});
FieldCutomization.parameters = fieldCutomizationParams;
FieldCutomization.args = {
  rows,
  columns,
  id: `
  <div class='pa-10'>
    <v-btn  color="info">Hey first column is customizable now</v-btn>
  </div>`,
};
