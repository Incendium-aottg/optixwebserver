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
	searchString: string = "";

	constructor(private recordService: RecordsService) {
		recordService.getTopWorldRecords().subscribe((all_records) => {
			// Unpack the records
			let isEven = true
			all_records.forEach((authorRecords) => {
				authorRecords.maps.forEach((mapRecords) => {
					this.full_records_list.push({
						altNames: mapRecords.altNames,
						author: authorRecords.author,
						isEven: isEven,
						map: mapRecords.map,
						records: mapRecords.records,
					})
				})
				isEven = !isEven
			})
			this.filtered_records_list = this.full_records_list
		})
	}


	filterRecords() {
		if (this.searchString.trim() == "") {
			this.filtered_records_list = this.full_records_list
		} else {
			this.filtered_records_list = []
			const normalizedSearchString = this.searchString.trim().toLowerCase()
			let isEven = false
			let current_author = ''
			this.full_records_list.forEach((record) => {
				if (record.author.toLowerCase().includes(normalizedSearchString) || 
					record.records[0]?.player.toLowerCase().includes(normalizedSearchString) ||
					record.records[1]?.player.toLowerCase().includes(normalizedSearchString) ||
					record.records[2]?.player.toLowerCase().includes(normalizedSearchString) ||
					record.map.toLowerCase().includes(normalizedSearchString) || 
					record.altNames.some((name) => name.toLowerCase().includes(normalizedSearchString))
				) {
					if (current_author != record.author) {
						current_author = record.author
						isEven = !isEven
					}
					record.isEven = isEven
					this.filtered_records_list.push(record)
				}
			})
		}
	}

	getRecordText(record: Record) {
		if (record) {
			return record.player + " - " + record.time
		}
		return ""
	}
}
