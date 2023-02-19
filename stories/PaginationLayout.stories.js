import PaginationLayout from "../src/components/PaginationLayout/paginationLayout.vue";
import { argTypesConfigs } from "./argTypes/pagination-layout";
import {
  AdditionalPayloadParams,
  CascadeModeParams,
  ClientSideValueParams,
  CustomEmptyPlaceholderParams,
  CustomPaginationParams,
  DisabledModeParams,
  EmptyPlaceholderTextParams,
  InitialPageNumberParams,
  PageSizeOptionsParams,
  PageSizeParams,
  renderedListParams,
  TotalVisiblePagesParams,
} from "./code/PaginationLayout";
import {
  clientSideValue,
  defaultArgs,
  emptyPlaceholderSlotName,
  listSlotName,
  loaderSlotName,
  paginationSlotName,
} from "./utils/pagination-layout";

export default {
  title: "Components/PaginationLayout",
  component: PaginationLayout,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { PaginationLayout },
  props: Object.keys(argTypes),
  template: `
  <PaginationLayout v-bind="propsWithoutSlots">
    <template 
      v-if="${loaderSlotName in args}" 
      #${loaderSlotName}
    >
      ${args[loaderSlotName]}
    </template>

    <template 
      #${listSlotName}="{ data }"
    >
      ${
        args[listSlotName] ||
        `<p
          v-for="(item, i) in data"
          :key="i"
        >
          {{ item.name }}
        </p>
      `
      }
    </template>

    <template 
      v-if="${emptyPlaceholderSlotName in args}" 
      #${emptyPlaceholderSlotName}
    >
      ${args[emptyPlaceholderSlotName]}
    </template>

    <template 
      v-if="${paginationSlotName in args}" 
      #${paginationSlotName}="{ 
        data, 
        onFirstPageActionClicked, 
        onPreviousPageActionClicked, 
        onNextPageActionClicked, 
        onLastPageActionClicked 
      }"
    >
      <v-btn
        class="nav-controller"
        :disabled="data.isFirstPageActionDisabled"
        @click="onFirstPageActionClicked"
      >
        الصفحة الأولى
      </v-btn>   
      
      <v-btn
        class="nav-controller"
        :disabled="data.isFirstPageActionDisabled"
        @click="onPreviousPageActionClicked"
      >
        السابق
      </v-btn>   
      
      <v-btn
        class="nav-controller"
        :disabled="data.isLastPageActionDisabled"
        @click="onNextPageActionClicked"
      >
        التالي
      </v-btn>

      <v-btn
        class="nav-controller"
        :disabled="data.isLastPageActionDisabled"
        @click="onLastPageActionClicked"
      >
        الصفحة الأخيرة
      </v-btn>
  </template>    
</PaginationLayout>
`,
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[listSlotName];
      delete filteredProps[loaderSlotName];
      delete filteredProps[paginationSlotName];
      delete filteredProps[emptyPlaceholderSlotName];

      return filteredProps;
    },
  },
});

export const RenderedList = Template.bind({});
RenderedList.parameters = renderedListParams;
RenderedList.args = {
  ...defaultArgs,
};

export const PageSizeOptions = Template.bind({});
PageSizeOptions.parameters = PageSizeOptionsParams;
PageSizeOptions.args = {
  ...defaultArgs,
  pageSize: 5,
  pageSizeOptions: [5, 100, 300],
};

export const InitialPageNumber = Template.bind({});
InitialPageNumber.parameters = InitialPageNumberParams;
InitialPageNumber.args = {
  ...defaultArgs,
  initialPageNumber: 5,
};

export const PageSize = Template.bind({});
PageSize.parameters = PageSizeParams;
PageSize.args = {
  ...defaultArgs,
  pageSize: 30,
};

export const TotalVisiblePages = Template.bind({});
TotalVisiblePages.parameters = TotalVisiblePagesParams;
TotalVisiblePages.args = {
  ...defaultArgs,
  totalVisiblePages: 4,
};

export const CascadeMode = Template.bind({});
CascadeMode.parameters = CascadeModeParams;
CascadeMode.args = {
  ...defaultArgs,
  cascadeMode: true,
};

export const DisabledMode = Template.bind({});
DisabledMode.parameters = DisabledModeParams;
DisabledMode.args = {
  ...defaultArgs,
  isDisabled: true,
};

export const AdditionalPayload = Template.bind({});
AdditionalPayload.parameters = AdditionalPayloadParams;
AdditionalPayload.args = {
  ...defaultArgs,
  additionalPayload: {
    trips: 50,
  },
};

export const ClientSideValue = Template.bind({});
ClientSideValue.parameters = ClientSideValueParams;
ClientSideValue.args = {
  ...defaultArgs,
  value: clientSideValue,
  enableServerSidePagination: false,
};

export const EmptyPlaceholderText = Template.bind({});
EmptyPlaceholderText.parameters = EmptyPlaceholderTextParams;
EmptyPlaceholderText.args = {
  ...defaultArgs,
  value: [],
  enableServerSidePagination: false,
  emptyPlaceholderText: "الرجاء المحاولة مرة اخرى ",
};

export const CustomEmptyPlaceholder = Template.bind({});
CustomEmptyPlaceholder.parameters = CustomEmptyPlaceholderParams;
CustomEmptyPlaceholder.args = {
  ...defaultArgs,
  value: [],
  enableServerSidePagination: false,
  [emptyPlaceholderSlotName]: `
    <v-card>
      <v-card-title class='primary--text'>الرجاء المحاولة لاحقاً</v-card-title>
    </v-card>
  `,
};

export const CustomPagination = Template.bind({});
CustomPagination.parameters = CustomPaginationParams;
CustomPagination.args = {
  ...defaultArgs,
  [paginationSlotName]: true,
};
