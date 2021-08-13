
const CellStateEnum = Object.freeze({"unvisited":1, "wall":2, "visited":3, "shortestPath":4});
const cellStateColor = new Map();
cellStateColor.set(CellStateEnum.wall, "#23395B");
cellStateColor.set(CellStateEnum.unvisited, "white");
cellStateColor.set(CellStateEnum.visited, "#41B3A3");
cellStateColor.set(CellStateEnum.shortestPath, "#FF6600");

const gridState = [];
function renderCellState(x,y){
    const cellId = `#${x}-${y}`;
    $(cellId).css("background-color", cellStateColor.get(gridState[x][y])); 
}

function renderGridState(){
    for (let row = 0; row < gridState.length; row++) {
        for (let column = 0; column < gridState[0].length; column++) {
            renderCellState(x,y);
        }
    }
}

function createGrid(x, y) {
    let childrenElements = '';
    for (let row = 0; row < x; row++) {
        let rowState = [];
        let cellElements = '';
        for (let column = 0; column < y; column++) {
            rowState.push(CellStateEnum.unvisited);
            const cellId = `${row}-${column}`;
            if (cellId == `${x/2}-${2}`) {
                cellElements += `<td id="${cellId}" class="start"><i class='fas fa-angle-right fa-lg'></i></td>`;
            }
            else if (cellId == `${x/2}-${y - 3}`){
                cellElements += `<td id="${cellId}" class="target"><i class="fas fa-bullseye fa-lg"></i></td>`;
            }
            else{
                cellElements += `<td id="${cellId}" class="unvisited" style="background-color: white;"></td>`;
            }
        }
        gridState.push(rowState);
        childrenElements += `<tr id="row${row}">${cellElements}</tr>`;
    }

    $("#board-body").append(childrenElements);

    for (let row = 0; row < x; row++) {
        for (let column = 0; column < y; column++) {
            const cellId = `#${row}-${column}`;
            $(cellId).click(function() {
                if ($(cellId).hasClass( "wall" )){
                    gridState[row][column] = CellStateEnum.unvisited;
                    $(cellId).addClass('unvisited').removeClass('wall');;
                }
                else if ($(cellId).hasClass( "unvisited" )){
                    gridState[row][column] = CellStateEnum.wall;
                    $(cellId).addClass('wall').removeClass('unvisited');
                }
                renderCellState(row, column);
            });
        }
    }
    renderGridState();
};

$(document).ready(function() {
    createGrid(20, 40);
});
