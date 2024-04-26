Feature: User login with his account

Scenario: The user is registered in the site
  Given A registered user
  When I fill the data in the form and press submit
  Then Home should be shown in the screen