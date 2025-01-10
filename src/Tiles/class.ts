import { Colour, Vector2 } from "../utils";
import Canvas from 'canvas';
import { TILE_SIZE, TILE_PADDING, WORLD_PADDING } from '../Constants/tiles';

export enum TileType { // all the different tiles
    undef,
    grass,
    sand,
    shallow_water,
    deep_water,
    void
}

export abstract class AbstractTile {
    public x: number;
    public y: number;
    public type: TileType;
    public speedModifier: number;
    public foraging: Vector2 = new Vector2(1, 1);
    public waterGathering: Vector2 = new Vector2(1, 1);
    public colour: Colour;
    constructor(x: number, y: number, type: TileType, speedModifier: number, foraging: Vector2, waterGathering: Vector2, colour: Colour) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.speedModifier = speedModifier;
        this.foraging = foraging;
        this.waterGathering = waterGathering;
        this.colour = colour;
    }

    public render(ctx: Canvas.CanvasRenderingContext2D): void {
        ctx.fillStyle = this.colour.getHex();
        ctx.fillRect(this.x * (TILE_SIZE.x + TILE_PADDING.x) + WORLD_PADDING.x, this.y * (TILE_SIZE.y + TILE_PADDING.y) + WORLD_PADDING.x, TILE_SIZE.x, TILE_SIZE.y);
    }
}