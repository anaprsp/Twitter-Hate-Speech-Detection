// function that builds a grid in the "container"
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
            if (cellId == "9-2") {
                cellElements += `<td id="${cellId}" class="start"><i class='fas fa-angle-right fa-lg'></i></td>`;
            }
            else if (cellId == "9-27"){
                cellElements += `<td id="${cellId}" class="target"><i class="fas fa-bullseye fa-lg"></i></td>`;
            }
            else{
                cellElements += `<td id="${cellId}" class="unvisited"></td>`;
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
                gridState[row][column] = CellStateEnum.wall;
                renderCellState(row, column);
              });
        }
    }
    renderGridState();
};

// create a 16x16 grid when the page loads
// creates a hover effect that changes the color of a square to black when the mouse passes over it, leaving a (pixel) trail through the grid
// allows the click of a button to prompt the user to create a new grid
$(document).ready(function() {
    createGrid(20, 30);

    // $(".grid").mouseover(function() {
    //     $(this).css("background-color", "black");
    //     });

    // $(".newGrid").click(function() {
    //     refreshGrid();

    //     $(".grid").mouseover(function() {
    //     $(this).css("background-color", "black");
    //     });
    // });
});





// $('.board-body').click(function() {
//     $(this).toggleClass('unvisited');
//     $(this).toggleClass('wall');
// });