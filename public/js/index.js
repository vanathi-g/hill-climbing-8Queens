/* TO RENDER THE CHESSBOARD */
var color;
var queens = [];

$('#read-less-btn').hide();

var icon_str = '<i class="fas fa-chess-queen queen-icon"></i>';

// Renders the chessboard
for (var i=0; i < 8; i++){
  var board = $('.container .row'+i);
  for (var j=0; j < 8; j++){
    color = chooseColor(i, 8*i+j);
    makeSquare(color, 8*i+j);
  }
}

checkLengthOfQueens();

// Utility function that enables "visualize" button only when 8 queens have been placed
function checkLengthOfQueens(){
  if(queens.length < 8)
    $("#visualize-btn").attr("disabled", "disabled");
  else
    $("#visualize-btn").removeAttr("disabled");
}

// Utility function that adds class "square" to the chessboard squares
function makeSquare(color, square_id) {
  var st = '<div class="col square ' +  color + '" id = "' + square_id + '"></div>'
  board.append(st);
}

// Utility function to select color of the square
function chooseColor(row, num) {
  let color = "";
  if (row % 2 === 0) {
    if (num % 2 === 0) {
      color = "dark";
    } else {
      color = "light";
    }
  } else {
    if (num % 2 === 0) {
      color = "light";
    } else {
      color = "dark";
    }
  }

  return color;
}

// Utility function to clear the chessboard
function clearBoard(){
  for(let i=0; i<63; i++)
    $('.square').empty();
}

function toggleReadButtons(){
  $('#read-more-btn').toggle();
  $('#read-less-btn').toggle();
}

/* ALLOW USER TO PLACE QUEENS ON THE CHESSBOARD */

// Place a queen when a "square" is clicked
if( !$("#disable-queen-place").length )
{
  $('.square').click(function(){
    const id = parseInt(this.id);
    const ind = queens.indexOf(id);

    if(queens.length == 8 && !queens.includes(id))
      return;
    else
    {
      for(let i=0; i<queens.length; i++)
      {
        if(queens[i] != id && Math.floor(queens[i]/8) == Math.floor(id/8))
          return;
      }
    }

    if(ind > -1)
    {
      queens.splice(ind, 1);
      $('#'+id).empty();
    }
    else
    {
      queens.push(id);
      $('#'+id).html(icon_str);
    }
    checkLengthOfQueens();
    return;
  });
}

/* GENERATE A RANDOM BOARD CONFIGURATION */
$('#generate-random').click(function(){
  queens = [];
  clearBoard();
  for(let i=0; i<8; i++){
    const r = Math.floor(Math.random()*8);
    const id = 8*i + r;
    queens.push(id);
    $('#'+id).html(icon_str);
  }
  checkLengthOfQueens();
});

// Submit board configuration to display solution
$('#queen-form').submit(function(evt){
  var temp = queens.toString();
  $('#queen-inp').attr("value",temp);
});

// If read more button is clicked:
$('.read-btn').click(toggleReadButtons)
