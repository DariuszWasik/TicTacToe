

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
        const marker = '';
        function setWon () {
            return this.won = !this.won
            };
        function givePoint () {
            ++this.points
            }
return {points, won, marker, name, setWon, givePoint}
}

let player1 = createPlayer('dario')
let player2 = createPlayer('asia')
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
                    scrDisplay.openWinning(playa)}
             }
     
            function addPointIfWon(playa) {
                if(gameBoard.checkLines()==true){
                    ++gameControl.roundNumber;
                    moveInRound = 0;
                    playa.givePoint();
                    
                    gameBoard.printNewBoard();
                    setToken();
                    scrDisplay.execute()
                    checkPoints(playa);
                }
                else if ((gameBoard.checkLines() == false) && (!gameBoard.board.includes(''))){
                    ++gameControl.roundNumber;
                    moveInRound = 0;
                    gameBoard.printNewBoard();
                    setToken();
                    scrDisplay.execute()
                }
                else {
                    changeToken()
                }
            }
            
            const playGame = function() {
                if((player1.points < 3) && (player2.points <3)){
                    scrDisplay.execute()
                }
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
            
//screen Display logic  in Iffy  
const scrDisplay = (function() {
                
        let score1 = document.querySelector('.score1');
        let score2 = document.querySelector('.score2');
        let grid = document.querySelector('.grid');
        let everyBtn = []
        const setNamesBtn = document.querySelector('.setNames');
        const restartBtn = document.querySelector('.restart')
        const setNamesBtn2 = document.querySelector('.setNames2');
        const restartBtn2 = document.querySelector('.restart2')
        const modal = document.querySelector('dialog');
        const letsPlayBtn = document.querySelector('.letsPlay')
        let name1 = document.querySelector('.name1')
        let name2 = document.querySelector('.name2');
        let nameSelected1 = document.querySelector('#player1')
        let nameSelected2 = document.querySelector('#player2')
        let nameText1 = document.querySelector('#player1txt')
        let nameText2 = document.querySelector('#player2txt')
        let winningDialog = document.querySelector('.winning')
        let message = document.querySelector('.message')

        
        function activePlayer(){
            if (gameControl.token == player1.marker){
                console.log('x')
                name1.classList.add('active')
                name2.classList.remove('active')}
                else{
                console.log('')
                name2.classList.add('active')
                name1.classList.remove('active')}

            }
        
        function setNames() {
            if ((scrDisplay.nameSelected1.value !== '') && (scrDisplay.nameText1.value == '')){
                player1 = createPlayer(scrDisplay.nameSelected1.value)
            }
            else if((scrDisplay.nameSelected1.value == '') && (scrDisplay.nameText1.value == '')){
                player1 = createPlayer('player 1')
            }
            else player1 = createPlayer(nameText1.value)
            if ((scrDisplay.nameSelected2.value !== '') && (scrDisplay.nameText1.value == '')){
                player2 = createPlayer(scrDisplay.nameSelected2.value)
            }
            else if((scrDisplay.nameSelected2.value == '') && (scrDisplay.nameText2.value == '')){
                player2 = createPlayer('player 2')
            }
            else player2 = createPlayer(nameText2.value)

            player1.marker = 'x';
            player2.marker = 'o';
        }

        function printNames() {
            name1.innerHTML = player1.name
            name2.innerHTML = player2.name
        }
        
        setNamesBtn.addEventListener('click', () => {
            nameSelected1.value = ''
            nameSelected2.value = ''
            nameText1.value = ''
            nameText2.value = ''
            modal.showModal()
            })

        setNamesBtn2.addEventListener('click', () => {
            winningDialog.close()
            nameSelected1.value = ''
            nameSelected2.value = ''
            nameText1.value = ''
            nameText2.value = ''
            modal.showModal()
        })
        
        restartBtn.addEventListener('click', () => {
            gameControl.reset()
            gameControl.playGame()
        })
        restartBtn2.addEventListener('click', () => {
            winningDialog.close()
            gameControl.reset()
            gameControl.playGame()
    })
        
        letsPlayBtn.addEventListener('click', () =>{
            setNames();
            printNames();
            modal.close();
            gameControl.reset();
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
    activePlayer()
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
            else everyBtn[x].classList.add('active')
        }
    }

    function execute() {
        printNames()
        render()
        addEventListenerToEmptyButtons();
    }

    function openWinning(x) {
        winningDialog.showModal()
        scrDisplay.message.textContent = `${x.name} you have won! Congratulations!`

    }

return {render, grid, addEventListenerToEmptyButtons, score1, score2, execute, everyBtn, modal,
     nameSelected1, nameText1, name1, nameSelected2, name2, nameText2, openWinning, message, activePlayer}

})()
    
gameControl.playGame()