import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import MainFrame from "shared/Modules/UI/Inventory/Frame";

const LOCAL_PLAYER = Players.LocalPlayer;
const playerGui = LOCAL_PLAYER.FindFirstChild("PlayerGui") as PlayerGui;

const mainFrameUi = React.createElement(MainFrame, {})

const root = ReactRoblox.createRoot(playerGui);
root.render(mainFrameUi);