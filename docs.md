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
```js
files.chestItems = [
[name,extension,length_in_chests_from_now_on],
[...],
[...],
]
```

# Picture/Video
The main arrays used for this section are:
```js
colors = [144,1724,8,47,483,32,97,59,6,31,28,29,136,85,946,947,948,84,949,950,951,147,66,86].reverse()
charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|[]{}/-_>=+`~?.,;:"
cColors =[2,1694,5,650,6,8,139,28,29,31,474,40,41,42,45,465,652,959,958,976,1630,1621,1629,946,947,948,949,950,951,482,484,486,471,140,961,962,147,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,97,93,92,90,99,91,94,84,85,89,95,87,88,98,96,86,1722,1271,212,1510,1576,1607,1608,1609]
```
Both .ngp (grayscale) and .rgb (color) are encoded as strings of items in `charset`. However, .ngp uses `colors` and .rgb uses `cColors`. The first few characters are always `${x_resolution} ${y_resolution} `

.nvf (video) works via run-length-encoding (RLE) and each character is `UTF16(length * 100 + item)`. Frame finishes are denoted with a ' '. (UTF16[32]). The first few characters are always `${x_resolution} ${y_resolution} ${framecount} `
