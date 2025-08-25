import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { PlayerTask, playerTasks } from "../state/playerTask";

export function cultivate(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  playerTasks.pop()
  return player.summonMana()
}

export function maybeAssignCultivate(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (player.mp >= player.stats.maxHp * 0.7) {
    return false
  } 
  
  playerTasks.ensureAtEnd(PlayerTask.Cultivate)
  return true
}
