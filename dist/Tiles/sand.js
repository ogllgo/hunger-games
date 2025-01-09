"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sand = void 0;
const class_1 = require("./class");
const utils_1 = require("../utils");
class Sand extends class_1.AbstractTile {
    // grass
    constructor(x, y) {
        super(x, y, class_1.TileType.sand, 0.9, new utils_1.Vector2(0.2, 0.3), new utils_1.Vector2(0.5, 0.8), new utils_1.Colour("#8e8e00"));
    }
}
exports.Sand = Sand;
//# sourceMappingURL=sand.js.map