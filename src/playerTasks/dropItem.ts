import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { tickState } from "../state/tickState";
import { heavilyEncumberedWeight } from "programming-game/constants";
import { PlayerTask, playerTasks, TaskResult } from "../state/playerTask";
import { Items } from "programming-game/items";

export function dropItem(
  heartbeat: TickHeartbeat,
  player: OnTickCurrentPlayer,
) {
  const items = Object.entries(player.inventory).filter(
    ([_, amount]) => amount !== undefined && amount > 0,
  ) as [Items, number][];

  if (!items.length) {
    playerTasks.pop();
    return TaskResult.Next;
  }

  const [item, amount] = items[0];

  playerTasks.pop();
  return player.drop({
    item,
    amount: Math.ceil(amount / 2),
  });
}

export function maybeAssignDropItem(
  heartbeat: TickHeartbeat,
  player: OnTickCurrentPlayer,
) {
  if (
    tickState.getPlayerWeight(heartbeat, player) <
    heavilyEncumberedWeight * 0.9
  ) {
    return false;
  }

  playerTasks.ensureAtEnd(PlayerTask.DropItem);
  return true;
}
