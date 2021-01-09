const game = () =>{

    let yourScore = 0;
    let enemyScore = 0;
    let rounds =3;


    //Start game
    const startGame = () =>{
    
        const playButton = document.querySelector(".startscreen button");
        const firstPage = document.querySelector(".startscreen");
        const match = document.querySelector(".game");
        const twelveRounds = document.querySelector(".twelve");
        const sixRounds = document.querySelector(".six");
        const nineRounds = document.querySelector(".nine");


        playButton.addEventListener("click", ()=>{
            firstPage.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });

        sixRounds.addEventListener("click", () =>{
            rounds = 6;
            alert("You will play 6 rounds!");
        });

        nineRounds.addEventListener("click", () =>{
            rounds = 9;
            alert("You will play 9 rounds!");
        });

        twelveRounds.addEventListener("click", () =>{
            rounds = 12;
            alert("You will play 12 rounds!");
        });

            
    };

    //Play the game
    const playGame = () =>{
        const rock = document.querySelector(".rock"); //1
        const paper = document.querySelector(".paper"); //2
        const scissors = document.querySelector(".scissors");//3
        
        const npcOptions = ["rock", "paper", "scissors"];


        rock.addEventListener("click", function(){
            const npcNumber = Math.floor(Math.random() * 3);
            const npcChoice = npcOptions[npcNumber];

            compareHands("rock", npcChoice);

        });

        paper.addEventListener("click", function(){
            const npcNumber = Math.floor(Math.random() * 3);
            const npcChoice = npcOptions[npcNumber];
            
            compareHands("paper", npcChoice);
          
        });

        scissors.addEventListener("click", function(){
            const npcNumber = Math.floor(Math.random() * 3);
            const npcChoice = npcOptions[npcNumber];

            compareHands("scissors", npcChoice);
        });

    };

    const updateScore = () =>{
        const playerScore = document.querySelector(".playerScore p");
        const compScore = document.querySelector(".npcScore p");

        playerScore.textContent = yourScore;
        compScore.textContent = enemyScore;
    }

    const compareHands = (playerChoice, computerChoice) =>{

        const winner = document.querySelector(".winner");
        if(playerChoice === computerChoice){
            winner.textContent = "It is a tie!";
            printChoice(playerChoice, playerChoice);
            return;
        } 
        if (playerChoice === "rock"){
            if(computerChoice === "scissors"){
                winner.textContent = "Player Wins!";
                yourScore++;
                updateScore();
                printChoice("rock", "scissors");
                scoreCap(rounds);
                return;
            } else {
                winner.textContent = "Computer Wins!";
                enemyScore++;
                updateScore();
                printChoice("rock", "paper");
                scoreCap(rounds);
                return;
            }
        }

        if (playerChoice === "paper"){
            if(computerChoice === "rock"){
                winner.textContent = "Player Wins!";
                yourScore++;
                updateScore();
                printChoice("paper", "rock");
                scoreCap(rounds);
                return;
            } else {
                winner.textContent = "Computer Wins!";
                enemyScore++;
                updateScore();
                printChoice("paper", "scissors");
                scoreCap(rounds);
                return;
            }
        }

        if (playerChoice === "scissors"){
            if(computerChoice === "paper"){
                winner.textContent = "Player Wins!";
                yourScore++;
                updateScore();
                printChoice("scissors", "paper");
                scoreCap(rounds);
                return;
            } else {
                winner.textContent = "Computer Wins!";
                enemyScore++;
                updateScore();
                printChoice("scissors", "rock");
                scoreCap(rounds);
                return;
            }
        }
    }

const scoreCap = (roundCap) =>{
    if(yourScore === roundCap){
        alert("YOU WON!");
        enemyScore -= enemyScore;
        yourScore -= roundCap;

        updateScore();
    } else if(enemyScore === roundCap){
        alert("YOU LOST!");
        enemyScore -= roundCap;
        yourScore -= yourScore;
        updateScore();
    }
};

const printChoice = (player, npc) =>{
    let playerPrint = document.querySelector(".playerChoice");
    let npcPrint = document.querySelector(".npcChoice");

    playerPrint.textContent = player;
    npcPrint.textContent = npc;
};

    playGame();
    startGame();
};
game();