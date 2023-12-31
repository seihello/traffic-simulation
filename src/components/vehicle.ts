import { Graph, Edge } from './graph.js';

export enum MoveResult {
    Error,
    Moving,
    Transferred,
    CompletedPath,
}

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

    static SIZE: number = 24
    static LINE_WIDTH: number = 2
    static COLOR: string = "#21f400"

    constructor(id: number, initialPosition: Position, graph: Graph) {
        this.id = id
        this.graph = graph
        this.position = initialPosition
        this.speed = 3
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
        if(path[0] !== this.position.edgeID) {
            return false
        }
        this.path = path
        this.pathIndex = 0
        return true
    }

    move(): MoveResult {
        if(this.position.edgeID !== this.path[this.pathIndex]) {           
            return MoveResult.Error
        }
        const currentEdge = this.graph.getEdge(this.position.edgeID)
        if(this.shouldTransferEdge(currentEdge.length)) {
            if(this.canEnterNextEdge(currentEdge)) {
                this.transferEdge(currentEdge)
                return MoveResult.Transferred
            } else {
                this.pathIndex = -1
                this.path = []
                return MoveResult.CompletedPath
            }
        } else {
            this.position.distance += this.speed
            return MoveResult.Moving
        }
    }

    canEnterNextEdge(currentEdge: Edge): boolean {
        if(this.pathIndex + 1 > this.path.length) {            
            return false
        }

        for(const nextEdge of currentEdge.nextNode.nextEdges) {
            if(nextEdge.id === this.path[this.pathIndex + 1]) {
                return true
            }
        }
        return false
    }

    shouldTransferEdge(currentEdgeLength: number): boolean {
        return this.position.distance + this.speed > currentEdgeLength
    }

    transferEdge(currentEdge: Edge): void {
        const nextEdgeDistance = this.position.distance + this.speed - currentEdge.length
        this.pathIndex++
        this.position.edgeID = this.path[this.pathIndex]
        this.position.distance = nextEdgeDistance
    }

}