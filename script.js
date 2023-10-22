$(document).ready(function() {
  
  const $boardItems = $('.board-item'); // variable declared to select class with .board-item
  const cellDataArray = [ // assigning this variable to an array of length 9 (because there are 9 cells in tictactoe game)
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]; 
  const resultDisplay = ["Player 1 Wins", "Player 2 Wins", "Draw"]; //results are stored in arrays
  const playerOne = "X"; // Player1 always plays as X
  const playerTwo = "O"; // Player2 always plays as O
  let currentPlayer = playerOne; // X will always start first which is Player1
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let winnerCells = null;
  let gameOver = false;
  
  function handleBoardItemClick() {
        if (gameOver) {
          return; // If the game is over, do nothing when clicking on cells
        }
          let cellIndex = $(this).index(); // Get the index of clicked cell
          if (cellDataArray[cellIndex] === "") //checks if the cell is empty or not, if cell is empty condition is true
            { 
              cellDataArray[cellIndex] = currentPlayer; //if condition is true, assigns value of current player
              $(this).text(currentPlayer);//updates content of clicked cell to symbol of current player
      
              // Set "Your Turn" messages
              $('#current-playerone').html(currentPlayer === playerTwo ? "Your Turn" : "");//By swapping this to player2, then this corrects the turn display
              $('#current-playertwo').html(currentPlayer === playerOne ? "Your Turn" : "");//By swapping this to player1, then this corrects the turn display
              currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; // ternary expression - Toggle between players
              
              const winner = getWinner();
              if (winner) {
                gameOver = true;
              }
              updateScore(winner);
              displayGameResult(winner);
            }
    
  }
  
  function getWinner() 
  {
    // Define winning combinations
    const winCombos = 
      [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

    for (const combo of winCombos) //loop over each winning combos within array
    { 
      const [a, b, c] = combo; //variables represent index of 3 cells that make winning combo
        if (cellDataArray[a] && cellDataArray[a] === cellDataArray[b] && cellDataArray[a] === cellDataArray[c]) //check if values in array of each index a,b,c are all equal and non-empty
          { 
            const winner = cellDataArray[a]; //assigns the players symbol to the winner var
            highlightWinnerCells(combo); // Call the highlightWinnerCells function with the winning combo
            return winner; //loop exits if winning combo is found
          }
    }

    return null;
  }

  function highlightWinnerCells(combo) {
    winnerCells = combo; // Set the winnerCells variable to the winning combination
  
    if (winnerCells) {
      for (const index of winnerCells) {
        $(`#cell${index}`).addClass('winning-cell'); // Use jQuery to add the CSS class
      }
    }
  }  

  function updateScore(winner) {
    if (winner === playerOne) 
      playerOneScore++;
    else if (winner === playerTwo) 
      playerTwoScore++; 
  }

  function displayGameResult(winner)
  {
    if (winner === playerOne)
      $('#result-display').html(resultDisplay[0]);
    else if (winner === playerTwo)
      $('#result-display').html(resultDisplay[1]);
    else {
      // If no winner is found
      const isBoardFull = cellDataArray.every(cellValue => cellValue !== ""); //checks if all element is not an empty string
      if (isBoardFull) {
        $('#result-display').html(resultDisplay[2]);
      } else {
        $('#result-display').html(''); // this means the game is still going on
      }
    }

    $('#playeronescore').html(playerOneScore);
    $('#playertwoscore').html(playerTwoScore);
  }

  function clearHighlightedCells() { // Function to clear the color of highlighted cells
    $('.winning-cell').removeClass('winning-cell');
  }

  function reset() 
  {
      for (let i = 0; i < cellDataArray.length; i++) 
      {
        cellDataArray[i] = "";
        $boardItems.eq(i).text(""); // Clear cell text on the page
      }

      // Remove result display from the page as this was causing score to add incorrectly
      $('#result-display').text(''); 

      // Reset current player
      currentPlayer = playerOne;
  
      // Clear "Your Turn" messages
      $('#current-playerone').html("Your Turn").css("color", "red");
      $('#current-playertwo').html("").css("color", ""); // Clear and remove color
      clearHighlightedCells(); // Clear highlighted cells

      // Reset the gameOver flag
      gameOver = false;
  }

  function resetScore()
  {
    playerOneScore = 0;
    playerTwoScore = 0;
    $('#playeronescore').html(playerOneScore);
    $('#playertwoscore').html(playerTwoScore);  

  }

  // Register click events
  $boardItems.click(function() { handleBoardItemClick.apply(this); });
  $('#reset-score').click(function() { resetScore(); });
  $('#clear-board').click(function() { reset(); });
});


