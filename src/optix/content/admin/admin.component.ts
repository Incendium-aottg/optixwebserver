import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import Choices from 'choices.js';
import { Role } from 'src/optix/enums/role.enum';
import { Player } from 'src/optix/models/player.model';
import { RecordsService } from 'src/optix/services/records-service/records.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements AfterViewInit {
	players: Player[] | null = null;
	playerDropdown: Choices | null = null;
	roleDropdown: Choices | null = null;

	constructor(private recordsService: RecordsService, private router: Router) {
		// Restrict access
		if (![Role.Admin, Role.Mod].includes(localStorage.getItem('role') as Role)) {
			this.router.navigate(['/404'])
		}
		this.recordsService.getPlayers().subscribe(res => {
			this.playerDropdown?.setChoices((res as Player[]).map(player => ({value: player.id, label: player.name!})))
		})
	}

	ngAfterViewInit(): void {
		this.playerDropdown = new Choices(document.querySelector('.player-select')!, {
			fuseOptions: {
				threshold: 0.1
			},
			itemSelectText: '',
			searchFields: ['label'],
			searchResultLimit: -1
		});
		this.roleDropdown = new Choices(document.querySelector('.role-select')!, {
			choices: Object.values(Role).map(role => ({value: role, label: role})),
			fuseOptions: {
				threshold: 0.1
			},
			itemSelectText: '',
			searchFields: ['label'],
			searchResultLimit: -1
		});
	}

	canGenerateToken(): boolean {
		return this.playerDropdown?.getValue() == undefined || this.roleDropdown?.getValue() == undefined
	}

	generateToken() {
		console.log(this.playerDropdown?.getValue())
	}
}
