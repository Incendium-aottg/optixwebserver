import { Component } from '@angular/core';
import { faChevronRight, faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-authors',
	templateUrl: './authors.component.html',
	styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent {
	faPlay = faPlay;
	faChevronRight = faChevronRight;
	faDownload = faDownload;
}
