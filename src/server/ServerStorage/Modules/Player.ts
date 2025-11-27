import { Players, RunService } from "@rbxts/services";
import GameConfig from "shared/Modules/Configs/GameConfig";
import ProfileStore from "@rbxts/profile-store";

// constants
const PlayerStore = ProfileStore.New(GameConfig.DATA_NAME, GameConfig.PROFILE_TEMPLATE);
const Profiles = new Map<number, ProfileStore.Profile<typeof GameConfig.PROFILE_TEMPLATE>>();

// private functions
// 4
function dataUpdater(player: Player): void {
    if ( RunService.IsStudio() === true ) return; // not save date in studio

    const profile = Profiles.get(player.UserId);
    if ( profile === undefined ) {
        player.Kick(`Profile load fail - Please rejoin`);
        return;
    }
    
    const data = profile.Data;

    // idk how release that

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

    function giveData() {

        cash.Value = data.Cash
    }

    giveData();
    dataUpdater(player);
}

// 2
function init(player: Player) {

    function create() {
        // leaderboard
        const leaderboard = new Instance("Folder");
        leaderboard.Name = "leaderboard";

        const Cash = new Instance("NumberValue");
        Cash.Name = "Cash";
        Cash.Value = 0;

        leaderboard.Parent = player;
        Cash.Parent = leaderboard;

    }

    // function isReady(): boolean {

    //     return false;
    // }

    // if ( isReady() === true ) {
    //     loadDataForPlayer(player);
    // } else { create(); }

    create();
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