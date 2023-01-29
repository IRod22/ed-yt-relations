import { Injectable } from '@angular/core'
import { Maybe, None, Just, map, getDefault } from './utils/maybe'
import { Direction, OneWay, BothWays, getFrom, getTo } from './utils/direction'
import { groupBy } from './utils/groupBy'

export type Node = {
  id: string,
  name: string,
  description: string,
  twitter: Maybe<string>,
  yt: Maybe<{ id: string, short: boolean}>,
  website: Maybe<string>,
}

export type Edge = {
  name: Direction<string>,
  node1: string,
  node2: string,
}

export type Relation = { relation: string, related: {id: string, name: string}[] }

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  nodes: Node[] = [
    {
      id: 'yt',
      name: 'YouTube',
      description: 'a platform for sharing and streaming videos.',
      twitter: Just('YouTube'),
      yt: None(),
      website: Just('https://youtube.com'),
    },
    {
      id: 'crashcourse',
      name: 'Crash Course',
      description: 'a show and YouTube channel for educational content used by highschool and college teachers and students.',
      twitter: Just('TheCrashCourse'),
      yt: Just({id: 'crashcourse', short: true}),
      website: Just('https://thecrashcourse.com/'),
    },
    {
      id: 'rll',
      name: 'RealLifeLore',
      description: 'a channel where several topics are explained by using economics, history, geography, science, and "extreme speculation."',
      twitter: Just('RealLifeLore22'),
      yt: Just({id: 'RealLifeLore', short: true}),
      website: None(),
    },
    {
      id: 'wendoverpro',
      name: 'Wendover Production',
      description: 'is about economics and aviation and explains several topics using economics, history, geography, and science.',
      twitter: Just('wendoverpro'),
      yt: Just({id:'Wendoverproductions', short: true}),
      website: Just('https://www.wendoverproductions.com/'),
    },
    {
      id: 'polymatter',
      name: 'PolyMatter',
      description: 'is about explaining several topics using economics, history, geography, and science.',
      twitter: Just('Polymatters'),
      yt: Just({id:'UCgNg3vwj3xt7QOrcIDaHdFg', short: false}),
      website: Just('https://www.polymatter.yt'),
    },
  ]
  edges: Edge[] = [
    {
      node1: 'crashcourse',
      name: OneWay('hosted on', 'channels'),
      node2: 'yt',
    },
    {
      node1: 'rll',
      name: OneWay('hosted on', 'channels'),
      node2: 'yt',
    },
    {
      node1: 'wendoverpro',
      name: OneWay('hosted on', 'channels'),
      node2: 'yt',
    },
    {
      node1: 'polymatter',
      name: OneWay('hosted on', 'channels'),
      node2: 'yt',
    },
  ]
  constructor() { }
  getNode(id:string): Maybe<Node> {
    for (const node of this.nodes) {
      if (node.id == id) return Just(node)
    }
    return None()
  }
  getRelations(id: string) {
    return getDefault(map(this.getNode(id), () => {
      return groupBy({
        array: this.edges.filter(e => (e.node1 == id) || (e.node2 == id)),
        selectCol: e => e.node1 == id ? e.node2 : e.node1,
        groupCol: e => e.node1 == id ? getFrom(e.name) : getTo(e.name),
        eq: (a, b) => a == b,
        group: (key, values) => {
          const nodes = values.map(v => this.getNode(v))
          return {
            relation: key,
            related: nodes.filter(n => getDefault(map(n, () => true), false)).map(n => n({
              just({id, name}) {
                return {id: `#${id}`, name}
              },
              none() {
                return {id:'', name:''}
              },
            })),
          }
        },
      })
    }), [])
  }
}
