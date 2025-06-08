function writeDataToItem(chestPosition, slotIdx, payload) {
    api.setStandardChestItemSlot(chestPosition, slotIdx, "956", 1, undefined, { customDescription: payload });
}
file = ""
file = file.match(/.{1,470}/g)
files = api.getStandardChestItemSlot([0,0,50],0)
filecount = files.attributes.customAttributes.pages.0
for(let i = 0; i < file.length; i++){
    writeDataToItem([filecount+1,0,50],i+1,file[i])
}
files.attributes.customAttributes.pages.0++
api.setStandardChestItemSlot([0,0,50],0,files)
