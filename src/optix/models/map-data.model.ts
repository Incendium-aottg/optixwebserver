import { MapType } from "@angular/compiler";
import { Author } from "./author.model";
import { Run } from "./run.model";

export class MapData {
	public authors!: Author[];
	public botId!: number;
	public botRating!: number;
	public botRuns!: Run[];
	public id!: number;
	public mapType!: MapType;
	public name!: string;
	public notes!: string;
	public script!: string;
	public wrRuns!: Run[];
}