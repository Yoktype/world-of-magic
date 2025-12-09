import rewardConfig from "shared/Modules/Configs/Reward-Config";
import getProfile from "./player";
import { updateLeaderstats } from "./Notification";

export function killReward(player: Player) {
    const profile = getProfile(player);
    if ( profile === undefined ) {
        player.Kick(`Profile session end - Please rejoin`);
        return;
    }

    const reward = rewardConfig.killReward;

    const newCashValue = profile.Data.Cash + reward.cash;
    profile.Data.Cash = newCashValue;

    updateLeaderstats(player);
}
