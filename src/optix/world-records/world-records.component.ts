import { Component } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-world-records',
	templateUrl: './world-records.component.html',
	styleUrls: ['./world-records.component.sass']
})
export class WorldRecordsComponent {
	faPlay = faPlay;
}
