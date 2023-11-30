import { Component} from '@angular/core';
import { RecordsService } from '../services/records-service/records.service';
import { AuthorRecords } from '../models/author-records.model';

@Component({
	selector: 'app-world-records',
	templateUrl: './world-records.component.html',
	styleUrls: ['./world-records.component.sass'],
})
export class WorldRecordsComponent {
	allRecords: AuthorRecords[] = [];

	constructor(recordService: RecordsService) {
		recordService.getTopWorldRecords().subscribe((allRecords) => {
			this.allRecords = allRecords
		})
	}
}
