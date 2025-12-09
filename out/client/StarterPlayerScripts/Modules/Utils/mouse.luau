-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
-- constants
local Camera = Workspace.CurrentCamera
-- private functions
local function getMousePositionOnScreen()
	return UserInputService:GetMouseLocation()
end
local function getCameraRay()
	local location = getMousePositionOnScreen()
	return Camera:ViewportPointToRay(location.X, location.Y)
end
local function getMouseInWorld()
	local ray = getCameraRay()
	local origin = ray.Origin
	local direction = ray.Direction * 999
	local anotherEndPoint = origin + direction
	local result = Workspace:Raycast(origin, anotherEndPoint)
	if result == nil then
		return { nil, anotherEndPoint }
	end
	local instance = result.Instance
	local position = result.Position
	return { instance, position }
end
local function getMousePositionInWorld()
	local _binding = getMouseInWorld()
	local instance = _binding[1]
	local position = _binding[2]
	if position == nil then
		return nil
	end
	return position
end
local function getMouseHitInWolrd()
	local _binding = getMouseInWorld()
	local instance = _binding[1]
	local position = _binding[2]
	if instance == nil then
		return nil
	end
	return instance
end
return {
	getMousePositionOnScreen = getMousePositionOnScreen,
	getCameraRay = getCameraRay,
	getMouseInWorld = getMouseInWorld,
	getMousePositionInWorld = getMousePositionInWorld,
	getMouseHitInWolrd = getMouseHitInWolrd,
}
