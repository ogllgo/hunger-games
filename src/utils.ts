export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public random(): number {
        const x: number = this.y - this.x;
        const y: number = this.x;
        return Math.random() * x + y;
    }
    public multipliy(other: Vector2): Vector2 {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
    public divide(other: Vector2): Vector2 {
        return new Vector2(this.x / other.x, this.y / other.y);
    }
    public add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    public subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    public restrict(other: Vector2): void {
        this.x = Math.min(Math.max(other.x, this.x), other.y);
        this.y = Math.min(Math.max(other.x, this.y), other.y);
    }
    public restrictNum(num: number): void {
        this.x = Math.min(Math.max(num, this.x), num);
        this.y = Math.min(Math.max(num, this.y), num);
    }
}
export class Colour {
    private r: number;
    private g: number;
    private b: number;
    private a: number = 1;
    private hex: string;
    private hue: number;
    private saturation: number;
    private lightness: number;
    private luminance: number;
    constructor(hex: string);
    constructor(r: number, g: number, b: number, a?: number);
    constructor(...args: [string] | [number, number, number, number?]) {
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
            } else {
                this.r = parseInt(hex.slice(0, 2), 16);
                this.g = parseInt(hex.slice(2, 4), 16);
                this.b = parseInt(hex.slice(4, 6), 16);
                if (hex.length === 8) { // don't parse RRGGBB like RRGGBBAA
                    this.a = parseInt(hex.slice(6, 8), 16) / 255;
                }
            }
        } else {
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


        const normalize = (value: number) => {
            const normalized = value / 255;
            return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        };

        const r = normalize(this.r);
        const g = normalize(this.g);
        const b = normalize(this.b);

        this.luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    private _getHSL(): [number, number, number] {
        // Make r, g, and b fractions of 1
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
      
        // Find greatest and smallest channel values
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
      
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
    private _toHex(): string {
        const rHex = this.r.toString(16).padStart(2, "0");
        const gHex = this.g.toString(16).padStart(2, "0");
        const bHex = this.b.toString(16).padStart(2, "0");
        const aHex = Math.round((this.a ?? 1) * 255).toString(16).padStart(2, "0");
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }
    public isAccessible(other: Colour): boolean {
        const luminance1 = this.luminance;
        const luminance2 = other.luminance;

        const calculateContrastRatio = (lum1: number, lum2: number): number => {
            const light = Math.max(lum1, lum2);
            const dark = Math.min(lum1, lum2);
            return (light + 0.05) / (dark + 0.05);
        };

        const contrastRatio = calculateContrastRatio(luminance1, luminance2);
        return contrastRatio >= 2; // WCAG recommends 4.5:1 for normal text
    }
    private _fromHex(hex: string) {
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
        } else {
            this.r = parseInt(hex.slice(0, 2), 16);
            this.g = parseInt(hex.slice(2, 4), 16);
            this.b = parseInt(hex.slice(4, 6), 16);
            if (hex.length === 8) { // don't parse RRGGBB like RRGGBBAA
                this.a = parseInt(hex.slice(6, 8), 16) / 255;
            }
        }
    }
    public getRGBA(): [number, number, number, number | undefined] {
        return [this.r, this.g, this.b, this.a];
    }
    public getHSL(): [number, number, number] {
        return [this.hue, this.saturation, this.lightness];
    }
    public getHex(): string {
        return this.hex;
    }
    public setRGBA(r?: number, g?: number, b?: number, a?: number): void {
        if (r) this.r = r;
        if (g) this.g = g;
        if (b) this.b = b;
        if (a) this.a = a;

        [this.hue, this.saturation, this.lightness] = this._getHSL();
        this.hex = this._toHex();
    }
    public setHex(hex: string) {
        this._fromHex(hex);
        [this.hue, this.saturation, this.lightness] = this._getHSL();
    }
    public setHSL(hue: number, saturation: number, lightness: number) {
        const s = saturation / 100;
        const l = lightness / 100;

        let c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
        let x = c * (1 - Math.abs((hue / 60) % 2 - 1)); // Second largest component
        let m = l - c / 2; // Match to lightness

        let r = 0, g = 0, b = 0;

        if (0 <= hue && hue < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hue && hue < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hue && hue < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hue && hue < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }

        // Convert back to RGB space
        this.r = Math.round((r + m) * 255);
        this.g = Math.round((g + m) * 255);
        this.b = Math.round((b + m) * 255);

        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        const normalize = (value: number) => {
            const normalized = value / 255;
            return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        };

        r = normalize(this.r);
        g = normalize(this.g);
        b = normalize(this.b);

        this.luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        this.hex = this._toHex();
    }
    public text(str: string): string {
        return `\x1b[38;2;${this.r};${this.g};${this.b}m${str}\x1b[0m`;
    }
}

export function unreachableError(): never {
    throw new Error("This error will never be reached.");
}