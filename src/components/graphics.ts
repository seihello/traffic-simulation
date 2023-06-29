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

export enum ArcAngle {
    Left,
    Right,
    Up,
    Down
}

export class Arc extends GraphicElement {
    center: Point
    radius: number
    angle: ArcAngle

    constructor(startPoint: Point, endPoint: Point, angle: ArcAngle) {
        super(startPoint, endPoint)
        this.angle = angle
        const diameter = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
        this.length = Math.floor(diameter * 3.14 / 2)
        this.radius = Math.floor(diameter / 2)
        this.center = {x: Math.floor(startPoint.x + endPoint.x) / 2, y: Math.floor(startPoint.y + endPoint.y) / 2}
        console.log(`length = ${this.length}`)
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()

        let startAngle = 0, endAngle = 0
        switch(this.angle) {
            case ArcAngle.Right:
                console.log("right")
                startAngle = 1.5 * Math.PI
                endAngle = 0.5  * Math.PI
                break
            case ArcAngle.Left:
                console.log("left")
                startAngle = 0.5 * Math.PI
                endAngle = 1.5  * Math.PI
                break
        }
        context.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)
        context.stroke()
    }
}