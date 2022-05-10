class Controller {
    constructor(rows, cols) {
        this.map = new Map()
        this.algorithm = undefined
        this.view = new View()
        this.rows = rows
        this.cols = cols
    }

    initalise() {
        this.map.initalise(this.rows, this.cols)
        this.view.createGridOfDivs(this.rows, this.cols)
        this.addEventListeners()
        this.clearPath()
    }

    addEventListeners() {
        let squares = document.querySelectorAll('.row div')
        for (let square of squares) {
            square.addEventListener('mousedown', isMouseDown)
            square.addEventListener('mouseover', whatMouseDoes)
            square.addEventListener('mouseup', isMouseUp)
        }
        let algorithms = document.querySelectorAll('.algorithm')
        for (let algorithm of algorithms) {
            algorithm.addEventListener('click', changeVisualiseButton)
        }
    }

    pathFind() {
        if (this.algorithm) {
            this.map.resetAllNodeValues()
            this.clearPath()
            let startNode = this.map.startNode
            let endNode = this.map.endNode
            let pathSteps = this.algorithm.pathFind(startNode, endNode)
            this.showPathFinding(pathSteps)
        } else {
            alert("Please select an Algorthm")
        }
    }

    addRandomWalls() {
        let value = document.querySelector('#range').value
        this.map.addRandomWalls(value)
        this.map.setNeighbors()
        this.clearPath()
    }

    clearWalls() {
        this.map.clearWalls()
        this.map.setNeighbors()
        this.clearPath()
    }

    toggleWalls(pos) {
        this.map.editWall(pos, isWall)
        this.map.setLocalNeighbors(pos)
        this.map.updateLocalNeighbors(pos)
        this.clearPath()
    }

    moveStartNode(pos) {
        this.map.setStartNode(pos)
        this.clearPath()
    }
    
    moveEndNode(pos) {
        this.map.setEndNode(pos)
        this.clearPath()
    }

    clearPath() {
        this.view.displayStartGrid(this.map.grid, this.map.startNode, this.map.endNode)
    }

    changeAlgorthm(algorithmName) {
        if (algorithmName === "A*") {
            this.algorithm = new AStar()
        } else if (algorithmName === "Breadth") {
            this.algorithm = new BFS()
        } else if (algorithmName === "Dijkstra's") {
            // NOT IMPLEMENTED
            confirm.log("Dijkstra's algorthm selected")
            // this.algorithm = new Dijkstra()
        }
    }

    showPathFinding(pathSteps) {
        this.view.visualisePathFinding(pathSteps, this.map.startNode, this.map.endNode)
    }
}

function startPathfinding() {
    controller.pathFind()
}

function addRandomWalls() {
    controller.addRandomWalls()
}

function clearPath() {
    controller.clearPath()
}

function clearWalls() {
    controller.clearWalls()
}

function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1)
        }
    }
}

function updateValue(value) {
    let x = document.querySelector('output')
    x.innerText = value
}
