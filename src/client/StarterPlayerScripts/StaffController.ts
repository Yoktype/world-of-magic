import { ReplicatedStorage } from "@rbxts/services";

const Events = ReplicatedStorage.WaitForChild("Events");
const event = Events.FindFirstChild("event") as RemoteEvent;

// import
const Classes = ReplicatedStorage.WaitForChild("Modules").FindFirstChild("Classes");
const staffControllClass = Classes?.FindFirstChild("StaffControllClass");


function setStaffClass(staff: BasePart) {
    if (staff === undefined) return;

    // const staffControll = new staffControllClass()
}



event.OnClientEvent.Connect(() => {

})