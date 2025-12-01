import { Players } from "@rbxts/services";
import init from "shared/Modules/Utils/initialize";

// constants
const LOCAL_PLAYER = Players.LocalPlayer as Player;

// imports
const network = require(LOCAL_PLAYER.WaitForChild("PlayerScripts").FindFirstChild("network") as ModuleScript);

// folders
const Modules = LOCAL_PLAYER.WaitForChild("PlayerScripts").FindFirstChild("Modules") as Folder;

// setup
init(Modules);