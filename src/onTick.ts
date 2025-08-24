import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { maxCalories } from "programming-game/constants";
import { Items } from "programming-game/items";
import { ClientSideMonster, ClientSideNPC, ClientSidePlayer, ClientSideUnit, Intent, IntentType, UniqueItemId, UnitTypes } from "programming-game/types";
import { FOOD } from "./constants";
import { tickState } from "./state/tickState";
import { state } from "./state/state";
import { playerState } from "./state/playerState";
import { write, writeFile } from "fs";
import { runTasks, TaskResult, taskRunners } from "./state/playerTask";

export function onTick(heartbeat: TickHeartbeat): Intent {
  if (heartbeat.time % 100 == 0) console.log("tick", heartbeat.time)
  const { player } = heartbeat;
  if (!player) {
    throw Error("no player")
  };

  // if we're dead, respawn
  if (player.hp <= 0) {
    console.log("respawning")
    return player.respawn();
  }
  
  if (heartbeat.time % 100 == 0) {
    console.log("writing state")
    writeFile("state.json", JSON.stringify(state), () => {})
  }
    
  tickState.update()
  
  const taskResult = runTasks(heartbeat, player)
  if (taskResult) return taskResult
  
  return player.summonMana()
}