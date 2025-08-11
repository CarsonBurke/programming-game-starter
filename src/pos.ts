import { Position } from "programming-game/types";
import { MAP_SIZE } from "./constants";

export function packPos(coord: Position): number {
  return coord.x * MAP_SIZE + coord.y;
}

export function unpackPos(value: number): Position {
  return {
    x: Math.floor(value / MAP_SIZE),
    y: value % MAP_SIZE,
  };
}

export function readPackedSet(packedSet: Set<number>): Set<Position> {
  return new Set(Array.from(packedSet).map(unpackPos));
}
