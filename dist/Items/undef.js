"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Undef = void 0;
const utils_1 = require("../utils");
const class_1 = require("./class");
class Undef extends class_1.AbstractItem {
    // grass
    constructor(x, y) {
        super(x, y, class_1.ItemType.undef, -1, new utils_1.Vector2(0, 0), new utils_1.Vector2(0, 0), new utils_1.Colour("#FF00FF"));
    }
}
exports.Undef = Undef;
//# sourceMappingURL=undef.js.map