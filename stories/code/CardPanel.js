const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const defaultSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<CardPanel>
  <template #default>
    <strong>This is the default slot</strong>
  </template>
</CardPanel>
      `,
    },
  },
};

const headerActionSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<CardPanel>
  <template #headerAction>
    <v-btn color='primary'>Click Me</v-btn>
  </template>
</CardPanel>
      `,
    },
  },
};

export { defaultSlotParams, headerActionSlotParams };
