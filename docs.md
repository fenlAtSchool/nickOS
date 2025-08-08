# Programming and Development

## Functions

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
 * Draws Outline with palette[1]
 * @param {number[]} Coordinates of top left
 * @param {number[]} Coordinates of top right
 * @returns {void}
*/
drawBoxOutline(tl,br)

/**
 * Translates string into image by turning '#' into black
 * @param {string} String to translate
 * @returns {number[]}
*/
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
## Arrays

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

# Screens

128x64 resolution, centered around [0,32,51]

# Filesystem

All files are stored in the line [x,0,51] in +x and most protrude outwards in the +z direction. The root directory (~) is located at x=0.

# Folders

Folders (.fol files) contain pointers towards other files.
An exapmle folder:
```js
folder.chestItems = [name,'.fol',1,3,2,9,6...]
```
All items would be stored as customDescriptions of Nets, and all 'number' type items were locations for other files.

# Files

Files work as:
```
files.chestItems = [
[name,extension,length_in_chests_from_now_on],
[...],
[...],
]
```
