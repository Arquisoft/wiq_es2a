Feature: A user playing a game

Scenario: The authenticated user plays a game and clicks the correct answer
  Given An authenticated user
  When I navigate to the game page and I click the correct answer
  Then The button turns green and the number of questions answered correctly increments one

Scenario: The authenticated user plays a game and clicks an incorrect answer
  Given An authenticated user
  When I navigate to the game page and I click an incorrect answer
  Then The button turns red and the number of questions answered correctly is 0