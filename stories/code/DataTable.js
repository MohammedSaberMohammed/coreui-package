const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const clickEventParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
const columns = [];
const rows = [];

<DataTable 
  :rows="rows"
  :columns="columns"
  onClick="row => console.log(row)"
/>`,
    },
  },
};

const withoutSpacerParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
const columns = [];
const rows = [];

<DataTable 
  noSpacer
  :rows="rows"
  :columns="columns"
  onClick="row => console.log(row)"
/>`,
    },
  },
};

const fieldCutomizationParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
const columns = [{ "field": "id", "title": "الترتيب" }];
const rows = [{ "id": "1", "name": "ناجز أفراد", "color": "اللون الأخضر" }];

<DataTable 
  :columns='columns'
  :rows='rows'
>
  // In case you want only override the entire column. ==> <template #[ColumnField]>
  <template #id>
    <div class='pa-10'>
      <v-btn  color="info">Hey first column is customizable now</v-btn>
    </div>
  </template>

  // In case you want only override the entire column [and use the metadata provided by data table].
  <template #id={ currentClass, data: { row, columns, currentIteration } }>
    <div :class='currentClass'>
      <v-btn color="info">Hey first column is customizable now</v-btn>

      <span>color: {{ row.color }}</span
    </div>
  </template>
</DataTable>`,
    },
  },
};

export { clickEventParams, withoutSpacerParams, fieldCutomizationParams };
