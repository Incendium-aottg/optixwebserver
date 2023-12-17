import { Component} from '@angular/core';
import { RecordsService } from '../services/records-service/records.service';
import { AuthorRecords } from '../models/author-records.model';
import { take } from 'rxjs';

@Component({
	selector: 'app-world-records',
	templateUrl: './world-records.component.html',
	styleUrls: ['./world-records.component.sass'],
})
export class WorldRecordsComponent {
	allRecords: AuthorRecords[] = [];

	constructor(recordService: RecordsService) {
		recordService.getTopWorldRecords().pipe(take(1)).subscribe((allRecords) => {
			console.log(this.allRecords)
			this.allRecords = allRecords
		})
	}
}
