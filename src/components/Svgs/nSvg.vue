<template>
  <component :is="`ni-${name}`" />
</template>

<script>
import NiHoliday from "./icons/holiday.vue";
import NiMap from "./icons/map.vue";

export default {
  name: "NSvg",
  components: {
    NiHoliday,
    NiMap,
  },
  props: {
    name: {
      required: true,
      type: String,
      default: "",
    },
  },
};
</script>
