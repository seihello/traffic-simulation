import { GraphicElement, Line/*, Arc, ArcAngle */} from './components/graphics.js'
import { Graph, Edge } from './components/graph.js'
import { Vehicle } from './components/vehicle.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const graphicElements: GraphicElement[] = []
    // graphicElements.push(new Line({x: 200, y: 100}, {x: 1000, y: 100}))
    // graphicElements.push(new Arc({x: 1000, y: 100}, {x: 1000, y: 400}, ArcAngle.Right))
    // graphicElements.push(new Line({x: 1000, y: 400}, {x: 200, y: 400}))
    // graphicElements.push(new Arc({x: 200, y: 400}, {x: 200, y: 100}, ArcAngle.Left))

    graphicElements.push(new Line({x: 200, y: 100}, {x: 1000, y: 100}))
    graphicElements.push(new Line({x: 1000, y: 100}, {x: 1000, y: 400}))
    graphicElements.push(new Line({x: 1000, y: 400}, {x: 200, y: 400}))
    graphicElements.push(new Line({x: 200, y: 400}, {x: 200, y: 100}))
    const edge = new Edge(1)
    edge.graphicElements = [...graphicElements]
    const graph = new Graph([], [edge])
    
    for(const graphicElement of graphicElements) {
        graphicElement.draw(context)
    }
    
    const vehicle = new Vehicle(1, {edgeID: 1, distance: 100}, graph)
    vehicle.draw(context)
})

