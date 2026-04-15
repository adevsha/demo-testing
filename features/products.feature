Feature: Products CRUD API
  As an API consumer
  I want to manage products through the REST API
  So that I can create, read, update, and delete product records

  # --- CREATE ---

  Scenario: Create a new product with valid data
    Given I have valid product data
    When I send a POST request to the API "/products/" with the product data
    Then the API response status should be 201
    And the API response body should have key "id"
    And the API response body should have "name" equal to the test product name
    And the API response body should have "price" equal to the test product price

  Scenario: Create a product with missing required field returns 422
    When I send a POST request to the API "/products/" with body:
      """
      {"name": "Incomplete Product"}
      """
    Then the API response status should be 422

  Scenario: Create a product with invalid type for price returns 422
    When I send a POST request to the API "/products/" with body:
      """
      {"name": "Bad Product", "description": "test", "price": "free", "in_stock": true}
      """
    Then the API response status should be 422

  Scenario: Create a product with price zero
    When I send a POST request to the API "/products/" with body:
      """
      {"name": "Free Sample", "description": "A free item", "price": 0, "in_stock": true}
      """
    Then the API response status should be 201
    And the API response body should have "price" equal to 0

  Scenario: Create a product that is out of stock
    When I send a POST request to the API "/products/" with body:
      """
      {"name": "Sold Out Item", "description": "Currently unavailable", "price": 49.99, "in_stock": false}
      """
    Then the API response status should be 201
    And the API response body should have "in_stock" equal to false

  # --- READ ---

  Scenario: List all products returns an array
    When I send a GET request to the API "/products/"
    Then the API response status should be 200
    And the API response body should be an array

  Scenario: List products includes a previously created product
    Given I have created a test product via the API
    When I send a GET request to the API "/products/"
    Then the API response status should be 200
    And the API response body should be an array
    And the API response array should contain an item with "id" equal to the created product id

  Scenario: Get a product by valid ID
    Given I have created a test product via the API
    When I send a GET request to the API for the created product
    Then the API response status should be 200
    And the API response body should have "name" equal to the test product name

  Scenario: Get a product by non-existent ID returns 404
    When I send a GET request to the API "/products/99999"
    Then the API response status should be 404
    And the API response body should have "detail" equal to "Product not found"

  # --- UPDATE ---

  Scenario: Update a product with partial data
    Given I have created a test product via the API
    When I send a PATCH request to the API for the created product with body:
      """
      {"name": "Updated Product Name"}
      """
    Then the API response status should be 200
    And the API response body should have "name" equal to "Updated Product Name"
    And the API response body should have "price" equal to the test product price

  Scenario: Update a non-existent product returns 404
    When I send a PATCH request to the API "/products/99999" with body:
      """
      {"name": "Ghost Product"}
      """
    Then the API response status should be 404
    And the API response body should have "detail" equal to "Product not found"

  Scenario: Update only the stock status of a product
    Given I have created a test product via the API
    When I send a PATCH request to the API for the created product with body:
      """
      {"in_stock": false}
      """
    Then the API response status should be 200
    And the API response body should have "in_stock" equal to false
    And the API response body should have "name" equal to the test product name

  # --- DELETE ---

  Scenario: Delete an existing product
    Given I have created a test product via the API
    When I send a DELETE request to the API for the created product
    Then the API response status should be 204

  Scenario: Delete a non-existent product returns 404
    When I send a DELETE request to the API "/products/99999"
    Then the API response status should be 404
    And the API response body should have "detail" equal to "Product not found"

  Scenario: Delete an already-deleted product returns 404
    Given I have created a test product via the API
    And I have deleted the created product via the API
    When I send a DELETE request to the API for the created product
    Then the API response status should be 404
