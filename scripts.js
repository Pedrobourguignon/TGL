let listGames = [];
let listOfNumbers = [];
let selectedGame = {
    type:''
}
let selectedNumber = [];
let cartList = [];


function initialGameSelect(){
    return document.querySelector('.button-of-games').click();
}

function createButtonsForGame(){
    const $divListGames = document.getElementsByClassName("list-of-games")[0];
    listGames[0].forEach(element => {
        let btn = document.createElement("button");
        btn.innerText = element.type;
        btn.style.color = element.color;
        btn.style.border = `solid ${element.color}`;
        btn.setAttribute('class', 'button-of-games'); 
        btn.value = element.type;
        btn.setAttribute('game-type-is-selected', 'false');
        $divListGames.appendChild(btn);
    });
    hendlerGameClick();
}

function getAllGames(){
    var ajax = new XMLHttpRequest();
    ajax.open('GET', 'games.json', true);
    ajax.send()
  
    ajax.onreadystatechange = () => {
      if (ajax.readyState === 4 && ajax.status ===200){
        listGames.push(JSON.parse(ajax.responseText).types);
        createButtonsForGame();
        initialGameSelect();

      }
    }
  }

  getAllGames();


function hendlerGameClick(){
    const buttons = document.getElementsByClassName('button-of-games');
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', () => {
            if (selectedGame.type === buttons[i].value){
                return;
            }
            clearButtonStyle();
            selectedGame = listGames[0].find(game =>
                game.type === buttons[i].value 
                );
             buttons[i].style.color = '#fff';
             buttons[i].style.background = selectedGame.color;
             createDescriptionForGames();
             createNumbersForGame();
             selectedNumber = [];
        })
     }

}

function clearButtonStyle(){
    const pastGame = document.querySelectorAll('.button-of-games');
    pastGame.forEach(item =>{
        if(item.value === selectedGame.type){
            item.style.color = selectedGame.color;
            item.style.background = '#fff';
        }
    }) 
}

function createDescriptionForGames(){
    const description = document.getElementsByClassName("description")[0];
    const gameName = document.getElementsByClassName('game-bet-text')[0];
        description.innerText = selectedGame.description;
        gameName.innerText = selectedGame.type;
    }

function createNumbersForGame(){
    const $divNumberGame = document.getElementsByClassName('games-list-numbers')[0];
    $divNumberGame.innerHTML = '';
    for (let i = 1; i <= selectedGame.range; i++){
        let newButton = document.createElement('button');
        newButton.value = formatNumberOfButtons(i);
        let newButtonText = document.createTextNode(formatNumberOfButtons(i));
        newButton.appendChild(newButtonText);
        $divNumberGame.appendChild(newButton);
        newButton.setAttribute('class', 'number-button')
    }
    selectedNumbers();
}

function formatNumberOfButtons(number){
    let formated = number < 10 ? `0${number}` : number;
    return formated;
}

function selectedNumbers(){
    let limit = selectedGame['max-number'];
    const numbers = document.getElementsByClassName('number-button');
    for(let i = 0; i < numbers.length ; i++){
        numbers[i].addEventListener('click', () => {
            if (selectedNumber.length >= limit){
               return alert("você passou do limite");
            }
            if(!selectedNumber.find(element => element === numbers[i].value)){ 
                numbers[i].style.background = 'red';
                selectedNumber.push(numbers[i].value);
            }
            else{
                numbers[i].style.background = 'white';
                selectedNumber.splice(numbers[i].value);
            }
        })

    }  
}

function generateRandomNumbers(Max){
    return String (formatNumberOfButtons(Math.ceil(Math.random() * Max)));
}


function randomNumbersForButton(){
    let limit = selectedGame.range;
    while (selectedNumber.length < selectedGame['max-number']){
        let randomNumber = String(generateRandomNumbers(limit));
        if(selectedNumber.indexOf(randomNumber) === -1 ){
            var $numberButton = document.querySelector('[value="' + randomNumber + '"]');
            $numberButton.click();
          }
    }
}

function clearAllButtons(){
    const btn = document.getElementsByClassName('number-button');
    for(let i = 0; i < btn.length; i++){
        btn[i].style.background = 'white';
        selectedNumber.splice(btn[i].value);
    }
}


function completeGameButton(){
    const completeButton = document.getElementsByClassName('completegame')[0];
    completeButton.addEventListener('click', () => {
        randomNumbersForButton();
    })
}
completeGameButton();



function clearGameButton(){
    const clearButton = document.getElementsByClassName('cleargame')[0];
    clearButton.addEventListener('click', () => {
        clearAllButtons();
    })
    
}
clearGameButton();


function cartButton(){
    const btn = document.getElementsByClassName('number-button');
    cartList.push(selectedNumber);
}

function cart(){
    const cartBtn = document.getElementsByClassName('cart-button')[0];
    cartBtn.addEventListener('click', () => { 
    cartButton();
    gameList();
    cartList.splice(selectedNumber);
    })
}
cart();

function gameList(){
    const $divcart = document.getElementsByClassName('cart-list')[0];
        let newList = document.createElement('p');
        newList.innerText= cartList + selectedGame.type + 'R$' + selectedGame.price;
        $divcart.appendChild(newList);

}


