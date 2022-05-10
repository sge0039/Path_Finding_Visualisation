class BFS {
    constructor() {
        // n = number of nodes in the graph
        // g = adjacency list repersenting unweighted graph
        this.heuristic = new Heuristic()
    }

    pathFind(startNode, endNode){
        let openSet = [startNode]
        let closeSet = []
        let path = []
        let isSolution = false
        let allMyPathSteps = []

        while (openSet.length > 0) {
            let current = openSet[0]
            if (current === endNode) {
                isSolution = true
                path = this.currentPath(current)
                // allMyPathSteps.push(this.dataSets.setAllSets(openSet, closeSet, path))
                allMyPathSteps.push(this.getVisualData(openSet, closeSet, path))
                break
            }

            removeFromArray(openSet, current)
            closeSet.push(current)

            this.addNeighborsToOpenSet(openSet, closeSet, current)
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

    addNeighborsToOpenSet(openSet, closeSet, current) {
        let neighbors = current.neighbors
        for (let neighbor of neighbors) {
            if (!closeSet.includes(neighbor) && !openSet.includes(neighbor)) {
                openSet.push(neighbor)
                neighbor.previous = current
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