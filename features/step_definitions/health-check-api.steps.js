const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

// --- English steps ---

When("I send a GET request to the API {string}", async function (path) {
  this.response = await this.api.get(path);
});

Then("the API response status should be {int}", function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then(
  "the API response body should have {string} equal to {string}",
  function (key, value) {
    expect(String(this.response.body[key])).to.equal(value);
  }
);

Then("the API response body should have key {string}", function (key) {
  expect(this.response.body).to.have.property(key);
});

// --- Bahasa Indonesia steps ---

When(
  "saya mengirim permintaan GET ke API {string}",
  async function (path) {
    this.response = await this.api.get(path);
  }
);

Then("status respons API harus {int}", function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then(
  "badan respons API harus memiliki {string} sama dengan {string}",
  function (key, value) {
    expect(String(this.response.body[key])).to.equal(value);
  }
);

Then("badan respons API harus memiliki kunci {string}", function (key) {
  expect(this.response.body).to.have.property(key);
});
