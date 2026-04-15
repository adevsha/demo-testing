const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { faker } = require("@faker-js/faker");
const nock = require("nock");

BeforeAll(function () {
  // Disable real HTTP requests during tests — only nock intercepts allowed
  nock.disableNetConnect();
  // Allow supertest connections to localhost
  nock.enableNetConnect("127.0.0.1");
});

Before(function () {
  // Seed test data context available to all steps
  this.testData = {
    userId: faker.string.uuid(),
    userName: faker.person.fullName(),
    email: faker.internet.email(),
    timestamp: faker.date.recent().toISOString(),
  };
});

After(function () {
  // Clean up all nock interceptors after each scenario
  nock.cleanAll();
  // Reset response state
  this.response = null;
  this.testData = null;
});

AfterAll(function () {
  // Re-enable real HTTP after all tests
  nock.enableNetConnect();
  nock.restore();
});
