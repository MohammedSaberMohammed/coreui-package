## **Description**
Highly customizable pkg for Server Side Pagination

### **Features**
- [x] **SSP** For APIs
- [x] **Client side pagination** For APIs
- [x] Cascade mode 
- [x] Customization for **Loader**
- [x] Customization for **Lisr Rendering**
- [x] Customization for **pagination Actions**
- [x] Placeholder for empty data
- [ ] Support LTR toggle

## Example
```vue
<template>
  <div
    id="app"
  >
    <PaginationLayout
      :endpoint="endpoint"
      serverPageNumberKey="page"
      serverPageSizeKey="size"
      totalCountKey="totalPassengers"
      enableReadableStreamParse
      emptyPlaceholderText="لا توجد بيانات لعرضها"
      :cascadeMode="false"
      :enableServerSidePagination="false"
      :additionalPayload="additionalPayload"
      :pageSizeOptions="[50, 100, 30]"
      @search="onSearch"
    >
      <!-- Customize Loading slot -->
      <template #loader>
        <span>Loading ...</span>
      </template>      
      
      <!-- Customize list slot -->
      <template #list="{data}">
        <p
          v-for="(item, i) in data"
          :key="i"
        >
          {{ item.title }}
        </p>
      </template>

      <!-- Customize empty list placeholder -->
      <template #empty-placeholder>
        <div class="empty-list">
            <h4>{{ emptyPlaceholderText }}</h4>
        </div>
      </template>
      
      <!-- Customize pagination slot -->
      <template
        #pagination="{
          data,
          onChangePageSize,
          onFirstPageActionClicked,
          onPreviousPageActionClicked,
          onNextPageActionClicked,
          onLastPageActionClicked,
        }"
      >
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onFirstPageActionClicked"
        >
          الصفحة الأولى
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isFirstPageActionDisabled"
          @click="onPreviousPageActionClicked"
        >
          السابق
        </button>   
        
        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onNextPageActionClicked"
        >
          التالي
        </button>

        <button
          class="nav-controller"
          :disabled="data.isLastPageActionDisabled"
          @click="onLastPageActionClicked"
        >
          الصفحة الأخيرة
        </button>
      </template>
    </PaginationLayout>
  </div>
</template>

<script>
import PaginationLayout from "./components/PaginationLayout.vue";
export default {
  name: "App",
  components: { 
    PaginationLayout 
  },
  data() {
    return {
      additionalPayload: {},
      // endpoint: serverSideLink => fetch(`https://api.instantwebtools.net/v1/passenger${serverSideLink}`)
      // client
      endpoint: serverSideLink => fetch(`http://jsonplaceholder.typicode.com/photos?_limit=100${serverSideLink}`)
    };
  },
  methods: {
    onSearch(data) {
      console.log('onSearch', data);
    }
  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **@search** | *function that exposes an object ( **data - totalCount** ) as the first param* | **event** | ***@search="onSearch"*** | **false**
| **endpoint** | *Required function that is needed to **call the API**.* | **Function** |  | **true**
| **additionalPayload** | *any props for the endpoint need to be sent with request* | **Object** | ***{}** | *false*
| **initialPageNumber** | *Initial page to start with* | **Number** | ***0*** | **false**
| **pageSize** | *Items per page* | **Number** | ***10*** | **false**
| **pageSizeOptions** | *Array of page size options to view* | **Array** | ***[5, 10, 30]*** | **false**
| **dataTargetKey** | *to select the items from the response by key* | **String** | ***data*** | **false**
| **totalCountKey** | *to target the total count from the response by key* | **String** | ***totalCount*** | **false**
| **serverPageNumberKey** | *to change the name of the **page parameter** if required to be changed with request* | **String** | ***pageIndex"*** | **false**
| **serverPageSizeKey** | *to change the name of the **pageSize(items per page) parameter** if required to be changed with request* | **String** | ***pageSize*** | **false**
| **nestedDataKey** | *to change the data target in case of the data is not direct in the response and it is nested* | **String** | ***""*** | **false**
| **cascadeMode** | *option to keep the previously received results and append the new to them* | **Boolean** | ***false*** | **false**
| **showLoader** | *to hide/show loader layout* | **Boolean** | ***false*** | **false**
| **exportPayloadAsObject** | *to send payload to endpoint as object body like in post otherwise it will be a **query string*** | **Boolean** | ***false*** | **false**
| **enableServerSidePagination** | *option to **Enable ServerSidePagination** and **Disable Client side pagination*** | **Boolean** | ***true*** | **false**
| **isDirectData** | *option to **target the data directly and no need for nested selectio** and **only related to Client side Pagination *** | **Boolean** | ***false*** | **false**
| **enableReadableStreamParse** | *option to parse the response if it is Readable Stream data like response from (fetch API)* | **Boolean** | ***false*** | **false**
| **fetchOnMount** | *option to control the initial fetch on component mount* | **Boolean** | ***true*** | **false**
| **fetchOnPayloadChange** | *option to triger the fetch on payload change if needed* | **Boolean** | ***true*** | **false**
| **resetPageIndexOnPayloadChange** | *option to reset the page index on payload change to gurantee the right calculations and results if needed* | **Boolean** | ***true*** | **false**
| **isDisabled** | _option to disable the pagination_ | **Boolean** | **_false_** | **false**
| **totalVisiblePages** | _option to handle the UI Total Number Visible Buttons_ | **Number** | **_7_** | **false**
| **emptyPlaceholderText** | _option to replace the text of empty list placeholder text_ | **String** | **_لا توجد بيانات لعرضها_** | **false**
| **value** | _value to be paginated and **see it's explanation ---> veru important**_ | **Array** | **_[]_** | **false**

## Customizations
*The available customization are*:
1. **Loader section**: to render ***custom loader*** so in order to customize it you will have to use ***scoped slot*** with the name ***loader***.

2. **List section**: to render ***custom list*** so in order to customize it you will have to use ***scoped slot*** with the name ***list*** and it will receive the **data** as an argument.

3. **Empty List placholder section**: to render **_custom Empty list placeholder template_** so in order to customize it you will have to use **_scoped slot_** with the name **_emptyPlaceholder_**.

4. **Pagination section**: to render ***custom pagination section*** so in order to customize it you will have to use ***scoped slot*** with the name ***pagination*** and it will receive the ***data object  and 5 methods *** as an argument.
***data object*** contains of:
  - **isLoading**: to check if the request is loading or not.
  - **totalCount**: total records count
  - **totalPages**: available total pages
  - **currentPageSize**: selected current page size from the dropdown
  - **isLastPageActionDisabled**: **true** if ***currentPage === totalPages*** to disable **first and previous Actions**
  - **isFirstPageActionDisabled**: **true** if ***currentPage === 0*** to disable **last and next Actions**
- **Methods**: 
  - ***onChangePageSize***: to change the page size and it takes the number as the first param `onChangePageSize(20)`
  - ***onFirstPageActionClicked***: triger first page action click
  - ***onPreviousPageActionClicked***: triger previous page action click
  - ***onNextPageActionClicked***: triger next page action click
  - ***onLastPageActionClicked***: triger last page action click

## Notes: 
1. ***@change*** : *function that exposes all the selected files as the first param*
2. ***endpoint*** : *isRequired - and it should take a **pagination link** as a param to search with*
    ```js
    serverSideLink => fetch(`Your Api Here ${serverSideLink}`)
    ```
3. ***cascadeMode***: *works only with SSP mode*
4. ***value***: *It doesn't work with fetch or any api call so in order to make it work follow the following rules*
    - 1. **Don't provide**: _*endpoint prop*_
    - 2. **fetchOnMount**: _*pass it with **false** *_
    - 2. **enableServerSidePagination**: _*pass it with **false** *_