export class Graph {
    nodes: Node[] = []
    edges: Edge[] = []
    constructor() {
    }
}

export class Node {
    id: number
    prevEdges: Edge[] = []
    nextEdges: Edge[] = []
    constructor(id: number) {
        this.id = id
    }
}

export class Edge {
    id: number
    prevNode?: Node
    nextNode?: Node
    constructor(id: number) {
        this.id = id
    }
}