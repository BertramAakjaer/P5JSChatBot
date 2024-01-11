// Retunerer liste over mulige spørgsmål
function getQuestions(){
    var wordToFind = [
        "Kan du",
        "Kan jeg",
        "Du er",
        "Jeg er",
        "Hvad",
        "Jeg kan",
        "Mit navn er",
        "Nicolaj",
        "Er du",
        "Hej",
        "Vil du",
        "Hvem er"
      ];

      return wordToFind;
}

// Retunerer liste over mulige svar til spørgsmål
function getAnswers(){
    var wordsToAnswer = [
      "Selvfølgelig kan jeg ",
      "Du er den bedste, selvfølgelig kan du ",
      "Hvad mener du med at jeg er ",
      "Hvorfor mener du at du er ",
      "Jeg ved ikke hvad ",
      "Hvorfor kan du ",
      "Hej ",
      "This is a easter egg!",
      "Jeg ved ikke om jeg er ",
      "Halløjsa lille ven!!",
      "Jeg vil med glæde ",
      "Du kender selv "
    ];
    
    return wordsToAnswer;
}