## To upload:

For the first line of output, put `contents = 'INSERT HERE'`
Afterwards, use `contents += 'INSERT HERE'`

The uploading code is:
```js

fileName = "fileNameHere"
extension = ".nvf"

contents = contents.match(/.{1,450}/g)

while(contents.length % 36 != 0){
	contents.push("")
}

isFile = true
```
