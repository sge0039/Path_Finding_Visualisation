class Heuristic {
    taxiCab(a, b) {
        // manhattan distance
        return Math.abs(a.pos.x - b.pos.x) + Math.abs(a.pos.y - b.pos.y)
    }

    euclideanDis(a, b){
        return Math.sqrt(Math.pow(Math.abs(a.pos.x - b.pos.x), 2) + Math.pow(Math.abs(a.pos.y - b.pos.y), 2))
    }
}
