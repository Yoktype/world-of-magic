import rewardConfig from "shared/Modules/Configs/RewardConfig";
import getProfile from "./Player";
import { setLeaderstatValues } from "./Notification";

export function onKillReward(player: Player) {
    const profile = getProfile(player);
    if ( profile === undefined ) {
        player.Kick(`Profile session end - Please rejoin`);
        return;
    }

    const reward = rewardConfig.killReward;

    const newCashValue = profile.Data.Cash + reward.cash;
    profile.Data.Cash = newCashValue;

    setLeaderstatValues(player);
}