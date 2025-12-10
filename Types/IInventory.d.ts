interface Item {
    uid: number, // create in config
    equipped: boolean,
}

interface IInventory {
    weapons: {string: Item}
}