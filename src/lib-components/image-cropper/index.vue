<template>
  <div class="canvas-wrapper">
    <CropperDialog
      v-if="showModal"
      :show="showModal"
      :strings="strings"
      :cropperConfigs="cropperConfigs"
      :selectedImage="imageSrc"
      :fileExtention="fileExtention"
      @close="onReset"
      @save="onSaveCroppedImage"
    />

    <p
      v-if="label"
      class="label"
      :class="labelClassName"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="star"
      >*</span>
    </p>

    <slot
      :croppedImage="croppedImage"
      :onUploadImage="onUploadImage"
      :onEditSelectedImage="onEditSelectedImage"
      :onDeleteSelectedImage="onDeleteSelectedImage"
      name="image-placeholder"
    >
      <div class="input-wrapper">
        <button
          v-if="!selectedFile"
          :disabled="readOnlyMode"
          class="indicator pointer"
          @click="onUploadImage"
        >
          {{ strings.chooseFile }}
        </button>
        <img
          v-else
          class="image-button-placeholder"
          src="../../../assets/icons/file.svg"
          alt="icon"
          width="25"
          height="25"
        >

        <div class="name-placeholder">
          {{ selectedFile ? selectedFile.displayName : strings.clickHere }}
        </div>

        <div class="actions">
          <img
            v-if="selectedFile && !readOnlyMode"
            src="../../../assets/icons/cancel.svg"
            class="action"
            width="30"
            height="30"
            alt="delete"
            @click="onDeleteSelectedImage"
          >          
          
          <img
            v-if="isDownloadAvailable"
            src="../../../assets/images/download.png"
            class="action"
            width="20"
            height="20"
            alt="download"
            @click="onDownloadSelectedImage"
          >
        </div>
      </div>
    </slot>

    <slot
      v-if="error && activateInternalErrorPreview"
      name="errors"
      :errors="error"
    >
      <div class="error-placeholder">
        <p class="text">
          {{ strings.errorText || error }}
        </p>
      </div>
    </slot>

    <slot
      v-if="hint"
      name="hints"
    >
      <div class="hints-placeholder">
        {{ hint }}
      </div>
    </slot>

    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      :style="{ display: 'none' }"
      @change="onSelectImage"
    >
  </div>
</template>

<script>
import { ref, toRefs, watch, computed, onMounted,defineComponent } from 'vue';
import CropperDialog from './CropperDialog.vue';

