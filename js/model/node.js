class Node {
    constructor(x, y) {
        this.pos = new Vector(x, y)
        this.f = 0
        this.g = 0
        this.h = 0
        this.neighbors = []
        this.previous = undefined
        this.wall = false
    }

    setRandomWall(value) {
        if (Math.random() < value) {
            this.wall = true
        } else {
            this.wall = false
        }
    }

    addNeighbors(grid) {
        if (!this.wall) {
            this.neighbors = []
            let x = this.pos.x
            let y = this.pos.y
            this.addSquareNeighbors(grid, x, y)
            if (true) {
                this.addDiagonalNeighbors(grid, x, y)
            }
        }
    }

    addSquareNeighbors(grid, x, y) {
        if (x < grid[y].length - 1 && !grid[y][x + 1].wall) {
            // right neighbor
            this.neighbors.push(grid[y][x + 1])
        }
        if (x > 0  && !grid[y][x - 1].wall) {
            // left neighbor
            this.neighbors.push(grid[y][x - 1])
        }
        if (y < grid.length - 1  && !grid[y + 1][x].wall) {
            // down neighbor
            this.neighbors.push(grid[y + 1][x])
        }
        if (y > 0  && !grid[y - 1][x].wall) {
            // up neighbor
            this.neighbors.push(grid[y - 1][x])
        }
    }

    addDiagonalNeighbors(grid, x, y) {
        if (x < grid[y].length - 1 && y > 0 && !grid[y - 1][x + 1].wall && (!grid[y][x + 1].wall || !grid[y - 1][x].wall)) {
            // right up neighbor
            this.neighbors.push(grid[y - 1][x + 1])
        }
        if (x < grid[y].length - 1 && y < grid.length - 1 && !grid[y + 1][x + 1].wall && (!grid[y][x + 1].wall || !grid[y + 1][x].wall)) {
            // right down neighbor
            this.neighbors.push(grid[y + 1][x + 1])
        }
        if (x > 0 && y > 0 && !grid[y - 1][x - 1].wall && (!grid[y][x - 1].wall || !grid[y - 1][x].wall)) {
            // left up neighbor
            this.neighbors.push(grid[y - 1][x - 1])
        }
        if (x > 0 && y < grid.length - 1 && !grid[y + 1][x - 1].wall && (!grid[y][x - 1].wall || !grid[y + 1][x].wall)) {
            // left down neighbor
            this.neighbors.push(grid[y + 1][x - 1])
        }
    }
}