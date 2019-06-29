# Xenon-II

# Project's name
XENON 2 - TRIBUTE -

## Description
Game tribute based on the Brother Bitmaps shooter. Game of a space ship lost in space


## MVP (DOM - CANVAS)
MVP CANVAS, deliverables.
The game has a spaceship that moves laterally from left to right
This ship shoots the enemies and if the projectile touches them they die and gain a point. The enemies are falling down and if they touch the player this loses.


## Backlog

The spacecraft must reach the end of the screen, with the least amount of damage possible. the spaceship will move from left to right and from top to bottom. The ship will gain points that will be reflected in a counter in the upper left. On the right will appear an image that reflects the energy that this ship has. The energy will decrease as it collides with enemies. When you stay if you lose power the game. This ships must be able to move fluidly to avoid enemy ships that move with movement patterns. The first enemy ships that appear must move randomly without disappearing from the screen and depending on other ships. The enemies will grow in difficulty of attack. Having wave and diagonal movements. There will also be enemy ships that move in groups

## Data structure


Objects.
Game Class, Collider Class, Player Class, Enemy Class, Input Class.
Display Class, Scenario Class, Trigger Class, Marker Class, Enemy Generator Class

The Game class must have methods of keyboard readings, read the status and position of the player class that will later be transferred to the screen class, it must have a method to control the stage and its movements. You must have a method to control what is shown on the screen.

The Player class has a method to load sprites, Method to control its energy and punctuation that it will send with the marker class. must have a method to control the input class to know where to move, control with a method the collider class to know if it can move or if there is a collision with the enemy, must have a method to control the shot and to communicate with the class shot.

the collider class must have a property that will join the character or the enemy to know if they are colliding with each other or not.

the stage class must have a method to control where the enemies and obstacles are positioned. It will have 2 methods one that controls the enemies that enter and others that leave the screen below to make them disappear and not overload the system.

The firing class has a method to control the life time of the firing shot and if it has collided with an enemy.

The marker class will read from the player object the points and the energy that the player has.

the enemy generator class will depend on the scenario class that will indicate where the enemies should be placed and then make them disappear


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen


## Task
Task definition in order of priority


## Links


### Trello
[Link url]https://trello.com/b/ndkxRjeH/xenon2



### Git
URls for the project repo and deploy
[Link Repo](https://github.com/JuanVicenteVazquezG/Xenon-II)
[Link Deploy](https://juanvicentevazquezg.github.io/Xenon-II/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/juanvicentevazquezgarcia/deck/live?context=editing#/)
