import { RunService } from "@rbxts/services";


let server;
let client;

const isServer: boolean = RunService.IsServer();
const isClient: boolean = RunService.IsClient();

// server
if ( isServer === true ) {
    const object = {

        
        
    };

    server = object;
}

// client
if ( isClient === true ) {
    const object = {

    

    };

    client = object;
}

// setup
export default {
    server,
    client,

    isServer,
    isClient,

    // weapon
    BASE_WEAPON: "BaseWeapon",
    BASE_BULLET: "BaseBullet",
    WEAPON_STATE: "WEAPON_STATE",
    COOLDOWN: "COOLDOWN",
}