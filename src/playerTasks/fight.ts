import { distance, OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { tickState } from "../state/tickState";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { findMinOf } from "../utils/general";

export function fight(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  const unitsByType = tickState.getUnitsByType(heartbeat);
  if (!unitsByType.monster.length) {
    playerTasks.pop();
    return TaskResult.Next;
  }

  const { item: monster } = findMinOf(unitsByType.monster, (monster) =>
    distance(monster.position, player.position),
  );
  if (!monster) {
    playerTasks.pop();
    return TaskResult.Next;
  }

  return player.attack(monster);
}

export function maybeAssignFight(heartbeat: TickHeartbeat) {
  const unitsByType = tickState.getUnitsByType(heartbeat);
  if (!unitsByType.monster.length) {
    return false;
  }

  playerTasks.ensureAtEnd(PlayerTask.Fight);
  return true;
}
