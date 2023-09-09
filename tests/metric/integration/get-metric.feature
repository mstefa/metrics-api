Feature: obtain metrics

  Scenario: Obatin metrics averge per second a given period of time and one name succesfully
    When I send a GET request to "/metrics/?name=response_time&from=2023-01-01T00:00:00.000Z&to=2023-01-01T00:05:00.000Z&intervalUnit=second"
    Then the response status code should be 200
    And the response has as unit "second", with 300 values starting from "2023-01-01T00:00:00.000Z" and 1 sets of values

  Scenario: Obatin metrics averge per second a given period of time and two names succesfully
    When I send a GET request to "/metrics/?name=response_time&name=cpu_usage&from=2023-01-01T00:00:00.000Z&to=2023-01-01T00:05:00.000Z&intervalUnit=second"
    Then the response status code should be 200
    And the response has as unit "second", with 300 values starting from "2023-01-01T00:00:00.000Z" and 2 sets of values
