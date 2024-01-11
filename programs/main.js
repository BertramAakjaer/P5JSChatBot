// Henter de to lister over predefinerede svar og spørgsmål fra q_a_Database.js
var wordToFind = getQuestions();
var wordsToAnswer = getAnswers();

function setup() {
  createCanvas(800, 800);

  // Tegner alle de elementer der bruges i GUI'en
  spawnUI();
}

function draw() {
  // Registrerer når der trykkes på knapperne i GUI'en
  clearButton.mousePressed(clearScreen);
  submitButton.mousePressed(generateAnswer);
}


/*

  Afsnit med alle funktioner der bruges i scriptet

*/


// Generer et svar fra input feltet
function generateAnswer() {
  let inputValue = input.value();
  input.value(" ");

  printAnswerHandler(inputValue, "User");
  printAnswerHandler(answerExtractor(inputValue), "ChatBot");
}

// Udpiller svaret fra listen ved at sammenligne den givne string med dem fra den kendte liste
function answerExtractor(rawInput) {

  // Finder index'et for det element i de kendte lister der passer med den givne spørgsmåls string
  let keyWordIndex;
  for (let i = 0; i < wordToFind.length; i++) {
    
    if (textInText(wordToFind[i], rawInput)){
      console.log("true: " + i);
      keyWord = wordToFind[i];
      keyWordIndex = i;
      break;
    }
  }

  if (keyWordIndex == undefined) {
  return "Jeg kunne desværre ikke svare på dit spørgsmål, bedre held næste gang :3";
  }

  return stringMerger(rawInput, keyWordIndex);
}

// Sammensætter to strings ved at kende indexet på svar og spørgsmåls string ved brug af lister
function stringMerger(_rawInput, _keyWordIndex){

  // Tager spørgsmål stillet og de forud kreeret svar og sammensætter for at få et unikt svar
  wordsInQuestion = _rawInput.split(" ");
  keyWordList = wordToFind[_keyWordIndex].split(" ");

  // Finder det sidste led der indeholder noget af spørsgmålet så det kan fjernes
  let indexForKey;
  for (let i = 0; i < wordsInQuestion.length; i++) {

    // Tjekker om den sidste placering i den predefinerede liste er den sammen som nuværende element i den variable liste
    if (wordsInQuestion[i].toLowerCase() == keyWordList[keyWordList.length - 1].toLowerCase()){
      indexForKey = (i + 1);
      break;
    }
  }

  if (indexForKey == undefined){ return "Der er opstået en fejl :'("; }

  // Sammensætter listerne og starter forloop'et ved det sidste vigtige element i listen
  let toStringList = [];
  for (let i = indexForKey; i < wordsInQuestion.length; i++){
  toStringList.push(wordsInQuestion[i]);
  }

  // Retunerer det predefinerede svar med listen sammensat til string
  return (wordsToAnswer[_keyWordIndex] + toStringList.join(" "));
}

// Tjekker om en string indeholder en anden string
function textInText(a, b) {
  console.log("Tjekker string")
  a = a.toLowerCase();
  b = b.toLowerCase();

  for (let i = 0; i < a.length; i++){
    for (let l = 0; l < b.length; l++){

      if (a[i] != b[l]){ continue; }

      if (a == b.substring(l, l + a.length)) { return true; }

    }
  }
  return false;
}

// Sammensætter tidligere svar med nye og navngiver afsenderen
function printAnswerHandler(toPrint = "Error", writer = "User") {

  // Retunere funktionen hvis der ikke er noget ordentligt input
  if (toPrint === "Error") { answerDisplay.html(toPrint); return; }

  let preExisting = answerDisplay.html();
  let newChat = "";

  // Indsætter det nye svar i string med afsender skrevet på
  if (writer == "User"){ newChat = "<i>"; } else { newChat; }
  newChat += ("<b>" + writer + "</b>" + "<br>" + toPrint + "<br>" + "<br>");
  if (writer == "User"){ newChat += "</i>"; }

  newChat += preExisting;

  answerDisplay.html(newChat);
}

// Rydder kun inputtet af GUI'en
function clearScreen(){
  
  input.value(" ");
  answerDisplay.html(" ");
}

// Funktion der rydder skærmen og kan gemme noget text til input, hvis det ønskes
function spawnUI() {

  // Opretter input til UI
  input = createInput();
  input.size(400, 20);
  input.position(width/2 - 280, height/2 - 300);

  // Generer knap til at rydde skærm
  clearButton = createButton('Clear');
  clearButton.style('color: white; background-color: rgb(29,114,86);');
  clearButton.position(input.x + input.width, height/2 - 300);

  // Generer knap til at indsende spørgsmål
  submitButton = createButton('Send sprøgsmål');
  submitButton.style('color: rgb(29,114,86); background-color: white;');
  submitButton.position(input.x + clearButton.width + input.width, height/2 - 300);

  // Opretter område til at fremvise tekst
  answerDisplay = createP();
  answerDisplay.style('color: rgb(29,114,86); background-color: white;');
  answerDisplay.size(width - 100, 1000);
  answerDisplay.position(50, height/2 - 250);
}