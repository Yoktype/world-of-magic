import { ServerStorage, ReplicatedStorage } from "@rbxts/services";
import init from "shared/Modules/Utils/initialize";

// constants

// folders
const Modules = ServerStorage.WaitForChild("Modules") as Folder;

// setup
init(Modules);