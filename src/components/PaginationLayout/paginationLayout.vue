<template>
  <div class="base-layout-wrapper">
    <div
      v-if="isLoading && showLoader"
      class="loading-wrapper d-flex align-items-center justify-center"
    >
      <slot name="loader">
        <img
          src="../../assets/icons/loading.gif"
          alt="loading img"
          width="200"
          height="200"
        />
      </slot>
    </div>

    <div
      v-if="generatedList.length || totalCount"
      class="data-placeholder"
      :class="{ loading: isLoading }"
    >
      <slot name="list" :data="generatedList" />
      <div class="navigation pa-3 d-flex align-items-center justify-center">
        <slot
          name="pagination"
          :data="paginationProps"
          :onChangePageSize="onChangePageSize"
          :onFirstPageActionClicked="onFirstPageActionClicked"
          :onPreviousPageActionClicked="onPreviousPageActionClicked"
          :onNextPageActionClicked="onNextPageActionClicked"
          :onLastPageActionClicked="onLastPageActionClicked"
        >
          <v-pagination
            v-if="availablePagesCount"
            :id="pagniateActionId"
            v-model="currentPage"
            class="base-pageIndex-handler"
            :length="availablePagesCount"
            :total-rows="totalCount"
            :per-page="currentPageSize"
            :total-visible="totalVisiblePages"
            :disabled="isDisabled"
            @input="onChangePageIndex"
          >
            <template #first-text>
              <img
                :id="firstPageActionId"
                src="../../assets/icons/first-page.svg"
                alt="fisrt-page"
                width="10"
                height="10"
              />
            </template>
            <template #prev-text>
              <img
                :id="prevPageActionId"
                src="../../assets/icons/prev-page.svg"
                alt="fisrt-page"
                width="10"
                height="10"
              />
            </template>
            <template #next-text>
              <img
                :id="nextPageActionId"
                src="../../assets/icons/next-page.svg"
                alt="fisrt-page"
                width="10"
                height="10"
              />
            </template>
            <template #last-text>
              <img
                :id="lastPageActionId"
                src="../../assets/icons/last-page.svg"
                alt="fisrt-page"
                width="10"
                height="10"
              />
            </template>
          </v-pagination>

          <span class="separator mx-3" />

          <div class="page-size-wrapper">
            <v-select
              :id="changePageSizeActionId"
              v-model="currentPageSize"
              :items="pageSizeOptions"
              outlined
              :disabled="isDisabled"
              class="base-pageSize-handler"
              append-icon="mdi-chevron-down"
              hide-details
              :menu-props="{ bottom: true, offsetY: true }"
              @input="onChangePageSize"
            />
          </div>
        </slot>
      </div>
    </div>
    <div v-else>
      <slot name="emptyPlaceholder">
        <div class="empty-list ma-8">
          <h4>{{ emptyPlaceholderText }}</h4>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import serializeNonQueryParams from "./utils";

