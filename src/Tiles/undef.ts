import { Vector2, Colour } from "../utils";
import { AbstractTile, TileType } from "./class";

export class Undef extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.undef, -1, new Vector2(0, 0), new Vector2(0, 0), new Colour("#FF00FF"));
    }
}