import { CollectionService, ContextActionService, ReplicatedStorage } from "@rbxts/services";

// @constants
const Events = ReplicatedStorage.WaitForChild("Events");
const staffEvents = Events.FindFirstChild("StaffEvents");
const attackEvent = staffEvents?.FindFirstChild("Attack") as RemoteEvent;
const abilityZEvent = staffEvents?.FindFirstChild("AbilityZ") as RemoteEvent;
const abilityXEvent = staffEvents?.FindFirstChild("AbilityX") as RemoteEvent;
const animationEvent = staffEvents?.FindFirstChild("Animation") as RemoteEvent;

// will do config for this
const Z = "AbilityZ";
const X = "AbilityX";
const FIRST_KEYCODE = Enum.KeyCode.Z;
const SECOND_KEYCODE = Enum.KeyCode.X;


// @private functions
function startAnimation(animate: string) {}

function unbind() {
    // Animation

    ContextActionService.UnbindAction(Z);
    ContextActionService.UnbindAction(X);
}

function bind(instnace: Tool) {
    // Animation

    const staff = instnace;

    function abilityZ() { abilityZEvent.FireServer(staff); }
    function abilityX() { abilityXEvent.FireServer(staff); }

    ContextActionService.BindAction(Z, abilityZ, false, FIRST_KEYCODE);
    ContextActionService.BindAction(X, abilityX, false, SECOND_KEYCODE);
}


// @setup
animationEvent.OnClientEvent.Connect((args) => { 
    const animation = args as string;
    startAnimation(animation)
})

CollectionService.GetAttributeChangedSignal("Staff").Connect(instnace => {

    const staff = instnace as Tool;

    // fire events
    staff.Equipped.Connect(() => { bind(staff); });
    staff.Unequipped.Connect(() => { unbind(); });
    staff.Activated.Connect(() => { attackEvent.FireServer(staff); });

})