// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

const vowels = ['A', 'E', 'I', 'O', 'U'];

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   // console.log("Let's play some scrabble! Enter a word:");
   let word = input.question("Let's play some scrabble! Enter a word: " );
   // console.log(oldScrabbleScorer(word));
   return word;
};

let simpleScorer = function(input) {
   return input.length;
};

let vowelBonusScorer = function(input) {
   let score = 0;
   let word = input.toUpperCase();
   for (let i=0; i<word.length; i++) {
      let letter = word[i];
      // console.log(`Scoring letter ${letter}:`)
      if (vowels.includes(letter)) {
         score += 3;
         // console.log(`\t${letter} scores 3 points.`);
      }
      else {
         score++;
         // console.log(`\t${letter} scores 1 point.`);
      }
   }
   return score;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i=0; i<word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
};


// console.log(vowelBonusScorer('piNEaPple'));
let simpleAlg = {
   'name': 'Simple Score',
   'description': 'Each letter is worth 1 point.',
   'scorerFunction': simpleScorer,
};

let vowelAlg = {
   'name': 'Bonus Vowels',
   'description': 'Vowels are 3 pts, consonants are 1 pt.',
   'scorerFunction': vowelBonusScorer,
};

let scrabbleAlg = {
   'name': 'Scrabble',
   'description': 'The traditional scoring algorithm.',
   'scorerFunction': scrabbleScorer,
};


const scoringAlgorithms = [simpleAlg,vowelAlg,scrabbleAlg];

function scorerPrompt() {
   let choice = input.question('\nChoose a scoring algorithm: \n\n0 - Simple Score\n1 - Bonus Vowels\n2 - Scrabble\nEnter 0, 1, or 2: ');
   return scoringAlgorithms[choice];

}

function transform(input) {
   let newStructure = {};
   
   for (oldKey in input) {
      let tempArray = input[oldKey];
      for (let i=0; i<tempArray.length; i++) {
         newStructure[tempArray[i].toLowerCase()] = Number(oldKey);
      }
   }
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);




function runProgram() {
   let word = initialPrompt();
   let score = scorerPrompt().scorerFunction(word);
   console.log(`Score for ${word}: ${score}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
