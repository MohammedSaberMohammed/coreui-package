<template>
  <section class="card-panel-wrapper">
    <div class="card-panel-header">
      <div v-if="!isLoading" class="title-wrapper">
        <span class="title">{{ title }}</span>
        <slot name="headerAction" />
      </div>

      <v-skeleton-loader
        v-else
        loading
        width="300px"
        height="20px"
        type="heading"
      />
    </div>
    <div class="card-panel-content-wrapper">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "CardPanel",
  props: {
    title: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
