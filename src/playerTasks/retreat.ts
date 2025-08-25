import { SPAWN_POS } from "../constants";
import {  playerState } from "../state/playerState";
import { distance, OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { maybeAssignEat } from "./eat";

export function retreat(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (player.hp > player.stats.maxHp * 0.9 && distance(player.position, SPAWN_POS) < 10) {
    playerTasks.ensureAtEnd(PlayerTask.Scavenge)
    return TaskResult.Next
  }
  
  if (maybeAssignEat(player)) {
    return TaskResult.Next;
  }
  
  // const npcLocations = Array.from(state.getNpcLocations())
  
  // const npcLocation = npcLocations[0]
  // if (npcLocation) {
  //   console.log("move to npc")
  //   const { x, y } = npcLocation
  //   return player.move({
  //     x: x + 10,
  //     y: y + 10,
  //   });
  // }
  
  return player.move(SPAWN_POS);
}

export function maybeAssignRetreat(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (player.hp < player.stats.maxHp * 0.5 && distance(player.position, SPAWN_POS) > 10) {
    playerTasks.ensureAtEnd(PlayerTask.Retreat)
    return true
  }
  
  return false
}
