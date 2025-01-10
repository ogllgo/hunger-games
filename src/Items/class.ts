import { Colour, Vector2 } from "../utils";
import Canvas from 'canvas';
import { ITEM_SIZE, WORLD_PADDING, GRID_SIZE } from '../Constants/tiles';
export enum ItemType { // all the different items
    undef
}

export abstract class AbstractItem {
    public x: number;
    public y: number;
    public type: ItemType;
    public speedModifier: number;
    public foraging: Vector2 = new Vector2(1, 1);
    public waterGathering: Vector2 = new Vector2(1, 1);
    public colour: Colour;
    constructor(x: number, y: number, type: ItemType, speedModifier: number, foraging: Vector2, waterGathering: Vector2, colour: Colour) {
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
        const x = WORLD_PADDING.x + (this.x + 0.5) * GRID_SIZE;
        const y = WORLD_PADDING.y + (this.y + 0.5) * GRID_SIZE;
        ctx.beginPath();
        ctx.arc(x, y, ITEM_SIZE.x / 2, 0, Math.PI * 2); 
        ctx.fill();
    }
}