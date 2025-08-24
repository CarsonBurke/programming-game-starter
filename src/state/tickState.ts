import { TickHeartbeat } from "programming-game";
import { ClientSideMonster, ClientSideNPC, ClientSidePlayer, ClientSideUnit } from "programming-game/types";

class TickState {
  update() {
    this.unitsByType = undefined
  }
  
  
  unitsByType?: UnitsByType;
  getUnitsByType(heartbeat: TickHeartbeat) {
    if (!!this.unitsByType) return this.unitsByType;
    
    const { units } = heartbeat;
  
    const unitsByType = Object.values(units).reduce((acc, unit) => {
      if (!acc[unit.type]) acc[unit.type] = [];
      acc[unit.type].push(unit as any);
      return acc;
    }, { npc: [], monster: [], player: [] } as UnitsByType);
    
    this.unitsByType = unitsByType;
    return this.unitsByType;
  }
}

interface UnitsByType {
  npc: ClientSideNPC[]
  monster: ClientSideMonster[]
  player: ClientSidePlayer[]
}

export const tickState = new TickState();