import { Component} from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { AuthorRecords } from '../models/author-records.model';
import { MapRecords } from '../models/map-records.model';
import { RecordsService } from '../services/records-service/records.service';

@Component({
	selector: 'app-bot-records',
	templateUrl: './bot-records.component.html',
	styleUrls: ['./bot-records.component.sass']
})
export class BotRecordsComponent {
	allRecords: AuthorRecords[] = [];
	unknownAuthor = 'Unknown'

	constructor(recordService: RecordsService) {
		recordService.getTopBotRecords().subscribe((all_records) => {
			// Create a list of authors
			let sortedAuthors = Array.from(
				new Set(all_records.map((record) => {
					// Get the author
					let authorIndex = record[0].indexOf('__')
					if (authorIndex === -1) {
						record[0] = `${this.unknownAuthor}__` + record[0]
						return this.unknownAuthor
					}
					return record[0].substring(0, record[0].indexOf('__'))
				}))
			).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
			sortedAuthors.push(this.unknownAuthor)

			// Create a dictionary of authors to MapRecords
			let authorRecords = Object.fromEntries(sortedAuthors.map((author) => [author, [] as MapRecords[]]))

			// populate the mapRecords
			all_records.forEach((record) => {
				let i = record[0].indexOf('__')
				authorRecords[record[0].substring(0, i)].push({
					altNames: [],
					otherAuthors: [],
					map: record[0].substring(i + 2),
					records: [
						record[1] === null ? null : {
							player: record[1],
							recordId: -1,
							time: this.roundTime(parseFloat(record[2])),
							verification: ''
						}, record[3] === null ? null : {
							player: record[3],
							recordId: -1,
							time: this.roundTime(parseFloat(record[4])),
							verification: ''
						}, record[5] === null ? null : {
							player: record[5],
							recordId: -1,
							time: this.roundTime(parseFloat(record[6])),
							verification: ''
						}]
				})
			})

			// Build AuthorRecords object; also sort the maps
			let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'})
			sortedAuthors.forEach((author) => this.allRecords.push({
				author: author,
				maps: authorRecords[author].sort((a, b) => collator.compare(a.map, b.map))
			}))
		})
	}

	roundTime(time: number) {
		return Math.round(time * 100) / 100
	}
}
