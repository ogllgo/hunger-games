"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WIDTH = void 0;
exports.noise = noise;
exports.decider = decider;
const export_1 = require("../Tiles/export");
const NOISE_REDUCTION_FACTOR = 0.025;
const IRRATIONAL_SCALE = Math.PI;
const OFFSET = 0.001;
const HUMIDITY = 0.3;
exports.WIDTH = 23;
function noise(pos, perl) {
    const noiseValue = perl.noise((pos.x + OFFSET) * NOISE_REDUCTION_FACTOR * IRRATIONAL_SCALE, (pos.y + OFFSET) * NOISE_REDUCTION_FACTOR * IRRATIONAL_SCALE);
    const normalizedValue = Math.pow((noiseValue + 2 - HUMIDITY) / 2, 2);
    return normalizedValue;
}
function decider(num, pos) {
    if (num > 0.75) {
        return new export_1.Grass(pos.x, pos.y);
    }
    if (num > 0.65) {
        return new export_1.Sand(pos.x, pos.y);
    }
    if (num > 0.4) {
        return new export_1.ShallowWater(pos.x, pos.y);
    }
    return new export_1.DeepWater(pos.x, pos.y);
}
//# sourceMappingURL=generation.js.map