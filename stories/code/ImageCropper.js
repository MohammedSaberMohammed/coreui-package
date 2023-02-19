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
  <ImageCropper />
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
  <ImageCropper label="الهوية الوطنية" />
</template>
      `,
    },
  },
};

const HintParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <ImageCropper hint="نص توضيحي" />
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
  <ImageCropper 
    isRequired 
    label="الهوية الوطنية" 
  />
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
  <ImageCropper disabled />
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
  <ImageCropper :maxDisplayNameLength='5' />
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
  <ImageCropper 
    enableFullnameDisplay 
    :maxDisplayNameLength="5"
  />
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
  <ImageCropper 
    :value="value"
  />
</template>

<script>
  export default {
    data() {
      value: {
        name: "foo text",
        file: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkd...",
      }
    }
  }
</script>
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
  <ImageCropper 
    :localizations="localizations"
  />
</template>
<script>
  export default {
    data() {
      localizations: {
        chooseFile: 'الرجاء اختيار ملف',
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
  <ImageCropper :value="value" />
</template>
<script>
  export default {
    data() {
      value: {
        name: "foo text",
        file: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkd...",
      }
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
  <ImageCropper 
    :value="value" 
    :attachmentTypeId="5"
    :uploadCallback="onUploadData"
  />
</template>
<script>
  export default {
    data() {
      value: {},
    },
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
  <ImageCropper 
    :value="value"
    :downloadCallback="onGenerateFileFromSharepointId"
  />
</template>
<script>
  export default {
    data() {
      value: {
        attachmentTypeId: 5,
        contentType: "image/png",
        id: 0,
        sharepointId: "Your sharepoint id from server",
      },
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
  <ImageCropper>
    <template #labelContent>
      <v-badge content="المؤهل العلمي" color="info" />
    </template>
  </ImageCropper>
<template>
      `,
    },
  },
};

const CustomHintParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <ImageCropper>
    <template #hints>
      <v-badge content="المؤهل العلمي" color="warning" />
    </template>
  </ImageCropper>
<template>
      `,
    },
  },
};

const CustomInputParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <ImageCropper>
    <template
      #imagePlaceholder="{ 
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
<template>
      `,
    },
  },
};

export {
  HintParams,
  LabelParams,
  DisabledParams,
  RequiredParams,
  ServerSideParams,
  DownloadIconParams,
  LocalizationsParams,
  ServerSideValueParams,
  EnableFullnameDisplayParams,
  MaxDisplayNameLengthParams,
  DefaultParams,
  ClientSideValueParams,
  CustomLabelParams,
  CustomHintParams,
  CustomInputParams,
};
