function writeDataToItem(chestPosition, slotIdx, payload) {
    api.setStandardChestItemSlot(chestPosition, slotIdx, "956", 1, undefined, { customDescription: payload });
}
