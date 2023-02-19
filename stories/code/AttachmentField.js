const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const DefaultParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField />
</template>
      `,
    },
  },
};

const LabelParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField label="الشهادة العلمية" />
</template>
      `,
    },
  },
};

const RequiredParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField  isRequired />
</template>
      `,
    },
  },
};

const AcceptParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField accept=".doc" />
</template>
      `,
    },
  },
};

const DisabledParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField disabled />
</template>
      `,
    },
  },
};

const MultipleParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField isMultiple />
</template>
      `,
    },
  },
};

const MaxFileSizeInMegaParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    validateOnSingleFileSize 
    :maxFileSizeInMega=".01" 
  />
</template>
      `,
    },
  },
};

const MaxFilesSizeInMegaParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    isMultiple
    :maxFilesSizeInMega='.5'
  />
</template>
      `,
    },
  },
};

const MaxDisplayNameLengthParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField :maxDisplayNameLength='10' />
</template>
      `,
    },
  },
};

const MaxAttachmentsParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    isMultiple
    :maxAttachments='2' 
  />
</template>
      `,
    },
  },
};

const EnableFullnameDisplayParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    enableFullnameDisplay 
    :maxDisplayNameLength='10'
  />
</template>
      `,
    },
  },
};

const ValidateOnSingleFileSizeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    validateOnSingleFileSize 
    :maxFileSizeInMega=".01" 
  />
</template>
      `,
    },
  },
};

const PhancyPreviewParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField enableFancyPreview />
</template>
      `,
    },
  },
};

const DownloadIconParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField enableDownload />
</template>
      `,
    },
  },
};

const LocalizationsParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    :localizations="localizations"
  />
</template>
<script>
  export default {
    data() {
      localizations: {
        clickHere: 'الرجاء اختيار ملف',
        ...etc
      }
    }
  }
</script>
      `,
    },
  },
};

const ClientSideValueParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    :value="value" 
    isMultiple 
  />
</template>
<script>
      export default {
        data() {
          value: [
            {
              name: "first file",
              baseFile:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCBkNHS2jw6LRAAAAf0lEQVRIx+2VMQ6AIAxFvyaEkcTLMXEORjiUtzDxGqxsbHwHYxhcacToHzu83/40LfAJkdayKiUEj5EkyXVl1VoITrJuG6sxQvB9J5flh78TPl1wIISzlBLgHJBz/84FNAOldMv5kYhaVN6LbdBvMrKJ4Lm+TyLwcJqJ4MscXgfd31tu/nsI5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0yNVQxMzoyOTo0NSswMDowMNfGwcgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMjVUMTM6Mjk6NDUrMDA6MDCmm3l0AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTI1VDEzOjI5OjQ1KzAwOjAw8Y5YqwAAAABJRU5ErkJggg==",
            },
            {
              name: "second file",
              baseFile:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYEAQAAAAa7ikwAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCBkNHS2jw6LRAAAAf0lEQVRIx+2VMQ6AIAxFvyaEkcTLMXEORjiUtzDxGqxsbHwHYxhcacToHzu83/40LfAJkdayKiUEj5EkyXVl1VoITrJuG6sxQvB9J5flh78TPl1wIISzlBLgHJBz/84FNAOldMv5kYhaVN6LbdBvMrKJ4Lm+TyLwcJqJ4MscXgfd31tu/nsI5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0yNVQxMzoyOTo0NSswMDowMNfGwcgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMjVUMTM6Mjk6NDUrMDA6MDCmm3l0AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTI1VDEzOjI5OjQ1KzAwOjAw8Y5YqwAAAABJRU5ErkJggg==",
            },
          ],
        }
      }
</script>
      `,
    },
  },
};

const ServerSideParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    isMultiple
    :attachmentTypeId="5"
    :uploadCallback="onUploadData"
  />
</template>
<script>
  export default {
    methods: {
      async onUploadData(data) {
        console.log('onUploadData', data);

        const sharePointId = await ApiCallToGetSharePointId(data);
        
        return sharePointId;
      }, 
    }
  }
</script>
      `,
    },
  },
};

const ServerSideValueParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField 
    isMultiple
    :value="value"
    :downloadCallback="onGenerateFileFromSharepointId"
  />
</template>
<script>
  export default {
    data() {
      value: [
        {
          "id": 0,
          "attachmentTypeId": 5,
          "contentType": "image/png",
          "sharepointId": "test0.41862898112024816test+pqql4B8hlPlIsuvkdtKbkr40lpA==",
          "fileName": "test - Copy (1).png"
        },
        {
          "id": 0,
          "attachmentTypeId": 6,
          "contentType": "image/png",
          "sharepointId": "test0.41338112024816test+pqql4B8hlPlIsuvkdtKbkr40lpA==",
          "fileName": "founding-day - Copy (2).png"
      }
      ],
    },
    methods: {
      async onGenerateFileFromSharepointId(data) {
        console.log('onUploadData', data);

        const file = await ApiCallToGetFileFromSharePoint(data);
        
        return file;
        })
      }, 
    }
  }
</script>
      `,
    },
  },
};

const CustomLabelParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField>
    <template #labelContent>
      <v-badge content="المؤهل العلمي" color="info" />
    </template>
  </AttachmentField>
<template>
      `,
    },
  },
};

const CustomListParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <AttachmentField>
    <template #list="{ data, onDeleteFile }">
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
<template>
      `,
    },
  },
};

export {
  LabelParams,
  AcceptParams,
  DisabledParams,
  RequiredParams,
  ServerSideParams,
  DownloadIconParams,
  PhancyPreviewParams,
  LocalizationsParams,
  ServerSideValueParams,
  EnableFullnameDisplayParams,
  MaxDisplayNameLengthParams,
  MaxAttachmentsParams,
  DefaultParams,
  MultipleParams,
  MaxFileSizeInMegaParams,
  ClientSideValueParams,
  CustomLabelParams,
  MaxFilesSizeInMegaParams,
  ValidateOnSingleFileSizeParams,
  CustomListParams,
};
