import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Choices from 'choices.js';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Role } from 'src/optix/enums/role.enum';
import { RunType } from 'src/optix/enums/run-type.enum';
import { MapScript } from 'src/optix/models/map-script.model';
import { Player } from 'src/optix/models/player.model';
import { AdminService } from 'src/optix/services/admin-service/admin.service';
import { MapService } from 'src/optix/services/map-service/map.service';
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
	recordPlayerDropdown: Choices | null = null;
	recordMapDropdown: Choices | null = null;
	public worldRecordForm: FormGroup = new FormGroup({
		player: new FormControl('', [Validators.required]),
		map: new FormControl('', [Validators.required]),
		time: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+[.]\d{1,2}$/)]),
		verification: new FormControl('', [Validators.required]),
	});
	addingWR = false;
	generatingToken = false;
	registrationToken = '';

	constructor(
		private adminService: AdminService,
		private mapService: MapService,
		private recordsService: RecordsService,
		private router: Router,
		private toastr: ToastrService
	) {
		// Restrict access
		if (![Role.Admin, Role.Mod].includes(localStorage.getItem('role') as Role)) {
			this.router.navigate(['/404'])
		}
		this.recordsService.getPlayers().subscribe(res => {
			this.playerDropdown?.setChoices((res as Player[]).map(player => ({value: player.id, label: player.name!})))
			this.recordPlayerDropdown?.setChoices((res as Player[]).map(player => ({value: player.id, label: player.name!})))
		})
		this.mapService.getMaps().subscribe(res => {
			this.recordMapDropdown?.setChoices((res as MapScript[]).map(map => ({
				value: map._id,
				label: this.getMapLabel(map),
				customProperties: {
					authors: map.authorNames
				}
			})))
		})
	}

	ngAfterViewInit(): void {
		this.playerDropdown = new Choices(document.querySelector('.token-player-select')!, {
			fuseOptions: {
				threshold: 0.1
			},
			itemSelectText: '',
			searchFields: ['label'],
			searchResultLimit: -1
		});
		this.roleDropdown = new Choices(document.querySelector('.token-role-select')!, {
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
		this.recordPlayerDropdown = new Choices(document.querySelector('.record-player-select')!, {
			fuseOptions: {
				threshold: 0.1
			},
			itemSelectText: '',
			searchFields: ['label'],
			searchResultLimit: -1
		});
		this.recordMapDropdown = new Choices(document.querySelector('.record-map-select')!, {
			fuseOptions: {
				threshold: 0.5
			},
			itemSelectText: '',
			searchFields: ['label', 'value', 'customProperties.authors'],
			searchResultLimit: -1
		});

		// Update form control value
		this.recordPlayerDropdown.passedElement.element.addEventListener(
			'choice',
			(event) => {
				this.worldRecordForm.get('player')?.setValue((event.target as HTMLInputElement).value)
			}
		)
		this.recordMapDropdown.passedElement.element.addEventListener(
			'choice',
			(event) => {
				this.worldRecordForm.get('map')?.setValue((event.target as HTMLInputElement).value)
			}
		)

		// Allow the dropdowns to be touched
		this.recordPlayerDropdown.passedElement.element.addEventListener(
			'hideDropdown',
			(event) => {
				this.worldRecordForm.get('player')?.markAsTouched()
			}
		)
		this.recordMapDropdown.passedElement.element.addEventListener(
			'hideDropdown',
			(event) => {
				this.worldRecordForm.get('map')?.markAsTouched()
			}
		)
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

	getFormError() {
		if (this.worldRecordForm.get('player')?.errors && this.worldRecordForm.get('player')?.touched) {
			return "Player cannot be empty"
		}
		if (this.worldRecordForm.get('map')?.errors && this.worldRecordForm.get('map')?.touched) {
			return "Map cannot be empty"
		}
		if (this.worldRecordForm.get('time')?.errors && this.worldRecordForm.get('time')?.touched) {
			if (this.worldRecordForm.get('time')?.hasError('required')) {
				return "Time cannot be empty"
			}
			return "Time must be of the form 123.45"
		}
		if (this.worldRecordForm.get('verification')?.errors && this.worldRecordForm.get('verification')?.touched) {
			return "Verification cannot be empty"
		}
		return "";
	}

	getMapLabel(map: MapScript) {
		if (map.mapSubtitle) {
			return `${map.name} [${map.mapSubtitle}]`
		}
		return map.name
	}

	isAdmin() {
		return [Role.Admin].includes(localStorage.getItem('role') as Role)
	}

	onSubmit(formDirective: FormGroupDirective) {
		this.addingWR = true;

		this.recordsService.addRecord({
			_id: -1,
			player: this.worldRecordForm.get('player')?.value,
			map: this.worldRecordForm.get('map')?.value,
			time: this.worldRecordForm.get('time')?.value,
			verification: this.worldRecordForm.get('verification')?.value,
			recordType: RunType.World,
		}).pipe(take(1)).subscribe({
			next: () => {
				this.toastr.success("Record added successfully!");
				this.addingWR = false;
				this.worldRecordForm.reset();
				formDirective.resetForm();
			},
			   error: (err) => {
				this.toastr.error(err.error);
				this.addingWR = false;
			}
		});
	}
}
