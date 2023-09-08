Feature: obtain an existing article
  In read an article
  As a reader
  I want to obtain an existing article from the DB

  Scenario: Obatin an existeing article succesfully
    Given the metrics dataset is loaded
    When I send a GET request to "/metrics/?name=response_time&from=2023-01-01T00:00:00.000Z&to=2023-01-01T00:05:00.000Z&intervalUnit=second"
    Then the response status code should be 200
    And the response has as unit "second", with 300 values starting from "2023-01-01T00:00:00.000Z"
