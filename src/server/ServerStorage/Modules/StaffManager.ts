import { ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.WaitForChild("Events");
const StaffEvents = Events.WaitForChild("StaffEvents")
const newStaffEvent = StaffEvents.FindFirstChild("NewStaffEvent") as RemoteEvent;
const staffEquippedEvent = StaffEvents.FindFirstChild("StaffEquippedEvent") as RemoteEvent;
const staffUnequippedEvent = StaffEvents.FindFirstChild("StaffUnequippedEvent") as RemoteEvent;
const staffActivatedEvent = StaffEvents.FindFirstChild("StaffActivatedEvent") as RemoteEvent;


function removeUI() {}

function createUI() {}

function attack() {}



staffEquippedEvent.OnServerEvent.Connect((player: Player, arg) => { createUI(); })
staffUnequippedEvent.OnServerEvent.Connect((player: Player, arg) => { removeUI(); })
staffActivatedEvent.OnServerEvent.Connect((player: Player, arg) => {
    if (arg === undefined) return;

    const staff = arg as Tool;

    attack();
})