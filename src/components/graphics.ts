export interface Point {
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
    abstract getPoint(distance: number): Point | false
}

export class Line extends GraphicElement {

    constructor(startPoint: Point, endPoint: Point) {
        super(startPoint, endPoint)
        this.length = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.lineWidth = 24
        context.strokeStyle = "#8e8e8e"
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

export abstract class Arc extends GraphicElement {
    center: Point
    radius: number

    constructor(startPoint: Point, endPoint: Point) {
        super(startPoint, endPoint)
        const diameter = Math.floor(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
        this.length = Math.floor(diameter * 3.14 / 2)
        this.radius = Math.floor(diameter / 2)
        this.center = {x: Math.floor(startPoint.x + endPoint.x) / 2, y: Math.floor(startPoint.y + endPoint.y) / 2}
    }
}

export class LeftArc extends Arc {
    constructor(startPoint: Point, endPoint: Point) {
        super(startPoint, endPoint)
    }

    draw(context: CanvasRenderingContext2D): void {
        const startAngle = 0.5 * Math.PI
        const endAngle = 1.5  * Math.PI
        context.beginPath()
        context.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)
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
                    x: this.center.x + this.radius * Math.cos(Math.PI * ratio + Math.PI / 2),
                    y: this.center.y + this.radius * Math.sin(Math.PI * ratio + Math.PI / 2)
                }
            } else {
                return false;
            }
        }
    }
}

export class RightArc extends Arc {
    constructor(startPoint: Point, endPoint: Point) {
        super(startPoint, endPoint)
    }

    draw(context: CanvasRenderingContext2D): void {
        const startAngle = 1.5 * Math.PI
        const endAngle = 0.5  * Math.PI
        context.beginPath()
        context.arc(this.center.x, this.center.y, this.radius, startAngle, endAngle)
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
                    x: this.center.x + this.radius * Math.cos(Math.PI * ratio - Math.PI / 2),
                    y: this.center.y + this.radius * Math.sin(Math.PI * ratio - Math.PI / 2)
                }
            } else {
                return false;
            }
        }
    }
}

