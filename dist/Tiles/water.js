"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepWater = exports.ShallowWater = void 0;
const class_1 = require("./class");
const utils_1 = require("../utils");
class ShallowWater extends class_1.AbstractTile {
    // grass
    constructor(x, y) {
        super(x, y, class_1.TileType.shallow_water, 0.7, new utils_1.Vector2(0.2, 0.4), new utils_1.Vector2(0.6, 1), new utils_1.Colour("#add8e6"));
    }
}
exports.ShallowWater = ShallowWater;
class DeepWater extends class_1.AbstractTile {
    // grass
    constructor(x, y) {
        super(x, y, class_1.TileType.deep_water, 0.4, new utils_1.Vector2(0.3, 0.6), new utils_1.Vector2(0.9, 1), new utils_1.Colour("#1764f6"));
    }
}
exports.DeepWater = DeepWater;
//# sourceMappingURL=water.js.map