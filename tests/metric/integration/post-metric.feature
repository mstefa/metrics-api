Feature: Create a metric value an save it in the DB

  Scenario: Create a metric with timestamp, name, and value suscesfully
    When I send a POST request to "/metric" with body:
      """
      {
        "timestamp": "2023-09-03T15:45:23.000Z",
        "name": "response_time",
        "value": 10
      }
      """
    Then the response status code should be 200
    And the response should be empty
    And the Metric should be save in the db:
      """
      {
        "timestamp": "2023-09-03T15:45:23.000Z",
        "name": "response_time",
        "value": 10
      }
      """
