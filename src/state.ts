import { TickHeartbeat } from "programming-game";
import { tickState } from "./tickState";
import { packPos, readPackedSet } from "./pos";
import { Position } from "programming-game/types";

class State {
  npcLocations: Set<number> = new Set();
  
  updateNpcLocations(heartbeat: TickHeartbeat) {
    const units = tickState.getUnitsByType(heartbeat)
    units.npc.forEach(npc => {
      this.npcLocations.add(packPos(npc.position));
    });
  }
  
  getNpcLocations(): Set<Position> {
    return readPackedSet(this.npcLocations);
  }
}

export const state = new State();