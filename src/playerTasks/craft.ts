import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";

export function craft(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (!shouldCraft(player)) {
    playerTasks.pop()
    return TaskResult.Next
  }
  
  return player.craft("copperSword", player.inventory)
}

function shouldCraft(player: OnTickCurrentPlayer) {
  return player.inventory.copperIngot && player.inventory.copperIngot > 0
}

export function maybeAssignCraft(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (!shouldCraft(player)) return false
  
  playerTasks.ensureAtEnd(PlayerTask.Craft)
  return true
}
