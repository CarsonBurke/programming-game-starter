import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { Intent } from "programming-game/types";
import { tickState } from "./state/tickState";
import { persistent } from "./state/persistent";
import { runTasks } from "./runTasks";
import { settings } from "./state/settings";

export function onTick(heartbeat: TickHeartbeat): Intent {
  if (heartbeat.time % 100 == 0) console.log("tick", heartbeat.time);
  const { player } = heartbeat;
  if (!player) {
    throw Error("no player");
  }

  if (player.hp <= 0) {
    console.log("respawning");
    return player.respawn();
  }

  if (player.role !== settings.role) {
    console.log("setting role to:", settings.role)
    return player.setRole(settings.role)
  }
  
  persistent.writePeriodically(heartbeat);

  persistent.tickUpdate(heartbeat);
  tickState.update();

  const taskResult = runTasks(heartbeat, player);
  if (taskResult) return taskResult;

  return player.summonMana();
}
