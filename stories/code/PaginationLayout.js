const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const renderedListParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout
    totalCountKey="totalPassengers"
    dataTargetKey="data"
    serverPageNumberKey="page"
    serverPageSizeKey="size"
    enableReadableStreamParse
    :endpoint="endpoint"
  />
</template>

<script>
  export default {
    data() {
      endpoint: (serverSideLink) => fetch("https://api.instantwebtools.net/v1/passenger{serverSideLink}"),
    }
  }
</script>
      `,
    },
  },
};

const PageSizeOptionsParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout
    :pageSize="pageSize"
    :pageSizeOptions="pageSizeOptions"
  />
</template>

<script>
  export default {
    data() {
      pageSize: 5,
      pageSizeOptions: [5, 100, 300],
    }
  }
</script>
      `,
    },
  },
};

const InitialPageNumberParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout :initialPageNumber="1" />
</template>
      `,
    },
  },
};

const PageSizeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout :pageSize="30" />
</template>
      `,
    },
  },
};

const TotalVisiblePagesParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout :totalVisiblePages="4" />
</template>
      `,
    },
  },
};

const CascadeModeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout cascadeMode />
</template>
      `,
    },
  },
};

const DisabledModeParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout isDisabled />
</template>
      `,
    },
  },
};

const AdditionalPayloadParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout :additionalPayload="additionalPayload" />
</template>

<script>
  export default {
    data() {
      additionalPayload: {
        trips: 50
      },
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
  <PaginationLayout
    :value="value"
    :enableServerSidePagination="false" 
  />
</template>

<script>
  export default {
    data() {
      value: [
        {
          name: "إثبات تنازل عن إصابة",
          description:
            "خدمة تتيح للمستفيد تقديم طلب لإثبات تنازل عن إصابة لحقت به، ويتم إثبات التنازل لدى المحكمة.",
          id: "71d9425c-c484-4f28-9a83-d41930561df4",
          rank: "firstRank",
        },
        {
          name: "توثيق الإستحقاق لتمويل الزواج",
          description:
            "خدمة تتيح للمستفيد من تقديم طلب لتوثيق استحقاق لتمويل الزواج وتقديمه إلى الجهة المعينة التي تطلبه.",
          id: "d1a4165a-aca9-45ed-92ae-a4e3d97d5696",
          rank: "firstRank",
        },
        // ...
      ],
    }
  }
</script>
      `,
    },
  },
};

const EmptyPlaceholderTextParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout :emptyPlaceholderText="emptyPlaceholderText" />
</template>

<script>
  export default {
    data() {
      emptyPlaceholderText: "الرجاء المحاولة مرة اخرى "
    }
  }
</script>
      `,
    },
  },
};

const CustomEmptyPlaceholderParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout>
      <template #emptyPlaceholder>
        <v-card-title class='primary--text'>الرجاء المحاولة لاحقاً</v-card-title>
      </template>
  </P>
</template>
      `,
    },
  },
};

const CustomPaginationParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <PaginationLayout>
    <template #pagination="{ 
          data, 
          onFirstPageActionClicked, 
          onPreviousPageActionClicked, 
          onNextPageActionClicked, 
        onLastPageActionClicked 
      }"
    >
      <v-btn
        class="nav-controller"
        :disabled="data.isFirstPageActionDisabled"
        @click="onFirstPageActionClicked"
      >
        الصفحة الأولى
      </v-btn>   
      
      <v-btn
        class="nav-controller"
        :disabled="data.isFirstPageActionDisabled"
        @click="onPreviousPageActionClicked"
      >
        السابق
      </v-btn>   
      
      <v-btn
        class="nav-controller"
        :disabled="data.isLastPageActionDisabled"
        @click="onNextPageActionClicked"
      >
        التالي
      </v-btn>

      <v-btn
        class="nav-controller"
        :disabled="data.isLastPageActionDisabled"
        @click="onLastPageActionClicked"
      >
        الصفحة الأخيرة
      </v-btn>
  </template>
</PaginationLayout>
      `,
    },
  },
};

export {
  PageSizeParams,
  CascadeModeParams,
  renderedListParams,
  DisabledModeParams,
  PageSizeOptionsParams,
  InitialPageNumberParams,
  TotalVisiblePagesParams,
  AdditionalPayloadParams,
  ClientSideValueParams,
  EmptyPlaceholderTextParams,
  CustomEmptyPlaceholderParams,
  CustomPaginationParams,
};
