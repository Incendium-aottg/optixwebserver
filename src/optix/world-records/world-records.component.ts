import { ChangeDetectorRef, Component } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Record } from '../models/record.model';
import { RecordRow } from '../models/record-row.model';
import { RecordsService } from '../services/records-service/records.service';

@Component({
	selector: 'app-world-records',
	templateUrl: './world-records.component.html',
	styleUrls: ['./world-records.component.sass']
})
export class WorldRecordsComponent {
	faPlay = faPlay;
	full_records_list: RecordRow[] = [];
	filtered_records_list: RecordRow[] = [];

	constructor(private cdf: ChangeDetectorRef, private recordService: RecordsService) {
		recordService.getTopWorldRecords().subscribe((all_records) => {
			// Unpack the records
			all_records.forEach((authorRecords) => {
				authorRecords.maps.forEach((mapRecords) => {
					this.full_records_list.push({
						author: authorRecords.author,
						map: mapRecords.map,
						records: mapRecords.records,
					})
				})
			})
			this.filtered_records_list = this.full_records_list
			cdf.detectChanges()
		})
	}

	getRecordText(record: Record) {
		if (record) {
			return record.player + " - " + record.time
		}
		return ""
	}
}
