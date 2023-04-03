const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w3dai5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
