// Start by creating functions to organise everything - each function with its' own role

//Big function for the whole game (the entire code and scope for the project)
const game = () => {


    //Score board - set the value
    //let because we want to be able to update score
    let pScore = 0;
    let cScore = 0;
    
   

    //Start the Game: function to fade the intro
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        });
    };


    //Play Match: everything in here revolves around the actual game
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');       //select all the buttons from the options
        const playerHand = document.querySelector('.player-hand');          //get images
        const computerHand = document.querySelector('.computer-hand');      
        const hands = document.querySelectorAll('.hands img');

        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorsBtn = document.querySelector('.scissors');
        
        //A function to remove animations after they've ended
        hands.forEach(hand =>{
            hand.addEventListener('animationend', function(){
                this.style.animation = '';          //'this' has access to each hand, that's why we use a 'normal' function in the event Listener. The empty string makes the animations stop (instead of e.g. specifying duration)
            });
        });
        
        //Computer Options - array with three strings
        const computerOptions = ['rock', 'paper', 'scissors'];                  

        //loop through the variable options (with the buttons, assigned further up) and add eventListener for click
        options.forEach(option => { 
            option.addEventListener('click', function() {  //the reason for the normal function here is because keyword 'this' needs to be bound to the option (arrow function doesn't work for that)

            rockBtn.classList.add('inactive');
            paperBtn.classList.add('inactive');
            scissorsBtn.classList.add('inactive');

            //Computer choice - first generate random number between 0-2 and then feed them to the indexes of the objects in the array.
                const computerNumber = Math.floor(Math.random() * 3);                                                           
                const computerChoice = computerOptions[computerNumber];
                            
                //Timeout function that delays updated hand images by 2s until animations have ended
                setTimeout(() => {
                    compareHands(this.textContent, computerChoice);   //Here we call function 'compareHands' (declared lower down) with the parameters in the parenthesis

                    //Update images
                    playerHand.src = `./assets/${this.textContent}.png`;   //the 'this' keyword within eventListener can access the text within the buttons to update the images (based on player's choice). 
                    computerHand.src = `./assets/${computerChoice}.png`;   //computer choice is randomly generated above  

                    rockBtn.classList.remove('inactive');
                    paperBtn.classList.remove('inactive');
                    scissorsBtn.classList.remove('inactive');
                }, 2000);   //2s delay   

                
                //Getting the animations
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
                
            });
        });                           
    };

    //Function to update the score - we call this score every time we make a choice (in compareHands) and increment it (except when it's a tie)
    const updateScore = () => {
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        
        playerScore.textContent = pScore; //using pScore and cSore that were initiated at the top of the document.
        computerScore.textContent = cScore;
    };

    //Comparison function with our choice - if-statements that compare who's winning. This function is called up in the playMatch (every time we click on an option this function is called).
    //Arrow function with the values of the choices we made from the playMatch - playerChoice and computerChoice.
    const compareHands = (playerChoice, computerChoice) => {    

        //Update text - we get the text that will be updated when someone wins - e.g. "computer wins".
        const winner = document.querySelector('.winner'); //we get the "choose an option"-text.

        //Checking for a tie
        if(playerChoice === computerChoice) {
            winner.textContent = `It's a tie`;
            return;         
        }
        //Check for rock - two if-statements to compare to the computer's choice.
        if(playerChoice === 'rock') {
            if(computerChoice === 'scissors') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                restart();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                restart();
                return;
            }
        }
        //Check for paper
        if(playerChoice === 'paper') {
            if(computerChoice === 'scissors') {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                restart();
                return;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                restart();
                return;
            }
        }
        //Check for scissors
        if(playerChoice === 'scissors') {
            if(computerChoice === 'rock') {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                restart();
                return;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                restart();
                return;
            }
        }
    };

    //function for getting the outro page when someone reaches three points. 
    const restart = () => {
        const restartBtn = document.querySelector('.outro button');
        const outroScreen = document.querySelector('.outro');
        const match = document.querySelector('.match');
        const result = document.querySelector('.result');

        if(pScore == 3) { 
            inactivateButtons();       
            match.classList.remove('fadeIn');
            outroScreen.classList.add('fadeIn');  
            result.textContent = 'Player Wins!';
            return;
        } else if (cScore == 3) {  
            inactivateButtons();        
            match.classList.remove('fadeIn');
            outroScreen.classList.add('fadeIn'); 
            result.textContent = 'Computer Wins!';
            return;
        }
        
  
        //Button to restart the game.
        restartBtn.addEventListener('click', () => {
            document.location.href = '';
        });
    }

    const inactivateButtons = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorsBtn = document.querySelector('.scissors');

        rockBtn.classList.remove('active');
        paperBtn.classList.remove('active');
        scissorsBtn.classList.remove('active');

        rockBtn.classList.add('inactive');
        paperBtn.classList.add('inactive');
        scissorsBtn.classList.add('inactive');
    }

    //Call all the inner functions
    startGame();
    playMatch();
};

//Start the game function
game();
