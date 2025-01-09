"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const utils_1 = require("../utils");
const tiles_1 = require("../Constants/tiles");
const generation_1 = require("../Constants/generation");
const items_1 = require("../Constants/items");
const noise_1 = require("../noise");
const Tiles = __importStar(require("../Tiles/export"));
const class_1 = require("../Tiles/class");
const Items = __importStar(require("../Items/export"));
class World {
    tiles = [];
    items = [];
    noise;
    constructor(seed) {
        this.noise = new noise_1.Perlin(seed);
        this.generateTiles();
        this.addItems();
    }
    generateTiles() {
        for (let x = 0; x < tiles_1.WORLD_SIZE.x; x++) {
            let tileStrip = [];
            for (let y = 0; y < tiles_1.WORLD_SIZE.y; y++) {
                // generate the world in a circle - don't fill up the whole space
                if ((x - tiles_1.WORLD_SIZE.x / 2) ** 2 + (y - tiles_1.WORLD_SIZE.y / 2) ** 2 > (tiles_1.WORLD_SIZE.x / 2) ** 2) {
                    tileStrip.push(new Tiles.Void(x, y));
                    continue;
                }
                const out = (0, generation_1.noise)(new utils_1.Vector2(x, y), this.noise);
                tileStrip.push((0, generation_1.decider)(out, new utils_1.Vector2(x, y)));
            }
            this.tiles.push(tileStrip);
        }
    }
    addItems() {
        const centerX = tiles_1.WORLD_SIZE.x / 2;
        const centerY = tiles_1.WORLD_SIZE.y / 2;
        const maxDist = (tiles_1.WORLD_SIZE.x / 2) ** 2;
        for (let x = 0; x < tiles_1.WORLD_SIZE.x; x++) {
            let itemStrip = [];
            for (let y = 0; y < tiles_1.WORLD_SIZE.y; y++) {
                if (this.getTile(x, y).type === class_1.TileType.void) {
                    continue;
                }
                const distToCenter = (x - centerX) ** 2 + (y - centerY) ** 2;
                const normalizedDist = 1 - distToCenter / maxDist;
                const probability = normalizedDist ** items_1.CENTER_BIAS;
                if (Math.random() < probability + items_1.BASE_CHANCE) {
                    itemStrip.push(new Items.Undef(x, y));
                }
            }
            this.items.push(itemStrip);
        }
    }
    getTile(...args) {
        if (args.length === 1 && args[0] instanceof utils_1.Vector2) {
            const index = args[0];
            return this.tiles[index.y][index.x];
        }
        else if (args.length === 2 && typeof args[0] === 'number' && args[1] !== undefined) {
            return this.tiles[args[0]][args[1]];
        }
        else {
            throw new Error("Invalid args for `world.getTile` - passed Vector2 and number.");
        }
    }
    setTile(...args) {
        const index = args[0];
        if (typeof index === "number") {
            this.tiles[index % tiles_1.WORLD_SIZE.x][Math.floor(index / tiles_1.WORLD_SIZE.y)] = args[1];
            return;
        }
        this.tiles[index.y][index.x] = args[1];
    }
    getItem(...args) {
        if (args.length === 1 && args[0] instanceof utils_1.Vector2) {
            const index = args[0];
            return this.items[index.y][index.x];
        }
        else if (args.length === 2 && typeof args[0] === 'number' && args[1] !== undefined) {
            return this.items[args[0]][args[1]];
        }
        else {
            throw new Error("Invalid args for `world.getItem` - passed Vector2 and number.");
        }
    }
    setItem(...args) {
        const index = args[0];
        if (typeof index === "number") {
            this.items[index % tiles_1.WORLD_SIZE.x][Math.floor(index / tiles_1.WORLD_SIZE.y)] = args[1];
            return;
        }
        this.items[index.y][index.x] = args[1];
    }
    render(ctx) {
        for (let x = 0; x < tiles_1.WORLD_SIZE.x; x++) {
            for (let y = 0; y < tiles_1.WORLD_SIZE.y; y++) {
                this.tiles[x][y].render(ctx);
            }
        }
        for (let x = 0; x < tiles_1.WORLD_SIZE.x; x++) {
            for (let y = 0; y < tiles_1.WORLD_SIZE.y; y++) {
                if (this.items[x][y]) {
                    this.items[x][y].render(ctx);
                }
            }
        }
    }
}
exports.World = World;
//# sourceMappingURL=class.js.map