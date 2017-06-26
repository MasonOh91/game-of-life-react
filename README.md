# game-of-life-react

I've decided to attempt making the game of life in react/redux! I've decided to use react and redux mainly as a way to create a potential learning example for others, putting this stack to practical use. This stack includes:
* React
* Redux
  * Duck Pattern
* Webpack
  * Path resolution
  * Hot Module Reloading (Dev server)
* BlueprintJS (UI Component Library)
* SASS Modules

## Run the app

This app contains a `yarn` file, if you wish you clone this repo and add dependencies, I recommend using [yarn](https://yarnpkg.com/en/) over `npm`. However, if you just wish to checkout the examples in the code, `npm` will do fine.

1. First clone the repository
2. Change directories: `cd game-of-life-react`
3. Install Dependencies: `yarn` or `npm install`
4. Start the dev server: `yarn start` or `npm run start`
5. go to [http://localhost:8080/](http://localhost:8080/) in your browser

## Logic

The large bulk of the base logic for solving "the game of life" is container in [src/redux/modules/game.js](https://github.com/MasonOh91/game-of-life-react/blob/master/src/redux/modules/game.js#L79). It should be noted that this repo uses [Immutable.js](https://facebook.github.io/immutable-js/) for keeping state immutable (which is the redux way of life). The logic for solving this puzzle was the standard "2d array" solution.

## Display

React/Redux are, honestly, a bit overkill for this puzzle. However as previously stated, I wanted to solve it using this stack (or rather import the logic into this stack) as a potential teaching tool for future use.

The display is using the `<canvas>` element, and thus there isn't much need for react to re-render the grid. However react re-renders the statistics used in the display as well as passes down state to the grid to provide new coordinates for re-drawing the `<canvas>`. Using `<canvas>` for this game was great, as it prevents us from rendering a large amount of DOM elements.

## Issues

I plan on adding onto this app in the future, and will mark issues in the [Issues](https://github.com/MasonOh91/game-of-life-react/issues) section of this repo.
