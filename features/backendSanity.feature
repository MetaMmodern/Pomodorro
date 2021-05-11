Feature: Check Backend normal flow

  Scenario: User register and login
    Given user set new user data as:
      | username           | password          |
      | test_kpi@gmail.com | test_kpi_test_kpi |
    When user sends registration request
    Then the registration should be succesful
    When user tries to login with set data
    Then the login should be succesful


  Scenario: User deletes account successfully
    Given user set new user data as:
      | username           | password          |
      | test_kpi@gmail.com | test_kpi_test_kpi |
    Given user set confirmation password as: test_kpi_test_kpi
    When user tries to login with set data
    Then the login should be succesful
    Then save response cookies
    When user sends account deletion request
    Then account deletion should be succesful
    When user tries to login with set data
    Then the login should be succesful