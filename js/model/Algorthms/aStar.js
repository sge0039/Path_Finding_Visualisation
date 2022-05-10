class AStar {
    constructor() {
        this.heuristic = new Heuristic()
        // this.dataSets = new VisualDataSet()
    }

    pathFind(startNode, endNode) {
        let openSet = [startNode]
        let closeSet = []
        let path = []
        let isSolution = false
        let allMyPathSteps = []

        while (openSet.length > 0) {
            let current = openSet[this.getWinner(openSet)]
            if (current === endNode) {
                isSolution = true
                path = this.currentPath(current)
                // allMyPathSteps.push(this.dataSets.setAllSets(openSet, closeSet, path))
                allMyPathSteps.push(this.getVisualData(openSet, closeSet, path))
                break
            }

            removeFromArray(openSet, current)
            closeSet.push(current)

            this.updateNeighbors(openSet, closeSet, current, endNode)
            path = this.currentPath(current)
            // allMyPathSteps.push(this.dataSets.setAllSets(openSet, closeSet, path))
            allMyPathSteps.push(this.getVisualData(openSet, closeSet, path))
        }
        if (isSolution) {
            console.log('Path Find!!!')
            // alert('Path Find!!!')
        } else {
            console.log('NO Solution!!!')
            // alert('No Solution!!!')
        }
        return allMyPathSteps
    }

    getWinner(openSet) {
        let winner = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i
            }
        }
        return winner
    }

    updateNeighbors(openSet, closeSet, current, endNode) {
        let neighbors = current.neighbors
        for (let neighbor of neighbors) {
            if (!closeSet.includes(neighbor)) {
                // let tempG = current.g + 1
                // divide g to increase weighting near endNode but doesn't find best/good path
                let tempG = (current.g + this.heuristic.euclideanDis(current, neighbor))
                let newPath = false

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG
                        newPath = true
                    }
                } else {
                    neighbor.g = tempG
                    openSet.push(neighbor)
                    newPath = true
                }
                if (newPath) {
                    // muiltple h to increase weighting near endNode but doesn't find best/good path
                    neighbor.h = this.heuristic.taxiCab(neighbor, endNode)
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.previous = current
                }
            }
        }
    }

    currentPath(currentNode) {
        let path = []
        path.push(currentNode)
        while (currentNode.previous) {
            path.push(currentNode.previous)
            currentNode = currentNode.previous
        }
        return path
    }

    getVisualData(openSet, closeSet, path) {
        let sliceCloseSets = closeSet.slice(0, closeSet.length)
        let sliceyOpenSets = openSet.slice(0, openSet.length)
        let slicePaths = path.slice(0, path.length)
        return new VisualDataSet(sliceCloseSets, sliceyOpenSets, slicePaths)
    }
}
