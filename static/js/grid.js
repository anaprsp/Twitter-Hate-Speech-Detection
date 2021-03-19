// function that builds a grid in the "container"
const CellStateEnum = Object.freeze({"unvisited":1, "visited":2});
const cellStateColor = new Map();
cellStateColor.set(CellStateEnum.visited, "#23395B");
cellStateColor.set(CellStateEnum.unvisited, "white");

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
            cellElements += `<td id="${cellId}" class="unvisited"></td>`;
        }
        gridState.push(rowState);
        childrenElements += `<tr id="row${row}">${cellElements}</tr>`;
    }
    $("#board-body").append(childrenElements);

    for (let row = 0; row < x; row++) {
        for (let column = 0; column < y; column++) {
            const cellId = `#${row}-${column}`;
            $(cellId).click(function() {
                gridState[row][column] = CellStateEnum.visited;
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
    createGrid(20, 20);

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