<template>
  <div class="attachment-wrapper">
    <div class="label-and-input-wrapper">
      <p
        v-if="label"
        class="label"
        :class="{error}"
      >
        {{ label }}
        <span
          v-if="isRequired"
          class="star"
        >*</span>
      </p>

      <div
        v-if="enableFancyPreview && addAttachmentAllowed && !readOnlyMode"
        class="file-input-wrapper"
      >
        <img
          src="../../assets/icons/folder.svg"
          alt="icon"
          width="25"
          height="25"
        >

        <span
          v-if="strings.placeholder"
          class="placeholder-wrapper"
        > 
          {{ strings.placeholder }}
        </span>

        <button
          class="file-chooser-action"
          @click="$refs.fileInputRef.click()"
        >
          {{ strings.actionName }}
        </button>
      </div>

      <div
        v-if="!enableFancyPreview && addAttachmentAllowed && !readOnlyMode"
      >
        <div class="input-wrapper">
          <button
            :disabled="readOnlyMode"
            class="indicator pointer"
            @click="$refs.fileInputRef.click()"
          >
            {{ strings.clickHere }}
          </button>

          <div class="name-placeholder">
            {{ strings.chooseFile }}
          </div>
        </div>
      </div>

      <slot
        v-if="isErrorSlotAvailable"
        name="errors"
        :errors="error"
      >
        <div class="error-placeholder">
          <p class="text">
            {{ error }}
          </p>
        </div>
      </slot>

      <slot
        v-if="addAttachmentAllowed && !readOnlyMode"
        name="hints"
        :data="{ hintsData }"
      >
        <div class="hints-placeholder">
          <p class="text">
            {{ getAllowedFileTypesText(accept) }}
          </p>
          <p>{{ getAllowedMaxFileSizeText(maxFilesSizeInMega) }}</p>
        </div>
      </slot>

      <input
        ref="fileInputRef"
        class=""
        type="file"
        :multiple="isMultiple"
        :accept="accept"
        @change="onSelectFiles"
      >
    </div>

    <slot
      name="list"
      :data="{ listData }"
      :onDeleteFile="onDeleteFile"
    >
      <ul v-if="selectedFiles.length">
        <li
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="list-item"
        >
          <div class="icon-name-wrapper">
            <img
              class="img"
              src="../../assets/icons/file.svg"
            >
            <span class="file-name">{{ file.displayName }}</span>
          </div>

          <div class="size-delete-wrapper">
            <span class="size">{{ getFileSizeInKiloByte(file.size) }}</span>

            <img
              v-if="!readOnlyMode"
              class="img"
              src="../../assets/icons/delete.svg"
              @click="onDeleteFile(index)"
            >            
            <img
              v-else
              class="img"
              src="../../assets/images/download.png"
              @click="onDownloadFile(file)"
            >
          </div>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
