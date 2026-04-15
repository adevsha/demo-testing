Feature: Health Check Endpoint
  As an API consumer
  I want to verify the service health
  So that I know the API is running

  Scenario: Health endpoint returns 200 when external service is available
    Given the external service is available
    When I send a GET request to "/health"
    Then the response status should be 200
    And the response body should contain "healthy"
    And the response body should contain external service data

  Scenario: Health endpoint returns 200 even when external service is down
    Given the external service is unavailable
    When I send a GET request to "/health"
    Then the response status should be 200
    And the response body should contain "healthy"
    And the external service field should be "unavailable"
