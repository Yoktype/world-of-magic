import { RunService, ReplicatedStorage } from "@rbxts/services";

// constants
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Events = ReplicatedStorage.WaitForChild("Events") as Folder;

const Weapons = Assets.FindFirstChild("Weapons") as Folder;
const ObjectPoolBullets = Weapons.FindFirstChild("ObjectPoolBullets") as Folder;

const MouseEvents = Events.FindFirstChild("MouseEvents") as Folder;
const WeaponEvents = Events.FindFirstChild("WeaponEvents") as Folder;

const InventoryEvents = Events.FindFirstChild("InventoryEvents") as Folder;

// variables
let server;
let client;

const isServer: boolean = RunService.IsServer();
const isClient: boolean = RunService.IsClient();

// server
if ( isServer === true ) {
    const serverStorage =  game.GetService("ServerStorage");
    const RewardEvents = serverStorage.FindFirstChild("RewardEvents") as Folder


    
    const object = {

        // bindable events (in ServerStorage)
        // reward-service
<<<<<<< HEAD
        // killReward: RewardEvents.FindFirstChild("KillRewardEvent") as BindableEvent,
=======
        killReward: RewardEvents.FindFirstChild("KillRewardEvent") as BindableEvent,
>>>>>>> aac8734 (new: reward-service(save) + notification)


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

    // folders
    Assets: Assets,
    Weapons: Weapons,
    ObjectPoolBullets: ObjectPoolBullets,
    Events: Events,
    MouseEvents: MouseEvents,
    WeaponEvents: WeaponEvents,

    // data service
    DATA_NAME: "unknown",
    PROFILE_TEMPLATE: {

        Cash: 1000,

        inventory: {
<<<<<<< HEAD
            items: new Map<string, Item>(),
=======
            weapons: new Map<string, WeaponItem>(),
>>>>>>> aac8734 (new: reward-service(save) + notification)
        }
    },

    // weapon
    BASE_WEAPON: "BaseWeapon",
    BASE_BULLET: "BaseBullet",
    WEAPON_STATE: "WEAPON_STATE",
    COOLDOWN: "COOLDOWN",

    // remote events
    // weapon
    newWeaponEvent: WeaponEvents.FindFirstChild("NewWeapon") as RemoteEvent,
    attackEvent: WeaponEvents.FindFirstChild("Attack") as RemoteEvent,

    // inventory
    newItemEvent: InventoryEvents.FindFirstChild("NewItemEvent") as RemoteEvent,
    deleteItemEvent: InventoryEvents.FindFirstChild("DeleteItemEvent") as RemoteEvent,
    updateInventoryEvent: InventoryEvents.FindFirstChild("UpdateInventoryEvent") as RemoteEvent,
    equipItemEvent: InventoryEvents.FindFirstChild("EquipItemEvent") as RemoteEvent,
    unequipItem: InventoryEvents.FindFirstChild("unequipItemEvent") as RemoteEvent,
    getEquippedItemsEvent: InventoryEvents.FindFirstChild("GetEquippedItemsEvents") as RemoteEvent,

    // remote functions
    // mouse
    getMousePositionOnScreenEvent: MouseEvents.FindFirstChild("GetMousePositionOnScreenEvent") as RemoteFunction,
    getMouseHitInWolrdEvent: MouseEvents.FindFirstChild("GetMouseHitInWolrdEvent") as RemoteFunction,
    getMousePositionInWorldEvent: MouseEvents.FindFirstChild("GetMousePositionInWorldEvent") as RemoteFunction,
    getCameraRay: MouseEvents.FindFirstChild("GetCameraRayEvent") as RemoteFunction,
    
}