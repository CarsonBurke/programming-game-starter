import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game"
import { Items } from "programming-game/items"
import { FOOD } from "../constants"
import { UniqueItemId } from "programming-game/types"
import { maxCalories } from "programming-game/constants"
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask"

export function eat(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (!should_eat(player)) {
    playerTasks.pop()
    return TaskResult.Next
  }
  
  for (const key of Array.from(FOOD)) {
    const item_id = key as Items | UniqueItemId
    const storage_count = player.inventory[item_id]
    
    if (!storage_count) continue
    console.log("ATE!")
    return player.eat(item_id)
  }
  
  return TaskResult.Next
}

function should_eat(player: OnTickCurrentPlayer) {
  if (player.actionDuration) {
    console.log("can't eat - on cooldown")
    return false
  }

  if (player.calories >= maxCalories) {
    return false
  }
  
  if (player.hp < player.stats.maxHp) {
    return true
  }
  
  return false
}

export function maybeAssignEat(player: OnTickCurrentPlayer) {
  if (!should_eat(player)) return false
  
  playerTasks.ensureAtEnd(PlayerTask.Eat)
  return true
}
