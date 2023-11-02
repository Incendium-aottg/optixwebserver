import { Injectable } from '@angular/core';
import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';

@Injectable({
	providedIn: 'root'
})
export class MapService {

	private dynamodb: any;

	constructor() {
		// aws-sdk requires global to exist
		(window as any).global = window;
		var AWS = require('aws-sdk');
		AWS.config.update({region: 'us-east-1'});
		this.dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	}

	getMapsByAuthor() {
		const params = {
			TableName: 'Maps',
			Select: "COUNT",
		};
		const count = this.dynamodb.scan(params).promise();
		console.log(count)
		// console.log('5')
		// const command = new QueryCommand({
		// 	TableName: "Maps"
		// });
		// console.log('6')
		// const response = this.dynamodb.query(command);
		// console.log(response);
	}
}
