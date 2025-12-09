-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Game-Config").default
local _mouse = TS.import(script, script.Parent, "Modules", "Utils", "mouse")
local getMousePositionOnScreen = _mouse.getMousePositionOnScreen
local getMousePositionInWorld = _mouse.getMousePositionInWorld
local getMouseHitInWolrd = _mouse.getMouseHitInWolrd
local getCameraRay = _mouse.getCameraRay
-- setup
-- mouse
GameConfig.getMousePositionOnScreenEvent.OnClientInvoke = function()
	return getMousePositionOnScreen()
end
GameConfig.getMouseHitInWolrdEvent.OnClientInvoke = function()
	return getMouseHitInWolrd()
end
GameConfig.getMousePositionInWorldEvent.OnClientInvoke = function()
	return getMousePositionInWorld()
end
GameConfig.getCameraRay.OnClientInvoke = function()
	return getCameraRay()
end
--[[
	 inventory
	    Equip
	    Unequip
	    NewItem
	    DeletItem
	    UpdateInventory
	    EquippedItems
	
]]
return nil
