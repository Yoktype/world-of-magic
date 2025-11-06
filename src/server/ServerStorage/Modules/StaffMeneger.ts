import { ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.WaitForChild("Events");
const staffEvents = Events.FindFirstChild("StaffEvents");
const attackEvent = staffEvents?.FindFirstChild("Attack");
const abilityZEvent = staffEvents?.FindFirstChild("AbilityZ");
const abilityXEvent = staffEvents?.FindFirstChild("AbilityX");
const animationEvent = staffEvents?.FindFirstChild("Animation");


function getStaffType(staff: Tool | Instance | BasePart): string | undefined {}

function startAnimation(player: Player): void {}

function attack(): void {}

function abilityZ(): void {}

function abilityX(): void {}


// @setup