import { Record } from './record.model'

export class MapRecords {
	public altNames!: string[];
	public map!: string;
	public records!: (Record | null)[];
}