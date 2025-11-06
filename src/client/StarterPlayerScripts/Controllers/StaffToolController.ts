import { CollectionService, ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.WaitForChild("Events");
const staffEvents = Events.FindFirstChild("StaffEvents");
const attackEvent = staffEvents?.FindFirstChild("Attack") as RemoteEvent;
const abilityZEvent = staffEvents?.FindFirstChild("AbilityZ") as RemoteEvent;
const abilityXEvent = staffEvents?.FindFirstChild("AbilityX") as RemoteEvent;
const animationEvent = staffEvents?.FindFirstChild("Animation") as RemoteEvent;


function startAnimation(animate: string) {}


animationEvent.OnClientEvent.Connect((args) => { 
    const animation = args as string;
    startAnimation(animation)
})

CollectionService.GetAttributeChangedSignal("Staff").Connect(instnace => {

    const staff = instnace as Tool;

    // fire events
    staff.Equipped.Connect(() => {  }); // Bind Z, X
    staff.Unequipped.Connect(() => {  }); // Unbind Z, X
    staff.Activated.Connect(() => { attackEvent.FireServer(); });

})