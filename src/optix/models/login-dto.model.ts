export class LoginDTO {
	public username!: string;
	public password!: string;
	public registrationToken: string | undefined;

	constructor(username: string, password: string, registrationToken: string) {
		this.username = username;
		this.password = password;
		this.registrationToken = registrationToken;
	}
}