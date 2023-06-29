interface Point {
    x: number,
    y: number
}

export abstract class GraphicElement {
    startPoint: Point
    endPoint: Point
    length: number = 0

    constructor(startPoint: Point, endPoint: Point) {
        this.startPoint = startPoint
        this.endPoint = endPoint
    }

    abstract draw(context: CanvasRenderingContext2D): void
    // abstract getPoint(distance: number): Point | false
}

export class Line extends GraphicElement {

    constructor(startPoint: Point, endPoint: Point) {
        super(startPoint, endPoint)
        this.length = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
        console.log(`length = ${this.length}`)
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.moveTo(this.startPoint.x, this.startPoint.y)
        context.lineTo(this.endPoint.x, this.endPoint.y)
        context.stroke()
    }

    // getPoint(distance: number): Point | false {
    //     return false;
    // }
}


// class Arc {
//     center: Point = [0, 0]
//     radius: number = 0
// }