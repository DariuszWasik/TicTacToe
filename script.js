console.log('I am working');

//the game of tic tac toe
//1.two players chose or enter name
function createPlayer(name) {
    name;
    const points = 0;
    const won = false;
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
    };
    const printName = function() {
      if((name === "dario")){
      console.log (name)}
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
         console.log('RRRRRRRR');
       }
    }

    
    return {name, chosenSquares, takeSquare, checkLines, won, printName, points}
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
        player1.checkLines();
        // debugger
        
      }
      else {
        let input = prompt(`${player2.name} which square do you take`)
        player2.takeSquare(input)};
        player2.checkLines();
    
      },

    playGame: function() {
      while ( (player1.won == false) && (player2.won == false) ) {
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
    },
    
    roundOver: function() {
        player1.won = false;
        player2.won = false;
 
        player1.chosenSquares = [];
        player2.chosenSquares = [];
        
        gameboard.availableChoice = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];
        this.roundNumber +1;
        if ((player1.points < 3) && (player2.points < 3)){
          this.playGame()
           }
        else
        console.log('dobra robota szefie')
      
      }
                }
      
      //   for (let i=0; i<10; i++){
    //   if ((player1.won = false) && (player2.won = false)){
    //     this.playRound();
    //   }
    //   else break;
    // }
    

//3.1 players take free squares  alternately one after another - they can't take already taken square

//3.2 whoever first has row of 3 vertically horizontally or diagonally squares wins round
//3.3 the round winner or draw is announced and we play next round
//3.4 for winning a round player gets 1 point, for draw nothing
//3.5 when player reach 3 points he wins the game
//3.6 after finish and congrats ask if player want to play again or change for different players names
