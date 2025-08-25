import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { Items } from "programming-game/items";
import { FOOD } from "../constants";
import { UniqueItemId } from "programming-game/types";
import { maxCalories } from "programming-game/constants";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { tickState } from "../state/tickState";

export function eat(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  if (!shouldEat(player)) {
    playerTasks.pop();
    return TaskResult.Next;
  }

  const foodItems = tickState.getFoodItems(player);
  const food = foodItems[0];
  if (!food) {
    playerTasks.pop();
    return TaskResult.Next;
  }
  
  playerTasks.pop()
  return player.eat(food);
}

function shouldEat(player: OnTickCurrentPlayer) {
  if (player.actionDuration) {
    console.log("can't eat - on cooldown");
    return false;
  }

  if (player.calories >= maxCalories) {
    return false;
  }

  const foodItems = tickState.getFoodItems(player);
  if (!foodItems.length) {
    return false;
  }

  if (player.hp < player.stats.maxHp) {
    return true;
  }

  return false;
}

export function maybeAssignEat(player: OnTickCurrentPlayer) {
  if (!shouldEat(player)) return false;

  playerTasks.ensureAtEnd(PlayerTask.Eat);
  return true;
}
