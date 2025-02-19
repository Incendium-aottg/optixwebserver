import { Role } from "../enums/role.enum";

export class Player {
	public id!: number;
	public name?: string;
	public role?: Role;
}