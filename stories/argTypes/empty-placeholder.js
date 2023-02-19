const argTypesConfigs = {
  isLoading: {
    description: "It's a flag to show <b>Loading text</b>.",
  },
  wrapperClass: {
    description: "Class for the wrapper.",
  },
  icon: {
    description:
      "Material design icon name and it <b>should start with [mdi-[iconName]](https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons)</b>",
  },
  primaryText: {
    description: "Primary text.",
  },
  secondaryText: {
    description: "Secondary text.",
  },
  // ? slots
  actions: {
    description: `Action slot to provide actions below the secondary text`,
    table: {
      category: "Slots",
      type: {
        summary: "html",
      },
    },
  },
  iconContent: {
    description: `Icon slot to override the icon`,
    table: {
      category: "Slots",
      type: {
        summary: "html",
      },
    },
  },
};

export { argTypesConfigs };
