import { Run } from './run.model'

export class MapRecords {
	public altNames!: string[];
	public otherAuthors!: string[];
	public map!: string;
	public records!: (Run | null)[];
}