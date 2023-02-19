const argTypesConfigs = {
  rows: {
    description:
      "Array of object, <b>mainly it will be the response from the server</b>",
  },
  columns: {
    description: `<pre>
      Array of objects, <b><i>Each object represents a column to be shown and has a schema</i></b>.<br />
      - column Schema: 
      <code>
        <ul>
          <li> <b>1- field [Required]:</b> Represents a key in a row object to map its value.</li>
          <li> <b>2- title:</b> title for the column</li>
          <li> <b>3- formatter(row):</b>In case you needed to modify the field value and <b>it takes the row as an argument</b></li>
        </ul>
      </code>
    </pre>
    `,
  },
  isLoading: {
    description: "Loading mode, replace columns with loading slots.",
  },
  noSpacer: {
    description:
      "Removes the space between the <b>PrimaryFiels column and the action (arrow)</b>.",
  },
  primaryField: {
    description: `<pre>
    <b>Should matchs any field from columns array.</b>
    - It will make the following on the primary field/column.field: 
    <code>
      <ul>
        <li> <b>1- It will sort the column to be the first one rendered</b>.</li>
        <li> <b>2- It will highlight it with a background.</b></li>
      </ul>
    </code>
  </pre>
  `,
  },
  wrapperClass: {
    description: "Class for list item wrapper.",
  },
  // ? Events
  onClick: {
    description: `<pre>
    Callback is used in when row arrow clicked, <b>it should be used with primaryField</b> <br />
      - <b>args: => row</b>

      <code>
        onClick(row) {
          // Your code here
        }
      </code>
    </pre>`,
    table: {
      category: "Events",
    },
  },
  // ? Test automation ids
  clickPrimaryFieldAction: {
    description: "Id for clickable action",

    table: {
      category: "Test Automation Ids",
    },
  },
  // ? slots
  default: {
    table: {
      disable: true,
    },
  },
  "{fieldName}": {
    description: `<pre>If you want to customize any <b>column</b> just make a <b>scoped</b> slot with <b>of column.filed (revisit columns section)</b><br />
      - slot props: 
        <code>
          <ul>
            <li> <b>1- currentClass (string)</b>: In case you needed the current styles controlled by the package itself</li>
            <li> <b>2- data (object => { row, columns, currentIteration })</b></li>
              - row: the current row.
              - columns: columns provided from the parent.
              - currentIteration: column iteration.
          </ul>
        </code>

        <code> 
          <template name="YourColumnFieldHere">
            // Any Html here
          </template>
        </code>
    </pre>`,
    table: {
      category: "Slots",
      type: {
        summary: "html",
      },
    },
  },
};

export { argTypesConfigs };
