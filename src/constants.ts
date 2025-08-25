import { FoodItems } from "programming-game/items";

export const FOOD = new Set<FoodItems>(["snakeMeat", "ratMeat", "chickenMeat", "edibleSlime"]);
export const MAP_SIZE = 1_000_000;
export const SPAWN_POS = { x: 0, y: 0 }
export const DROP_WEIGHT_THRESHOLD_PERCENT = 0.6;