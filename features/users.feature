Feature: Users CRUD API
  As an API consumer
  I want to manage users through the REST API
  So that I can create, read, update, and delete user records

  # --- CREATE ---

  Scenario: Create a new user with valid data
    Given I have valid user data
    When I send a POST request to the API "/users/" with the user data
    Then the API response status should be 201
    And the API response body should have key "id"
    And the API response body should have "name" equal to the test user name
    And the API response body should have "email" equal to the test user email

  Scenario: Create a user with missing required field returns 422
    When I send a POST request to the API "/users/" with body:
      """
      {"email": "incomplete@example.com", "age": 25}
      """
    Then the API response status should be 422

  Scenario: Create a user with invalid type for age returns 422
    When I send a POST request to the API "/users/" with body:
      """
      {"name": "Test User", "email": "test@example.com", "age": "not-a-number"}
      """
    Then the API response status should be 422

  # --- READ ---

  Scenario: List all users returns an array
    When I send a GET request to the API "/users/"
    Then the API response status should be 200
    And the API response body should be an array

  Scenario: List users includes a previously created user
    Given I have created a test user via the API
    When I send a GET request to the API "/users/"
    Then the API response status should be 200
    And the API response body should be an array
    And the API response array should contain an item with "id" equal to the created user id

  Scenario: Get a user by valid ID
    Given I have created a test user via the API
    When I send a GET request to the API for the created user
    Then the API response status should be 200
    And the API response body should have "name" equal to the test user name

  Scenario: Get a user by non-existent ID returns 404
    When I send a GET request to the API "/users/99999"
    Then the API response status should be 404
    And the API response body should have "detail" equal to "User not found"

  # --- UPDATE ---

  Scenario: Update a user with partial data
    Given I have created a test user via the API
    When I send a PATCH request to the API for the created user with body:
      """
      {"name": "Updated Name"}
      """
    Then the API response status should be 200
    And the API response body should have "name" equal to "Updated Name"
    And the API response body should have "email" equal to the test user email

  Scenario: Update a non-existent user returns 404
    When I send a PATCH request to the API "/users/99999" with body:
      """
      {"name": "Ghost"}
      """
    Then the API response status should be 404
    And the API response body should have "detail" equal to "User not found"

  # --- DELETE ---

  Scenario: Delete an existing user
    Given I have created a test user via the API
    When I send a DELETE request to the API for the created user
    Then the API response status should be 204

  Scenario: Delete a non-existent user returns 404
    When I send a DELETE request to the API "/users/99999"
    Then the API response status should be 404
    And the API response body should have "detail" equal to "User not found"

  Scenario: Delete an already-deleted user returns 404
    Given I have created a test user via the API
    And I have deleted the created user via the API
    When I send a DELETE request to the API for the created user
    Then the API response status should be 404
