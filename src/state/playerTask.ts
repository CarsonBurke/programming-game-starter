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
import { cultivate } from "../playerTasks/cultivate";
import { dropItem } from "../playerTasks/dropItem";

export enum PlayerTask {
  Scavenge,
  Trade,
  Craft,
  Retreat,
  Eat,
  Fight,
  Cultivate,
  DropItem,
}

export const playerTasks = new UniqueTaskQueue<PlayerTask>([PlayerTask.Scavenge])

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
  [PlayerTask.Cultivate]: cultivate,
  [PlayerTask.DropItem]: dropItem,
};

export enum TaskResult {
  Stop,
  Next,
}