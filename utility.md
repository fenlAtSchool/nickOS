Utility functions

```js
/**
 * Draws text
 * @param {int} Top left X position
 * @param {int} Top left Y position
 * @param {string} Text to display
 * @returns {void}
*/
dtxt(x,y,text)
//Updates screen
updateDisplay()
//Fills box
fillBox(top_left,bottom_right,color)
//Draws Outline
drawBoxOutline(top_left,bottom_right)
//Translates string into image by turning '#' into black
translate(string)
//Draws an Image
drawImage(x_len,y_len,x,y,array)
```

Utility arrays

```js
/**
 * Array:
 * Player X
 * Player Y
 * Cursor X
 * Cursor Y
 * Is Clicking
 * Is Alternate Action
 * Cursor X Previous Tick
 * Cursor Y Previous Tick
*/
s = [0,0,0,0,0,0,0,0]
//Palette (White, Black)
palette = [144,86]
// Get Directory
parentFolder = []
```
