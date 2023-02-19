const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const RulesParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<template>
  <Calendar 
      :rules="rules"
      :value="value"
  />
</template>
<script>
    export default {
      data() {
        value: "",
        rules: [(value) => !!value || "Required."]
      }
    }
</script>
      `,
    },
  },
};

export { RulesParams };
