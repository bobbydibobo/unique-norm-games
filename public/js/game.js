
/*-----------------------------------
    THE CARDS
-----------------------------------*/
const firstCard = document.getElementById('cardOne');
const secondCard = document.getElementById('cardTwo');
const thirdCard = document.getElementById('cardThree');

const arrayCards = [firstCard, secondCard, thirdCard]; // put all cards into an array --> querySelectorAll would have helped probably

/*-----------------------------------
    THE CONTAINERS
-----------------------------------*/
const firstCon = document.getElementById('conOne');
const secondCon = document.getElementById('conTwo');
const thirdCon = document.getElementById('conThree');

const arrayContainers = [firstCon, secondCon, thirdCon]; // same thing here but for the Containers

/*-----------------------------------
    ELEMENTS INSIDE THE A CARD
-----------------------------------*/
const titles = document.querySelectorAll('.cardTitle');
const images = document.querySelectorAll('.cardImg');
const playButtons = document.querySelectorAll('.cardBtn');

/*-----------------------------------
    ACTIVATE LOOP
-----------------------------------*/
arrayContainers.forEach(container => { // loop over all conatiners in the array
    container.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX) / 23; //could log pageX and Y in order to see the position of mouse
        let yAxis = (window.innerWidth / 2 - e.pageY) / 23;

        //console.log(e.pageX + " " + e.pageY);
    
        arrayCards[arrayContainers.indexOf(container)].style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`; // implement rotation animation by using the position X and Y of the mouse hovering over the page
    });
  });

  /*-----------------------------------
    AVOID LOOP
-----------------------------------*/
  arrayContainers.forEach(container => {
    container.addEventListener('mouseenter', (e) => {
        arrayCards[arrayContainers.indexOf(container)].style.transition = 'none'; //no transition in only out

        //3D ON
        titles[arrayContainers.indexOf(container)].style.transform = 'translateZ(30px)';
        images[arrayContainers.indexOf(container)].style.transform = 'translateZ(80px)';
        playButtons[arrayContainers.indexOf(container)].style.transform = 'translateZ(5px)';
    });
});

/*-----------------------------------
    RESET LOOP
-----------------------------------*/
arrayContainers.forEach(container => {
    container.addEventListener('mouseleave', (e) => {
        arrayCards[arrayContainers.indexOf(container)].style.transition = "all 1s ease"; // transition when moving away
        arrayCards[arrayContainers.indexOf(container)].style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
});