## **Description**
Highly customizable pkg for managing selecting files

### **Features**
- [x] Select single file
- [x] Select multiple files
- [x] Customization for all strings
- [x] Customization for hints section
- [x] Customization for list rendering
- [x] Customization for errors
- [x] **Autoupload with Server side mode**

## Example
```vue
<template>
  <div
    id="app"
  >
    <AttachmentField 
      label="صورة شخصية "
      name="association"
      placeholder="قم بسحب وإرفاق ملفاتك في هذه المنطقة"
      isMultiple
      isRequired
      :localizations="localizations"
      activateInternalErrorPreview
      enableFancyPreview
      @select="onSelectFiles"
      @error="onErrorFound"
    >

      <!-- <template #label="{data}">
        <p
          :class="['label', { err: data.err }]"
        >
          {{ label }}
          <span
            class="star"
          >*</span>
        </p>
      </template> -->

      <!-- <template #errors="{errors}">
        <div class="error-placeholder">
          <p class="text">
            {{ errors }}
          </p>
        </div>
      </template>         
      
      <template #hints="{data}">
        <div class="hints-placeholder">
          <p class="text">
            {{ getAllowedFileTypesText(data.hintsData) }}
          </p>
          <p>{{ getAllowedMaxFileSizeText(data.hintsData) }}</p>
        </div>
      </template>   
      
      <template #list="{data: { listData }, onDeleteFile}">
        <ul v-if="listData.files.length">
          <li
            v-for="(file, index) in listData.files"
            :key="index"
            class="list-item"
          >
            <div class="icon-name-wrapper">
              <img
                class="img"
                src="./assets/file.png"
              >
              <span class="file-name">{{ file.displayName }}</span>
            </div>

            <div class="size-delete-wrapper">
              <span class="size">{{ getFileSizeInKiloByte(file.size) }}</span>
              <img
                class="img"
                src="./assets/trash-bin.png"
                @click="onDeleteFile(index)"
              >
            </div>
          </li>
        </ul>
      </template> -->
    </AttachmentField>
  </div>
</template>

<script>
import AttachmentField from "./components/AttachmentField/attachmentField.vue";
export default {
  name: "App",
  components: { 
    AttachmentField 
  },
  data() {
    return {
      localizations: {
        placeholder: 'استعراض الملفات'
      }
    }
  },
  methods: {
    onSelectFiles(files) {
      console.log('onSelectFiles', files);
    },    
    onErrorFound(error) {
      console.log('error', error);
    },
    getAllowedFileTypesText(data) {
      return `نوع الملف يجب أن يكون ${data.allowedExtentions}`; 
    },
    getAllowedMaxFileSizeText(data) {
      return `كحد أقصى ${data.maxFilesSizeInMega} م.ب`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = sizeInBytes / 1000;

      return `${sizeInKiloByte}KB`;
    }
  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@select** | *function that exposes all the selected files as the first param* | **event** | ***@select="onSelectFiles"*** | **true**
| **@error** | *function that exposes the input error* | **event** | ***@error="onErrorFound"*** | **false**
| **name** | *field name to map results and errors to* | **String** | ***""*** | **true**
| **maxFileSizeInMega** | *max single file size* | **Number** | ***2 MB*** | false
| **maxFilesSizeInMega** | *total size for the selected files* | **Number** | ***5 MB*** | false
| **maxAttachments** | *max selected attachments number* | **Number** | ***5*** | false
| **maxDisplayNameLength** | *if the file name is too long it will cut it based on it's value* | **Number** | ***15*** | **false**
| **isRequired** | *to indicate whether the input isRequired or not and to show * with the label* | **Boolean** | ***false*** | **false**
| **enableServerSide** | *to enable [Autoupload functionality] see the section below* | **Boolean** | ***false*** | **false**
| **isMultiple** | *to make the input multiselect* | **Boolean** | ***false*** | **false**
| **resetErrorOnSelect** | *to clear the error when choosing a new file* | **Boolean** | ***true*** | **false**
| **activateInternalError** | *to show cutom internal errors* | **Boolean** | ***false*** | **false**
| **enableFullnameDisplay** | *if true it will provide the fullName of the file regardless **maxDisplayNameLength** prop* | **Boolean** | ***false*** | **false**
| **validateOnSingleFileSize** | *if true the selection will validate based on ***maxFileSizeInMega**** | **Boolean** | ***false*** | **false**
| **label** | *label for input field* | **String** | ***""*** | **false**
| **accept** | *the file types the file input should accept. [Accept Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)* | **String** | ***"jpg, pdf, png, jpeg"*** | **false**
| **value** | *files to update the ui in the **and it differs from clientside and serverside*** | **Array** | ***[]*** | **false**
| **activateInternalErrorPreview** | *to show internal error* | **Boolean** | ***false*** | **false**
| **readOnlyMode** | *Disable The Field* | **Boolean** | ***false*** | **false**
| **exportInitialFieldMeta** | *Update Parent with Field info* | **Boolean** | ***false*** | **false**
| **enableFancyPreview** | *Switch between 2 Views Normal/fancy look* | **Boolean** | ***false*** | **false**
| **localizations** | *for checnging all the desired strings* | **Object** | ***{}*** | **false**

## Props for Autoupload functionality
  - ### *To enable Serverside auto upload*
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **enableServerSide** | *To enable Serverside auto upload* | **Boolean** | ***false*** | **false**
| **updateParentWithFileMeta** | *To send the **original file** with the value recieved via **@select** event* | **Boolean** | ***false*** | **false**
| **attachmentTypeId** | *To Identify the type sent to the server* | **Number** | ***0*** | **false**
| **uploadCallback** | *callback that is reponsible for return **sharepointId** and it **receives(base64Meta) which is { source, base64, contentType } *** | **Number** | ***0*** | **false**
| **downloadCallback** | *callback that is reponsible for return the **originalFile** from setver and it **receives(sharepointMeta) which is { sharepointId => original, encodedSharepointId => base64, contentType => optional, fileGenerator } *** | **Number** | ***0*** | **false**

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


## Available localizations
| Prop | default | hint |
| --- | --- | --- |
| **placeholder** | ***''*** | *placeholder for input field in ( Fancy Mode )* |
| **actionName** | ***استعراض الملفات*** | *Button Label ( Fancy Mode )* | 
| **clickHere** | ***اضغط هنا*** | *Button Label ( Normal Mode )* |
| **chooseFile** | ***اختر ملف*** | *placeholder for input field in ( Normal Mode )* |
| **serverLoadingText** | ***'جاري تحميل البيانات ...*** | *placeholder for input field in ( serverSideMode Mode )* |

## Customizations
*The available customization are*:
1. **Hints section**: in order to customize it you will have to ***scoped slot*** with the name ***hints*** and it will receive the ***data*** as an argument.
***data object*** contains of: **hintsData** which includes:
  - **allowedExtentions**: provided by ***accept*** prop
  - **maxFilesSizeInMega**: provided by ***maxFilesSizeInMega*** prop
  - **maxFileSizeInMega**: provided by ***maxFileSizeInMega*** prop

2. **List section**: to render custom list so in order to customize it you will have to ***scoped slot*** with the name ***list*** and it will receive the **data** as an argument and ***onDeleteFile***.
***data object*** contains of: **listData** which includes:
  - **files**: selected files to loop through them
  - And
- **onDeleteFile**: method to handle delete file
  
3. **Error section**: to render custom error `and it will not be available if activateInternalErrorPreview=false` so in order to customize it you will have to ***scoped slot*** with the name ***errors*** and it will receive the **errors** as an argument `which is a string`.

## Notes: 
- ***@select*** : *function that exposes all the **{ value(selected files), name and isValid }** as the first param and selectedFiles changes based on the Mode*
  - **clientsideMode ---> ( enableServerSide = false )**: *It will be **Array of Files => File[]***
  - **serversideMode ---> ( enableServerSide = true )**: *It will be **Array of object and each object will consist be { attachmentTypeId, id, contentType, sharepointId }***
- ***@error*** : *function that exposes error + name as the first param*
- ***Each file*** : has the same props as in [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files) in addition to **displayName** prop
- ***displayName*** : we will count on it for **displaying the name** always **not the name prop**
- ***value*** : *array of object and each object must contain the following depending on Mode* 
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
