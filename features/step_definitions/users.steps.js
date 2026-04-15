const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

// =====================
// English step definitions
// =====================

Given("I have valid user data", function () {
  // testData.user is seeded by the Before hook in hooks.js
  expect(this.testData.user).to.have.property("name");
});

Given("I have created a test user via the API", async function () {
  const res = await this.api
    .post("/users/")
    .send(this.testData.user)
    .set("Content-Type", "application/json");
  expect(res.status).to.equal(201);
  this.createdUserId = res.body.id;
  this.createdUsers.push(res.body.id);
});

Given("I have deleted the created user via the API", async function () {
  const res = await this.api.delete(`/users/${this.createdUserId}`);
  expect(res.status).to.equal(204);
  // Remove from cleanup list since it's already deleted
  this.createdUsers = this.createdUsers.filter(
    (id) => id !== this.createdUserId
  );
});

When(
  "I send a POST request to the API {string} with the user data",
  async function (path) {
    this.response = await this.api
      .post(path)
      .send(this.testData.user)
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      this.createdUserId = this.response.body.id;
      this.createdUsers.push(this.response.body.id);
    }
  }
);

When(
  "I send a POST request to the API {string} with body:",
  async function (path, body) {
    this.response = await this.api
      .post(path)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      if (path.includes("users")) {
        this.createdUsers.push(this.response.body.id);
      } else if (path.includes("products")) {
        this.createdProducts.push(this.response.body.id);
      }
    }
  }
);

When(
  "I send a GET request to the API for the created user",
  async function () {
    this.response = await this.api.get(`/users/${this.createdUserId}`);
  }
);

When(
  "I send a PATCH request to the API for the created user with body:",
  async function (body) {
    this.response = await this.api
      .patch(`/users/${this.createdUserId}`)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "I send a PATCH request to the API {string} with body:",
  async function (path, body) {
    this.response = await this.api
      .patch(path)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "I send a DELETE request to the API for the created user",
  async function () {
    this.response = await this.api.delete(`/users/${this.createdUserId}`);
    if (this.response.status === 204) {
      this.createdUsers = this.createdUsers.filter(
        (id) => id !== this.createdUserId
      );
    }
  }
);

When("I send a DELETE request to the API {string}", async function (path) {
  this.response = await this.api.delete(path);
});

Then("the API response body should be an array", function () {
  expect(this.response.body).to.be.an("array");
});

Then(
  "the API response body should have {string} equal to the test user name",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.user.name);
  }
);

Then(
  "the API response body should have {string} equal to the test user email",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.user.email);
  }
);

Then(
  "the API response array should contain an item with {string} equal to the created user id",
  function (key) {
    const found = this.response.body.some(
      (item) => item[key] === this.createdUserId
    );
    expect(found).to.be.true;
  }
);

Then(
  "the API response body should have {string} equal to {int}",
  function (key, value) {
    expect(this.response.body[key]).to.equal(value);
  }
);

Then(
  "the API response body should have {string} equal to false",
  function (key) {
    expect(this.response.body[key]).to.equal(false);
  }
);

// =====================
// Bahasa Indonesia step definitions
// =====================

Given("saya memiliki data pengguna yang valid", function () {
  expect(this.testData.user).to.have.property("name");
});

Given("saya telah membuat pengguna uji melalui API", async function () {
  const res = await this.api
    .post("/users/")
    .send(this.testData.user)
    .set("Content-Type", "application/json");
  expect(res.status).to.equal(201);
  this.createdUserId = res.body.id;
  this.createdUsers.push(res.body.id);
});

Given(
  "saya telah menghapus pengguna yang dibuat melalui API",
  async function () {
    const res = await this.api.delete(`/users/${this.createdUserId}`);
    expect(res.status).to.equal(204);
    this.createdUsers = this.createdUsers.filter(
      (id) => id !== this.createdUserId
    );
  }
);

When(
  "saya mengirim permintaan POST ke API {string} dengan data pengguna",
  async function (path) {
    this.response = await this.api
      .post(path)
      .send(this.testData.user)
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      this.createdUserId = this.response.body.id;
      this.createdUsers.push(this.response.body.id);
    }
  }
);

When(
  "saya mengirim permintaan POST ke API {string} dengan isi:",
  async function (path, body) {
    this.response = await this.api
      .post(path)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      if (path.includes("users")) {
        this.createdUsers.push(this.response.body.id);
      } else if (path.includes("products")) {
        this.createdProducts.push(this.response.body.id);
      }
    }
  }
);

When(
  "saya mengirim permintaan GET ke API untuk pengguna yang dibuat",
  async function () {
    this.response = await this.api.get(`/users/${this.createdUserId}`);
  }
);

When(
  "saya mengirim permintaan PATCH ke API untuk pengguna yang dibuat dengan isi:",
  async function (body) {
    this.response = await this.api
      .patch(`/users/${this.createdUserId}`)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "saya mengirim permintaan PATCH ke API {string} dengan isi:",
  async function (path, body) {
    this.response = await this.api
      .patch(path)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "saya mengirim permintaan DELETE ke API untuk pengguna yang dibuat",
  async function () {
    this.response = await this.api.delete(`/users/${this.createdUserId}`);
    if (this.response.status === 204) {
      this.createdUsers = this.createdUsers.filter(
        (id) => id !== this.createdUserId
      );
    }
  }
);

When(
  "saya mengirim permintaan DELETE ke API {string}",
  async function (path) {
    this.response = await this.api.delete(path);
  }
);

Then("badan respons API harus berupa array", function () {
  expect(this.response.body).to.be.an("array");
});

Then(
  "badan respons API harus memiliki {string} sama dengan nama pengguna uji",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.user.name);
  }
);

Then(
  "badan respons API harus memiliki {string} sama dengan email pengguna uji",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.user.email);
  }
);

Then(
  "array respons API harus mengandung item dengan {string} sama dengan id pengguna yang dibuat",
  function (key) {
    const found = this.response.body.some(
      (item) => item[key] === this.createdUserId
    );
    expect(found).to.be.true;
  }
);

Then(
  "badan respons API harus memiliki {string} sama dengan {int}",
  function (key, value) {
    expect(this.response.body[key]).to.equal(value);
  }
);

Then(
  "badan respons API harus memiliki {string} sama dengan false",
  function (key) {
    expect(this.response.body[key]).to.equal(false);
  }
);
