import { RunType } from "../enums/run-type.enum";

export class Run {
	public player!: string;
	public _id!: number;
	public map?: number;
	public time!: number;
	public recordType!: RunType;
	public verification!: string;
}