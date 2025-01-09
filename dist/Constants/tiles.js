"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM_PADDING = exports.ITEM_SIZE = exports.WORLD_PADDING = exports.WORLD_SIZE = exports.TILE_PADDING = exports.TILE_SIZE = exports.GRID_SIZE = void 0;
const utils_1 = require("../utils");
exports.GRID_SIZE = 12;
exports.TILE_SIZE = new utils_1.Vector2(12, 12);
exports.TILE_PADDING = new utils_1.Vector2(exports.GRID_SIZE - exports.TILE_SIZE.x, exports.GRID_SIZE - exports.TILE_SIZE.y);
exports.WORLD_SIZE = new utils_1.Vector2(80, 80);
exports.WORLD_PADDING = new utils_1.Vector2(20, 20);
exports.ITEM_SIZE = new utils_1.Vector2(6, 6);
exports.ITEM_PADDING = new utils_1.Vector2(exports.GRID_SIZE - exports.ITEM_SIZE.x, exports.GRID_SIZE - exports.ITEM_SIZE.y);
//# sourceMappingURL=tiles.js.map