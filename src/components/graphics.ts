export interface Point {
    x: number,
    y: number
}

export abstract class GraphicElement {
    type: GraphicType
    startPoint: Point
    endPoint: Point
    length: number = 0

    constructor(type: GraphicType, startPoint: Point, endPoint: Point) {
        this.type = type
        this.startPoint = startPoint
        this.endPoint = endPoint
    }

    abstract draw(context: CanvasRenderingContext2D): void
    abstract getPoint(distance: number): Point | false
}

export class Line extends GraphicElement {

    constructor(startPoint: Point, endPoint: Point) {
        super(GraphicType.Line, startPoint, endPoint)
        this.length = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.moveTo(this.startPoint.x, this.startPoint.y)
        context.lineTo(this.endPoint.x, this.endPoint.y)
        context.stroke()
    }

    getPoint(distance: number): Point | false {
        if(distance === 0) {
            return Object.assign({}, this.startPoint)
        } else if(distance === this.length) {
            return Object.assign({}, this.endPoint)
        } else {
            const ratio = distance / this.length
            if(ratio <= 1) {
                return {
                    x: this.startPoint.x + ((this.endPoint.x - this.startPoint.x) * ratio),
                    y: this.startPoint.y + ((this.endPoint.y - this.startPoint.y) * ratio)
                }
            } else {
                return false;
            }
        }
    }
}

export enum GraphicType {
    Line,
    LeftArc,
    RightArc,
    UpArc,
    DownArc
}

export class Arc extends GraphicElement {
    center: Point
    radius: number

    constructor(type: GraphicType, startPoint: Point, endPoint: Point) {
        super(type, startPoint, endPoint)
        const diameter = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
        this.length = Math.floor(diameter * 3.14 / 2)
        this.radius = Math.floor(diameter / 2)
        this.center = {x: Math.floor(startPoint.x + endPoint.x) / 2, y: Math.floor(startPoint.y + endPoint.y) / 2}
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()

        let startAngle = 0, endAngle = 0
        switch(this.type) {
            case GraphicType.RightArc:
                startAngle = 1.5 * Math.PI
                endAngle = 0.5  * Math.PI
                break
            case GraphicType.LeftArc:
                startAngle = 0.5 * Math.PI
                endAngle = 1.5  * Math.PI
                break
        }
        context.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)
        context.stroke()
    }

    getPoint(/*distance: number*/): Point | false {
        return false
    }
}