import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { Intent } from "programming-game/types";
import { scavenge } from "../playerTasks/scavenge";
import { trade } from "../playerTasks/trade";
import { craft } from "../playerTasks/craft";
import { retreat } from "../playerTasks/retreat";
import { playerState } from "./playerState";
import { UniqueTaskQueue } from "../utils/taskQueue";
import { eat } from "../playerTasks/eat";
import { fight } from "../playerTasks/fight";

export enum PlayerTask {
  Scavenge,
  Trade,
  Craft,
  Retreat,
  Eat,
  Fight,
}

export const playerTasks = new UniqueTaskQueue<PlayerTask>()

export type TaskRunner = (
  heartbeat: TickHeartbeat,
  player: OnTickCurrentPlayer,
) => Intent | TaskResult;

export const taskRunners: Record<PlayerTask, TaskRunner> = {
  [PlayerTask.Scavenge]: scavenge,
  [PlayerTask.Trade]: trade,
  [PlayerTask.Craft]: craft,
  [PlayerTask.Retreat]: retreat,
  [PlayerTask.Eat]: eat,
  [PlayerTask.Fight]: fight,
};

export enum TaskResult {
  Stop,
  Next,
}

/**
 * Recursively run our tasks until we terminate
 */
export function runTasks(
  heartbeat: TickHeartbeat,
  player: OnTickCurrentPlayer,
) {
  const task = playerTasks.task();
  if (!task) return
  
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
