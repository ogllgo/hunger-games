import Canvas from "canvas";

import { Vector2 } from "../utils";

import { WORLD_SIZE } from "../Constants/tiles";
import { decider, noise, noiseReturn } from "../Constants/generation";
import { CENTER_BIAS, BASE_CHANCE } from "../Constants/items";

import { Perlin } from "../noise";

import * as Tiles from "../Tiles/export";
import { TileType } from "../Tiles/class";

import * as Items from "../Items/export";

export class World {
    private tiles: Tiles.Tile[][] = [];
    private items: Items.Item[][] = [];
    private noise: Perlin;
    constructor(seed: number) {
        this.noise = new Perlin(seed);
        this.generateTiles();
        this.addItems();
    }
    private generateTiles(): void {
        for (let x = 0; x < WORLD_SIZE.x; x++) {
            let tileStrip: Tiles.Tile[] = [];
            for (let y = 0; y < WORLD_SIZE.y; y++) {
                // generate the world in a circle - don't fill up the whole space
                if ((x - WORLD_SIZE.x / 2) ** 2 + (y - WORLD_SIZE.y / 2) ** 2 > (WORLD_SIZE.x / 2)**2) {
                    tileStrip.push(new Tiles.Void(x, y));
                    continue;
                }
                const out: noiseReturn = noise(new Vector2(x, y), this.noise);
                tileStrip.push(decider(out, new Vector2(x, y)));
            }
            this.tiles.push(tileStrip);
        }
    }
    private addItems(): void {
        const centerX = WORLD_SIZE.x / 2;
        const centerY = WORLD_SIZE.y / 2;
        const maxDist = (WORLD_SIZE.x / 2) ** 2;
        for (let x = 0; x < WORLD_SIZE.x; x++) {
            let itemStrip: Items.Item[] = [];
            for (let y = 0; y < WORLD_SIZE.y; y++) {
                if (this.getTile(x, y).type === TileType.void) {
                    continue;
                }

                const distToCenter = (x - centerX) ** 2 + (y - centerY) ** 2;
                const normalizedDist = 1 - distToCenter / maxDist;
                const probability = normalizedDist ** CENTER_BIAS;
                if (Math.random() < probability + BASE_CHANCE) {
                    itemStrip.push(new Items.Undef(x, y));
                }
            }
            this.items.push(itemStrip);
        }
    }
    public getTile(...args: [number, number]): Tiles.Tile;
    public getTile(...args: [Vector2]): Tiles.Tile;
    public getTile(...args: [Vector2 | number, number?]): Tiles.Tile {
        if (args.length === 1 && args[0] instanceof Vector2) {
            const index: Vector2 = args[0];
            return this.tiles[index.y][index.x];
        } else if (args.length === 2 && typeof args[0] === 'number' && args[1] !== undefined) {
            return this.tiles[args[0]][args[1]];
        } else {
            throw new Error("Invalid args for `world.getTile` - passed Vector2 and number.");
        }
    }
    public setTile(...args: [number, Tiles.Tile]): void;
    public setTile(...args: [Vector2, Tiles.Tile]): void;
    public setTile(...args: [Vector2 | number, Tiles.Tile]): void {
        const index: Vector2 | number = args[0];
        if (typeof index === "number") {
            this.tiles[index % WORLD_SIZE.x][Math.floor(index / WORLD_SIZE.y)] = args[1];
            return;
        }
        this.tiles[index.y][index.x] = args[1];
    }
    public getItem(...args: [number, number]): Items.Item;
    public getItem(...args: [Vector2]): Items.Item;
    public getItem(...args: [Vector2 | number, number?]): Items.Item {
        if (args.length === 1 && args[0] instanceof Vector2) {
            const index: Vector2 = args[0];
            return this.items[index.y][index.x];
        } else if (args.length === 2 && typeof args[0] === 'number' && args[1] !== undefined) {
            return this.items[args[0]][args[1]];
        } else {
            throw new Error("Invalid args for `world.getItem` - passed Vector2 and number.");
        }
    }
    public setItem(...args: [number, Items.Item]): void;
    public setItem(...args: [Vector2, Items.Item]): void;
    public setItem(...args: [Vector2 | number, Items.Item]): void {
        const index: Vector2 | number = args[0];
        if (typeof index === "number") {
            this.items[index % WORLD_SIZE.x][Math.floor(index / WORLD_SIZE.y)] = args[1];
            return;
        }
        this.items[index.y][index.x] = args[1];
    }
    public render(ctx: Canvas.CanvasRenderingContext2D): void {
        for (let x = 0; x < WORLD_SIZE.x; x++) {
            for (let y = 0; y < WORLD_SIZE.y; y++) {
                this.tiles[x][y].render(ctx);
            }
        }
        for (let x = 0; x < WORLD_SIZE.x; x++) {
            for (let y = 0; y < WORLD_SIZE.y; y++) {
                if (this.items[x][y]) {
                    this.items[x][y].render(ctx);
                }
            }
        }
    }
}