import { Grass } from "./grass";
import { Undef } from "./undef";
import { ShallowWater, DeepWater } from "./water";
import { Sand } from "./sand";
import { Void } from "./void";

export { Grass, Undef, ShallowWater, DeepWater, Sand, Void };
export type Tile = Grass | Undef | ShallowWater | DeepWater | Sand | Void;