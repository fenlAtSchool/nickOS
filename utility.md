Utility functions

```js
/**
 * Draws text
 * @param {number} Top left X position
 * @param {number} Top left Y position
 * @param {string} Text to display
 * @returns {void}
*/
dtxt(x,y,text)

/**
 * Updates display
 * @returns {void}
*/
updateDisplay()

/**
 * Fills a box with color
 * @param {number[]} Coordinates of top left
 * @param {number[]} Coordinates of bottom right
 * @param {number} Block ID of filling
 * @returns {void}
*/
fillBox(tl,br,color)

/**
 * Draws Outline with `palette[1]}`
 * @param {number[]} Coordinates of top left
 * @param {number[]} Coordinates of top right
 * @returns {void}
*/
drawBoxOutline(tl,br)

/**
 * Translates string into image by turning '#' into black
 * @param {string} String to translate
 * @returns {number[]}
translate(string)

/**
 * Draws a specified image (Does not need to be in 'font')
 * @param {number} X length
 * @param {number} Y length
 * @param {number} Top left X
 * @param {number} Top left Y
 * @param {number[]} Flat Array of items
 * @returns {void}
*/
drawImage(sx,sy,dx,dy,x)
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
