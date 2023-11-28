let wordToFind = getQuestions();
let wordsToAnswer = getAnswers();

function setup() {
  createCanvas(800, 800);

  clearScreen();
}

function draw() {
  
  button.mousePressed(clearScreen);
  button2.mousePressed(generateAnswer);

}



function generateAnswer() {
  let inputValue = input.value();
  clearInput();

  printAnswerHandler(inputValue, "User");
  printAnswerHandler(answerFinder(inputValue), "AI");
}


function answerFinder(a) {
  let keyWord = "";
  let keyWordIndex;

  for (let i = 0; i < wordToFind.length; i++) {
    
    if (textInText(wordToFind[i], a)){
      console.log("true: " + i);
      keyWord = wordToFind[i];
      keyWordIndex = i;
      break;
    }
  }




  if (keyWordIndex == undefined) {
  return "Jeg kunne desværre ikke svare på dit spørgsmål, bedre held næste gang :3";
  }



  wordsInQuestion = a.split(" ");
  keyWordList = keyWord.split(" ");


  let indexForKey;

  for (let i = 0; i < wordsInQuestion.length; i++) {
    console.log(keyWordList[keyWordList.length - 1].toLowerCase());
    console.log(wordsInQuestion[i].toLowerCase());

    if (wordsInQuestion[i].toLowerCase() == keyWordList[keyWordList.length - 1].toLowerCase()){
      indexForKey = (i + 1);
      break;
    }
}





  if (indexForKey == undefined){
  return "Der er opstået en fejl :'(";
  }



  let toStringList = [];

  for (let i = indexForKey; i < wordsInQuestion.length; i++){
  toStringList.push(wordsInQuestion[i]);
  }


  console.log(toStringList)
  return (wordsToAnswer[keyWordIndex] + toStringList.join(" ") + "?");
}


// Tjekker om en string indeholder en anden string
function textInText(a = "h", b = "hej") {
  console.log("Tjekker string")
  a = a.toLowerCase();
  b = b.toLowerCase();

  for (let i = 0; i < a.length; i++){
    for (let l = 0; l < b.length; l++){
      if (a[i] != b[l]){
        continue;
      }

      if (a == b.substring(l, l + a.length)) {
        console.log(b.substring(l, l + a.length));
        return true;
      }
    }
    return false;
}
}



function printAnswerHandler(toPrint = "Error", writer = "User") {
  if (toPrint === "Error") { answerDisplay.value(toPrint); return; }

  let preExisting = answerDisplay.html();

  let newChat = "";

  if (writer == "User"){ newChat = "<i>"; } else { newChat; }
  newChat += ("<b>" + writer + "</b>" + "<br>" + toPrint + "<br>" + "<br>");
  if (writer == "User"){ newChat += "</i>"; }

  newChat += preExisting;

  answerDisplay.html(newChat);
}


function clearInput(){
  input = createInput();
  input.size(400, 20);
  input.position(width/2 - 280, height/2 - 300);
}

// Funktion der rydder skærmen og kan gemme noget text til input, hvis det ønskes
function clearScreen() {
  //background(200);

  // Opretter input til UI
  input = createInput();
  input.size(400, 20);
  input.position(width/2 - 280, height/2 - 300);

  // Generer to knapper til input
  fill(255, 0, 0);
  button = createButton('Clear');
  button.style('color: white; background-color: rgb(29,114,86);');
  button.position(input.x + input.width, height/2 - 300);

  button2 = createButton('Send sprøgsmål');
  button2.style('color: rgb(29,114,86); background-color: white;');
  button2.position(input.x + button.width + input.width, height/2 - 300);

  answerDisplay = createP();
  answerDisplay.style('color: rgb(29,114,86); background-color: white;');
  answerDisplay.size(width - 100, 1000);
  answerDisplay.position(50, height/2 - 250);
}