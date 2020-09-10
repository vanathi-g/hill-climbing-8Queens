/* SOLUTION DISPLAY PAGE */

var start = []
var steps = []

/* Disable-queen-place is a hidden input value that is available only in solutions page.
Ensures that the user cannot place queens while solution is being displayed */
if( $("#disable-queen-place").length )
{
  const solnSteps = $("#disable-queen-place").attr("value").toString().split(",");
  for(let i=0; i<8; i++)
  {
    start.push(parseInt(solnSteps[i]));
    $('#'+start[i]).html('<i class="fas fa-chess-queen fa-4x queen-icon"></i>');
  }

  for(let i=8; i<solnSteps.length - 1; i++)
    steps.push(parseInt(solnSteps[i]));
}

// Utility function to refresh board back to start state
function refreshBoard(){
  for(let i=0; i<64; i++)
    $('#'+i).empty();

  for(let i=0; i<start.length; i++)
    $('#'+start[i]).html('<i class="fas fa-chess-queen fa-4x queen-icon"></i>');
}

/* DISPLAYING SOLUTIONS */

// Function that displays the solution sequence
function displaySolution(){
  let board = [];
  for(let i=0; i<start.length; i++)
    board.push(start[i]);

  for(let i=0; i<steps.length; i++)
  {
    setTimeout(function(){
      const row = Math.floor(steps[i]/8);
      const prev = board[row];
      id = steps[i];
      console.log(prev+" "+id);
      $("#"+prev).empty();
      $('#'+id).html('<i class="fas fa-chess-queen fa-4x queen-icon"></i>');
      board[row] = id;
    }, 1000*i);
  }
}

// Display solutions when this button is clicked.
$('#play-btn').click(function(){
  refreshBoard();
  setTimeout(displaySolution, 1500); // Small delay after board is refreshed for user to preview start state again
});
