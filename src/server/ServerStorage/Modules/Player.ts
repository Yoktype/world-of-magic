import ProfileStore, { Profile } from "@rbxts/profile-store"
import { Players } from "@rbxts/services";

const DATA_NAME = "test";

const DATA_TEMPLATE = {
    Cash: 0,
    Kills: 0,
}

const PlayerStore = ProfileStore.New(DATA_NAME, DATA_TEMPLATE);
const Profiles = new Map<Player, Profile<typeof DATA_TEMPLATE>>();


function playerDataSetup(player: Player) {
    const key = `Player_ ${player.UserId}`;
    const profile = PlayerStore.StartSessionAsync(key, {
        Cancel() {
            return player.Parent !== Players;
        },
    });

    if (profile !== undefined) {

        profile.AddUserId(player.UserId); // GDPR
        profile.Reconcile();

        profile.OnSessionEnd.Connect(() => {
            Profiles.delete(player);
            player.Kick();
        })
        
        if (player.Parent === Players) {
            Profiles.set(player, profile);
        } else {
            profile.EndSession();
        }
        
    } else {
        player.Kick();
    }
}


Players.PlayerAdded.Connect((player) => {
    playerDataSetup(player);
})

Players.PlayerRemoving.Connect(player => {
    const profile = Profiles.get(player)
    if (profile !== undefined) {
        profile.EndSession();
    }
})