const testAutomationConfigs = {
  table: {
    category: "Test Automation Ids",
  },
};

const testAutomationIds = {
  switchActionId: {
    ...testAutomationConfigs,
    description: "Id for hijri/gregorian switcher",
  },
  textFieldActionId: {
    ...testAutomationConfigs,
    description: "Id for text field",
  },
  pickerWrapperId: {
    ...testAutomationConfigs,
    description: "Id for the picker wrapper",
  },
  confirmActionId: {
    ...testAutomationConfigs,
    description: "Id for the confirmation button",
  },
  cancelActionId: {
    ...testAutomationConfigs,
    description: "Id for the cancel button",
  },
  resetActionId: {
    ...testAutomationConfigs,
    description: "Id for the reset button",
  },
};

const argTypesConfigs = {
  multiple: {
    description: "Select multiple values if `true` the `value will be array`.",
  },
  range: {
    description: "Select range of values if `true` the `value will be array`.",
  },
  row: {
    description: "Align switcher and the field `horizontaly, verticaly`.",
  },
  hijri: {
    description: "Toggles between hijri and gregorian.",
  },
  dense: {
    description: "Reduces the input height.",
  },
  label: {
    description: "Sets input label",
  },
  hint: {
    description: "Hint text",
  },
  value: {
    description:
      "It should be <b>string or array<string></b> based on <b>multiple or range props</b>",
  },
  rules: {
    description:
      "Accepts a mixed array of types `function`, `boolean` and `string`. Functions pass an input value as an argument and must return either `true` / `false` or a string containing an error message. The input field will enter an error state if a function returns (or any value in the array contains) `false` or is a `string`",
  },
  localizations: {
    description:
      "localization for available strings, available strings are `gregorian`, `hijri`, `cancel`, `reset` and `ok` ",
  },
  // ? TestAutomation Ids
  ...testAutomationIds,

  // ? Events
  change: {
    description:
      "Fires when <b>`When the value is changed`</b>, and exports `object as a parameter => { hijri, gregorian }`, <br /> `@change='da => console.log({ isHijri })'` ",
    table: {
      category: "Events",
    },
  },
  changeHijri: {
    description:
      "Fires when <b>`When the switch button is clicked`</b>, and exports `boolean as a parameter`, <br /> `@changeHijri='isHijri => console.log({ isHijri })'` ",
    table: {
      category: "Events",
    },
  },
};

export { argTypesConfigs };
