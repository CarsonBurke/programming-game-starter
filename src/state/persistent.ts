import { TickHeartbeat } from "programming-game";
import { tickState } from "./tickState";
import { packPos, readPackedSet } from "../utils/pos";
import { Position } from "programming-game/types";
import * as fs from "fs";
import * as path from "path";
import { writeFile } from "fs/promises";
import { Settings } from "./settings";

class Persistent {
  private npcLocations: Set<number> = new Set();
  private highestThreatSeen: number = 0;

  constructor() {
    this.loadFromFile();
  }

  private loadFromFile() {
    try {
      const statePath = path.join(__dirname, "../state.json");
      if (fs.existsSync(statePath)) {
        const data = JSON.parse(fs.readFileSync(statePath, "utf-8"));
        if (data.npcLocations && Array.isArray(data.npcLocations)) {
          this.npcLocations = new Set(data.npcLocations);
        }
        if (
          data.highestThreatSeen &&
          typeof data.highestThreatSeen === "number"
        ) {
          this.highestThreatSeen = data.highestThreatSeen;
        }
      }
    } catch (error) {
      // Silently fail if state.json doesn't exist or is invalid
    }
  }

  writePeriodically(heartbeat: TickHeartbeat) {
    if (heartbeat.time % 100 !== 0) return;

    writeFile("state.json", JSON.stringify(persistent));
  }

  tickUpdate(heartbeat: TickHeartbeat) {
    this.updateNpcLocations(heartbeat);
  }

  private updateNpcLocations(heartbeat: TickHeartbeat) {
    const units = tickState.getUnitsByType(heartbeat);

    units.npc.forEach((npc) => {
      this.npcLocations.add(packPos(npc.position));
    });
  }

  getNpcLocations(): Set<Position> {
    return readPackedSet(this.npcLocations);
  }

  trySetHighestThreatSeen(threat: number) {
    if (threat > this.highestThreatSeen) {
      this.highestThreatSeen = threat;
    }
  }

  getHighestThreatSeen(): number {
    return this.highestThreatSeen;
  }
}

export const persistent = new Persistent();
