//the game of tic tac toe
//1.two players chose or enter name
//2. a boardgame 3x3
//3. game logic :
//3.1 players take free squares  alternately one after another - they can't take already taken square
//3.2 whoever first has row of 3 vertically horizontally or diagonally squares wins round
//3.3 the round winner or draw is announced and we play next round
//3.4 for winning a round player gets 1 point, for draw nothing
//3.5 when player reach 3 points he wins the game
//3.6 after finish and congrats ask if player want to play again or change for different players names

function createPlayer(name) {
    name;
    const points = 0;
    const won = false;
    const chosenSquares = [];

    const takeSquare = function(xy) {
      console.log(`you wrote ${xy}`);
      if (gameBoard.availableChoice.includes(xy)){
        console.log('ok');
        let index = gameBoard.availableChoice.indexOf(xy);
        // debugger;
        gameBoard.availableChoice.splice(index, 1);
        this.chosenSquares.push(xy);
      }
      else {
        console.log('cant find it')
        game.playRound.input = prompt (`Try again! 
          Available squares are ${gameBoard.availableChoice}`) 
      }
    };

    const checkLines = function() {
      if ( ((this.chosenSquares.includes('a1')) && (this.chosenSquares.includes('a2')) && this.chosenSquares.includes('a3'))
        || ((this.chosenSquares.includes('b1')) && (this.chosenSquares.includes('b2')) && this.chosenSquares.includes('b3'))
        || ((this.chosenSquares.includes('c1')) && (this.chosenSquares.includes('c2')) && this.chosenSquares.includes('c3'))
        
        || ((this.chosenSquares.includes('a1')) && (this.chosenSquares.includes('b1')) && this.chosenSquares.includes('c1'))
        || ((this.chosenSquares.includes('a2')) && (this.chosenSquares.includes('b2')) && this.chosenSquares.includes('c2'))
        || ((this.chosenSquares.includes('a3')) && (this.chosenSquares.includes('b3')) && this.chosenSquares.includes('c3'))
        
        || ((this.chosenSquares.includes('a1')) && (this.chosenSquares.includes('b2')) && this.chosenSquares.includes('c3'))
        || ((this.chosenSquares.includes('c1')) && (this.chosenSquares.includes('b2')) && this.chosenSquares.includes('a3'))
      )
       {
         this.won = true;
         ++this.points ;
         console.log(player1.name, ':', player1.points);
         console.log(player2.name, ':', player2.points);
       }
    }

    
    return {name, chosenSquares, takeSquare, checkLines, won, points}
}
// 1.two players chose or enter name
const player1 = createPlayer('dario');
const player2 = createPlayer('asia');

//2. a boardgame 3x3

const gameboard = (function () {
  const board = ['a1', 'a2', 'a3',
                 'b1', 'b2', 'b3',
                 'c1', 'c2', 'c3'];
  const availableChoice = ['a1', 'a2', 'a3',
                           'b1', 'b2', 'b3',
                           'c1', 'c2', 'c3'];
  return {board, availableChoice}
})()

//3. game logic :

const game = (function () {
  
  const roundNumber =  0;
  const moveInRound =  0;

  const playRound = function() {
    //player should beginn round alternately
    ++this.moveInRound;
    if ((this.moveInRound + this.roundNumber)%2 !== 0){
        let input = prompt(`${player1.name} which square do you take`)
        player1.takeSquare(input);
        player1.checkLines();
      }
      else {
        let input = prompt(`${player2.name} which square do you take`)
        player2.takeSquare(input);
        player2.checkLines();
      }}

    const playGame = function() {
      while ( (player1.won == false) && (player2.won == false) && (gameBoard.availableChoice.length !== 0)) {
        this.playRound()
      }
      if (player1.won == true) {
        console.log(player1.points, 'player1')
        this.roundOver();
      }
      else if (player2.won == true) {
        console.log(player2.points, )
        this.roundOver();
      }
      //draw 
      else {
        console.log ('DRAW')
        this.roundOver();
      } 
    };
    
    const roundOver = function() {
        player1.won = false;
        player2.won = false;
        player1.chosenSquares = [];
        player2.chosenSquares = [];
        gameBoard.availableChoice = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
        ++this.roundNumber;
        this.moveInRound = 0;
        if ((player1.points < 3) && (player2.points < 3)){
          this.playGame()
           }
        else {
        console.log('dobra robota szefie', 
       `${player1.name} : ${player1.points}     
        ${player2.name} : ${player2.points}`);
        this.gameOver();
        }
    };
      
    const gameOver = function() {
        if (player1.points == 3){
          let msg = prompt(`${player1.name} you are the WINNER
            CONGRATULATIONS!!!
            Wanna play again?`)
            if (msg === 'yes') {
              this.reset();
              this.playGame();
            }}
        else if (player2.points == 3){
              let msg = prompt(`${player2.name} you are the WINNER
                CONGRATULATIONS!!!
                Wanna play again?`)
                if (msg === 'yes') {
                  this.reset();
                  this.playGame();
          }}
        else {
              alert(`${player1.name} , ${player2.name} thank you for playing!
                See you later!`)
            }
          };

  const reset = function() {
        player1.won = false;
        player2.won = false;
        player1.chosenSquares = [];
        player2.chosenSquares = [];
        player1.points = 0;
        player2.points = 0;
        gameBoard.availableChoice = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
        game.roundNumber = 0;
        game.moveInRound = 0;
      }
      return {
        roundNumber, moveInRound, playRound, playGame, roundOver, gameOver, reset
      }
   })();


