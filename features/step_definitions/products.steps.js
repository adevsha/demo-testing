const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

// =====================
// English step definitions
// =====================

Given("I have valid product data", function () {
  // testData.product is seeded by the Before hook in hooks.js
  expect(this.testData.product).to.have.property("name");
});

Given("I have created a test product via the API", async function () {
  const res = await this.api
    .post("/products/")
    .send(this.testData.product)
    .set("Content-Type", "application/json");
  expect(res.status).to.equal(201);
  this.createdProductId = res.body.id;
  this.createdProducts.push(res.body.id);
});

Given("I have deleted the created product via the API", async function () {
  const res = await this.api.delete(`/products/${this.createdProductId}`);
  expect(res.status).to.equal(204);
  this.createdProducts = this.createdProducts.filter(
    (id) => id !== this.createdProductId
  );
});

When(
  "I send a POST request to the API {string} with the product data",
  async function (path) {
    this.response = await this.api
      .post(path)
      .send(this.testData.product)
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      this.createdProductId = this.response.body.id;
      this.createdProducts.push(this.response.body.id);
    }
  }
);

When(
  "I send a GET request to the API for the created product",
  async function () {
    this.response = await this.api.get(
      `/products/${this.createdProductId}`
    );
  }
);

When(
  "I send a PATCH request to the API for the created product with body:",
  async function (body) {
    this.response = await this.api
      .patch(`/products/${this.createdProductId}`)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "I send a DELETE request to the API for the created product",
  async function () {
    this.response = await this.api.delete(
      `/products/${this.createdProductId}`
    );
    if (this.response.status === 204) {
      this.createdProducts = this.createdProducts.filter(
        (id) => id !== this.createdProductId
      );
    }
  }
);

Then(
  "the API response body should have {string} equal to the test product name",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.product.name);
  }
);

Then(
  "the API response body should have {string} equal to the test product price",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.product.price);
  }
);

Then(
  "the API response array should contain an item with {string} equal to the created product id",
  function (key) {
    const found = this.response.body.some(
      (item) => item[key] === this.createdProductId
    );
    expect(found).to.be.true;
  }
);

// =====================
// Bahasa Indonesia step definitions
// =====================

Given("saya memiliki data produk yang valid", function () {
  expect(this.testData.product).to.have.property("name");
});

Given("saya telah membuat produk uji melalui API", async function () {
  const res = await this.api
    .post("/products/")
    .send(this.testData.product)
    .set("Content-Type", "application/json");
  expect(res.status).to.equal(201);
  this.createdProductId = res.body.id;
  this.createdProducts.push(res.body.id);
});

Given(
  "saya telah menghapus produk yang dibuat melalui API",
  async function () {
    const res = await this.api.delete(
      `/products/${this.createdProductId}`
    );
    expect(res.status).to.equal(204);
    this.createdProducts = this.createdProducts.filter(
      (id) => id !== this.createdProductId
    );
  }
);

When(
  "saya mengirim permintaan POST ke API {string} dengan data produk",
  async function (path) {
    this.response = await this.api
      .post(path)
      .send(this.testData.product)
      .set("Content-Type", "application/json");
    if (this.response.status === 201 && this.response.body.id) {
      this.createdProductId = this.response.body.id;
      this.createdProducts.push(this.response.body.id);
    }
  }
);

When(
  "saya mengirim permintaan GET ke API untuk produk yang dibuat",
  async function () {
    this.response = await this.api.get(
      `/products/${this.createdProductId}`
    );
  }
);

When(
  "saya mengirim permintaan PATCH ke API untuk produk yang dibuat dengan isi:",
  async function (body) {
    this.response = await this.api
      .patch(`/products/${this.createdProductId}`)
      .send(JSON.parse(body))
      .set("Content-Type", "application/json");
  }
);

When(
  "saya mengirim permintaan DELETE ke API untuk produk yang dibuat",
  async function () {
    this.response = await this.api.delete(
      `/products/${this.createdProductId}`
    );
    if (this.response.status === 204) {
      this.createdProducts = this.createdProducts.filter(
        (id) => id !== this.createdProductId
      );
    }
  }
);

Then(
  "badan respons API harus memiliki {string} sama dengan nama produk uji",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.product.name);
  }
);

Then(
  "badan respons API harus memiliki {string} sama dengan harga produk uji",
  function (key) {
    expect(this.response.body[key]).to.equal(this.testData.product.price);
  }
);

Then(
  "array respons API harus mengandung item dengan {string} sama dengan id produk yang dibuat",
  function (key) {
    const found = this.response.body.some(
      (item) => item[key] === this.createdProductId
    );
    expect(found).to.be.true;
  }
);
