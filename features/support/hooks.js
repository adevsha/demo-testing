const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { faker } = require("@faker-js/faker");
const nock = require("nock");
const supertest = require("supertest");

const apiUrl = process.env.API_URL || "http://localhost:8000";

BeforeAll(function () {
  // Disable real HTTP requests during tests — only nock intercepts allowed
  nock.disableNetConnect();
  // Allow supertest connections to localhost and the api container
  nock.enableNetConnect((host) => {
    return (
      host.includes("127.0.0.1") ||
      host.includes("localhost") ||
      host.includes("api")
    );
  });
});

Before(function () {
  // Seed faker-generated test data available to all steps
  this.testData = {
    user: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
    },
    product: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
      in_stock: faker.datatype.boolean(),
    },
  };
  // Track resources created during this scenario for cleanup
  this.createdUsers = [];
  this.createdProducts = [];
});

After(async function () {
  // Clean up resources created during this scenario
  const api = supertest(apiUrl);

  for (const id of this.createdUsers) {
    try {
      await api.delete(`/users/${id}`);
    } catch {
      // Ignore — resource may already be deleted by the scenario
    }
  }

  for (const id of this.createdProducts) {
    try {
      await api.delete(`/products/${id}`);
    } catch {
      // Ignore — resource may already be deleted by the scenario
    }
  }

  // Clean up nock interceptors
  nock.cleanAll();

  // Reset response state
  this.response = null;
});

AfterAll(function () {
  // Re-enable real HTTP after all tests
  nock.enableNetConnect();
  nock.restore();
});
