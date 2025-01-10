"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractItem = exports.ItemType = void 0;
const utils_1 = require("../utils");
const tiles_1 = require("../Constants/tiles");
var ItemType;
(function (ItemType) {
    ItemType[ItemType["undef"] = 0] = "undef";
})(ItemType || (exports.ItemType = ItemType = {}));
class AbstractItem {
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
        const x = tiles_1.WORLD_PADDING.x + (this.x + 0.5) * tiles_1.GRID_SIZE;
        const y = tiles_1.WORLD_PADDING.y + (this.y + 0.5) * tiles_1.GRID_SIZE;
        ctx.beginPath();
        ctx.arc(x, y, tiles_1.ITEM_SIZE.x / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}
exports.AbstractItem = AbstractItem;
//# sourceMappingURL=class.js.map