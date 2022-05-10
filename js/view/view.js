class View {
    createGridOfDivs(rowCount, colCount) {
        let w = Math.floor((window.innerWidth-8-(8*2)) / colCount)-2
        // let w = 100
        // let h = Math.floor(window.innerHeight/rowCount)-2
        let grid = document.getElementById('grid')
        for (let y = 0; y < rowCount; y++) {
            this.addElement('div', grid, y, 'row', 0, 0)
            let rows = document.querySelectorAll('.row')
            let lastRow = rows[rows.length - 1]
            for (let x = 0; x < colCount; x++) {
                let id = x + ',' + y
                this.addElement('div', lastRow, id, '', w)
            }
        }
    }

    addElement(ele, targetEle, id, cssClass, width) {
        let element = document.createElement(ele)
        element.setAttribute("id", id)
        if (cssClass != '') {
            element.classList.add(cssClass)
        }
        if (width > 0) {
            element.style.width = width + 'px'
            element.style.height = width + 'px'
            // element.style.width = '25px'
            // element.style.height = '25px'
        }
        targetEle.appendChild(element)
    }

    updateValue(value) {
        let x = document.querySelector('output')
        x.innerText = value
    }

    displayStartGrid(grid, startNode, endNode) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let div = document.getElementById(x + ',' + y)
                if (grid[y][x].wall) {
                    div.style.backgroundColor = "#000000"
                } else {
                    div.style.backgroundColor = "#ffffff"
                }
            }
        }
        let x = startNode.pos.x
        let y = startNode.pos.y
        let start = document.getElementById(x + ',' + y)
        start.style.backgroundColor = "#008000"
        x = endNode.pos.x
        y = endNode.pos.y
        let end = document.getElementById(x + ',' + y)
        end.style.backgroundColor = "#ff0000"
    }

    visualisePathFinding(pathSteps, startNode, endNode) {
        let mill = 20
        for (let [i, obj] of pathSteps.entries()) {
            setTimeout(function () {
                for (let elm of obj.openSet) {
                    let x = elm.pos.x
                    let y = elm.pos.y
                    let div = document.getElementById(x + ',' + y)
                    div.style.backgroundColor = "#afeeee"
                }
                for (let elm of obj.closeSet) {
                    let x = elm.pos.x
                    let y = elm.pos.y
                    let div = document.getElementById(x + ',' + y)
                    div.style.backgroundColor = "#98fb98"
                }
                for (let elm of obj.path) {
                    let x = elm.pos.x
                    let y = elm.pos.y
                    let div = document.getElementById(x + ',' + y)
                    div.style.backgroundColor = "#ffff00"
                }
                let x = startNode.pos.x
                let y = startNode.pos.y
                let start = document.getElementById(x + ',' + y)
                start.style.backgroundColor = "#008000"

                x = endNode.pos.x
                y = endNode.pos.y
                let end = document.getElementById(x + ',' + y)
                end.style.backgroundColor = "#ff0000"
            }, mill * i)
        }
    }
}

// Colour References
// White        =   #ffffff
// Black        =   #000000
// Green        =   #008000
// Yellow       =   #ffff00
// Red          =   #ff0000
// Light Blue   =   #afeeee
// Light Green  =   #98fb98