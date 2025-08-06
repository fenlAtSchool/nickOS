contents = "NickOS File Uploader Shell"
fileName = "demo"
extension = ".txt"

if(contents == ""){
	contents = []
}
if(typeof(contents) == "string"){
	contents = contents.match(/.{1,460}/g)
}
while(contents.length % 36 != 0){
	contents.push("")
}

isFile = true
