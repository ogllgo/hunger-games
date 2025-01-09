"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
const sdl_1 = __importDefault(require("@kmamal/sdl"));
const canvas_1 = __importDefault(require("canvas"));
const tiles_1 = require("./Constants/tiles");
const class_1 = require("./World/class");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const window = sdl_1.default.video.createWindow({
    resizable: true,
    width: tiles_1.WORLD_PADDING.x * 2 + tiles_1.WORLD_SIZE.x * (tiles_1.TILE_SIZE.x + tiles_1.TILE_PADDING.x),
    height: tiles_1.WORLD_PADDING.y * 2 + tiles_1.WORLD_SIZE.y * (tiles_1.TILE_SIZE.y + tiles_1.TILE_PADDING.y)
});
const { pixelWidth: width, pixelHeight: height } = window;
let canvas = canvas_1.default.createCanvas(width, height);
let ctx = canvas.getContext('2d');
let world = new class_1.World(Math.random());
const redraw = () => {
    const { pixelWidth: width, pixelHeight: height } = window;
    world = new class_1.World(Math.random());
    world.render(ctx);
    const buffer = canvas.toBuffer('raw');
    window.render(width, height, width * 4, 'bgra32', buffer);
};
window.on('expose', redraw);
window.on('resize', ({ pixelWidth: width, pixelHeight: height }) => {
    canvas = canvas_1.default.createCanvas(width, height);
    ctx = canvas.getContext('2d');
    redraw();
});
//# sourceMappingURL=index.js.map