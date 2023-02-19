<template>
  <section :class="wrapperClass">
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="base-data-table-list-item mb-4 d-flex flex-column flex-sm-row align-strech"
    >
      <slot
        v-if="enhancedColumns.primaryColumn"
        :name="enhancedColumns.primaryColumn.field"
        :data="{ row, columns, currentIteration: i }"
      >
        <div class="field primary d-flex align-center">
          <label-and-value
            :is-loading="isLoading"
            :label="enhancedColumns.primaryColumn.title"
            :value="getColumnValue(row, enhancedColumns.primaryColumn)"
          />

          <template v-if="onClick">
            <v-spacer v-if="!noSpacer" />

            <v-btn
              :id="clickPrimaryFieldAction"
              class="arrow mr-5"
              text
              @click="onClick(row)"
            >
              <v-icon color="white" medium> mdi-arrow-left </v-icon>
            </v-btn>
          </template>
        </div>
      </slot>

      <div class="enhanced-columns-wrapper d-flex flex-wrap align-center">
        <template
          v-for="(column, currentIteration) in enhancedColumns.sortedColumns"
          :class="column.class"
        >
          <slot
            :name="column.field"
            :data="{ row, columns, currentIteration }"
            currentClass="field"
          >
            <label-and-value
              class="field"
              :label="column.title"
              :is-loading="isLoading"
              :value="getColumnValue(row, column)"
            />
          </slot>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
// components
import LabelAndValue from "../LabelAndValue/labelAndValue.vue";

export default {
  name: "DataTable",
  components: {
    LabelAndValue,
  },
  props: {
    clickPrimaryFieldAction: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },

    rows: {
      type: Array,
      required: true,
      default: () => [],
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    primaryField: {
      type: String,
      default: "",
    },

    onClick: {
      type: Function,
      // default: () => ({}),
    },

    wrapperClass: {
      type: String,
      default: "",
    },

    noSpacer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    enhancedColumns() {
      let primaryColumn = null;

      if (this.rows.length) {
        if (!this.primaryField) {
          return {
            primaryColumn,
            sortedColumns: this.columns,
          };
        }

        const primaryFieldIndex = this.columns.findIndex(
          (column) => column.field === this.primaryField
        );

        if (primaryFieldIndex > -1) {
          const sortedColumns = [...this.columns];
          [primaryColumn] = sortedColumns.splice(primaryFieldIndex, 1);

          return {
            primaryColumn,
            sortedColumns,
          };
        }

        return {
          primaryColumn,
          sortedColumns: this.columns,
        };
      }

      return {
        primaryColumn,
        sortedColumns: [],
      };
    },
  },
  methods: {
    getColumnValue(row, column) {
      if (column.formatter) {
        return column.formatter(row) || "---";
      }
      return row[column.field] || "---";
    },
  },
};
</script>
