import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import Choices from 'choices.js';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/optix/enums/role.enum';
import { Player } from 'src/optix/models/player.model';
import { AdminService } from 'src/optix/services/admin-service/admin.service';
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

	generatingToken = false;
	registrationToken = '';

	constructor(private adminService: AdminService, private recordsService: RecordsService, private router: Router, private toastr: ToastrService) {
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
			choices: [
				{label: Role.User, value: Role.User},
				{label: Role.Mod, value: Role.Mod}
			],
			fuseOptions: {
				threshold: 0.1
			},
			itemSelectText: '',
			searchFields: ['label'],
			searchResultLimit: -1,
			shouldSort: false
		});
	}

	canGenerateToken(): boolean {
		return this.generatingToken == false && this.playerDropdown?.getValue() != undefined && this.roleDropdown?.getValue() != undefined
	}

	generateToken() {
		this.generatingToken = true;
		this.adminService.generateToken({
			id: +this.playerDropdown?.getValue(true)!,
			role: this.roleDropdown?.getValue(true) as Role
		}).subscribe({
			next: (response) => {
				this.registrationToken = response
				this.toastr.success("Token successfully generated!");
				this.generatingToken = false;
			},
			error: (err) => {
				this.toastr.error(err.error);
				this.generatingToken = false;
			}
		});
	}
}
