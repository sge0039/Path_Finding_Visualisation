class Map {
    constructor() {
        this.startNode = undefined
        this.endNode = undefined
        this.grid = []
    }

    initalise(rowCount, colCount){
        this.grid = this.createGrid(rowCount, colCount)

        let startPos = new Vector(2, Math.floor(rowCount / 2))
        this.setStartNode(startPos)

        let endPos = new Vector(colCount - 3, Math.floor(rowCount / 2))
        this.setEndNode(endPos)

        this.setNeighbors()
    }

    createGrid(rowCount, colCount) {
        let tempArr = []
        for (let y = 0; y < rowCount; y++) {
            tempArr.push([])
            for (let x = 0; x < colCount; x++) {
                tempArr[y].push(new Node(x, y))
            }
        }
        return tempArr
    }

    setStartNode(pos) {
        this.startNode = this.grid[pos.y][pos.x]
        this.startNode.wall = false
    }

    setEndNode(pos) {
        this.endNode = this.grid[pos.y][pos.x]
        this.endNode.wall = false
    }

    setNeighbors() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x].addNeighbors(this.grid)
            }
        }
    }

    setLocalNeighbors(pos){
        this.grid[pos.y][pos.x].addNeighbors(this.grid)
    }


    updateLocalNeighbors(pos){
        for (let neighbor of this.grid[pos.y][pos.x].neighbors) {
            neighbor.addNeighbors(this.grid)
        }
    }

    resetAllNodeValues(){
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x].f = 0
                this.grid[y][x].g = 0
                this.grid[y][x].h = 0
                this.grid[y][x].previous = undefined
            }
        }
    }

    editWall(pos, isWall) {
        this.grid[pos.y][pos.x].wall = isWall
        this.startNode.wall = false
        this.endNode.wall = false
    }

    addRandomWalls(value) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x].setRandomWall(value)
            }
        }
        this.startNode.wall = false
        this.endNode.wall = false
    }

    clearWalls() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x].wall = false
            }
        }
    }
}