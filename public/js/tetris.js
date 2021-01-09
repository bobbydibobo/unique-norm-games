/*-----------------------------------
    SETUP CANVAS
-----------------------------------*/
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d'); //setting the canvas context, cant draw on DOM element

context.scale(30, 30);

/*-----------------------------------
    SETUP MATRIX
-----------------------------------*/
//const matrix = [ //creating a two dimensional matrix by implementing multidimensional array
  //  [0, 0, 0], // three rows for rotation 
   // [1, 1, 1],  // 0: NOTHING; 1: FILLED;
   // [0, 1, 0]
//];


/*-----------------------------------
    CONTROLL INSTANCE OF FILLED AREA
-----------------------------------*/
function arenaSweep() {

    outer: for (let y = arena.length -1; y > 0; y--){
        for(let x = 0; x < arena[y].length; x++) {
            if(arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift (row);

        y++;

        player.score += player.level * 10; // multiply rowcount by 10
        player.level++;
        dropInterval -= 20;

        updateStats();
    }
}

/*-----------------------------------
    COLLIDER
-----------------------------------*/
function collide(arena, player) { // check arena and player actual position
    const [m, o] = [player.matrix, player.pos]; // tuple assignment going on there between the [BRACKETS] --> Player Obj | m=matrix, o=offset
    for (let y = 0; y < m.length; y++) { // column --> length of the whole game grid
        for (let x = 0; x < m[y].length; x++) { //row --> length of a single row
            if (m[y][x] !== 0 && // if its filled
                (arena[y + o.y]/*makesSureArenaRowExists*/ && 
                arena[y + o.y][x + o.x]) !== 0) { // if filled in a specified column and row on some indexes
                return true;
            }
        }
    }
    return false;
}

/*-----------------------------------
    CREATE THE MATRIX
-----------------------------------*/
function createMatrix(w, h) {
    const matrix = [];
    while (h--){ //while there is height... go down till there is no more height
        matrix.push(new Array(w).fill(0)); // new Array of length = w(width)
    }
    return matrix; //returns a matrix which represents the grid of my game
}

/*-----------------------------------
    CREATE PIECES FUNCTION 
-----------------------------------*/
function createPiece(type) {
    if(type === 'T') {          // T _ _ _ _ _ _
        return [ 
            [0, 0, 0], 
            [1, 1, 1],  
            [0, 1, 0]
        ];
    } else if (type === 'O') {  // T O _ _ _ _ _
        return [
            [2, 2],
            [2, 2]
        ];
    } else if (type === 'L') { // T O L _ _ _ _
        return [
            [0, 3, 0], 
            [0, 3, 0],  
            [0, 3, 3]
        ];
    } else if (type === 'J') { // T O L J _ _ _
        return [
            [0, 4, 0], 
            [0, 4, 0],  
            [4, 4, 0]
        ];
    } else if (type === 'I') { // T O L J I _ _
        return [
            [0, 5, 0, 0], 
            [0, 5, 0, 0],  
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if (type === 'S') { // T O L J I S _
        return [
            [0, 6, 6], 
            [6, 6, 0],  
            [0, 0, 0]
        ];
    } else if (type === 'Z') { // T O L J I S Z
        return [
            [7, 7, 0], 
            [0, 7, 7],  
            [0, 0, 0]
        ];
    }
}

/*-----------------------------------
    DRAW TETRIS ELEMENTS
-----------------------------------*/
function draw(){
    context.fillStyle = '#000'; // fill canvas with black to check if this worked
    context.fillRect(0, 0, canvas.width, canvas.height); //fill the rectangle with the color

    drawMatrix(arena, {x:0, y:0}); // adding the tetris stone to the arena when collides
    drawMatrix(player.matrix, player.pos); // draw player
}

function drawMatrix(matrix, offset) { //Pass the matrix and offset
    matrix.forEach((row, y) => { //iterate over every row in the matrix * y
        row.forEach((value, x) => { //iterate over each value within a row
            if (value !== 0) { //if the value is not 0 fill this thing
                context.fillStyle = colors[value]; // looks at index value and finds the value in the color array
                context.fillRect(x + offset.x, y + offset.y, 1, 1); //x-position, y-position, 1, 1
            };
        });
    });
}

/*-----------------------------------
    ADDING MERGE FUNCTION
-----------------------------------*/
function merge(arena, player) { //copies all the values from player into arena
    player.matrix.forEach((row, y) => { //over every row ; all colums
        row.forEach((value, x) => { //every value; all rows
            if(value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value; //Copies arena at correct offset--> add T out of Ones into arena table
            }
        });
    });
}

/*-----------------------------------
    PLAYER DROPS
-----------------------------------*/
function playerDrop() { // trigger drop function
    player.pos.y++; // move one down

    if (collide(arena, player)) {//check if collides
        player.pos.y--; // move player one back up
        merge(arena, player); // add to table
        playerReset(); // run playerReset and generate random new piece
        arenaSweep();
        updateScore();
    }

    dropCounter = 0; // reset counter so that controlled dropping possible
}

/*-----------------------------------
    MOVE FUNCTION
-----------------------------------*/
function playerMove(direction) {
    player.pos.x += direction; //moves the player in the in the liked position

    if(collide(arena, player)) {
        player.pos.x -= direction; //goes back if collides
    }
}

/*-----------------------------------
    RESET TO SPAWN NEW STONE
-----------------------------------*/
function playerReset() {
    const pieces = 'TOLJISZ'; // String to iterate over
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]); //Random generator floored ('| 0') ---> gets a Letter and resets player matrix
    player.pos.y = 0; // spawn at the top
    player.pos.x =  (arena[0].length / 2 | 0) - 
                    (player.matrix[0].length / 2 | 0); // align center by dividing by Two to get center of each the row und and the matrix length at y index 0;

    if(collide(arena, player)) { // if arena and player collides at top --> clears field

        arena.forEach(row => row.fill(0)); // clear arena

        player.score = 0;
        player.level = 1;
        dropInterval = 1000;
        
        updateScore();
        updateStats();
        
        alert('YOU LOST!');
    }
}

/*-----------------------------------
    TRIGGER ROTATE FUNCTION
-----------------------------------*/
function playerRotate(direction) {

    let offset = 1; // set  an default offset to 1
    const position = player.pos.x;

    rotate(player.matrix, direction); // call rotate function

    while(collide(arena, player)) { // As long as collide function is true between the players matrix and the arena
        player.pos.x += offset; 

        offset = -(offset + (offset > 0 ? 1 : -1)); // if offset bigger than 0 return 1.. else -1

        if(offset > player.matrix[0].length) { // if offset is out of arena... to big
            rotate(player.matrix, -direction); // move back
            player.pos.x = position; // get back into the correct position
            return;
        }
    }
}

/*-----------------------------------
    ROTATE FUNCTION

    |0||0||0|   
    |1||1||1|
    |0||1||0|
-----------------------------------*/
function rotate(matrix, direction) { // pass players matrix
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < y; x++){
        [
            matrix[x][y], // x: 1 y: 2
            matrix[y][x] // y: 2 X: 1
        ]
        =                       // TUPLE SWITCH --> MIRRORS THE WHOLE PLAYSTONE
        [
            matrix[y][x], // y:2 x: 1
            matrix[x][y]  // x: 1 y: 2
        ]
            
        }
    }
    
         if(direction > 0) { // PRESS W
            matrix.forEach(row => row.reverse()); // reverse method.. first array value becomes last and last first
        } else { //PRESS Q
            matrix.reverse();
        }
}

