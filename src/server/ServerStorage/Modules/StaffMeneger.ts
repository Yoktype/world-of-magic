import { ReplicatedStorage } from "@rbxts/services";
import { Base, Fire, Ice, Void } from "./Utils/StaffAttacks";
import StaffConfig from "./Utils/StaffConfig";

// @constants
const Events = ReplicatedStorage.WaitForChild("Events");
const staffEvents = Events.FindFirstChild("StaffEvents");
const attackEvent = staffEvents?.FindFirstChild("Attack") as RemoteEvent;
const abilityZEvent = staffEvents?.FindFirstChild("AbilityZ") as RemoteEvent;
const abilityXEvent = staffEvents?.FindFirstChild("AbilityX") as RemoteEvent;
const animationEvent = staffEvents?.FindFirstChild("Animation") as RemoteEvent;

// @staff setup
const StaffControl = new Map<Player, Staff>()
function setupStaff(player: Player) {

}

function playerStaffsSetup(player: Player) {}




// @private functions
function getStaff(staff: Tool | Instance | BasePart): string {
    const staffType = staff.GetAttribute("StaffType") as string;
    return staffType ?? "base";
}

function startAnimation(player: Player): void {}

function isCooldown(): boolean { return false; }

function attack(staff: Tool): void {

}

function abilityZ(): void {

}

function abilityX(): void {
    
}




// @setup
attackEvent.OnServerEvent.Connect((player, args) => {
    const staff = args as Tool;
    attack(staff);
})
abilityXEvent.OnServerEvent.Connect((player, args) => {})
abilityZEvent.OnServerEvent.Connect((player, args) => {})