import { Component, Input, OnChanges} from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Run } from '../../../models/run.model';
import { AuthorRecords } from '../../../models/author-records.model';
import { MapRecords } from '../../../models/map-records.model';
import { RunType } from 'src/optix/enums/run-type.enum';

@Component({
	selector: 'app-record-table-page',
	templateUrl: './record-table-page.component.html',
	styleUrls: ['./record-table-page.component.sass']
})
export class RecordTablePageComponent implements OnChanges {
	faPlay = faPlay;
	@Input() fullRecordsList: AuthorRecords[] = [];
	@Input() tableName = '';
	filteredRecordsList: AuthorRecords[] = [];
	searchString = '';

	constructor() {
		this.filteredRecordsList = this.fullRecordsList
	}

	ngOnChanges() {
		this.filteredRecordsList = this.fullRecordsList
	}

	filterRecords() {
		if (this.searchString.trim() == "") {
			this.filteredRecordsList = this.fullRecordsList
		} else {
			this.filteredRecordsList = []
			const normalizedSearchString = this.searchString.trim().toLowerCase()
			this.fullRecordsList.forEach((authorRecords) => {
				if (authorRecords.author.toLowerCase().includes(normalizedSearchString)) {
					this.filteredRecordsList.push(authorRecords)
				} else {
					let filtered_map_records: MapRecords[] = []
					authorRecords.maps.forEach((mapRecord) => {
						if (mapRecord.records[0]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.records[1]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.records[2]?.player.toLowerCase().includes(normalizedSearchString) ||
							mapRecord.map.toLowerCase().includes(normalizedSearchString) || 
							mapRecord.otherAuthors.some((name) => name.toLowerCase().includes(normalizedSearchString)) ||
							mapRecord.altNames.some((name) => name.toLowerCase().includes(normalizedSearchString))
						) {
							filtered_map_records.push(mapRecord)
						}
					})
					if (filtered_map_records.length !== 0) {
						this.filteredRecordsList.push({
							author: authorRecords.author,
							maps: filtered_map_records
						})
					}
				}
			})
		}
	}

	public formatTime(time: any) {
		return parseFloat(time).toFixed(2)
	}

	getLink(record: Run) {
		return this.isValidLink(record.verification) ? record.verification : null
	}

	getMapId(record: MapRecords) {
		switch(record.records[0]?.recordType) {
			case RunType.Bot:
				return -record.id;
			case RunType.World:
				return record.id;
			default:
				return record.id;
		}
	}

	getToolTip(record: Run) {
		return this.isValidLink(record.verification) ? null : record.verification
	}

	getRecordText(record: Run) {
		if (record) {
			return record.player + " - " + record.time
		}
		return ""
	}

	isValidLink(verification: string) {
		return verification.includes('http')
	}
}
