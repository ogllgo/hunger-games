"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Void = void 0;
const utils_1 = require("../utils");
const class_1 = require("./class");
class Void extends class_1.AbstractTile {
    // grass
    constructor(x, y) {
        super(x, y, class_1.TileType.void, 0, new utils_1.Vector2(0, 0), new utils_1.Vector2(0, 0), new utils_1.Colour("#000000FF"));
    }
}
exports.Void = Void;
//# sourceMappingURL=void.js.map