/*-----------------------------------
    UPDATE GAME
-----------------------------------*/
let dropCounter = 0; // counts from 0 to 1000--> when reaches 1000 1s has passed
let dropInterval = 1000; // milliseconds --> every 1 sec we drop a piece on the stack (drop downwards)

let initialTime = 0;

//adding update function to update the objects position anytime
function update(time = 0) {
    const deltaTime = time - initialTime; // get time difference between actual time and inital time
    initialTime = time; // set initial time to timeframe passsed
    
    dropCounter += deltaTime; //add deltaTime Counter to dropcounter -> if bigger tha 1000ms drop player
        if(dropCounter > dropInterval) {
        playerDrop();
    }

    draw(); // invoces draw() at every update--> draws differently if playerDrop() gets invoced
    requestAnimationFrame(update); // method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation
}

/*-----------------------------------
    OTHER UPDATES
-----------------------------------*/
function updateScore(){
    document.getElementById('score').innerText = player.score; // set player score inner text
}

function updateLevel() {
    document.getElementById('level').innerText = player.level;
}

function updateStats() {
    updateScore();
    updateLevel();
}

 /*-----------------------------------
    ADDING COLOR ARRAY
-----------------------------------*/
const colors = [
    null, //0
    'red', //1
    '#05e2ff', //2
    '#fbff00', //3
    '#1aff00', //4
    '#7300ff', //5
    '#ffae00', //6
    '#ff00b7' //7
]

/*-----------------------------------
    ADDING ARENA
-----------------------------------*/
const arena = createMatrix(12, 20);
console.log(arena); //show arrays
console.table(arena); //show table of arrays

/*-----------------------------------
    ADDING PLAYER
-----------------------------------*/
const player = { // adding player object
    pos: {x: 0, y: 0}, // determining position
    matrix: null, //setting the matrix
    score: 0,
    level: 1
}

/*-----------------------------------
    ADDING KEYDOWNS EVENTLISTENERS
-----------------------------------*/
document.addEventListener('keydown', event => { //adding key events
    /*console.log(event);*/ // showing the keyCode --> go to 'http://pomle.github.io/keycode/'
    if(event.keyCode === 37) { //37 is keycode for left button
        playerMove(-1); // to the left
    } else if(event.keyCode === 39){ // 39 for the right
        playerMove(1); //1 = to the right
    } else if(event.keyCode === 40){
        playerDrop();
    } else if(event.keyCode === 81) { // PRESS Q
        playerRotate(-1);
    } else if(event.keyCode === 87) { // PRESS W
        playerRotate(1);
    }
});

playerReset();
updateStats();
update();