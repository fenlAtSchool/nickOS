
file_ = "api.log('Hello World');"
file_name = "Hello World!"





function writeDataToItem(chestPosition, slotIdx, payload) {
	api.setStandardChes\u{74}\u{49}\u{74}emSlot(chestPosition, slotIdx, "956",1,undefined,{customDescription: payload})
}
file = file_.match(/.{1,470}/g)
files = "api.getStandardChest"
files += "ItemSlot([0,0,51],0)"
files = eval(files)
filecount = files.attributes.customAttributes.pages[0]
api.setBlock([parseInt(filecount),0,51],"Chest")

files.attributes.customAttributes.pages[0] = (parseInt(files.attributes.customAttributes.pages[0]) + 1).toString()
filecount = parseInt(filecount) + 1
api.setStandardChes\u{74}\u{49}\u{74}emSlot([filecount,0,51],0,"Book",1,undefined,{"customAttributes": {"pages": [file_name]}})
for(let i = 0; i < file.length; i++){
    writeDataToItem([filecount,0,51],i+1,file[i])
}
api.setStandardChes\u{74}\u{49}\u{74}emSlot([0,0,51],0,'Book',1,undefined,files.attributes)
m = `Succesfully uploaded file ${file_name} with payload ${file_}`
