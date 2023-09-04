Feature: obtain an existing article
  In read an article
  As a reader
  I want to obtain an existing article from the DB

  Scenario: Obatin an existeing article succesfully
    Given I send a GET request to "/metrics/"
    Then the response status code should be 200
