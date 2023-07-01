import { Line/*, Arc, ArcAngle */} from './components/graphics.js'
import { Graph, Edge } from './components/graph.js'
import { Vehicle } from './components/vehicle.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const edge1 = new Edge(1)
    edge1.graphicElements = [
        new Line({x: 600, y: 400}, {x: 200, y: 400}),
        new Line({x: 200, y: 400}, {x: 200, y: 100}),
        new Line({x: 200, y: 100}, {x: 600, y: 100})
    ]
    const edge2 = new Edge(2)
    edge2.graphicElements = [
        new Line({x: 600, y: 100}, {x: 600, y: 400})
    ]
    const edge3 = new Edge(3)
    edge3.graphicElements = [
        new Line({x: 600, y: 100}, {x: 1000, y: 100}),
        new Line({x: 1000, y: 100}, {x: 1000, y: 400}),
        new Line({x: 1000, y: 400}, {x: 600, y: 400})
    ]
    const graph = new Graph([], [edge1, edge2, edge3])
    
    const vehicle = new Vehicle(1, {edgeID: 1, distance: 100}, graph)

    setInterval(() => {
        context.clearRect(0, 0, 1200, 800)
        vehicle.move()

        graph.draw(context)
        vehicle.draw(context)
    }, 100)
})

