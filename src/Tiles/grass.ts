import { AbstractTile, TileType } from "./class";
import { Colour, Vector2 } from "../utils";
export class Grass extends AbstractTile {
    // grass
    constructor(x: number, y: number) {
        super(x, y, TileType.grass, 1.1, new Vector2(0.5, 0.9), new Vector2(0.5, 0.6), new Colour("#077f0d"));
    }
}