-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local rewardConfig = TS.import(script, game:GetService("ReplicatedStorage"), "Modules", "Configs", "Reward-Config").default
local getProfile = TS.import(script, game:GetService("ServerStorage"), "Modules", "Player").default
local updateLeaderstats = TS.import(script, game:GetService("ServerStorage"), "Modules", "Notification").updateLeaderstats
local function killReward(player)
	local profile = getProfile(player)
	if profile == nil then
		player:Kick(`Profile session end - Please rejoin`)
		return nil
	end
	local reward = rewardConfig.killReward
	local newCashValue = profile.Data.Cash + reward.cash
	profile.Data.Cash = newCashValue
	updateLeaderstats(player)
end
return {
	killReward = killReward,
}
