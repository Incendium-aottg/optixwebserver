import { Component, Input } from '@angular/core';
import { Run } from 'src/optix/models/run.model';

@Component({
	selector: 'app-map-record-table',
	templateUrl: './map-record-table.component.html',
	styleUrls: ['./map-record-table.component.sass']
})
export class MapRecordTableComponent {
	@Input() runs: Run[] | undefined = [];

	public formatTime(time: any) {
		return parseFloat(time).toFixed(2)
	}

	getLink(record: Run) {
		return this.isValidLink(record.verification) ? record.verification : null
	}

	getToolTip(record: Run) {
		return this.isValidLink(record.verification) ? null : record.verification
	}

	isValidLink(verification: string) {
		return verification.includes('http')
	}
}
