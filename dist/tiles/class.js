import { Range } from "../utils";
export var TileType;
(function (TileType) {
    TileType[TileType["undef"] = 0] = "undef";
    TileType[TileType["grass"] = 1] = "grass";
})(TileType || (TileType = {}));
export class AbstractTile {
    x;
    y;
    type;
    speedModifier;
    foraging = new Range(1, 1);
    waterGathering = new Range(1, 1);
    constructor(x, y, type, speedModifier) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.speedModifier = speedModifier;
    }
}
//# sourceMappingURL=class.js.map