export default {
  name: "PaginationLayout",

  props: {
    pagniateActionId: {
      type: String,
      default: "",
    },
    firstPageActionId: {
      type: String,
      default: "",
    },
    prevPageActionId: {
      type: String,
      default: "",
    },
    nextPageActionId: {
      type: String,
      default: "",
    },
    lastPageActionId: {
      type: String,
      default: "",
    },
    changePageSizeActionId: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    endpoint: {
      type: Function,
      required: false,
    },
    additionalPayload: {
      type: Object,
      default: () => ({}),
    },
    pageSizeOptions: {
      type: Array,
      default: () => [5, 10, 30],
    },
    initialPageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    totalVisiblePages: {
      type: Number,
      default: 7,
    },
    emptyPlaceholderText: {
      type: String,
      default: "لا توجد بيانات لعرضها",
    },
    dataTargetKey: {
      type: String,
      default: "records",
    },
    totalCountKey: {
      type: String,
      default: "count",
    },
    serverPageNumberKey: {
      type: String,
      default: "pageIndex",
    },
    serverPageSizeKey: {
      type: String,
      default: "pageSize",
    },
    nestedDataKey: {
      type: String,
      default: "",
    },
    cascadeMode: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    showLoader: {
      type: Boolean,
      default: false,
    },
    isDirectData: {
      type: Boolean,
      default: false,
    },
    enableServerSidePagination: {
      type: Boolean,
      default: true,
    },
    enableReadableStreamParse: {
      type: Boolean,
      default: false,
    },
    fetchOnMount: {
      type: Boolean,
      default: true,
    },
    exportPayloadAsObject: {
      type: Boolean,
      default: false,
    },
    fetchOnPayloadChange: {
      type: Boolean,
      default: true,
    },
    resetPageIndexOnPayloadChange: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: this.initialPageNumber || 1,
      currentPageSize: this.pageSize,
      list: [],
      totalCount: 0,
      isLoading: false,
    };
  },
  computed: {
    availablePagesCount() {
      return Math.ceil(this.totalCount / this.currentPageSize);
    },
    isFirstPageActionDisabled() {
      return this.currentPage === this.initialPageNumber;
    },
    isLastPageActionDisabled() {
      return this.currentPage === this.availablePagesCount;
    },
    generatedList() {
      const {
        currentPage,
        currentPageSize,
        enableServerSidePagination,
        list,
      } = this;
      const currentList = JSON.parse(JSON.stringify(list));
      const currentPageNumber = currentPage * currentPageSize - currentPageSize;
      const modifiedList = currentList.splice(
        currentPageNumber,
        currentPageSize
      );

      return enableServerSidePagination ? list : modifiedList;
    },
    // for customization
    paginationProps() {
      return {
        isLoading: this.isLoading,
        totalCount: this.totalCount,
        totalPages: this.availablePagesCount,
        currentPageSize: this.currentPageSize,
        isLastPageActionDisabled: this.isLastPageActionDisabled,
        isFirstPageActionDisabled: this.isFirstPageActionDisabled,
      };
    },
  },
  watch: {
    additionalPayload: {
      handler(newPayload, oldPayload) {
        if (JSON.stringify(newPayload) !== JSON.stringify(oldPayload)) {
          if (this.resetPageIndexOnPayloadChange) {
            this.currentPage = this.initialPageNumber || 1;
          }

          if (this.fetchOnPayloadChange) {
            this.loadResults();
          }
        }
      },
      deep: true,
    },
    value: {
      handler(newValue, oldValue) {
        if (
          !this.endpoint &&
          newValue &&
          JSON.stringify(newValue) !== JSON.stringify(oldValue)
        ) {
          this.list = newValue;
          this.totalCount = newValue.length;
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.enableServerSidePagination) {
      if (this.fetchOnMount) {
        this.loadResults();
      }
    } else if (this.value) {
      this.list = this.value;
      this.totalCount = this.value.length;
    }
  },
  methods: {
    async loadResults(data = this.additionalPayload) {
      // To be done [Show Loader]
      const payload = {
        ...data,
      };

      if (this.enableServerSidePagination) {
        payload[this.serverPageSizeKey] = this.currentPageSize;

        if (this.initialPageNumber) {
          payload[this.serverPageNumberKey] = this.currentPage;
        } else if (this.currentPage > 1) {
          payload[this.serverPageNumberKey] = this.currentPage - 1;
        } else {
          payload[this.serverPageNumberKey] = 0;
        }
      }

      this.isLoading = true;

      try {
        const fetchData = await this.endpoint(
          this.exportPayloadAsObject
            ? payload
            : serializeNonQueryParams(payload)
        );
        const result = this.enableReadableStreamParse
          ? await fetchData.json()
          : (this.isDirectData ? fetchData : fetchData.data) || [];
        const dataTarget = result[this.dataTargetKey] || [];

        let generatedData = [];
        let totalCount = 0;

        if (!this.enableServerSidePagination) {
          generatedData = this.isDirectData ? result : dataTarget;
        } else {
          generatedData = this.nestedDataKey
            ? dataTarget[this.nestedDataKey]
            : dataTarget;

          totalCount = result[this.totalCountKey];
        }

        if (this.cascadeMode && this.enableServerSidePagination) {
          this.list = this.list.concat(generatedData);
        } else {
          this.list = generatedData || [];
        }

        this.totalCount = this.enableServerSidePagination
          ? totalCount
          : generatedData.length;
        // update parent
        this.$emit("search", {
          generatedData,
          totalCount: this.enableServerSidePagination
            ? totalCount
            : generatedData.length,
        });
      } catch (err) {
        console.error("[ERROR IN FETCHING]", err.message);
      }

      this.isLoading = false;
    },
    // Helpers for UI
    onFirstPageActionClicked() {
      this.currentPage = this.initialPageNumber;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onPreviousPageActionClicked() {
      this.currentPage -= 1;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onNextPageActionClicked() {
      this.currentPage += 1;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onLastPageActionClicked() {
      this.currentPage = this.availablePagesCount;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onChangePageIndex(currentPage) {
      this.currentPage = currentPage;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
    onChangePageSize(currentPageSize) {
      this.currentPageSize = currentPageSize;
      this.currentPage = this.initialPageNumber || 1;

      if (this.enableServerSidePagination) {
        this.loadResults();
      }
    },
  },
};
</script>
