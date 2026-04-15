Feature: API Health Check
  As an API consumer
  I want to check the health of the demo-rest API
  So that I know the service is running

  Scenario: Health endpoint returns 200 with healthy status
    When I send a GET request to the API "/health"
    Then the API response status should be 200
    And the API response body should have "status" equal to "healthy"

  Scenario: Health endpoint response contains expected fields
    When I send a GET request to the API "/health"
    Then the API response status should be 200
    And the API response body should have key "status"
