function isMouseDown(square) {
    let xy = square.target.id.split(',').map(Number)
    let pos = new Vector(xy[0], xy[1])
    if (controller.map.grid[pos.y][pos.x] === controller.map.startNode) {
        mouseDownStart = true
    } else if (controller.map.grid[pos.y][pos.x] === controller.map.endNode) {
        mouseDownEnd = true
    } else if (controller.map.grid[pos.y][pos.x].wall) {
        isWall = false
        mouseDownWall = true
    } else if (!controller.map.grid[pos.y][pos.x].wall) {
        isWall = true
        mouseDownWall = true
    }
    whatMouseDoes(square)
}

function whatMouseDoes(square) {
    let xy = square.target.id.split(',').map(Number)
    let pos = new Vector(xy[0], xy[1])
    if (mouseDownStart) {
        controller.moveStartNode(pos)
    }
    if (mouseDownEnd) {
        controller.moveEndNode(pos)
    }
    if (mouseDownWall) {
        controller.toggleWalls(pos)
    }
}

function isMouseUp(square) {
    mouseDownStart = false
    mouseDownEnd = false
    mouseDownWall = false
}

function changeVisualiseButton(event) {
    let strings = event.target.text.split(" ")
    let x = document.querySelector('#visualiseAlgorithm')
    x.value = "Visualise " + strings[0]
    controller.changeAlgorthm(strings[0])
}