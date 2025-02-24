//create dwo dimensions array representing board
//where row 0 is on top and column 0 is on the left
const gameBoard = (function() {
        const board = [];
        const columns = 3; 
        const rows = 3;
        function printNewBoard () {
            for (let i = 0; i < rows; i++){
            board[i] = []
            for (let j = 0; j < columns; j++)
                {board[i][j] = ''}
            }
        }
        printNewBoard()

        checkLines = () => {

            if(((board[0][0] == board[0][1]) && (board[0][1] == board[0][2]) && (board[0][2] != ''))
            ||((board[1][0] == board[1][1]) && (board[1][1] == board[1][2]) && (board[1][2] != ''))
            ||((board[2][0] == board[2][1]) && (board[2][1] == board[2][2]) && (board[2][2] != ''))
    
            ||((board[0][0] == board[1][0]) && (board[1][0] == board[2][0]) && (board[2][0] != ''))
            ||((board[0][1] == board[1][1]) && (board[1][1] == board[2][1]) && (board[2][1] != ''))
            ||((board[0][2] == board[1][2]) && (board[1][2] == board[2][2]) && (board[2][2] != ''))
    
            ||((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[2][2] != ''))
            ||((board[2][0] == board[1][1]) && (board[1][1] == board[0][2]) && (board[0][2] != ''))
    
    
        ){
            printNewBoard();
            return true;}
        }
return {board, checkLines, printNewBoard}
})()

//create function factory which makes players
function createPlayer(name) {
            let won = false;
            let points = 1;
            const marker = 0;
            function setWon () {
                return this.won = !this.won
            };
            function givePoint () {
                ++this.points
            }
return {points, won, marker, name, setWon, givePoint}
}

const player1 = createPlayer('dario')
const player2 = createPlayer('asia')
player1.marker = 'x';
player2.marker = 'o';
        
//gameControl
const gameControl =(function() {
            const roundNumber = 0;
            const moveInRound = 0;
            let token = '';
            let currentNick = ''
        
            let chosenX = 0;
            let chosenY = 0;
        
            const playRound = function() {
                ++this.moveInRound;
                // this.checkPoints();
                if((this.roundNumber + this.moveInRound)%2 !== 0){
                    this.token = player1.marker;
                    getChoice(player1.name)
                    makeMove(player1);
                    console.log(`${player1.name} made a "${this.token}" on gameboard.board[${gameControl.chosenX}][${gameControl.chosenY}]}`)
                    addPointIfWon(player1)
                }
                else{
                    gameControl.token = player2.marker;

                    getChoice(player2.name)
                    makeMove(player2);
                    console.log(`${player2.name} made an "${this.token}" on  gameBoard.board[${gameControl.chosenX}][${gameControl.chosenY}]}`)
                    addPointIfWon(player2)
                }
            }

            function checkPoints(playa) {
                if (playa.points > 2){
                    console.log(`${playa.name} you have won the game`)
                }
            }
            
            const takenValues =[]
            const acceptedValues = ['0.0', '0.1', '0.2',
                                    '1.0', '1.1', '1.2',
                                    '2.0', '2.1', '2.2']

            function checkInput(i) {
                while(acceptedValues.includes(i)==false){
                    i = prompt('this value is not allowed enter another x.y')
                };
                const values = i.split('.')
                if (gameControl.takenValues.includes(i)){
                    i = prompt(`${gameControl.currentNick} ${values} already taken enter another x.y`)
                    checkInput(i);
                }
                else {
                    gameControl.takenValues.push(i);
                    gameControl.chosenX = values[0];
                    gameControl.chosenY = values[1];}
                    // debugger
                }
                // return this.input = i;
            function getChoice(nick) {
                gameControl.currentNick = nick;
                let input ='' 
                if ((gameControl.takenValues.length == 9) && (gameBoard.checkLines() != true)) {
                    console.log ('its a draw')
                    gameBoard.printNewBoard()
                    gameControl.takenValues = [];
                    this.playRound()}; 
                    input = prompt(`${nick} enter x.y`);
                checkInput(input);
            }  

            function addPointIfWon (playa) {
                if(gameBoard.checkLines()==true){
                    console.log('true!!!!!!!!!')
                    playa.givePoint()

                    checkPoints(playa);
                    gameBoard.printNewBoard()
                    gameControl.takenValues = [];

                }
                
            }

            
            const makeMove = function() {
                gameBoard.board[gameControl.chosenX][gameControl.chosenY] = gameControl.token
                console.table(gameBoard.board)
            }
            
            const playGame = function() {

                while((player1.points < 3) && (player2.points <3)){
                    this.playRound()
                }
                console.log('wanna play again?')
            }
            return {moveInRound, roundNumber, token, playRound, playGame, getChoice,
                addPointIfWon, makeMove, checkPoints, takenValues,acceptedValues

}
}

)()