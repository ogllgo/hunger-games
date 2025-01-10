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
    hex;
    hue;
    saturation;
    lightness;
    luminance;
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
            }
            else {
                this.r = parseInt(hex.slice(0, 2), 16);
                this.g = parseInt(hex.slice(2, 4), 16);
                this.b = parseInt(hex.slice(4, 6), 16);
                if (hex.length === 8) { // don't parse RRGGBB like RRGGBBAA
                    this.a = parseInt(hex.slice(6, 8), 16) / 255;
                }
            }
        }
        else {
            const [r, g, b, a] = args;
            if (g === undefined || b === undefined) {
                unreachableError(); // the null-case is already handled, but TS doesn't know about it
            }
            this.r = r;
            this.g = g;
            this.b = b;
            if (a !== undefined) {
                this.a = a;
            }
        }
        this.hex = this._toHex();
        [this.hue, this.saturation, this.lightness] = this._getHSL();
        const normalize = (value) => {
            const normalized = value / 255;
            return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        };
        const r = normalize(this.r);
        const g = normalize(this.g);
        const b = normalize(this.b);
        this.luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    _getHSL() {
        // Make r, g, and b fractions of 1
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
        // Calculate hue
        // No difference
        if (delta === 0) {
            h = 0;
        }
        // Red is max
        else if (cmax === r) {
            h = ((g - b) / delta) % 6;
        }
        // Green is max
        else if (cmax === g) {
            h = (b - r) / delta + 2;
        }
        // Blue is max
        else {
            h = (r - g) / delta + 4;
        }
        h = Math.round(h * 60);
        if (h < 0) {
            h += 360;
        }
        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return [h, s, l];
    }
    _toHex() {
        const rHex = this.r.toString(16).padStart(2, "0");
        const gHex = this.g.toString(16).padStart(2, "0");
        const bHex = this.b.toString(16).padStart(2, "0");
        const aHex = Math.round((this.a ?? 1) * 255).toString(16).padStart(2, "0");
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }
    isAccessible(other) {
        const luminance1 = this.luminance;
        const luminance2 = other.luminance;
        const calculateContrastRatio = (lum1, lum2) => {
            const light = Math.max(lum1, lum2);
            const dark = Math.min(lum1, lum2);
            return (light + 0.05) / (dark + 0.05);
        };
        const contrastRatio = calculateContrastRatio(luminance1, luminance2);
        return contrastRatio >= 2; // WCAG recommends 4.5:1 for normal text
    }
    _fromHex(hex) {
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
        }
        else {
            this.r = parseInt(hex.slice(0, 2), 16);
            this.g = parseInt(hex.slice(2, 4), 16);
            this.b = parseInt(hex.slice(4, 6), 16);
            if (hex.length === 8) { // don't parse RRGGBB like RRGGBBAA
                this.a = parseInt(hex.slice(6, 8), 16) / 255;
            }
        }
    }
    getRGBA() {
        return [this.r, this.g, this.b, this.a];
    }
    getHSL() {
        return [this.hue, this.saturation, this.lightness];
    }
    getHex() {
        return this.hex;
    }
    setRGBA(r, g, b, a) {
        if (r)
            this.r = r;
        if (g)
            this.g = g;
        if (b)
            this.b = b;
        if (a)
            this.a = a;
        [this.hue, this.saturation, this.lightness] = this._getHSL();
        this.hex = this._toHex();
    }
    setHex(hex) {
        this._fromHex(hex);
        [this.hue, this.saturation, this.lightness] = this._getHSL();
    }
    setHSL(hue, saturation, lightness) {
        const s = saturation / 100;
        const l = lightness / 100;
        let c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
        let x = c * (1 - Math.abs((hue / 60) % 2 - 1)); // Second largest component
        let m = l - c / 2; // Match to lightness
        let r = 0, g = 0, b = 0;
        if (0 <= hue && hue < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (60 <= hue && hue < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (120 <= hue && hue < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (180 <= hue && hue < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (240 <= hue && hue < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }
        // Convert back to RGB space
        this.r = Math.round((r + m) * 255);
        this.g = Math.round((g + m) * 255);
        this.b = Math.round((b + m) * 255);
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        const normalize = (value) => {
            const normalized = value / 255;
            return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        };
        r = normalize(this.r);
        g = normalize(this.g);
        b = normalize(this.b);
        this.luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        this.hex = this._toHex();
    }
    text(str) {
        return `\x1b[38;2;${this.r};${this.g};${this.b}m${str}\x1b[0m`;
    }
}
exports.Colour = Colour;
function unreachableError() {
    throw new Error("This error will never be reached.");
}
//# sourceMappingURL=utils.js.map