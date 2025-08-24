import { OnTickCurrentPlayer, TickHeartbeat } from "programming-game";
import { FoodItems, Items } from "programming-game/items";
import { ClientSideMonster, ClientSideNPC, ClientSidePlayer, ClientSideUnit, UniqueItemId } from "programming-game/types";
import { FOOD } from "../constants";

class TickState {
  update() {
    this.unitsByType = undefined
    this.food = undefined
  }
  
  private unitsByType?: UnitsByType;
  getUnitsByType(heartbeat: TickHeartbeat) {
    if (this.unitsByType) return this.unitsByType;
    
    const { units } = heartbeat;
  
    const unitsByType = Object.values(units).reduce((acc, unit) => {
      if (!acc[unit.type]) acc[unit.type] = [];
      acc[unit.type].push(unit as any);
      return acc;
    }, { npc: [], monster: [], player: [] } as UnitsByType);
    
    this.unitsByType = unitsByType;
    return this.unitsByType;
  }
  
  private food?: FoodItems[];
  getFoodItems(player: OnTickCurrentPlayer) {
    if (this.food) return this.food;
    
    const foodItems = Array.from(FOOD).filter((key) => {
      const item_id = key as Items | UniqueItemId
      const storage_count = player.inventory[item_id]
      
      return !!storage_count
    }) as FoodItems[];
    
    this.food = foodItems;
    return this.food;
  }
}

interface UnitsByType {
  npc: ClientSideNPC[]
  monster: ClientSideMonster[]
  player: ClientSidePlayer[]
}

export const tickState = new TickState();