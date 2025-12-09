import getProfile from "./Player";

export function updateLeaderstats(player: Player) {
    const profile = getProfile(player);
    if ( profile === undefined ) {
        player.Kick(`Profile session end - Please rejoin`);
        return;
    }

    const leaderstats = player.FindFirstChild("leaderstats") as Folder;
    const cash = leaderstats.FindFirstChild("Cash") as NumberValue; 

    // new data
    const newCashValue = profile.Data.Cash;

    // setup
    cash.Value = newCashValue;
}