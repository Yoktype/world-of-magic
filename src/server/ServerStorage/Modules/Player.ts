import { Players, RunService } from "@rbxts/services";
import GameConfig from "shared/Modules/Configs/GameConfig";
import ProfileStore from "@rbxts/profile-store";

// constants
const PlayerStore = ProfileStore.New(GameConfig.DATA_NAME, GameConfig.PROFILE_TEMPLATE);
const Profiles = new Map<number, ProfileStore.Profile<typeof GameConfig.PROFILE_TEMPLATE>>();

// private functions
// 4
function dataUdapter(player: Player): void {
    if ( RunService.IsStudio() === true ) return;

    const profile = Profiles.get(player.UserId);
    if ( profile === undefined ) {
        player.Kick(`Profile load fail - Please rejoin`);
        return;
    }
    
    const data = profile.Data;

    // leaderstats
    const leaderstats = player.FindFirstChild("leaderstats") as Folder;
    const cash = leaderstats.FindFirstChild("Cash") as NumberValue;

    /*
        first step, change value in profile, second step reward
        take Remote? and use cash.Value = profile.Data.Cash;
    */ 
    cash.Changed.Connect(() => {
        profile.Data.Cash = cash.Value;
    }); 

}

// 3
function loadDataForPlayer(player: Player): void {
    const profile = Profiles.get(player.UserId);
    if ( profile === undefined ) {
        player.Kick(`Profile load fail - Please rejoin`);
        return;
    }

    const data = profile.Data;

    const leaderboard = player.FindFirstChild("leaderboard") as Folder;
    const cash = leaderboard.FindFirstChild("Cash") as NumberValue;

    function loadData() { // later return true if all good else kick
        cash.Value = data.Cash;
    }

    loadData();
    dataUdapter(player);
}

// 2
function init(player: Player) {

    // leaderstat
    const leaderstats = new Instance("Folder");
    leaderstats.Name = "leaderstats";

    const Cash = new Instance("NumberValue");
    Cash.Name = "Cash";
    Cash.Value = 0;

    leaderstats.Parent = player;
    Cash.Parent = leaderstats;

    loadDataForPlayer(player);
}

// 1
function loadProfile(player: Player): void {
    const key = `User_` + player.UserId;
    const profile = PlayerStore.StartSessionAsync(key, {
        Cancel() {
            return player.Parent !== Players;
        },
    });

    if ( profile !== undefined ) {

        profile.AddUserId(player.UserId); // GDPR
        profile.Reconcile();

        profile.OnSessionEnd.Connect(() => {
            Profiles.delete(player.UserId);
            player.Kick(`Profile session end - Please rejoin`);
        })

        if ( player.Parent === Players ) {
            Profiles.set(player.UserId, profile);
        } else {
            profile.EndSession();
        }
    } else {
        player.Kick(`Profile load fail - Please rejoin`);
    }

    init(player);
}

// for Bindable Function in network
function getPlayerProfile(player: Player): ProfileStore.Profile<typeof GameConfig.PROFILE_TEMPLATE> | undefined {
    return Profiles.get(player.UserId);
}

// setup
Players.PlayerAdded.Connect((player: Player): void => {
    loadProfile(player); // loading ~= 10 second
})
Players.PlayerRemoving.Connect((player: Player, reason: Enum.PlayerExitReason): void => {
    const profile = Profiles.get(player.UserId);
    if ( profile !== undefined ) {
        profile.EndSession();
    }
})