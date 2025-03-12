

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
            console.log('you win z checkLines')
            // scrDisplay.render();
            return true;}
            else false
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
player2.marker = 'yO';



//gameControl
const gameControl =(function() {
            const roundNumber = 0;
            const moveInRound = 0;
            let token = 'x';
                     
            const changeToken  = function() {
             this.token == 'x' ? this.token = 'o' : this.token = 'x'
            } 

            const playRound = function() {
                ++this.moveInRound;
                if((this.roundNumber + this.moveInRound)%2 !== 0){
                    this.token = player1.marker;
                    // gameBoard.checkLines()
                    // getChoice(player1.name)
                    // makeMove(player1);
                    addPointIfWon(player1)
                }
                else{
                    gameControl.token = player2.marker;
                    // gameBoard.checkLines()
                    // getChoice(player2.name)
                    // makeMove(player2);
                    addPointIfWon(player2)
                }
            }

            function checkPoints(playa) {
                if (playa.points > 2){
                    console.log(`${playa.name} you have won the game`) }
             }
            

            // function checkInput(i) {
            //     while(acceptedValues.includes(i)==false){
            //         i = prompt('this value is not allowed enter another x.y')
            //     };
            //     const values = i.split('.')
            //     if (gameControl.takenValues.includes(i)){
            //         i = prompt(`${gameControl.currentNick} ${values} already taken enter another x.y`)
            //         checkInput(i);
            //     }
            //     else {
            //         gameControl.takenValues.push(i);
            //         gameControl.chosenX = values[0];
            //         gameControl.chosenY = values[1];}
            //     }

            // function getChoice(nick) {
            //     gameControl.currentNick = nick;
            //     let input ='' 
            //     if ((gameControl.takenValues.length == 9) && (gameBoard.checkLines() != true)) {
            //         console.log ('its a draw')
            //         gameBoard.printNewBoard()
            //         gameControl.takenValues = [];
            //         gameControl.playRound()}; 
            //         input = prompt(`${nick} enter x.y`);
            //         checkInput(input);
            //     }  

            function addPointIfWon(playa) {
                console.log('funkcja dodawania punktow')
                if(gameBoard.checkLines()==true){
                    debugger
                console.log('true!!!!!!!!!')
                    playa.givePoint()
                    checkPoints(playa);
                    gameBoard.printNewBoard();
                    scrDisplay.render();
                }
                else if (gameBoard.checkLines() == false){
                    console.log('chekclines sa flaszywe')
                }
            }
            
            const makeMove = function() {
                // gameBoard.board[gameControl.chosenX][gameControl.chosenY] = gameControl.token
                console.table(gameBoard.board);
            }
            
            const playGame = function() {
                while((player1.points < 3) && (player2.points <3)){
                    this.playRound()
                }
                console.log('wanna play again?')
            }
            
            return {moveInRound, changeToken, roundNumber, token, playGame,playRound,
                addPointIfWon, makeMove, checkPoints}
            })()
            
            
            //////////////////////////////////////////////////////////////////////////////////////////
            let everyBtn = []
    
    const scrDisplay = (function() {
        const grid = document.querySelector('.grid');
        
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
        console.log('zrenderowalem');
        return everyBtn
        
    }
    
    function addEventListenerToEmptyButtons(){
        console.log('uruchomilem iventlistnera')
        for (let x=0; x<9; x++){
            if (everyBtn[x].innerText == ''){
                everyBtn[x].addEventListener('click', () => gameControl.playRound());
                everyBtn[x].addEventListener('click', () => {everyBtn[x].innerText = gameControl.token});
                everyBtn[x].addEventListener('click', () => {gameBoard.board[x] = gameControl.token});
                everyBtn[x].addEventListener('click', () => console.log(gameBoard.board));
                
                // everyBtn[x].addEventListener('click', () => gameControl.changeToken());
                // everyBtn[x].addEventListener('click', () => render());
                
            }
            else everyBtn[x].style.backgroundColor = 'red'
        }
        
        
    }
    
    function clickBtn(a) {
        everyBtn[a].innerText = gameControl.token;
        gameBoard.board[a] = gameControl.token;
        gameControl.changeToken();
    }


    function execute() {
        render()
        addEventListenerToEmptyButtons();
    }
    execute()
    
    
    return {render, grid, addEventListenerToEmptyButtons}
    
})()


    const score = document.querySelector('.score');
    score.innerText = 3