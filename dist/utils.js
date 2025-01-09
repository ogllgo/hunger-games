"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colour = exports.Vector2 = void 0;
exports.unreachableError = unreachableError;
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    random() {
        const x = this.y - this.x;
        const y = this.x;
        return Math.random() * x + y;
    }
    multipliy(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
    divide(other) {
        return new Vector2(this.x / other.x, this.y / other.y);
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    restrict(other) {
        this.x = Math.min(Math.max(other.x, this.x), other.y);
        this.y = Math.min(Math.max(other.x, this.y), other.y);
    }
    restrictNum(num) {
        this.x = Math.min(Math.max(num, this.x), num);
        this.y = Math.min(Math.max(num, this.y), num);
    }
}
exports.Vector2 = Vector2;
class Colour {
    r;
    g;
    b;
    a = 1;
    constructor(...args) {
        if (typeof args[0] === "string") {
            let hex = args[0];
            if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex)) {
                throw new Error("Invalid hex color format");
            }
            if (hex.startsWith("#")) {
                hex = hex.slice(1);
            }
            if (hex.length === 3 || hex.length === 4) {
                this.r = parseInt(hex[0] + hex[0], 16); // double the codes, so A becomes AA - then convert hex to decimal by passing base 16
                this.g = parseInt(hex[1] + hex[1], 16);
                this.b = parseInt(hex[2] + hex[2], 16);
                if (hex.length === 4) { // don't parse RGB like RGBA
                    this.a = parseInt(hex[3] + hex[3], 16) / 255;
                }
                return;
            }
            this.r = parseInt(hex.slice(0, 2), 16);
            this.g = parseInt(hex.slice(2, 4), 16);
            this.b = parseInt(hex.slice(4, 6), 16);
            if (hex.length === 8) { // don't parse RRGGBB like RRGGBBAA
                this.a = parseInt(hex.slice(6, 8), 16) / 255;
            }
            return;
        }
        const [r, g, b, a] = args;
        if (g === undefined || b === undefined) {
            unreachableError(); // the null-case is already handled, but TS doesn't know about it
        }
        this.r = r;
        this.g = g;
        this.b = b;
        if (!this.a) {
            this.a = a;
        }
    }
    toHex() {
        const rHex = this.r.toString(16).padStart(2, "0");
        const gHex = this.g.toString(16).padStart(2, "0");
        const bHex = this.b.toString(16).padStart(2, "0");
        const aHex = Math.round((this.a ?? 1) * 255).toString(16).padStart(2, "0");
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }
}
exports.Colour = Colour;
function unreachableError() {
    throw new Error("This error will never be reached.");
}
//# sourceMappingURL=utils.js.map