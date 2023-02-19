const defaultSourceConfigs = {
  language: "vuejs",
  type: "auto",
};

const customIconWithIconSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<EmptyPlaceholder>
  <template #iconContent>
    <img 
      alt='mountain'
      src='https://place-hold.it/250x150'
    />
  </template>
</EmptyPlaceholder>
`,
    },
  },
};

const customActionWithActionSlotParams = {
  docs: {
    source: {
      ...defaultSourceConfigs,
      code: `
<EmptyPlaceholder>
  <template #actions>
    <v-btn color='info'>Click Me !</v-btn>
  </template>
</EmptyPlaceholder>
`,
    },
  },
};

export { customIconWithIconSlotParams, customActionWithActionSlotParams };
