import { GraphicElement, Line, Arc, ArcAngle } from './components/graphics.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const graphicElements: GraphicElement[] = []
    graphicElements.push(new Line({x: 200, y: 100}, {x: 1000, y: 100}))
    graphicElements.push(new Arc({x: 1000, y: 100}, {x: 1000, y: 400}, ArcAngle.Right))
    graphicElements.push(new Line({x: 1000, y: 400}, {x: 200, y: 400}))
    graphicElements.push(new Arc({x: 200, y: 400}, {x: 200, y: 100}, ArcAngle.Left))

    for(const graphicElement of graphicElements) {
        graphicElement.draw(context)
    }
})

