import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'hp9zn2',
  e2e: {
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    video: true,
    videoCompression: false, 
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,

    setupNodeEvents(on, config) {}
  }
});