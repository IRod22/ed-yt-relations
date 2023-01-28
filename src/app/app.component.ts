import { Component } from '@angular/core';
import { RelationsService } from './relations.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  profiles = this.relationsService.nodes
  constructor(public relationsService: RelationsService) { }
}
