import { Tile, Grass, Sand, ShallowWater, DeepWater } from "../Tiles/export";
import { Vector2 } from "../utils";
import { Perlin } from "../noise";
export type noiseReturn = number;

const NOISE_REDUCTION_FACTOR = 0.025;
const IRRATIONAL_SCALE = Math.PI;
const OFFSET = 0.001;
const HUMIDITY = 0.3;
export const WIDTH = 23;

export function noise(pos: Vector2, perl: Perlin): noiseReturn {
    const noiseValue = perl.noise(
        (pos.x + OFFSET) * NOISE_REDUCTION_FACTOR * IRRATIONAL_SCALE,
        (pos.y + OFFSET) * NOISE_REDUCTION_FACTOR * IRRATIONAL_SCALE
    );
    const normalizedValue = Math.pow((noiseValue + 2 - HUMIDITY) / 2, 2); 
    return normalizedValue;
}

export function decider(num: noiseReturn, pos: Vector2): Tile {
    if (num > 0.75) {
        return new Grass(pos.x, pos.y);
    }
    if (num > 0.65) {
        return new Sand(pos.x, pos.y);
    }
    if (num > 0.4) {
        return new ShallowWater(pos.x, pos.y);
    }
    return new DeepWater(pos.x, pos.y);
}
