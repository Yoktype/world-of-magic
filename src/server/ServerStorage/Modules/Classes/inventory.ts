import gameConfig from "shared/Modules/Configs/Game-Config";
import { getProfile } from "../player";

export class Inventory {

    private inventory = new Map<Player, IInventory>();

    constructor(player: Player) {
            
    }

    public setup(player: Player) {
        

    } // remote init

    private updateInventory() {}

    private addItem() {}

    private deletItem() {}

    private equipItem() {}

    private unequipItem() {}

}