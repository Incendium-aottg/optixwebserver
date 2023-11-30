import { Component } from '@angular/core';
import { PlayerRecordsCount } from '../models/player-records-count.model';
import { RecordsService } from '../services/records-service/records.service';

@Component({
	selector: 'app-scoreboard',
	templateUrl: './scoreboard.component.html',
	styleUrls: ['./scoreboard.component.sass']
})
export class ScoreboardComponent {

	medals = ['gold', 'silver', 'bronze'];
	gold_records: PlayerRecordsCount[] = [];
	silver_records: PlayerRecordsCount[] = [];
	bronze_records: PlayerRecordsCount[] = [];

  	constructor(recordService: RecordsService) {
		recordService.getTopRecordsByPlayers().subscribe((records) => {
			let all_records: PlayerRecordsCount[] = []
			Object.entries(records).forEach(
				([playerName, recordCount]) => all_records.push({
					player: playerName,
					recordCount: recordCount
				})
			);
			this.gold_records = [...all_records]
				.filter((record) => record.recordCount[0] !== 0)
				.sort((a, b) => a.recordCount[0] > b.recordCount[0] ? -1 : 1)
			this.silver_records = [...all_records]
				.filter((record) => record.recordCount[1] !== 0)
				.sort((a, b) => a.recordCount[1] > b.recordCount[1] ? -1 : 1)
			this.bronze_records = [...all_records]
				.filter((record) => record.recordCount[2] !== 0)
				.sort((a, b) => a.recordCount[2] > b.recordCount[2] ? -1 : 1)
		})
	}

	getScoreboardClass(medal: number, playerRecords: PlayerRecordsCount, allRecords: PlayerRecordsCount[]) {
		if (playerRecords.recordCount[medal] === allRecords[0].recordCount[medal]) {
			return `first-${this.medals[medal]}-row`
		} else if (playerRecords.recordCount[medal] === allRecords[1].recordCount[medal]) {
			return `second-${this.medals[medal]}-row`
		} else if (playerRecords.recordCount[medal] === allRecords[2].recordCount[medal]) {
			return `third-${this.medals[medal]}-row`
		}
		return ''
	}
}
