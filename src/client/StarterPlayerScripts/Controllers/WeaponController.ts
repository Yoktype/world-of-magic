import { ReplicatedStorage } from "@rbxts/services";

// events
const Events = ReplicatedStorage.WaitForChild("Events");
const newWeaponEvent = Events.FindFirstChild("NewWeapon") as RemoteEvent;


// private functions
function bindSignal(weapon: Tool) {
    if ( weapon === undefined ) return;
}

function newWepon(weapon: Tool) {
    bindSignal(weapon);
}


// setup
newWeaponEvent.OnClientEvent.Connect(args => {
    if ( args === undefined ) return;
})