import { Component, Input } from '@angular/core';
import { Node, RelationsService } from '../relations.service'
import { getDefault, map } from '../utils/maybe'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  @Input() profile!: Node
  constructor() {}
  get website() {
    return getDefault(this.profile.website, '')
  }
  get twitter() {
    return {
      username: getDefault(map(this.profile.twitter, userName => `@${userName}`), ''),
      url: getDefault(map(this.profile.twitter, userName => `https://twitter.com/${userName}`), ''),
    }
  }
  get yt() {
    return getDefault(map(this.profile.yt, ({ id, short }) => `https://www.youtube.com/${short ? 'c' : 'channel'}/${id}`), '')
  }
  get name() {
    return this.profile.name
  }
  get id() {
    return this.profile.id
  }
  get description() {
    return this.profile.description
  }
}
