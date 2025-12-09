import gameConfig from "shared/Modules/Configs/Game-Config";
import getProfile from "../Player";
import { HttpService } from "@rbxts/services";

export class Inventory {

    private configs = new Map(); // keep weapon configs (for get id)

    constructor( player: Player ) {
            
    }

    public setup( player: Player ) {
        

        // networking | notification

        






    } // remote init
    
    public newItem( player: Player, weaponType: string | number ) { // number for load data?
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }

        const uuid = HttpService.GenerateGUID(false);

        const itemValue: Item = {
            equipped: false,
            uid: 1, // get from configs
        }

        profile.Data.inventory.items.set( uuid, itemValue )

        // notification / or fire ( update UI in client )

    }
    
    private deletItem( player: Player, uuid: string ) {
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }

        profile.Data.inventory.items.delete( uuid )

    }

    private updateInventory( player: Player ) {
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }
        


    }

    private getEquippedItems(player: Player) {
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }

        const allItems: { uuid: string, equipped: boolean }[] = [];
        const inventory = profile.Data.inventory.items // delete :P

        // forEach + push / or forEach + props.equipped === true + push

        const equippedItems: { uuid: string }[] = []; 
        // for + push

        return equippedItems;
    }

    private equipItem( player: Player, uuid: string ) {
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }

        const item = profile.Data.inventory.items.get( uuid );
        if ( item === undefined ) return;

        item.equipped = true;

        // notification, or fire remote update UI
        // WARN! player could have only ONE weapon
    }

    private unequipItem( player: Player, uuid: string ) {
        const profile = getProfile(player);
        if ( profile === undefined ) {
            player.Kick(`Profile session end - Please rejoin`);
            return;
        }

        const item = profile.Data.inventory.items.get( uuid );
        if ( item === undefined ) return;

        item.equipped = false;

        // notification / or fire update UI in client
    }

}