import { AbstractTile, TileType } from "./class";
import { Colour, Vector2 } from "../utils";
export class Sand extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.sand, 0.9, new Vector2(0.2, 0.3), new Vector2(0.5, 0.8), new Colour("#8e8e00"));
    }
}