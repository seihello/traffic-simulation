import { GraphicElement, Point } from './graphics.js';
export class Graph {
    nodes: Node[] = []
    edges: Edge[] = []

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes
        this.edges = edges
    }

    getEdge(edgeID: number): Edge {
        return this.edges[edgeID-1]
    }

    draw(context: CanvasRenderingContext2D): void {
        for(const edge of this.edges) {
            edge.draw(context)
        }
    }
}

export class Node {
    id: number
    prevEdges: Edge[] = []
    nextEdges: Edge[] = []
    constructor(id: number) {
        this.id = id
    }

    // setEdges(prevEdges: Edge[], nextEdges: Edge[]) {
    //     this.prevEdges = prevEdges
    //     this.nextEdges = nextEdges
    // }

    addPrevEdge(prevEdge: Edge): void {
        this.prevEdges.push(prevEdge)
    }

    addNextEdge(nextEdge: Edge): void {
        this.nextEdges.push(nextEdge)
    }
}

export class Edge {
    id: number
    length: number
    prevNode: Node
    nextNode: Node
    graphicElements: GraphicElement[] = []

    constructor(id: number, prevNode: Node, nextNode: Node, graphicElements: GraphicElement[]) {
        this.id = id
        this.prevNode = prevNode
        this.nextNode = nextNode
        this.graphicElements = graphicElements
        this.length = 0
        for(const graphicElement of this.graphicElements) {
            this.length += graphicElement.length
        }
    }

    getPoint(distance: number): Point | false {
        let sumLength = 0
        let graphicElementDistance = 0

        for(const graphicElement of this.graphicElements) {
            sumLength += graphicElement.length
            if(sumLength >= distance) {
                let currentGraphicElement: GraphicElement = graphicElement
                graphicElementDistance = distance - (sumLength - currentGraphicElement.length)

                return currentGraphicElement.getPoint(graphicElementDistance)
            }
        }

        return false
    }

    draw(context: CanvasRenderingContext2D): void {
        for(const graphicElement of this.graphicElements) {
            graphicElement.draw(context)
        }
    }
}