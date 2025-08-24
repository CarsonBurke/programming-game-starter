import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import {  playerState } from "../state/playerState";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { maybeAssignFight } from "./fight";
import { maybeAssignEat } from "./eat";

export function scavenge(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (player.hp < player.stats.maxHp * 0.5) {
    playerTasks.ensureAtEnd(PlayerTask.Retreat)
    return TaskResult.Next
  }
  
  if (maybeAssignFight(heartbeat)) {
    return TaskResult.Next;
  }
  
  if (maybeAssignEat(player)) {
    return TaskResult.Next;
  }
  
  return player.move({
    x: player.position.x,
    y: player.position.y + 10,
  });
}