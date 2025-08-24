import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";

export function trade(heartbeat: TickHeartbeat, player: OnTickCurrentPlayer) {
  return player.move({
    x: player.position.x,
    y: player.position.y,
  });
}