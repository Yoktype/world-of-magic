import { CollectionService, ServerStorage } from "@rbxts/services";
import StaffConfig from "server/ServerStorage/Modules/Utils/StaffConfig";

// Find here a class, and create new?
const classes = ServerStorage.WaitForChild("Modules").FindFirstChild("Classes");

CollectionService.GetAttributeChangedSignal(StaffConfig.CreateNewStaffAttribute).Connect(instance => {
    if (instance === undefined) return;
    
    // Staff has a StaffType and when player buy the Staff then he cloned and setAttribute????
    const staffType = instance.GetAttribute("StaffType");
    if (staffType === undefined) return; // i need check this later
    

    // what's to do??????????????????????????

        
})