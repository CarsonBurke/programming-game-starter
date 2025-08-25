import { distance, OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { tickState } from "../state/tickState";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { findMinOf } from "../utils/general";
import { maybeAssignRetreat } from "./retreat";
import { weaponSkills } from "programming-game/weapon-skills";

export function fight(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (maybeAssignRetreat(heartbeat, player)) {
    return TaskResult.Next;
  }
  
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
  
  if (player.tp >= weaponSkills.combo.tpCost) {
    return player.useWeaponSkill({
      skill: "combo",
      target: monster,
    })
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
