"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTile = exports.TileType = void 0;
const utils_1 = require("../utils");
const tiles_1 = require("../Constants/tiles");
var TileType;
(function (TileType) {
    TileType[TileType["undef"] = 0] = "undef";
    TileType[TileType["grass"] = 1] = "grass";
    TileType[TileType["sand"] = 2] = "sand";
    TileType[TileType["shallow_water"] = 3] = "shallow_water";
    TileType[TileType["deep_water"] = 4] = "deep_water";
    TileType[TileType["void"] = 5] = "void";
})(TileType || (exports.TileType = TileType = {}));
class AbstractTile {
    x;
    y;
    type;
    speedModifier;
    foraging = new utils_1.Vector2(1, 1);
    waterGathering = new utils_1.Vector2(1, 1);
    colour;
    constructor(x, y, type, speedModifier, foraging, waterGathering, colour) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.speedModifier = speedModifier;
        this.foraging = foraging;
        this.waterGathering = waterGathering;
        this.colour = colour;
    }
    render(ctx) {
        ctx.fillStyle = this.colour.getHex();
        ctx.fillRect(this.x * (tiles_1.TILE_SIZE.x + tiles_1.TILE_PADDING.x) + tiles_1.WORLD_PADDING.x, this.y * (tiles_1.TILE_SIZE.y + tiles_1.TILE_PADDING.y) + tiles_1.WORLD_PADDING.x, tiles_1.TILE_SIZE.x, tiles_1.TILE_SIZE.y);
    }
}
exports.AbstractTile = AbstractTile;
//# sourceMappingURL=class.js.map