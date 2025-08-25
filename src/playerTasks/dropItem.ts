import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { tickState } from "../state/tickState";
import { maxCarryWeight } from "programming-game/constants";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { Items } from "programming-game/items";

export function dropItem(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  const items = Object.entries(player.inventory) as [Items, number | undefined][]
  if (!items.length) {
    playerTasks.pop()
    return TaskResult.Next
  }
  
  const [item, amount] = items[0]

  playerTasks.pop()
  return player.drop({
    item,
    amount: amount || 1
  })
}

export function maybeAssignDropItem(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (tickState.getPlayerWeight(heartbeat, player) < maxCarryWeight * 0.9) {
    return false
  }
  
  playerTasks.ensureAtEnd(PlayerTask.DropItem)
  return true
}
