const common = {
  require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
  format: ["progress-bar", "summary"],
};

module.exports = {
  default: {
    ...common,
  },
  en: {
    ...common,
    paths: ["features/health-check.feature"],
    language: "en",
  },
  id: {
    ...common,
    paths: ["features/health-check.id.feature"],
    language: "id",
  },
  // --- Integration test profiles (demo-rest API) ---
  integration: {
    ...common,
    paths: [
      "features/health-check-api.feature",
      "features/health-check-api.id.feature",
      "features/users.feature",
      "features/users.id.feature",
      "features/products.feature",
      "features/products.id.feature",
    ],
  },
  "api-health-en": {
    ...common,
    paths: ["features/health-check-api.feature"],
    language: "en",
  },
  "api-health-id": {
    ...common,
    paths: ["features/health-check-api.id.feature"],
    language: "id",
  },
  "users-en": {
    ...common,
    paths: ["features/users.feature"],
    language: "en",
  },
  "users-id": {
    ...common,
    paths: ["features/users.id.feature"],
    language: "id",
  },
  "products-en": {
    ...common,
    paths: ["features/products.feature"],
    language: "en",
  },
  "products-id": {
    ...common,
    paths: ["features/products.id.feature"],
    language: "id",
  },
};
