"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perlin = void 0;
exports.hash = hash;
class Perlin {
    p;
    perm;
    seed;
    constructor(seed) {
        this.seed = seed;
        this.p = [];
        this.perm = [];
        this.initialize(seed);
    }
    initialize(seed) {
        // Initialize the array with values 0-255
        this.p = Array.from({ length: 256 }, (_, i) => i);
        // Shuffle the array using the seed
        for (let i = this.p.length - 1; i > 0; i--) {
            seed = hash(seed); // Generate a pseudo-random value based on the seed
            const j = seed % (i + 1);
            [this.p[i], this.p[j]] = [this.p[j], this.p[i]]; // Swap elements
        }
        // Duplicate the array to avoid overflow issues
        this.perm = [...this.p, ...this.p];
    }
    noise(x, y) {
        const X = Math.floor(x) & 255; // FIND UNIT SQUARE THAT CONTAINS POINT.
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x); // FIND RELATIVE X,Y OF POINT IN SQUARE.
        y -= Math.floor(y);
        const u = this.fade(x); // COMPUTE FADE CURVES FOR EACH OF X,Y.
        const v = this.fade(y);
        const A = this.perm[X] + Y;
        const B = this.perm[X + 1] + Y;
        return this.lerp(v, this.lerp(u, this.grad(this.perm[A], x, y, 0), this.grad(this.perm[B], x - 1, y, 0)), this.lerp(u, this.grad(this.perm[A + 1], x, y - 1, 0), this.grad(this.perm[B + 1], x - 1, y - 1, 0)));
    }
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    lerp(t, a, b) {
        return a + t * (b - a);
    }
    grad(hash, x, y, z) {
        const h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE
        const u = h < 8 ? x : y; // INTO 12 GRADIENT DIRECTIONS.
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
}
exports.Perlin = Perlin;
// https://stackoverflow.com/questions/35376941/a-pseudo-random-number-generator-based-on-2-inputs
// but i made y optional and added an if
function hash(x, y) {
    x = x * 3266489917 + 374761393;
    x = (x << 17) | (x >> 15);
    if (y !== undefined) {
        x += y * 3266489917;
    }
    x *= 668265263;
    x ^= x >> 15;
    x *= 2246822519;
    x ^= x >> 13;
    x *= 3266489917;
    x ^= x >> 16;
    return Math.abs(x) & 0xffffffff; // Return a positive 32-bit integer
}
//# sourceMappingURL=noise.js.map