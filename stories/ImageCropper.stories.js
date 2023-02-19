import ImageCropper from "../src/components/ImageCropper/imageCropper.vue";
import { argTypesConfigs } from "./argTypes/image-cropper";
import {
  ClientSideValueParams,
  CustomLabelParams,
  DisabledParams,
  DownloadIconParams,
  EnableFullnameDisplayParams,
  HintParams,
  CustomHintParams,
  LabelParams,
  LocalizationsParams,
  MaxDisplayNameLengthParams,
  RequiredParams,
  ServerSideParams,
  ServerSideValueParams,
  DefaultParams,
  CustomInputParams,
} from "./code/ImageCropper";
import {
  clientSideValue,
  defaultArgs,
  labelSlotName,
  errorsSlotName,
  hintsSlotName,
  imagePlaceholderSlotName,
  onUploadData,
  onGenerateFileFromSharepointId,
  ServerSideValueObj,
} from "./utils/image-cropper";

export default {
  title: "Components/ImageCropper",
  component: ImageCropper,
  argTypes: argTypesConfigs,
};

const Template = (args, { argTypes }) => ({
  components: { ImageCropper },
  props: Object.keys(argTypes),
  template: `
  <ImageCropper 
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
      v-if="${hintsSlotName in args}" 
      #${hintsSlotName}
    >
      ${args[hintsSlotName]}
    </template> 

    <template
      v-if="${imagePlaceholderSlotName in args}"
      #${imagePlaceholderSlotName}="{ 
        croppedImage, 
        onDownloadImage, 
        onDeleteSelectedImage, 
        onUploadImage
      }"
    >

       <v-card
          class="mx-auto my-12"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            />
          </template>

          <v-img
            height="250"
            :src="croppedImage || 'https://place-hold.it/250x150'"
          />

          <v-card-actions>
            <v-btn
              color="purple lighten-2"
              @click="onUploadImage"
              v-if="!croppedImage"
            >
              اختر صورة 
            </v-btn>

            <v-btn
              v-if="croppedImage"
              color="purple lighten-2"
              @click="onDownloadImage"
            >
              تحميل الصورة 
            </v-btn>

            <v-btn
              v-if="croppedImage"
              color="error lighten-2"
              @click="onDeleteSelectedImage"
            >
              حذف صورة 
            </v-btn>
          </v-card-actions>
        </v-card>
    </template>
  </ImageCropper>
`,
  methods: {
    log: (files) => console.log(files),
  },
  computed: {
    propsWithoutSlots() {
      const filteredProps = this.$props;

      delete filteredProps[imagePlaceholderSlotName];
      delete filteredProps[labelSlotName];
      delete filteredProps[hintsSlotName];
      delete filteredProps[errorsSlotName];

      return filteredProps;
    },
  },
});

export const Default = Template.bind({});
Default.parameters = DefaultParams;
Default.args = {
  ...defaultArgs,
};

export const Label = Template.bind({});
Label.parameters = LabelParams;
Label.args = {
  ...defaultArgs,
  label: "الهوية الوطنية",
};

export const Hint = Template.bind({});
Hint.parameters = HintParams;
Hint.args = {
  ...defaultArgs,
  hint: "نص توضيحي",
};

export const Required = Template.bind({});
Required.parameters = RequiredParams;
Required.args = {
  ...defaultArgs,
  isRequired: true,
  label: "الهوية الوطنية",
};

export const Disabled = Template.bind({});
Disabled.parameters = DisabledParams;
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const MaxDisplayNameLength = Template.bind({});
MaxDisplayNameLength.parameters = MaxDisplayNameLengthParams;
MaxDisplayNameLength.args = {
  ...defaultArgs,
  maxDisplayNameLength: 5,
};

export const DisplayFullname = Template.bind({});
DisplayFullname.parameters = EnableFullnameDisplayParams;
DisplayFullname.args = {
  ...defaultArgs,
  maxDisplayNameLength: 5,
  enableFullnameDisplay: true,
};

export const DownloadIcon = Template.bind({});
DownloadIcon.parameters = DownloadIconParams;
DownloadIcon.args = {
  ...defaultArgs,
  enableDownload: true,
  value: clientSideValue,
};

export const Localizations = Template.bind({});
Localizations.parameters = LocalizationsParams;
Localizations.args = {
  ...defaultArgs,
  localizations: {
    chooseFile: "الرجاء اختيار ملف",
  },
};

export const ClientSideValue = Template.bind({});
ClientSideValue.parameters = ClientSideValueParams;
ClientSideValue.args = {
  ...defaultArgs,
  value: clientSideValue,
};

export const ServerSide = Template.bind({});
ServerSide.parameters = ServerSideParams;
ServerSide.args = {
  ...defaultArgs,
  value: {},
  enableServerSide: true,
  attachmentTypeId: 5,
  uploadCallback: onUploadData,
};

export const ServerSideValue = Template.bind({});
ServerSideValue.parameters = ServerSideValueParams;
ServerSideValue.args = {
  ...defaultArgs,
  value: ServerSideValueObj,
  enableServerSide: true,
  downloadCallback: onGenerateFileFromSharepointId,
};

export const CustomLabel = Template.bind({});
CustomLabel.parameters = CustomLabelParams;
CustomLabel.args = {
  ...defaultArgs,
  [labelSlotName]: `<v-badge content="المؤهل العلمي" color="info" />`,
};

export const CustomHint = Template.bind({});
CustomHint.parameters = CustomHintParams;
CustomHint.args = {
  ...defaultArgs,
  [hintsSlotName]: `<v-badge content="المؤهل العلمي" color="warning" />`,
};

export const CustomInput = Template.bind({});
CustomInput.parameters = CustomInputParams;
CustomInput.args = {
  ...defaultArgs,
  [imagePlaceholderSlotName]: true,
};
