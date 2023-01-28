import { Injectable } from '@angular/core'
import { Maybe, None, Just } from './utils/maybe'
import { Direction, OneWay, BothWays } from './utils/direction'

export type Node = {
  id: string,
  name: string,
  description: string,
  twitter: Maybe<string>,
  yt: Maybe<string>,
  website: Maybe<string>,
}

export type Edge = {
  name: Direction<string>,
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
