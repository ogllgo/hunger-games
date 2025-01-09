import sdl from '@kmamal/sdl';
import Canvas from 'canvas';
import { WORLD_SIZE, TILE_SIZE, TILE_PADDING, WORLD_PADDING } from './Constants/tiles';
import { World } from './World/class';

export function sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const window = sdl.video.createWindow({ 
	resizable: true, 
	width: WORLD_PADDING.x * 2 + WORLD_SIZE.x * (TILE_SIZE.x + TILE_PADDING.x),
	height: WORLD_PADDING.y * 2 + WORLD_SIZE.y * (TILE_SIZE.y + TILE_PADDING.y) 
});
const { pixelWidth: width, pixelHeight: height } = window;

let canvas: Canvas.Canvas = Canvas.createCanvas(width, height);
let ctx: Canvas.CanvasRenderingContext2D = canvas.getContext('2d');
let world: World = new World(Math.random());
const redraw = () => {
	const { pixelWidth: width, pixelHeight: height } = window;
	world = new World(Math.random());
	world.render(ctx);
	const buffer = canvas.toBuffer('raw');
	window.render(width, height, width * 4, 'bgra32', buffer);
};

window.on('expose', redraw);

window.on('resize', ({ pixelWidth: width, pixelHeight: height }) => {
	canvas = Canvas.createCanvas(width, height);
	ctx = canvas.getContext('2d');
	redraw();
});