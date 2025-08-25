import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import {  playerState } from "../state/playerState";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { maybeAssignFight } from "./fight";
import { maybeAssignEat } from "./eat";
import { maybeAssignRetreat } from "./retreat";
import { maybeAssignCultivate } from "./cultivate";
import { maybeAssignDropItem } from "./dropItem";

export function scavenge(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (maybeAssignRetreat(heartbeat, player)) {
    return TaskResult.Next;
  }
  
  if (maybeAssignFight(heartbeat)) {
    return TaskResult.Next;
  }
  
  if (maybeAssignEat(player)) {
    return TaskResult.Next;
  }
  
  if (maybeAssignCultivate(heartbeat, player)) {
    return TaskResult.Next;
  }
  
  if (maybeAssignDropItem(heartbeat, player)) {
    return TaskResult.Next;
  }
  
  return player.move({
    x: player.position.x,
    y: player.position.y + 10,
  });
}