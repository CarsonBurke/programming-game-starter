import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { maxCalories } from "programming-game/constants";
import { Items } from "programming-game/items";
import { ClientSideMonster, ClientSideNPC, ClientSidePlayer, ClientSideUnit, Intent, UniqueItemId, UnitTypes } from "programming-game/types";
import { FOOD } from "./constants";
import { tickState } from "./tickState";
import { runCombat } from "./combat";

export function onTick(heartbeat: TickHeartbeat): Intent {
  if (heartbeat.time % 100 == 0) console.log("tick", heartbeat.time)
  const { player } = heartbeat;
  if (!player) {
    console.log("no player")
    return
  };

  // if we're dead, respawn
  if (player.hp <= 0) {
    console.log("respawning")
    return player.respawn();
  }
  
  tickState.update()
  
  const runCombatResult = runCombat(heartbeat, player);
  if (!!runCombatResult) return runCombatResult
  
  for (const key in player.storage) {
    const item_id = key as Items | UniqueItemId;
    let count = player.storage[item_id];

    if (FOOD.has(item_id) && should_eat(player)) {
      return player.eat(item_id, 0);
    }
  }
  
  if (player.hp > player.stats.maxHp * 0.9) {

    // run to the right
    return player.move({
      x: player.position.x,
      y: player.position.y - 10,
    });
  }

  return player.summonMana()
}

function should_eat(player: OnTickCurrentPlayer) {
  
  if (player.calories >= maxCalories) {
    return false
  }
  
  if (player.hp < player.stats.maxHp) {
    return true
  }
  
  return false
}