## **Description**
customizable component for empty placeholder card

### **Features**
- [x] handle empty values placeholder
- [x] can add icon to the placeholder card
- [x] can add title to the placeholder card 
- [x] can add subtitle to the placeholder card 

## Example
```vue
<template>
  <div
    id="app"
  >
    <empty-placeholder
      :primary-text="primaryText"
      :secondary-text="secondaryText"
      :is-loading="isLoading"
      wrapper-class="class-name"
      icon="mdi-check"
    >
      <template #actions>
        <v-btn
          color="primary"
          class="text--white"
        >
          العودة
        </v-btn>
      </template>
    </empty-placeholder>

  </div>
</template>

<script>
import EmptyPlaceholder from "./components/EmptyPlaceholder/emptyPlaceholder.vue";
export default {
  name: "App",
  components: { 
    EmptyPlaceholder 
  },
  data() {
    return {
      primaryText: 'عنوان النصي للمربع',
      secondaryText: 'العنوان الفرعي للمربع أو الوصف',
      isLoading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **icon** | *icon placheolder of the card ( use material design icons )* | **String** | ***""*** | **false**
| **primaryText** | *the primary text (head) of the card* | **String** | ***""*** | **false**
| **secondaryText** | *the secondary text (subtitle) of the card* | **String** | ***""*** | **false**
| **isLoading** | *handle card loading with text placeholder* | **Boolean** | ***false*** | **false**
| **wrapperClass** | *class name to add css rules to the card wrapper* | **String** | ***""*** | **false**

## Behavior

1. _if you put isLoading = true component will handle loading placeholder card using static text, then_
2. _else after a while (setTimeout or after mounted) will generate placeholder card with your available props (icon, primaryText, secondaryText)_


## Notes:
- **_icon_** : _must use material design icons [Docs](https://materialdesignicons.com/)_
- **_isLoading_** : _it handle loading state till load data as a placeholder with translated text $t("fetchingData") === "جاري تحميل البيانات ..."_