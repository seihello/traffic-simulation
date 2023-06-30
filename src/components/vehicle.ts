import { Graph } from './graph.js';

interface Position {
    edgeID: number
    distance: number
}
export class Vehicle {
    graph: Graph
    position: Position
    speed: number

    constructor(graph: Graph, initialPosition: Position) {
        this.graph = graph
        this.position = initialPosition
        this.speed = 0
    }

    move(): void {
        
    }
}