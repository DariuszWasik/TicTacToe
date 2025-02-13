console.log('I am working');

//the game of tic tac toe
//1.two players chose or enter name
function createPlayer(name) {
    name;
    const chosenSquares = [];
    const takeSquare = function(xy) {
      console.log(`you wrote ${xy}`);
      if (gameboard.availableChoice.includes(xy)){
        console.log('ok');
        let index = gameboard.availableChoice.indexOf(xy);
        // debugger;
        gameboard.availableChoice.splice(index, 1);
        this.chosenSquares.push(xy);
      }
    }
    const checkRows = function () {
      if (this.chosenSquares.includes('a1', 'a2', 'a3'))
        console.log('yeah baby')
    }
    return {name, chosenSquares, takeSquare, checkRows}
}

const player1 = createPlayer('dario');
const player2 = createPlayer('asia');

//2. a boardgame 3x3
const gameboard = (function () {
  const board = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
  const availableChoice = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
    return {board, availableChoice}
})()

//3. game logic :

const game = {
  roundNumber: 0,
  moveInRound: 0,
  playRound: function() {
    ++this.moveInRound;
    if (this.moveInRound%2 === 1){
        let input = prompt(`${player1.name} which square do you take`)
        player1.takeSquare(input);
        player1.checkRows
      }
      else {
      let input = prompt(`${player2.name} which square do you take`)
      player2.takeSquare(input)};
    
    },
    playGame: function() {
     for (let i =0; i<6; i++) {
      this.playRound()
     }
    },
  }



//3.1 players take free squares  alternately one after another - they can't take already taken square

//3.2 whoever first has row of 3 vertically horizontally or diagonally squares wins round
//3.3 the round winner or draw is announced and we play next round
//3.4 for winning a round player gets 1 point, for draw nothing
//3.5 when player reach 3 points he wins the game
//3.6 after finish and congrats ask if player want to play again or change for different players names
