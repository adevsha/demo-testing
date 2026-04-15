const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const supertest = require("supertest");
const nock = require("nock");

const app = require("../../app");

const EXTERNAL_SERVICE_URL = "https://api.external-service.com";

// --- English steps ---

Given("the external service is available", function () {
  this.externalMock = nock(EXTERNAL_SERVICE_URL)
    .get("/status")
    .reply(200, { service: "external-api", status: "ok" });
});

Given("the external service is unavailable", function () {
  this.externalMock = nock(EXTERNAL_SERVICE_URL)
    .get("/status")
    .replyWithError("Connection refused");
});

When("I send a GET request to {string}", async function (path) {
  this.response = await supertest(app).get(path);
});

Then("the response status should be {int}", function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then("the response body should contain {string}", function (text) {
  expect(JSON.stringify(this.response.body)).to.include(text);
});

Then(
  "the response body should contain external service data",
  function () {
    expect(this.response.body.external).to.deep.equal({
      service: "external-api",
      status: "ok",
    });
  }
);

Then("the external service field should be {string}", function (value) {
  expect(this.response.body.external).to.equal(value);
});

// --- Bahasa Indonesia steps ---

Given("layanan eksternal tersedia", function () {
  this.externalMock = nock(EXTERNAL_SERVICE_URL)
    .get("/status")
    .reply(200, { service: "external-api", status: "ok" });
});

Given("layanan eksternal tidak tersedia", function () {
  this.externalMock = nock(EXTERNAL_SERVICE_URL)
    .get("/status")
    .replyWithError("Connection refused");
});

When(
  "saya mengirim permintaan GET ke {string}",
  async function (path) {
    this.response = await supertest(app).get(path);
  }
);

Then("status respons harus {int}", function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then("badan respons harus mengandung {string}", function (text) {
  expect(JSON.stringify(this.response.body)).to.include(text);
});

Then(
  "badan respons harus mengandung data layanan eksternal",
  function () {
    expect(this.response.body.external).to.deep.equal({
      service: "external-api",
      status: "ok",
    });
  }
);

Then("bidang layanan eksternal harus {string}", function (value) {
  expect(this.response.body.external).to.equal(value);
});
