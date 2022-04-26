let listGames = [];
let cart = [];
let listOfNumbers = [];
let selectedGame = [];
let $divListGames = getElement('[class=list-of-games]');
var $divNumberGame = getElement('[class="games-list-numbers"]');


function getElement(attributes){
  return document.querySelector(attributes);
}

function initialGameSelect(){
  return document.querySelector('[class="choose-game-button"]').click();
}

function getAllGames(){
  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'games.json', true);
  ajax.send()

  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4 && ajax.status ===200){
      listGames.push(JSON.parse(ajax.responseText).types);
      createGamesListButtons();
      initialGameSelect();
    }
  }
  createEventForButtonOptions();
}

function createGamesListButtons(){
  listGames[0].map(game => {
    let newButton = document.createElement('button');
    let newButtontext = document.createTextNode(game.type);
    newButton.appendChild(newButtontext);

    newButton.setAttribute('class', 'choose-game-button');
    newButton.setAttribute('game-type', game.type);
    newButton.setAttribute('game-type-is-selected', 'false');

    newButton.style.border = `solid ${game.color}`;
    newButton.style.color = game.color;
    
    $divListGames.appendChild(newButton);
  })  
  let $buttonSelectedGame = document.querySelector('[class="choose-game-button"]');
  createEventForButtonGames($buttonSelectedGame);
}

function createEventForButtonGames(buttons){
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      resetDataButtons();
      event.preventDefault();
      setSelectedGame(button.getAttribute('game-type'))
      button.style.color = '#fff';
      button.style.background = selectedGame[0].color;
      addGameDescription();
      createNumbersForGame();
    })
  })
}

function createEventForNumberButton(buttons){
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      if(listOfNumbers.indexOf(String(button.innerHTML)) !== -1){
        button.style.background = '#ADC0C4';
        let numberIndex = listOfNumbers.indexOf(button.innerHTML);
        listOfNumbers.splice(numberIndex, 1);
      } 
      else if(listOfNumbers.length >= selectedGame[0]['max-number']){
        return alert('Quantidade de números máxima selecionada!')
      }
      else {
        button.setAttribute('number-option-is-selected', 'true');
        button.style.background = '#27c383';
        listOfNumbers.push(button.innerHTML);
      }
    })
  })
}

function resetDataButtons(){
  listOfNumbers = [];
  let $buttonSelectedGame = document.querySelectorAll('[class="choose-game-button"]');
  $buttonSelectedGame.forEach(button => {
    let game = listGames[0].filter(game => game.type === button.getAttribute('game-type'));
    button.style.border = `solid ${game[0].color}`;
    button.style.color = game[0].color;
    button.style.background = '#fff';
  })
  clearSelectedNumbers();
}

function clearSelectedNumbers(){
  listOfNumbers = [];
  let $numbersSelected = document.querySelectorAll('[class="number-option"]');
  $numbersSelected.forEach(number => {
    number.style.background = "#ADC0C4"
  })
}

function setSelectedGame(gameName){
  selectedGame = listGames[0].filter(game => game.type === gameName);
}

function addGameDescription(){
  let $gameDescription = getElement('[class ="game-description"]');
  let $gameBetName = getElement('[class = "game-bet-text"]');
  $gameBetName.innerHTML = selectedGame[0].type;
  $gameDescription.innerHTML = selectedGame[0].description;
}

function createNumbersForGame(){
  $divNumbergame.innerHTML = '';
  for (let i = 1; i <=selectedGame[0].range; i++){
    let newButton = document.createElement('button');
    let newButtonText = document.createTextNode(formatNumberOfButtons(i));
    newButton.appendChild(newButtonText);

    newButton.setAttribute('class', 'number-option');
    newButton.setAttribute('value', formatNumberOfButtons(i));
    newButton.setAttribute('number-option-is-selected', 'false');

    $divNumberGame.appendChild(newButton);
  }
  let $allNumberButtons = document.querySelectorAll('[class = "number-option"]');
  createEventForNumberButton($allNumberButtons);
}

function formatNumberOfButtons(number){
  let formated = number < 10 ? `0${number}` : number;
  return formated;
}

function generateRandomNumbers(numberMax){
  return String(formatNumberOfButtons(Math.ceil(Math.random() * numberMax)));
}

function completeRandomNumers(){
  
}