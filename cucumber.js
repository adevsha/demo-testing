module.exports = {
  default: {
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    format: ["progress-bar", "summary"],
  },
  en: {
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    paths: ["features/health-check.feature"],
    format: ["progress-bar", "summary"],
    language: "en",
  },
  id: {
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    paths: ["features/health-check.id.feature"],
    format: ["progress-bar", "summary"],
    language: "id",
  },
};
