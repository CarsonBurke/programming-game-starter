import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { ClientSidePlayer, Intent, UnitTypes } from "programming-game/types";
import { tickState } from "./tickState";

export function runCombat(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer): Intent | undefined {
  
  const unitsByType = tickState.getUnitsByType(heartbeat);
  
  for (const enemy of unitsByType.monster) {
    if (enemy.type !== UnitTypes.monster) continue
    
    // attack the enemy
    return player.attack(enemy.id);
  }
}