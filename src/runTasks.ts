import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { playerTasks, TaskResult, taskRunners } from "./state/playerTask";

/**
 * Recursively run our tasks until we terminate
 */
export function runTasks(
  heartbeat: TickHeartbeat,
  player: OnTickCurrentPlayer,
) {
  const task = playerTasks.task();

  if (task === null) return

  const stateRunner = taskRunners[task];
  const taskResult = stateRunner(heartbeat, player);

  if (taskResult === TaskResult.Stop) {
    return
  }
  if (taskResult === TaskResult.Next) {
    return runTasks(heartbeat, player);
  }
  
  return taskResult
}
