import AttachmentField from "../src/components/AttachmentField/attachmentField.vue";
import { argTypesConfigs } from "./argTypes/attachment-field";
import {
  AcceptParams,
  ClientSideValueParams,
  CustomLabelParams,
  CustomListParams,
  DisabledParams,
  DownloadIconParams,
  EnableFullnameDisplayParams,
  LabelParams,
  LocalizationsParams,
  MaxAttachmentsParams,
  MaxDisplayNameLengthParams,
  MaxFileSizeInMegaParams,
  MaxFilesSizeInMegaParams,
  MultipleParams,
  PhancyPreviewParams,
  RequiredParams,
  ServerSideParams,
  ServerSideValueParams,
  ValidateOnSingleFileSizeParams,
} from "./code/AttachmentField";
import {
  defaultArgs,
  labelSlotName,
  errorsSlotName,
  hintsSlotName,
  listSlotName,
  onUploadData,
  onGenerateFileFromSharepointId,
  clientSideValue,
} from "./utils/attachment-field";

export default {
  title: "Components/AttachmentField",
  component: AttachmentField,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { AttachmentField },
  props: Object.keys(argTypes),
  template: `
  <AttachmentField 
    @select="log"
    v-bind="propsWithoutSlots"
  >
    <template 
      v-if="${labelSlotName in args}" 
      #${labelSlotName}
    >
      ${args[labelSlotName] || args.label}
    </template> 

    <template
      v-if="${listSlotName in args}"
      #${listSlotName}="{ data, onDeleteFile }"
    >
      <v-list
        subheader
        two-line
      >
        <v-subheader inset v-if="data.listData.files.length">المرفقات</v-subheader>

        <v-list-item
          v-for="(file, index) in data.listData.files"
          :key="index"
        >
          <v-list-item-avatar small>
            <v-icon class="primary lighten-1">
              mdi-file
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="file.displayName" />

            <v-list-item-subtitle v-text="file.size" />
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="onDeleteFile">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
  </AttachmentField>
`,
  methods: {
    log: (files) => console.log(files),
  },
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[listSlotName];
      delete filteredProps[labelSlotName];
      delete filteredProps[hintsSlotName];
      delete filteredProps[errorsSlotName];

      return filteredProps;
    },
  },
});

export const Default = Template.bind({});
// Default.parameters = DefaultParams;
Default.args = {
  ...defaultArgs,
};

export const Label = Template.bind({});
Label.parameters = LabelParams;
Label.args = {
  label: "الشهادة العلمية",
};

export const Required = Template.bind({});
Required.parameters = RequiredParams;
Required.args = {
  isRequired: true,
  label: "الشهادة العلمية",
};

export const DifferentFileTypes = Template.bind({});
DifferentFileTypes.parameters = AcceptParams;
DifferentFileTypes.args = {
  accept: ".docx, .pdf",
};

export const Disabled = Template.bind({});
Disabled.parameters = DisabledParams;
Disabled.args = {
  disabled: true,
};

export const Multiple = Template.bind({});
Multiple.parameters = MultipleParams;
Multiple.args = {
  isMultiple: true,
};

export const MaxFileSizeInMega = Template.bind({});
MaxFileSizeInMega.parameters = MaxFileSizeInMegaParams;
MaxFileSizeInMega.args = {
  maxFileSizeInMega: 0.01,
  validateOnSingleFileSize: true,
};

export const MaxFilesSizeInMega = Template.bind({});
MaxFilesSizeInMega.parameters = MaxFilesSizeInMegaParams;
MaxFilesSizeInMega.args = {
  isMultiple: true,
  maxFilesSizeInMega: 0.1,
};

export const MaxDisplayNameLength = Template.bind({});
MaxDisplayNameLength.parameters = MaxDisplayNameLengthParams;
MaxDisplayNameLength.args = {
  maxDisplayNameLength: 10,
};

export const MaxAttachments = Template.bind({});
MaxAttachments.parameters = MaxAttachmentsParams;
MaxAttachments.args = {
  isMultiple: true,
  maxAttachments: 2,
};

export const DisplayFullname = Template.bind({});
DisplayFullname.parameters = EnableFullnameDisplayParams;
DisplayFullname.args = {
  enableFullnameDisplay: true,
};

export const ValidateOnSingleFileSize = Template.bind({});
ValidateOnSingleFileSize.parameters = ValidateOnSingleFileSizeParams;
ValidateOnSingleFileSize.args = {
  maxFileSizeInMega: 0.01,
  validateOnSingleFileSize: true,
};

export const PhancyPreview = Template.bind({});
PhancyPreview.parameters = PhancyPreviewParams;
PhancyPreview.args = {
  enableFancyPreview: true,
};

export const DownloadIcon = Template.bind({});
DownloadIcon.parameters = DownloadIconParams;
DownloadIcon.args = {
  enableDownload: true,
};

export const Localizations = Template.bind({});
Localizations.parameters = LocalizationsParams;
Localizations.args = {
  localizations: {
    clickHere: "الرجاء اختيار ملف",
  },
};

export const ClientSideValue = Template.bind({});
ClientSideValue.parameters = ClientSideValueParams;
ClientSideValue.args = {
  isMultiple: true,
  value: clientSideValue,
};

export const ServerSide = Template.bind({});
ServerSide.parameters = ServerSideParams;
ServerSide.args = {
  isMultiple: true,
  value: [],
  enableServerSide: true,
  attachmentTypeId: 5,
  maxFilesSizeInMega: 10,
  uploadCallback: onUploadData,
};

export const ServerSideValue = Template.bind({});
ServerSideValue.parameters = ServerSideValueParams;
ServerSideValue.args = {
  isMultiple: true,
  value: [
    {
      id: 0,
      attachmentTypeId: 5,
      contentType: "image/png",
      sharepointId: "test0.41862898112024816test+pqql4B8hlPlIsuvkdtKbkr40lpA==",
      fileName: "test - Copy (1).png",
    },
    {
      id: 0,
      attachmentTypeId: 6,
      contentType: "image/png",
      sharepointId: "test0.41338112024816test+pqql4B8hlPlIsuvkdtKbkr40lpA==",
      fileName: "founding-day - Copy (2).png",
    },
  ],
  enableServerSide: true,
  downloadCallback: onGenerateFileFromSharepointId,
};

export const CustomLabel = Template.bind({});
CustomLabel.parameters = CustomLabelParams;
CustomLabel.args = {
  [labelSlotName]: `<v-badge content="المؤهل العلمي" color="info" />`,
};

export const CustomList = Template.bind({});
CustomList.parameters = CustomListParams;
CustomList.args = {
  [listSlotName]: true,
};
