import { Injectable } from '@angular/core'
import { Maybe, None, Just } from './utils/maybe'

export type Node = {
  id: string,
  name: string,
  description: string,
  twitter: Maybe<string>,
  yt: Maybe<string>,
  website: Maybe<string>,
}

export type Edge = {
  id: string,
  name: string,
  bidirectional?: boolean,
  node1: string,
  node2: string,
}

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  nodes: Node[] = []
  edges: Edge[] = []
  constructor() { }
}
