Feature: Seeing the records table of a user

Scenario: The authenticated user can see their records
  Given An authenticated user
  When I navigate to the records page
  Then I can see my records