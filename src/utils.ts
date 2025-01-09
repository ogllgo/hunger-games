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
    public r: number;
    public g: number;
    public b: number;
    public a: number | undefined = 1;
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
    public toHex(): string {
        const rHex = this.r.toString(16).padStart(2, "0");
        const gHex = this.g.toString(16).padStart(2, "0");
        const bHex = this.b.toString(16).padStart(2, "0");
        const aHex = Math.round((this.a ?? 1) * 255).toString(16).padStart(2, "0");
        return `#${rHex}${gHex}${bHex}${aHex}`;
    }
}

export function unreachableError(): never {
    throw new Error("This error will never be reached.");
}