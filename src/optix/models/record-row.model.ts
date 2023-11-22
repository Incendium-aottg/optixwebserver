import { Record } from './record.model'

/**
 * For displaying records on the world records page
 */
export class RecordRow {
	public author!: string;
	public map!: string;
	public records!: Record[];
}