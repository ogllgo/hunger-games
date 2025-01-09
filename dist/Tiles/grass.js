"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const class_1 = require("./class");
const utils_1 = require("../utils");
class Grass extends class_1.AbstractTile {
    // grass
    constructor(x, y) {
        super(x, y, class_1.TileType.grass, 1.1, new utils_1.Vector2(0.5, 0.9), new utils_1.Vector2(0.5, 0.6), new utils_1.Colour("#077f0d"));
    }
}
exports.Grass = Grass;
//# sourceMappingURL=grass.js.map