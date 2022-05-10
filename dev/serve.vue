<template>
  <div id="app">
    <AttachmentField 
      label='Vue3'
      name='V3'
      isRequired
      isMultiple
      :maxFileSizeInMega='1'
      :maxFilesSizeInMega='2'
      :maxDisplayNameLength='5'
      :maxAttachments='20'
      :resetErrorOnSelect='false'
      :activateInternalErrorPreview='true'
      :localizations='{actionName: "اضغط هنا"}'
      enableFullnameDisplay
      validateOnSingleFileSize
      enableFancyPreview
      exportInitialFieldMeta
      @select='logVue3'
      @error="errVue3"
    />

    <ImageCropper
      label='محرر الصور'
      name='image-cropper'
      labelClassName='enhancedLabel'
      hint='ملحوظة تجريبية'
      isRequired
      activateInternalErrorPreview
      :maxDisplayNameLength='6'
      enableFullnameDisplay
      :readOnlyMode='false'
      :localizations='{chooseFile: "اضغط للاختيار"}'
      :cropperConfigs='{viewMode: 1}'
      enableDownload
      @cropImage='onCropV3'
      exportInitialFieldMeta
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { MojCoreUiSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  MojCoreUiSample,
  // }
  methods: {
    logVue2: files => console.log('V2', files),
    logVue3: files => console.log('V3', files),
    errVue3: files => console.log('V3Error', files),
    errVue2: files => console.log('V2Error', files),
    onCropV2: files => console.log('onCropV2', files),
    onCropV3: files => console.log('onCropV3', files),
  }
});
</script>


