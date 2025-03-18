

const gameBoard = (function() {
        //create board as array of empty ''
        // array elements represents the board as follow
        // [0][1][2] 
        // [3][4][5]
        // [6][7][8]

        const board = [];
        function printNewBoard () {
            for (let i = 0; i < 9; i++){
            board[i] = ''
            }
        }
        printNewBoard()

        //logic checking if some one won the round
        checkLines = () => {
            if(((board[0] == board[1]) && (board[1] == board[2]) && (board[2] != ''))
            ||((board[3] == board[4]) && (board[4] == board[5]) && (board[5] != ''))
            ||((board[6] == board[7]) && (board[7] == board[8]) && (board[8] != ''))
            
            ||((board[0] == board[3]) && (board[3] == board[6]) && (board[6] != ''))
            ||((board[1] == board[4]) && (board[4] == board[7]) && (board[7] != ''))
            ||((board[2] == board[5]) && (board[5] == board[8]) && (board[8] != ''))
    
            ||((board[0] == board[4]) && (board[4] == board[8]) && (board[8] != ''))
            ||((board[2] == board[4]) && (board[4] == board[6]) && (board[6] != ''))
        ){
            printNewBoard();
            return true;
            
        }
            else return false
        }

return {board, checkLines, printNewBoard}

})()

// function factory which makes players

function createPlayer(name) {
        let won = false;
        let points = 0;
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
gameBoard.board[1] = ''
player1.marker = 'x';
player2.marker = 'o';


//gameControl
const gameControl =(function() {
            let roundNumber = 0;
            let moveInRound = 0;
            let token = player1.marker;
                     
            const changeToken  = function() {
              return gameControl.token == player1.marker ? gameControl.token = player2.marker : gameControl.token = player1.marker
            } 
            
            const setToken = function() {
                if ((gameControl.roundNumber)%2 === 0){
                    gameControl.token = player1.marker
                }
                else {
                    gameControl.token = player2.marker
                }
            }

            // const playRound = function() {
            //     if ((moveInRound)%2 == 0){
            //         setToken()
            //         console.log('00', token)
            //     }
            //     else {
            //         changeToken()
            //         console.log('01', gameControl.token)
            //     }
            // }
            
            function makeMove() {
                ++moveInRound;
                console.log(moveInRound, gameControl.roundNumber)
                if(gameControl.token == player1.marker){
                    addPointIfWon(player1)
                }
                else {
                    addPointIfWon(player2)
                }
                
            }

            function checkPoints(playa) {
                if (playa.points > 2){
                    console.log('loremsaffjkahkjshdakhsajkhjkhkjkjdsjkshfdkfdjhfddfdk')
                    scrDisplay.grid.innerHTML = '<p>`${playa.name} you have won the game`</p>' }
             }
     
            function addPointIfWon(playa) {
                if(gameBoard.checkLines()==true){
                    console.log('true!!!!!!!!!')
                    ++gameControl.roundNumber;
                    moveInRound = 0;
                    playa.givePoint();
                    gameBoard.printNewBoard();
                    setToken();
                    scrDisplay.execute()
                    checkPoints(playa);
                }
                else if ((gameBoard.checkLines() == false) && (!gameBoard.board.includes(''))){
                    console.log('its a draw')
                    ++gameControl.roundNumber;
                    moveInRound = 0;
                    gameBoard.printNewBoard();
                    setToken();
                    scrDisplay.execute()
                    // changeToken()
                }
                else {
                    changeToken()
                }
            }
            
            const playGame = function() {

                if((player1.points < 3) && (player2.points <3)){
                    scrDisplay.execute()
             
                   // playRound()
                }
                else prompt('skks')
            }

            function reset() {
                player1.points = 0;
                player2.points = 0;
                gameControl.roundNumber = 0;
                gameControl.moveInRound = 0;
                gameBoard.printNewBoard();
                gameControl.setToken();
            }

            
return {moveInRound, changeToken, roundNumber, token, playGame, setToken,
                addPointIfWon, checkPoints, makeMove, reset}
            })()
            
    
    const scrDisplay = (function() {

        let score1 = document.querySelector('.score1');
        let score2 = document.querySelector('.score2');
        const grid = document.querySelector('.grid');
        let everyBtn = []
        const newNamesBtn = document.querySelector('.newNames');
        const modal = document.querySelector('.modal');
        const letsPlayBtn = document.querySelector('.letsPlay')
        const restartBtn = document.querySelector('.restart')


        newNamesBtn.addEventListener('click', () => modal.showModal())
        
        letsPlayBtn.addEventListener('click', () =>{
            modal.close();
            gameControl.reset();
            gameControl.playGame()
        })
        
        restartBtn.addEventListener('click', () => {
            gameControl.reset()
            gameControl.playGame()
        })


        function updatePoints() {
        score1.innerText = player1.points
        score2.innerText = player2.points
        } 

        function drawGrid(x) {
            let el = document.createElement('button');
            el.innerText = x;
            el.className = 'btnGrid'
            grid.appendChild(el);
    } 
    
    function render() {
        grid.innerHTML = '';
        gameBoard.board.forEach((x)=> drawGrid(x));
        everyBtn = document.querySelectorAll('.btnGrid')
        updatePoints()
    }
    
    function addEventListenerToEmptyButtons(){
        for (let x=0; x<9; x++){
            if (everyBtn[x].innerText == ''){
                everyBtn[x].addEventListener('click', () => {gameBoard.board[x] = gameControl.token});
                everyBtn[x].addEventListener('click', () => {everyBtn[x].innerText = gameControl.token});
                everyBtn[x].addEventListener('click', () => gameControl.makeMove());
                everyBtn[x].addEventListener('click', () => execute());
                everyBtn[x].addEventListener('click', () => console.log(gameBoard.board));
            }
            else everyBtn[x].style.backgroundColor = 'red'
        }
    }


    function execute() {
        render()
        addEventListenerToEmptyButtons();
    }

return {render, grid, addEventListenerToEmptyButtons, score1, score2, execute, everyBtn}
    
})()


gameControl.playGame()