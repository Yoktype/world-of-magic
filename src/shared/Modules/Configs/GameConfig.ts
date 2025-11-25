import { RunService, ReplicatedStorage } from "@rbxts/services";

// constants
const Events = ReplicatedStorage.WaitForChild("Events") as Folder;
const MouseEvents = Events.FindFirstChild("MouseEvents") as Folder;

// variables
let server;
let client;

const isServer: boolean = RunService.IsServer();
const isClient: boolean = RunService.IsClient();

// server
if ( isServer === true ) {
    const object = {

        // bindable events (in ServerStorage)

        // bindable function (in ServerStorage)
        
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

    // remote events

    // remote functions
    // mouse
    getMousePositionOnScreenEvent: MouseEvents.FindFirstChild("GetMousePositionOnScreenEvent") as RemoteFunction,
    getMouseHitInWolrdEvent: MouseEvents.FindFirstChild("GetMouseHitInWolrdEvent") as RemoteFunction,
    getMousePositionInWorldEvent: MouseEvents.FindFirstChild("GetMousePositionInWorldEvent") as RemoteFunction,
    
}