import { ref, toRefs, computed, watch, onMounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'AttachmentField',
  props: {
    maxFileSizeInMega: {          
      type: Number,
      default: 2,
    },
  
    maxFilesSizeInMega: {          
      type: Number,
      default: 5,
    },
    maxDisplayNameLength: {
      type: Number,
      default: 15,
    },
    maxAttachments: {
      type: Number,
      default: 5,
    },
    isMultiple: {
      type: Boolean,
      default: false
    },        
    enableFancyPreview: {
      type: Boolean,
      default: false
    },       
    resetErrorOnSelect: {
      type: Boolean,
      default: true
    },       
    activateInternalErrorPreview: {
      type: Boolean,
      default: true
    },       
    isRequired: {
      type: Boolean,
      default: false
    },      
    enableFullnameDisplay: {
      type: Boolean,
      default: false
    },    
    validateOnSingleFileSize: {
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
    label: {
      type: String,
      default: "",
    },      
    name: {
      type: String,
      default: "",
    },         
    accept: {
      type: String,
      default: "jpg,pdf,png,jpeg",
    },
    value: {
      type: Array,
      default: () => []
    }, 
    localizations: {
      type: Object,
      default: () => ({})
    },

  },
  setup(props, { emit }) {
    const selectedFiles = ref([]);
    const currentTotalSize = ref(0);
    const error = ref('');
    const fileInputRef = ref(null);
    const {
      name,
      value,
      accept,
      isRequired,
      isMultiple,
      readOnlyMode,
      localizations,
      maxAttachments,
      maxFileSizeInMega,
      resetErrorOnSelect,
      maxFilesSizeInMega,
      maxDisplayNameLength,
      enableFullnameDisplay,
      exportInitialFieldMeta,
      validateOnSingleFileSize,
      activateInternalErrorPreview
    } = toRefs(props);

    // 
    onMounted(() => {
      if(exportInitialFieldMeta.value) {
        emit('select', updatedValue.value);
      }

      if(value.value.length) {
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
    const isErrorSlotAvailable = computed(() => !readOnlyMode.value && error.value && activateInternalErrorPreview.value);
    const addAttachmentAllowed = computed(() => selectedFiles.value.length < maxAttachments.value);
    const totalFilesSize = computed(() => maxFilesSizeInMega.value * 1024 * 1024);
    const listData = computed(() => ({ files: selectedFiles.value }));
    const hintsData = computed(() => ({
      maxFileSizeInMega: maxFileSizeInMega.value,
      maxFilesSizeInMega: maxFilesSizeInMega.value,
      allowedExtentions: accept.value
    }));        
    const updatedValue = computed(() => ({
      name: name.value,
      value: selectedFiles.value,
      isValid: isRequired.value ?  !!selectedFiles.value.length : true
    }));          
    const strings = computed(() => ({
      placeholder: '',
      clickHere: 'اضغط هنا',
      chooseFile: 'اختر ملف',
      actionName: "استعراض الملفات",
      ...localizations.value
    }));

    // Methods
    function loadData() {
      selectedFiles.value = value.value.map(file => ({ ...file, displayName: file.name }));
    }

    function onSelectFiles(e) {
      const files = e.target.files;
      const firstFile = files[0];

      if(resetErrorOnSelect.value && error.value) {
        dispatchError();
      }
    
      if(!isMultiple.value && isValidFile(firstFile)) {
        firstFile.displayName = enhanceFileName(firstFile.name);
        selectedFiles.value = [firstFile];
      }

      if(isMultiple.value) {
        console.log('files', files);
        for(let i = 0; i < files.length; i++) {
          const file = files[i];

          if(addAttachmentAllowed.value && isValidFile(file)) {
            file.displayName = enhanceFileName(file.name);
            selectedFiles.value.push(file);
            // update total size
            currentTotalSize.value += file.size;
          }
        }
        // reset field value
        console.log('fileInputRef.value', fileInputRef.value, fileInputRef.value.value)
        fileInputRef.value.value = "";
      }

      emit("select", updatedValue.value);
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

    function getFileSizeInBytes(size) {
      return size * 1024 * 1024;
    }

    function isValidFileSize(fileSize, fileName) {
      const isValidSizeLimit = fileSize <= getFileSizeInBytes(maxFileSizeInMega.value);

      const isValidCurrentSize = validateOnSingleFileSize.value ? isValidSizeLimit : true;
      const isValidWithTotalSize = (currentTotalSize.value + fileSize) <= getFileSizeInBytes(maxFilesSizeInMega.value);

      if(!isValidCurrentSize) {
        dispatchError('maxFileSizeExceeded', fileName);
      }      
      
      if(!isValidWithTotalSize) {
        dispatchError('maxFilesSizeExceeded');
      }

      return isValidCurrentSize && isValidWithTotalSize;
    }

    function isValidFile(file) {
      const enhancedAcceptedExtentions = accept.value.toLowerCase();
      // .ZIP ==> ZIP
      const extention = getFileExtention(file.name, true).slice(1);
      const isValidExtention = enhancedAcceptedExtentions.includes(extention);
      const isValidSize = isValidFileSize(file.size, file.name);

      if(!isValidExtention) {
        return dispatchError('fileExtention', file.name);
      } 

      return isValidExtention && isValidSize;
    }

    function getSelectedError(fileName) {
      return {
        fieldIsRequired: 'هذا الحقل مطلوب',
        maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو ${maxFileSizeInMega.value} م.ب`,
        maxFilesSizeExceeded: ` تم تجاوز الحد المسموح به لجميع الملفات وهو ${maxFilesSizeInMega.value} م.ب`,
        fileExtention: `امتداد الملف ${fileName} غير مسموح به`,
      };
    }

    function dispatchError(target='', fileName= '') {
      const selectedError = getSelectedError(fileName)[target];
      error.value = selectedError;

      emit('error', {
        name: name.value,
        error: selectedError
      });
    }

    function onDeleteFile(index) {
      selectedFiles.value.splice(index, 1);
      
      if(!isMultiple.value && isRequired.value) {
        dispatchError('fieldIsRequired');
      }

      // // update parent
      emit("select", updatedValue.value);
    }
    
    function onDownloadFile(file) {
      const a = document.createElement('a');
      a.href = file.downloadUrl,
      a.download = file.name;

      a.click();
    }

    // Placeholder for default values
    function getAllowedFileTypesText(allowedExtentions) {
      return `نوع الملف يجب أن يكون ${allowedExtentions}`; 
    }

    function getAllowedMaxFileSizeText(maxFilesSizeInMega) {
      return `كحد أقصى ${maxFilesSizeInMega} م.ب`;
    }

    function getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = sizeInBytes / 1000;

      return `${sizeInKiloByte}KB`;
    }

    return {
      fileInputRef,
      // Meta
      error,
      selectedFiles,
      currentTotalSize,
      // Methods
      onDeleteFile,
      onSelectFiles,
      onDownloadFile,
      getFileSizeInKiloByte,
      getAllowedFileTypesText,
      getAllowedMaxFileSizeText,
      // Getters
      strings,
      listData,
      hintsData,
      updatedValue,
      totalFilesSize,
      isErrorSlotAvailable,
      addAttachmentAllowed
    };
  }
});

</script>

<style scoped>
@import '../../assets/styles/attachment-field.css';
</style>