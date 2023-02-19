<template>
  <v-input :rules="rules" :value="value">
    <div class="base-cropper-wrapper">
      <CropperDialog
        v-if="showModal"
        :show="showModal"
        :strings="strings"
        :cropper-configs="cropperConfigs"
        :selected-image="imageSrc"
        :file-extention="fileExtention"
        @close="utils.onReset()"
        @save="onSaveCroppedImage"
      />

      <slot name="labelContent">
        <p v-if="label" class="label mb-2" :class="labelClassName">
          {{ label }}
          <span v-if="isRequired" class="star">*</span>
        </p>
      </slot>

      <slot
        :croppedImage="croppedImage"
        :onUploadImage="utils.onUploadImage"
        :onDownloadImage="utils.onDownloadSelectedImage"
        :onDeleteSelectedImage="utils.onDeleteSelectedImage.bind(utils)"
        name="imagePlaceholder"
      >
        <div class="input-wrapper d-flex align-items-center">
          <button
            v-if="!previewedSelectedFile"
            :id="chooseFileActionId"
            :disabled="disabled"
            :class="[
              'indicator pointer py-4 px-3 white--text',
              { selecting: isServerLoading },
            ]"
            @click.prevent="utils.onUploadImage"
          >
            <div
              v-if="isServerLoading"
              class="loader-placeholder d-flex align-items-center justify-center"
            >
              <img
                src="../../assets/icons/loader.svg"
                alt="icon"
                width="30"
                height="30"
              />
            </div>

            {{ strings.chooseFile }}
          </button>
          <img
            v-else
            class="image-button-placeholder ms-3 d-inline-block"
            src="../../assets/icons/file.svg"
            alt="icon"
            width="25"
            height="25"
          />

          <div class="name-placeholder py-4 px-3">
            {{ namePlaceholderText }}
          </div>

          <div v-if="previewedSelectedFile" class="actions pa-2 mx-1">
            <img
              v-if="!disabled"
              :id="deleteActionId"
              src="../../assets/icons/cancel.svg"
              class="action"
              width="30"
              height="30"
              alt="delete"
              @click="utils.onDeleteSelectedImage()"
            />

            <img
              v-if="isDownloadAvailable"
              :id="downloadActionId"
              src="../../assets/icons/download.png"
              class="action"
              width="20"
              height="20"
              alt="download"
              @click="utils.onDownloadSelectedImage"
            />
          </div>
        </div>
      </slot>

      <slot
        v-if="error && activateInternalErrorPreview"
        name="error"
        :error="error"
      >
        <div class="error-placeholder mt-2">
          <p class="text">
            {{ strings.errorText || error }}
          </p>
        </div>
      </slot>

      <slot name="hints">
        <div v-if="hint" class="hints-placeholder mt-2">
          {{ hint }}
        </div>
      </slot>

      <input
        ref="imageInput"
        type="file"
        :disabled="disabled"
        :fileInputId="fileInputId"
        accept="image/*"
        :style="{ display: 'none' }"
        @change="(e) => utils.onSelectImage(e)"
      />
    </div>
  </v-input>
</template>

<script>
import CropperDialog from "./cropperDialog.vue";
import generateUtils from "./utils";