export default defineComponent({
  name: 'ImageCropper',
  components: {
    CropperDialog
  },
  props: {
    label: {
      type: String,
      default: ''
    },    
    name: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },       
    hint: {
      type: String,
      default: ''
    },    
    isRequired: {
      type: Boolean,
      default: false
    },      
    enableDownload: {
      type: Boolean,
      default: false
    },    
    activateInternalErrorPreview: {
      type: Boolean,
      default: false
    },
    enableFullnameDisplay: {
      type: Boolean,
      default: false
    },
    readOnlyMode: {
      type: Boolean,
      default: false
    },
    exportInitialFieldMeta: {
      type: Boolean,
      default: false
    },
    maxDisplayNameLength: {
      type: Number,
      default: 15,
    },    
    cropperConfigs: {
      type: Object,
      default: () => ({})
    },    
    localizations: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const {
      name, 
      value, 
      isRequired,
      localizations,
      enableDownload,
      maxDisplayNameLength,
      enableFullnameDisplay,
      exportInitialFieldMeta,
    } = toRefs(props);
    const imageInput = ref(null);
    // state
    const showModal = ref(false);
    const selectedFile = ref(null);
    const imageSrc = ref(null);
    const fileExtention = ref(null);
    const error = ref(isRequired.value ? 'هذا الحقل مطلوب' : '');
    const croppedData = ref({});

    onMounted(() => {
      // initial notification to the parent
      if(exportInitialFieldMeta.value) {
        emit('cropImage', {
          name: name.value,
          fileName: '',
          croppedBlob: null,
          croppedImage: null,
          isValid: !isRequired.value
        });
      }

      if(isValidValue.value) {
        loadData();
      }
    })

    // watchers
    watch(value, () => {
      if(value.value?.length) {
        loadData();
      }
    })

    // Getters
    const croppedImage = computed(() => croppedData.value?.croppedImage || '');
    const isValidValue = computed(() => {
      const { name, file } = value.value || {};

      if(name && file) {
        return true;
      }

      return false;
    })
    const isDownloadAvailable = computed(() => {
      if(!selectedFile.value) {
        return false;
      }

      return selectedFile.value.downloadUrl && enableDownload.value;
    })
    const strings = computed(() => ({
      clickHere: 'اضغط هنا',
      modalTitle: 'محرر الصورة',
      modalSaveAction: 'حفظ',
      modalCancelAction: 'إلغاء',
      chooseFile: 'اختر ملف',
      errorText: '',
      ...localizations.value
    }));

    // Methods
    function loadData() {
      const { name: displayName, file: downloadUrl } = value.value;
      const isValidFile = Boolean(downloadUrl);

      selectedFile.value = {
        displayName,
        downloadUrl
      }
      // update parent once value is provided 
      if(isValidValue.value) {
        emit('cropImage', {
          name: name.value,
          fileName: name.value,
          croppedBlob: null,
          croppedImage: downloadUrl,
          isValid: isRequired.value ? isValidFile : true
        });
      }
    }

    function onSelectImage (e) {
      const files = e.target.files;
      const file = files[0];
      const isImageSelected = file && file.type.includes('image');

      if (isImageSelected) {
        const fileReader = new FileReader();
        file.displayName = enhanceFileName(file.name);
        // update selected file
        selectedFile.value = file;

        fileExtention.value = file.type;

        fileReader.readAsDataURL(file);

        fileReader.onload = (event) => {
          imageSrc.value = event.target.result;
          // open the modal
          showModal.value = true;
        };
      }
    }

    function enhanceFileName(fileName) {
      // animals.sd.png ===> .png
      const extention = getFileExtention(fileName);
      const name = fileName.split(extention)[0];
      const displayedName = enableFullnameDisplay.value ? name : name.slice(0, maxDisplayNameLength.value)
      
      return `${displayedName}${extention.toLowerCase()}`;
    }

    function getFileExtention(fileName, enableLowerCase = false) {
      const extention = fileName.substring(fileName.lastIndexOf('.'));

      return enableLowerCase ? extention.toLowerCase() : extention;
    }

    function onEditSelectedImage() {
      showModal.value = true;
    }

    function onDeleteSelectedImage() {
      onReset();
      croppedData.value = {};

      error.value = 'الرجاء التحقق من هذا الحقل',
      emit('cropImage', {
        name: name.value,
        fileName: '',
        croppedBlob: null,
        croppedImage: null,
        isValid: !isRequired.value
      });
    }

    function onDownloadSelectedImage() {
      const a = document.createElement("a"); 
      a.setAttribute('href', selectedFile.value.downloadUrl)
      a.setAttribute('download', selectedFile.value.displayName)

      a.click();
    }

    function onUploadImage() {
      imageInput.value.click();
    }

    function onReset(allowResetSelectedFile = true) {
      showModal.value = false;
      fileExtention.value = null;
      

      if(allowResetSelectedFile) {
        selectedFile.value = null;
      }
      // reset the value of the input 
      imageInput.value.value = '';
      imageSrc.value = null;
    }

    function onSaveCroppedImage (data) {
      onReset(false);
      
      error.value = '';
      croppedData.value = data;
      emit('cropImage', {
        name: name.value,
        fileName: selectedFile.value.name,
        croppedBlob: data.croppedBlob,
        croppedImage: data.croppedImage,
        isValid: isRequired.value ? !!Object.keys(data).length : true
      });
      // reset the value of the input 
      imageInput.value.value = '';
    }

    return {
      imageInput,
      // Meta
      error,
      strings,
      imageSrc,
      showModal,
      croppedImage,
      selectedFile,
      fileExtention,
      // Methods
      onReset,
      onSelectImage,
      onUploadImage,
      onSaveCroppedImage,
      onEditSelectedImage,
      onDeleteSelectedImage,
      onDownloadSelectedImage,
      // Getters
      strings,
      isValidValue,
      croppedImage,
      isDownloadAvailable
    };
  }
});
</script>

<style>
@import './styles.css';
</style>