import { Line/*, Arc, ArcAngle */, GraphicElement} from './components/graphics.js'
import { Graph, Node, Edge } from './components/graph.js'
import { Vehicle } from './components/vehicle.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const node1 = new Node(1)
    const node2 = new Node(2)

    const edge1 = makeEdge(1, node2, node1, [
        [600, 400], [200, 400], [200, 100], [600, 100]
    ])
    const edge2 = makeEdge(2, node1, node2, [
        [600, 100], [600, 400]
    ])
    const edge3 = makeEdge(3, node1, node2, [
        [600, 100], [1000, 100], [1000, 400], [600, 400]
    ])

    node1.setEdges([edge1], [edge2, edge3])
    node2.setEdges([edge2, edge3], [edge1])

    const graph = new Graph([node1, node2], [edge1, edge2, edge3])
    
    const vehicle = new Vehicle(1, {edgeID: 1, distance: 100}, graph)
    if(!vehicle.setPath([1, 2, 1, 3, 1])) {
        console.log("setPath failed")
    }

    setInterval(() => {
        context.clearRect(0, 0, 1200, 800)
        vehicle.move()

        graph.draw(context)
        vehicle.draw(context)
    }, 100)
})

function makeEdge(id: number, prevNode: Node, nextNode: Node, points: number[][]): Edge {
    const graphicElements: GraphicElement[] = []
    for(let i = 0; i < points.length - 1; i++) {
        graphicElements.push(new Line({x: points[i][0], y: points[i][1]}, {x: points[i+1][0], y: points[i+1][1]}))
    }
    const edge = new Edge(id, prevNode, nextNode, graphicElements)
    return edge
}

