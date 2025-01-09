import { Vector2 } from "../utils";
export const GRID_SIZE = 12;
export const TILE_SIZE = new Vector2(12, 12);
export const TILE_PADDING = new Vector2(GRID_SIZE - TILE_SIZE.x, GRID_SIZE - TILE_SIZE.y);
export const WORLD_SIZE = new Vector2(80, 80);
export const WORLD_PADDING = new Vector2(20, 20);
export const ITEM_SIZE = new Vector2(6, 6);
export const ITEM_PADDING = new Vector2(GRID_SIZE - ITEM_SIZE.x, GRID_SIZE - ITEM_SIZE.y);