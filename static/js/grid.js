// function that builds a grid in the "container"
function createGrid(x, y) {
    let childrenElements = '';
    for (let row = 0; row < x; row++) {
        let cellElements = '';
        for (let column = 0; column < y; column++) {
            cellElements += `<td id="${row}-${column}" class="unvisited"></td>`;
            // $( "#target" ).click(function() {
            //     alert( "Handler for .click() called." );
            //   });
        };
        childrenElements += `<tr id="row${row}">${cellElements}</tr>`;
    };
    
    $("#board-body").append(childrenElements);
    // $(".grid").width(25);
    // $(".grid").height(25);
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