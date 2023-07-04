import { Line, RightArc, LeftArc, GraphicElement, GraphicType } from './components/graphics.js'
import { Graph, Node, Edge } from './components/graph.js'
import { Vehicle } from './components/vehicle.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;
    
    const graph = new GraphBuilder().build()
    
    const vehicle = new Vehicle(1, {edgeID: 1, distance: 100}, graph)
    if(!vehicle.setPath([1, 2, 3, 4, 1, 6, 1, 2, 3, 5, 3, 4])) {
        console.log("setPath failed")
    }

    setInterval(() => {
        context.clearRect(0, 0, 1200, 800)
        vehicle.move()

        graph.draw(context)
        vehicle.draw(context)
    }, 10)
})


class GraphBuilder {
    nodes: Node[] = []
    edges: Edge[] = []

    build(): Graph {
        this.nodes = this.makeNodes(4)

        const edge1 = this.makeEdge(1, 4, 1, [
            [400, 400, GraphicType.Line], 
            [200, 400, GraphicType.LeftArc], 
            [200, 200, GraphicType.Line], 
            [400, 200]
        ])
        const edge2 = this.makeEdge(2, 1, 2, [
            [400, 200, GraphicType.Line], 
            [800, 200]
        ])
        const edge3 = this.makeEdge(3, 2, 3, [
            [800, 200, GraphicType.Line], 
            [1000, 200, GraphicType.RightArc], 
            [1000, 400, GraphicType.Line], 
            [800, 400]
        ])
        const edge4 = this.makeEdge(4, 3, 4, [
            [800, 400, GraphicType.Line], 
            [400, 400]
        ])
        const edge5 = this.makeEdge(5, 3, 2, [
            [800, 400, GraphicType.LeftArc], 
            [800, 200]
        ])
        const edge6 = this.makeEdge(6, 1, 4, [
            [400, 200, GraphicType.RightArc], 
            [400, 400]
        ])
        this.edges = [edge1, edge2, edge3, edge4, edge5, edge6]

        this.bindEdge()

        return new Graph(this.nodes, this.edges)
    }
    
    makeNodes(num: number): Node[] {
        const nodes: Node[] = []
        for(let i = 1; i <= num; i++) {
            nodes.push(new Node(i))
        }
        return nodes
    }

    makeEdge(id: number, prevNodeID: number, nextNodeID: number, points: number[][]): Edge {
        const graphicElements: GraphicElement[] = []
        for(let i = 0; i < points.length - 1; i++) {
            switch(points[i][2]) {
                case GraphicType.Line:
                    graphicElements.push(new Line({x: points[i][0], y: points[i][1]}, {x: points[i+1][0], y: points[i+1][1]}))
                    break
                case GraphicType.RightArc:
                    graphicElements.push(new RightArc({x: points[i][0], y: points[i][1]}, {x: points[i+1][0], y: points[i+1][1]}))
                    break
                case GraphicType.LeftArc:
                    graphicElements.push(new LeftArc({x: points[i][0], y: points[i][1]}, {x: points[i+1][0], y: points[i+1][1]}))
                    break

            }
        }
        const edge = new Edge(id, this.nodes[prevNodeID-1], this.nodes[nextNodeID-1], graphicElements)
        return edge
    }

    bindEdge() {
        for(const edge of this.edges) {
            edge.prevNode.addNextEdge(edge)
            edge.nextNode.addPrevEdge(edge)
        }
    }
}