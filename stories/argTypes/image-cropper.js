const testAutomationConfigs = {
  table: {
    category: "Test Automation Ids",
  },
};

const slotsConfigs = {
  table: {
    category: "Slots",
    type: {
      summary: "html",
    },
  },
};

const testAutomationIds = {
  fileInputId: {
    ...testAutomationConfigs,
    description: "Id for the <b>hidden input file</b>",
  },
  chooseFileActionId: {
    ...testAutomationConfigs,
    description: "Id for <b>Clickable button</b>",
  },
  deleteActionId: {
    ...testAutomationConfigs,
    description: "Id for the <b>Delete</b> button",
  },
  downloadActionId: {
    ...testAutomationConfigs,
    description: "Id for the <b>Download</b> button",
  },
};

const slots = {
  labelContent: {
    ...slotsConfigs,
    description: "Label Cutomization slot",
  },
  error: {
    ...slotsConfigs,
    description:
      "Errors Cutomization slot and it will receive the **error** as an argument which is a string.",
  },
  hints: {
    ...slotsConfigs,
    description: `Hints customization.`,
  },
  // ! To be modified
  imagePlaceholder: {
    ...slotsConfigs,
    description: `<pre>
     ***Customizes attachment field and the cropped image*** and it will receive:
    - **croppedImage [string]**: *Image src after cropping process to use it in UI or as a condition to hide/show the empty placeholder if needed*
    - **onUploadImage [function]**: **Triggers the file explorer**
    - **onDownloadImage [function]**: **Download the cropped Image**.
    - **onDeleteSelectedImage [function]**:  **Resets all chosed files** and export **null** for the **cropImage**
    </pre>
    `,
  },
};

const argTypesConfigs = {
  name: {
    description: "field name to map results and errors to",
  },
  label: {
    description: "Label for input field",
  },
  isRequired: {
    description: "Adds ***** with the label",
  },
  disabled: {
    description: "Disables The Field",
  },
  maxDisplayNameLength: {
    description:
      "If the file name is too long it will **cut it based on it's value**",
  },
  enableFullnameDisplay: {
    description:
      "If **true** it will provide the fullName of the file regardless **maxDisplayNameLength** prop",
  },
  enableDownload: {
    description: "Show download icon",
  },
  hint: {
    description: "Add hint below the field",
  },
  labelClassName: {
    description: "class for label",
  },
  cropperConfigs: {
    description:
      "configs for the cropper canvas [options](https://github.com/fengyuanchen/cropperjs#options) ",
  },
  rules: {
    description:
      "Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a string containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`",
  },
  exportInitialFieldMeta: {
    description: "Update Parent with Field info",
  },
  localizations: {
    description: `Localization for available strings, available strings are<br />
    <ol>
      <li>**clickHere**: *default is* **اضغط هنا**</li>
      <li>**modalTitle**: default is ***محرر الصورة***</li>
      <li>**modalSaveAction**: default is ***حفظ*** </li>
      <li>**modalCancelAction**: default is ***إلغاء*** </li>
      <li>**chooseFile**: *Placeholder for input field in ( Normal Mode )* and default is ***اختر ملف***</li>
      <li>**serverLoadingText**: *placeholder for input field in ( serverSideMode Mode )* and default is ***'جاري تحميل البيانات ...***</li>
    </ol>
      `,
  },
  updateParentWithFileMeta: {
    description:
      "To send the **original file** with the value recieved via **@select** event",
  },
  attachmentTypeId: {
    description: "To Identify the type sent to the server",
  },

  // ! to be enhanced
  value: {
    description: `<pre>
    files to update the ui in the **and it differs from clientside and serverside**
    *An object must contain the following depending on Mode* 
  - **clientsideMode ---> ( enableServerSide = false )**: *should consist of*  **name**, **baseFile--> FullBase64** 
  - **serversideMode ---> ( enableServerSide = true )**: *should consist of*  **id, attachmentTypeId, contentType, and sharepointId**
    </pre>
    `,
  },

  activateInternalErrorPreview: {
    description: "to show internal error",
  },
  enableServerSide: {
    description: "To enable Serverside auto upload",
  },
  uploadCallback: {
    description:
      "callback that is reponsible for return **sharepointId** and it **receives(base64Meta) which is { source, base64, contentType }**",
  },
  downloadCallback: {
    description: `<pre>
      callback that is reponsible for return the **originalFile** from server and it **receives(sharepointMeta)**
      **sharepointMeta**:
        <b>**{
                    sharepointId -> original,
                    encodedSharepointId -> base64,
                    contentType -> optional,
                    fileGenerator
            }**
        </b>
       </pre>`,
  },
  // ? TestAutomation Ids
  ...testAutomationIds,
  // ? Events
  cropImage: {
    description: `<pre>
    *function that exposes all the cropped files as the first param as*
      - **clientsideMode ---> ( enableServerSide = false )**: It will be **{ croppedBlob: Blob, croppedImage: Base64 }**
      - **serversideMode ---> ( enableServerSide = true )**: It will be **Array of object and each object will consist be 
      <b>
        { 
          attachmentTypeId, 
          id, 
          contentType, 
          sharepointId 
        }
      </b>
      </pre>
      `,
    table: {
      category: "Events",
    },
  },
  // ? Slots
  ...slots,
};

export { argTypesConfigs };
