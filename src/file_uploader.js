contents = "NickOS File Uploader Shell"
fileName = "demo"
extension = ".txt"

if(typeof(contents) == "string"){
	contents = contents.match(/.{1,470}/g)
}
while(contents.length < 34){
	contents.push("")
}

isFile = true
