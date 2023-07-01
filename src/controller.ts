import { Line/*, Arc, ArcAngle */} from './components/graphics.js'
import { Graph, Node, Edge } from './components/graph.js'
import { Vehicle } from './components/vehicle.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const node1 = new Node(1)
    const node2 = new Node(2)

    const edge1 = new Edge(1, node2, node1, [
        new Line({x: 600, y: 400}, {x: 200, y: 400}),
        new Line({x: 200, y: 400}, {x: 200, y: 100}),
        new Line({x: 200, y: 100}, {x: 600, y: 100})
    ])
    const edge2 = new Edge(2, node1, node2, [
        new Line({x: 600, y: 100}, {x: 600, y: 400})
    ])
    const edge3 = new Edge(3, node1, node2, [
        new Line({x: 600, y: 100}, {x: 1000, y: 100}),
        new Line({x: 1000, y: 100}, {x: 1000, y: 400}),
        new Line({x: 1000, y: 400}, {x: 600, y: 400})
    ])

    node1.setEdges([edge1], [edge2, edge3])
    node2.setEdges([edge2, edge3], [edge1])

    const graph = new Graph([node1, node2], [edge1, edge2, edge3])
    
    const vehicle = new Vehicle(1, {edgeID: 1, distance: 100}, graph)
    vehicle.setPath([1, 2, 1, 3, 1]);

    setInterval(() => {
        context.clearRect(0, 0, 1200, 800)
        vehicle.move()

        graph.draw(context)
        vehicle.draw(context)
    }, 100)
})

