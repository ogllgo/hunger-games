import { Vector2, Colour } from "../utils";
import { AbstractItem, ItemType } from "./class";

export class Undef extends AbstractItem {
    // grass
    constructor(x: number, y: number) {
        super(x, y, ItemType.undef, -1, new Vector2(0, 0), new Vector2(0, 0), new Colour("#FF00FF"));
    }
}