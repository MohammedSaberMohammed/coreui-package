## **Description**
customizable component for card panel

### **Features**
- [x] follow ui design system
- [x] adding title to the card panel title
- [x] add card head action 

## Example
```vue
<template>
  <div
    id="app"
  >
    <card-panel :title="title">
      <!-- Customize Header Action slot -->
      <template #headerAction>
        <v-btn color="red" class="white--text"> الغاء </v-btn>
      </template>
    </card-panel>
  </div>
</template>

<script>
import CardPanel from "./components/CardPanel/cardPanel.vue";
export default {
  name: "App",
  components: { 
    CardPanel 
  },
  data() {
    return {
      title: 'تجربة',
    }
  },
};
</script>
```

## Props
| Prop | Description | Type | Default | isRequired
| --- | --- | --- | --- | --- |
| **title** | *the head title of card panel* | **String** | ***""*** | **false**