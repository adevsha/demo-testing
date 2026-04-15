const { setWorldConstructor } = require("@cucumber/cucumber");
const supertest = require("supertest");

class CustomWorld {
  constructor() {
    // For integration tests against the demo-rest API container
    this.baseUrl = process.env.API_URL || "http://localhost:8000";
    this.api = supertest(this.baseUrl);

    // Shared state across steps within a scenario
    this.response = null;
    this.testData = null;
    this.createdUsers = [];
    this.createdProducts = [];
  }
}

setWorldConstructor(CustomWorld);
