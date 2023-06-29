import { GraphicElement, Line } from './components/graphics.js'

$(() => {
    const context: CanvasRenderingContext2D = $("#app").children("canvas")[0].getContext("2d")!;

    const graphicElements: GraphicElement[] = []
    graphicElements.push(new Line({x: 100, y: 100}, {x: 200, y: 200}))
    graphicElements.push(new Line({x: 200, y: 200}, {x: 1000, y: 400}))
    graphicElements.push(new Line({x: 1000, y: 400}, {x: 100, y: 100}))

    for(const graphicElement of graphicElements) {
        graphicElement.draw(context)
    }
})

