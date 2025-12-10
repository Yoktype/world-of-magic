import { Players } from "@rbxts/services";
import initialize from "shared/Modules/Utils/Initialize";

// constants
const LOCAL_PLAYER = Players.LocalPlayer as Player;

// imports
const network = require(LOCAL_PLAYER.WaitForChild("PlayerScripts").FindFirstChild("network") as ModuleScript);

// folders
const playerScripts = LOCAL_PLAYER.WaitForChild("PlayerScripts") as Folder;
const Modules = playerScripts.FindFirstChild("Modules") as Folder;
const Components = Modules.FindFirstChild("Components") as Folder;

// setup
initialize(Modules);
initialize(Components);