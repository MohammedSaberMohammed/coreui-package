## **Description**
Highly customizable pkg for cropping Images

### **Features**
- [x] Localization for all strings
- [x] Customization for **Image Placeholder**
- [x] Customization for **Rendered Cropped Image**
- [x] Customization for **Hints section if needed**
- [x] **Autoupload with Server side mode**

## Example
```vue
<template>
  <ImageCropper
    label="نص تجريبي"
    :cropperConfigs="cropperConfigs"
    @cropImage="onCropImage"
    hint="hint placeholder"
  >
    <template #imagePlaceholder="{croppedImage, onEditSelectedImage, onDeleteSelectedImage, onUploadImage}">
      <div class="cropped-imagePlaceholder">
        <img
          :src="croppedImage"
          class="cropped-image"
          alt="cropped-image"
        >

        <div class="actions">
          <img
            src="./assets/edit.png"
            alt="edit"
            @click="onEditSelectedImage"
          >

          <img
            src="./assets/delete.svg"
            alt="delete"
            @click="onDeleteSelectedImage"
          >        
        
          <img
            src="./assets/upload.png"
            alt="upload"
            @click="onUploadImage"
          >
        </div>
      </div>
    </template>
  </ImageCropper>
</template>

<script>
import ImageCropper from "./components/ImageCropper.vue";

export default {
  name: "App",
  components: { 
    ImageCropper 
  },
  data() {
    return {
      cropperConfigs: {
        aspectRatio: 19 / 6
      }
    };
  },
  methods: {
    onCropImage(data) {
      console.log('onCropImage', data);
    }
  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@cropImage** | *function that exposes all the cropped files as the first param* | **Function** | ***@cropImage="onCropImage"*** | **true**
| **cropperConfigs** | *configs for the cropper canvas [options](https://github.com/fengyuanchen/cropperjs#options) * | **Object** | ***{}*** | **false**
| **localizations** | *for checnging all the desired strings* | **Object** | ***{}*** | **false**
| **label** | *Field label* | **String** | ***''*** | **false**
| **isRequired** | *Flag for indicating whether the input is required or not * | **Boolean** | ***false*** | **false**
| **maxDisplayNameLength** | *if the file name is too long it will cut it based on it's value* | **Number** | ***15*** | **false**
| **exportInitialFieldMeta** | *Update Parent with Field info* | **Boolean** | ***false*** | **false**
| **enableFullnameDisplay** | *if true it will provide the fullName of the file regardless **maxDisplayNameLength** prop* | **Boolean** | ***false*** | **false**
| **activateInternalErrorPreview** | *to show internal error* | **Boolean** | ***false*** | **false**
| **name** | *field name to map results and errors to* | **String** | ***""*** | **true**
| **value** | *file to update the ui in the **and it differs from clientside and serverside*** | **Array** | ***[]*** | **false**
| **hint** | *To Add hint below the field* | **string** | ***''*** | **false** |
| **readOnlyMode** | *Disable The Field* | **Boolean** | ***false*** | **false**
| **enableDownload** | *To Allow Download previously saved image* | **Boolean** | ***true*** | **false**

## Props for Autoupload functionality
  - ### *To enable Serverside auto upload*
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **enableServerSide** | *To enable Serverside auto upload* | **Boolean** | ***false*** | **false**
| **updateParentWithFileMeta** | *To send the **original file** with the value recieved via **@select** event* | **Boolean** | ***false*** | **false**
| **attachmentTypeId** | *To Identify the type sent to the server* | **Number** | ***0*** | **false**
| **uploadCallback** | *callback that is reponsible for return **sharepointId** and it **receives(base64Meta) which is { source, base64, contentType } *** | **Number** | ***0*** | **false**
| **downloadCallback** | *callback that is reponsible for return the **originalFile** from setver and it **receives(sharepointMeta) which is { sharepointId => original, encodedSharepointId => base64, contentType => optional, fileGenerator } *** | **Number** | ***0*** | **false**


## Available localizations
| Prop | default |
| --- | --- |
| **clickHere** | ***اضغط هنا*** |
| **modalTitle** | ***محرر الصورة*** |
| **modalSaveAction** | ***حفظ*** |
| **modalCancelAction** | ***إلغاء*** |
| **chooseFile** | ***اختر ملف*** |
| **serverLoadingText** | ***'جاري تحميل البيانات ... -> *placeholder for input field in ( serverSideMode Mode )*** |

## Behavior
  - ### In server side mode (enableServerSide = true)
    1. *User selects the attachment, then*
    2. *if the file isValid in (size, doesn't exceed the maxAttachment Files sizes, extention, ..etc): then*
    3. *File will be converted to base64, then*
    4. *uploadCallback will be called with the **base64Meta**, and the expected result to return sharepointId, then*
    5. *The internal state will be updated, then update parent with @select event ====> ***See Notes section****
    6. *You should provide the value back to the component to be in sync*
      - *In this case there will be check if there are values not included in the internal state to load it but under the same validations like (checking that the values doesn't exceed the maxAttachments, size, ...etc)*
    - ### Provided [Value] from parent (For example) 
      1. *filesNotLoadedYet: Filter the value that its sharepointId doesn't exist in internal state*
      2. *If there are filesNotLoadedYet: Load them by calling **downloadCallback***
      3. *Then load it in the internalstate and update the parent*
        - *You can privide the file either by **manipulating the data from your endpoint and then convert it to file** or **use _fileGenerator_ function provided from _downloadCallback_ and pass the full response to it in case the response of _arraybuffer_ (so you have to ensure that your endpoint return arrayBuffer by using { responseType: 'arraybuffer' } with your request)***

## Customizations
*The available customization are*:
1. **Image Placeholder**: in order to customize it you will have to ***scoped slot*** with the name ***imagePlaceholder*** and it will receive:
  - **croppedImage**: *Image src after cropping process to use it in UI or as a condition to hide/show the empty placeholder if needed*
  - **onUploadImage**: *To trigger the file chooser*
  - **onDownloadImage**: *Download the cropped Image*
  - **onDeleteSelectedImage**: *method to reset all chosed files and `export null for the cropImage*

2. **Error section**: to render custom error `and it will not be available if activateInternalErrorPreview=false` so in order to customize it you will have to ***scoped slot*** with the name ***errors*** 

3. **Hints section**: to render custom Hint so in order to customize it you will have to ***scoped slot*** with the name ***hints***.

## Notes: 
- ***@cropImage*** : *function that exposes all the cropped files as the first param as*
  - **clientsideMode ---> ( enableServerSide = false )**: *It will be **{ croppedBlob: Blob, croppedImage: Base64 }***
  - **serversideMode ---> ( enableServerSide = true )**: *It will be **Array of object and each object will consist be { attachmentTypeId, id, contentType, sharepointId }***
- ***value*** : *An object must contain the following depending on Mode* 
  - **clientsideMode ---> ( enableServerSide = false )**: *should consist of **name**, **baseFile--> FullBase64***
  - **serversideMode ---> ( enableServerSide = true )**: *should consist of **id, attachmentTypeId, contentType, and sharepointId***

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
