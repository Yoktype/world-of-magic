-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local init = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Utils", "initialize").default
-- constants
local LOCAL_PLAYER = Players.LocalPlayer
-- imports
local network = require(LOCAL_PLAYER:WaitForChild("PlayerScripts"):FindFirstChild("network"))
-- folders
local Modules = LOCAL_PLAYER:WaitForChild("PlayerScripts"):FindFirstChild("Modules")
-- setup
init(Modules)