export default {
  name: "ImageCropper",
  components: {
    CropperDialog,
  },
  props: {
    chooseFileActionId: {
      type: String,
      default: "",
    },
    fileInputId: {
      type: String,
      default: "",
    },
    deleteActionId: {
      type: String,
      default: "",
    },
    downloadActionId: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },

    labelClassName: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    enableDownload: {
      type: Boolean,
      default: false,
    },
    activateInternalErrorPreview: {
      type: Boolean,
      default: false,
    },
    enableFullnameDisplay: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exportInitialFieldMeta: {
      type: Boolean,
      default: false,
    },
    maxDisplayNameLength: {
      type: Number,
      default: 15,
    },
    cropperConfigs: {
      type: Object,
      default: () => ({}),
    },
    localizations: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    enableServerSide: {
      type: Boolean,
      default: false,
    },
    updateParentWithFileMeta: {
      type: Boolean,
      required: false,
      default: false,
    },
    attachmentTypeId: {
      type: Number,
      default: 0,
    },
    uploadCallback: {
      type: Function,
      required: false,
      default: () => {},
    },
    downloadCallback: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      // imageInput: null,
      selectedFile: null,
      imageSrc: null,
      fileExtention: null,
      error: this.isRequired ? "هذا الحقل مطلوب" : "",
      croppedData: {},
      isServerLoading: false,
    };
  },
  computed: {
    strings() {
      const { localizations } = this;

      return {
        clickHere: "اضغط هنا",
        modalTitle: "محرر الصورة",
        modalSaveAction: "حفظ",
        modalCancelAction: "إلغاء",
        chooseFile: "اختر ملف",
        errorText: "",
        serverLoadingText: "جاري تحميل البيانات ...",
        ...localizations,
      };
    },
    croppedImage() {
      const { croppedImage } = this.croppedData;

      return croppedImage;
    },
    isValidValue() {
      const { enableServerSide, value } = this;

      if (enableServerSide) {
        return Boolean(value.sharepointId) || false;
      }
      // client side
      const { name, file } = this.value || {};

      if (name && file) {
        return true;
      }

      return false;
    },
    isDownloadAvailable() {
      const { selectedFile, enableDownload, enableServerSide } = this;
      // To minimize compilation process
      if (enableServerSide) {
        return true;
      }

      // To be Enhanced: Should not use downloadUrl ----> the fileSource is enough
      const isValidClientSideVerification =
        selectedFile && selectedFile.downloadUrl && enableDownload;

      return isValidClientSideVerification;
    },
    updatedValue() {
      const { croppedData } = this;

      return {
        name: this.name,
        value: this.parentUpdatedData,
        isValid: this.isRequired ? !!Object.keys(croppedData).length : true,
      };
    },
    parentUpdatedData() {
      const {
        selectedFile,
        croppedData,
        enableServerSide,
        updateParentWithFileMeta,
      } = this;
      /**
       * SelectedFile in:
       *  - clientSideMode is: instance of File() constructor
       *  - serverSideMode is: { id, attachmentTypeId, contentType, sharepointId, file }
       */

      let mutatedSelectedFile = {};

      if (enableServerSide) {
        mutatedSelectedFile = selectedFile
          ? JSON.parse(JSON.stringify(selectedFile))
          : {};
      } else {
        mutatedSelectedFile = {
          fileName: selectedFile ? selectedFile.name : "",
          croppedBlob: croppedData.croppedBlob || null,
          croppedImage: croppedData.croppedImage || null,
        };
      }

      if (selectedFile) {
        if (updateParentWithFileMeta) {
          mutatedSelectedFile.file = enableServerSide
            ? selectedFile.file
            : selectedFile;
        } else {
          delete mutatedSelectedFile.file;
        }
      }

      return mutatedSelectedFile;
    },
    previewedSelectedFile() {
      const { enableServerSide, selectedFile } = this;
      const serverSideSelectedFile =
        selectedFile && selectedFile.sharepointId ? selectedFile.file : null;

      return enableServerSide ? serverSideSelectedFile : selectedFile;
    },
    namePlaceholderText() {
      const { previewedSelectedFile, strings, isServerLoading } = this;

      if (isServerLoading) {
        return strings.serverLoadingText;
      }

      return previewedSelectedFile
        ? previewedSelectedFile.displayName
        : strings.clickHere;
    },
    utils() {
      return generateUtils(this);
    },
  },
  watch: {
    value() {
      if (this.isValidValue) {
        this.loadData();
      }
    },
  },
  mounted() {
    // initial notification to the parent
    if (this.exportInitialFieldMeta) {
      this.$emit("cropImage", this.updatedValue);
    }

    if (this.isValidValue) {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      const { enableServerSide } = this;

      if (enableServerSide) {
        this.loadServerSideData();
      } else {
        this.loadClientSideData();
      }
    },
    loadClientSideData() {
      const { name: displayName, file: downloadUrl } = this.value;

      this.selectedFile = {
        displayName,
        downloadUrl,
      };
    },
    async loadServerSideData() {
      const { selectedFile, value } = this;
      this.isServerLoading = true;

      const filesNotLoadedYet = selectedFile
        ? [value].filter((providedValue) =>
            [selectedFile].every(
              (file) => file.sharepointId !== providedValue.sharepointId
            )
          )
        : [value];
      // because we are using single attachment only
      const fileToUpload = filesNotLoadedYet[0];
      if (fileToUpload) {
        const fileFromSharepointId = await this.downloadCallback({
          contentType: fileToUpload.contentType,
          sharepointId: fileToUpload.sharepointId,
          encodedSharepointId: btoa(fileToUpload.sharepointId),
          fileGenerator: (response) =>
            new File([response.data], response.headers.filename, {
              type: response.headers["content-type"],
            }),
        });

        fileFromSharepointId.displayName = this.utils.enhanceFileName(
          fileFromSharepointId
        );

        this.selectedFile = {
          ...fileToUpload,
          file: fileFromSharepointId,
        };
      }

      this.isServerLoading = false;
    },
    onSaveCroppedImage(data) {
      const { enableServerSide } = this;

      if (enableServerSide) {
        this.utils.onSaveServerModeCroppedImage(data);
      } else {
        this.utils.onSaveClientModeCroppedImage(data);
      }
    },
  },
};
</script>
