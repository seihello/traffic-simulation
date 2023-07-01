import { Graph } from './graph.js';

export interface Position {
    edgeID: number
    distance: number
}

export class Vehicle {
    id: number
    graph: Graph
    position: Position
    speed: number
    path: number[]  // list of Edge ID
    pathIndex: number

    static SIZE: number = 20
    static LINE_WIDTH: number = 2
    static COLOR: string = "#21f400"

    constructor(id: number, initialPosition: Position, graph: Graph) {
        this.id = id
        this.graph = graph
        this.position = initialPosition
        this.speed = 10
        this.path = []
        this.pathIndex = -1
    }

    draw(context: CanvasRenderingContext2D): void {
        const currentEdge = this.graph.getEdge(this.position.edgeID)
        const point = currentEdge.getPoint(this.position.distance)
        if(point !== false) {
            context.beginPath()
            context.lineWidth = Vehicle.LINE_WIDTH
            context.arc(point.x, point.y, Vehicle.SIZE/2, 0, 2 * Math.PI)
            context.fillStyle = Vehicle.COLOR
            context.fill()
            context.stroke()
        }
    }

    setPath(path: number[]) : boolean {
        if(path.length === 0) {
            return false
        }
        if(path[0] === this.position.edgeID) {
            return false
        }
        this.path = path
        return true
    }

    move(): void {
        this.position.distance += this.speed
        
        // const currentEdge = this.graph.getEdge(this.position.edgeID)
        // if(currentEdge) {

        // }
    }
}