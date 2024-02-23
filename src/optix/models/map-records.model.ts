import { Run } from './run.model'

export class MapRecords {
	public altNames!: string[];
	public id!: number;
	public map!: string;
	public otherAuthors!: string[];
	public records!: (Run | null)[];
	public recordType!: string;
}