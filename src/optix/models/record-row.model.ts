import { Record } from './record.model'

/**
 * For displaying records on the world records page
 */
export class RecordRow {
	public altNames!: string[];
	public author!: string;
	public isEven!: boolean;
	public map!: string;
	public records!: (Record | null)[];
}