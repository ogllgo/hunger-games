import { AbstractTile, TileType } from "./class";
import { Colour, Vector2 } from "../utils";
export class ShallowWater extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.shallow_water, 0.7, new Vector2(0.2, 0.4), new Vector2(0.6, 1), new Colour("#add8e6"));
    }
}
export class DeepWater extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.deep_water, 0.4, new Vector2(0.3, 0.6), new Vector2(0.9, 1), new Colour("#1764f6"));
    }
}