-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local RunService = _services.RunService
local GameConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "GameConfig").default
local ProfileStore = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "profile-store", "src")
-- constants
local PlayerStore = ProfileStore.New(GameConfig.DATA_NAME, GameConfig.PROFILE_TEMPLATE)
local Profiles = {}
-- private functions
-- for Bindable Function in network
local function getPlayerProfile(player)
	local _userId = player.UserId
	return Profiles[_userId]
end
-- 4
local function dataUdapter(player)
	if RunService:IsStudio() == true then
		return nil
	end
	local _userId = player.UserId
	local profile = Profiles[_userId]
	if profile == nil then
		player:Kick(`Profile load fail - Please rejoin`)
		return nil
	end
	local data = profile.Data
	-- leaderstats
	local leaderstats = player:FindFirstChild("leaderstats")
	local cash = leaderstats:FindFirstChild("Cash")
	--[[
		
		        first step, change value in profile, second step reward
		        take Remote? and use cash.Value = profile.Data.Cash;
		    
	]]
	-- okay i cant keep here BINDABLE only server events for this 
	cash.Changed:Connect(function()
		profile.Data.Cash = cash.Value
	end)
	-- bindable events
	-- bindable functions
end
-- 3
local function loadDataForPlayer(player)
	local _userId = player.UserId
	local profile = Profiles[_userId]
	if profile == nil then
		player:Kick(`Profile load fail - Please rejoin`)
		return nil
	end
	local data = profile.Data
	local leaderstats = player:FindFirstChild("leaderstats")
	local cash = leaderstats:FindFirstChild("Cash")
	local function loadData()
		cash.Value = data.Cash
	end
	loadData()
	dataUdapter(player)
end
-- 2
local function init(player)
	-- leaderstat
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	local Cash = Instance.new("NumberValue")
	Cash.Name = "Cash"
	Cash.Value = 0
	leaderstats.Parent = player
	Cash.Parent = leaderstats
	task.wait(1)
	loadDataForPlayer(player)
end
-- 1
local function loadProfile(player)
	local key = `User_` .. tostring(player.UserId)
	local profile = PlayerStore:StartSessionAsync(key, {
		Cancel = (function()
			return player.Parent ~= Players
		end),
	})
	if profile ~= nil then
		profile:AddUserId(player.UserId)
		profile:Reconcile()
		profile.OnSessionEnd:Connect(function()
			local _userId = player.UserId
			Profiles[_userId] = nil
			player:Kick(`Profile session end - Please rejoin`)
		end)
		if player.Parent == Players then
			local _userId = player.UserId
			Profiles[_userId] = profile
		else
			profile:EndSession()
		end
	else
		player:Kick(`Profile load fail - Please rejoin`)
	end
	init(player)
end
-- setup
Players.PlayerAdded:Connect(function(player)
	loadProfile(player)
end)
Players.PlayerRemoving:Connect(function(player, reason)
	local _userId = player.UserId
	local profile = Profiles[_userId]
	if profile ~= nil then
		profile:EndSession()
	end
end)
return nil
