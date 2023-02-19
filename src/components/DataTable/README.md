## **Description**
customizable component for handle rows of data table

### **Features**
- [x] follow ui design system
- [x] add label and value data as a data table
- [x] add row primary field with primary action (arrow) 
- [x] customizable value data using formatter 

## Example
```vue
<template>
  <div
    id="app"
  >
    <data-table
      :rows="rows"
      :columns="columns"
      :on-click="onRowClicked"
      :primary-field="primaryField"
    >
      <!-- <template #dateTime="{ data: { row }, currentStyles }">
        <label-and-value
          preview
          :class="['field', currentStyles]"
          :label="$t('appointmentDateAndTime')"
          :value="row.dateTime"
          value-class="label-and-value-value"
        />
      </template> -->

      <!-- <template #status="{ data: { row }, currentStyles }">
        <label-and-value
          preview
          :class="['field', currentStyles]"
          :label="$t('appointmentStatus')"
          :value="row.status"
          value-class="label-and-value-value"
        />
      </template> -->

      <!-- <template #actions="{ data: { row }, currentStyles }">
        <label-and-value preview :class="['field', currentStyles]">
          <template #value>
            <v-btn
              v-if="row.pendingApproval && !row.isCancelled"
              outlined
              color="error"
              @click="openCancelDialog(row)"
            >
              {{ $t("cancel") }}
            </v-btn>
          </template>
        </label-and-value>
      </template> -->
    </data-table>
  </div>
</template>

<script>
import DataTable from "./components/DataTable/dataTable.vue";
export default {
  name: "App",
  components: { 
    DataTable 
  },
  data() {
    return {
      rows: [
        {
          appointmentID: "#45445",
          dateTime: "14-02-1444",
          serviceTitle: "اسم الخدمة",
          status: "فعال",
        },
      ],
      columns: [
        {
          title: this.$t("appointmentNumber"),
          field: "appointmentID",
        },
        {
          title: this.$t("appointmentDateAndTime"),
          field: "dateTime",
        },
        {
          title: this.$t("serviceName"),
          field: "serviceTitle",
        },
        {
          title: this.$t("appointmentStatus"),
          field: "status",
        },
        {
          title: "",
          field: "actions",
        },
      ];
    }
  },
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **title** | *the head title of card panel* | **String** | ***""*** | **false**