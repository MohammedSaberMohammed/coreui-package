<template>
  <div :class="['base-label-and-value', { 'd-flex align-center': row }]">
    <v-skeleton-loader
      v-if="isLoading"
      loading
      type="text"
      width="60"
      height="12"
      class="mb-1"
    />
    <template v-else>
      <div :class="[labelClass, 'preview label-text mb-0']">
        <slot name="labelContent">
          {{ label }}
        </slot>
      </div>
    </template>

    <v-skeleton-loader
      v-if="isLoading"
      loading
      type="text"
      width="120"
      height="12"
    />
    <template v-else>
      <div :class="[valueClass, { 'mx-1': row }, 'value-text mb-0 preview']">
        <slot name="valueContent">
          {{ value }}
        </slot>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "LabelAndValue",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
    valueClass: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
