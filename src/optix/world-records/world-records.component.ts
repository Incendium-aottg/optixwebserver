import { Component, ViewEncapsulation} from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Record } from '../models/record.model';
import { RecordsService } from '../services/records-service/records.service';
import { AuthorRecords } from '../models/author-records.model';
import { MapRecords } from '../models/map-records.model';

@Component({
	selector: 'app-world-records',
	templateUrl: './world-records.component.html',
	styleUrls: ['./world-records.component.sass'],
	encapsulation: ViewEncapsulation.None,
})
export class WorldRecordsComponent {
	faPlay = faPlay;
	full_records_list: AuthorRecords[] = [];
	filtered_records_list: AuthorRecords[] = [];
	searchString: string = "";

	constructor(private recordService: RecordsService) {
		recordService.getTopWorldRecords().subscribe((all_records) => {
			this.full_records_list = all_records
			this.filtered_records_list = this.full_records_list
		})
	}

	filterRecords() {
		if (this.searchString.trim() == "") {
			this.filtered_records_list = this.full_records_list
		} else {
			this.filtered_records_list = []
			const normalizedSearchString = this.searchString.trim().toLowerCase()
			this.full_records_list.forEach((authorRecords) => {
				if (authorRecords.author.toLowerCase().includes(normalizedSearchString)) {
					this.filtered_records_list.push(authorRecords)
				} else {
					let filtered_map_records: MapRecords[] = []
					authorRecords.maps.forEach((mapRecord) => {
						if (mapRecord.records[0]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.records[1]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.records[2]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.map.toLowerCase().includes(normalizedSearchString) || 
							mapRecord.altNames.some((name) => name.toLowerCase().includes(normalizedSearchString))
						) {
							filtered_map_records.push(mapRecord)
						}
					})
					if (filtered_map_records.length !== 0) {
						this.filtered_records_list.push({
							author: authorRecords.author,
							maps: filtered_map_records
						})
					}
				}
			})
		}
	}

	getLink(record: Record) {
		return this.isValidLink(record.verification) ? record.verification : null
	}

	getToolTip(record: Record) {
		return this.isValidLink(record.verification) ? null : record.verification
	}

	getRecordText(record: Record) {
		if (record) {
			return record.player + " - " + record.time
		}
		return ""
	}

	isValidLink(verification: string) {
		return verification.includes('http')
	}
}
