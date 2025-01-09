import { Vector2, Colour } from "../utils";
import { AbstractTile, TileType } from "./class";

export class Void extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.void, 0, new Vector2(0, 0), new Vector2(0, 0), new Colour("#000000FF"));
    }
}