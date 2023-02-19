<template>
  <div :class="['base-empty-placeholder', wrapperClass]">
    <p v-if="isLoading" class="primary-text mb-2">
      {{ $t("fetchingData") }}
    </p>
    <template v-else>
      <slot name="iconContent">
        <div v-if="icon" class="img-placeholder">
          <v-icon class="icon" color="primary">
            {{ icon }}
          </v-icon>
        </div>
      </slot>

      <p v-if="primaryText" class="mb-2 primary-text">
        {{ primaryText }}
      </p>

      <p v-if="secondaryText" class="secondary-text mb-0">
        {{ secondaryText }}
      </p>

      <slot name="actions" />
    </template>
  </div>
</template>
<script>
export default {
  name: "EmptyPlaceholder",
  props: {
    icon: {
      type: String,
      default: "",
    },
    primaryText: {
      type: String,
      default: "",
    },
    secondaryText: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    wrapperClass: {
      type: String,
      default: "",
    },
  },
};
</script>
