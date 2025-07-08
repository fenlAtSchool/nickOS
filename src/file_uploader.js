contents = "NickOS File Uploader Shell"
fileName = "demo"
extension = ".txt"

contents = contents.match(/.{1,470}/g)
while(contents.length < 34){
	contents.push("")
}

isFile = true
