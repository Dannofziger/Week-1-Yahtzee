'use strict'

/*
Thanks for the idea u/Cosmologicon!
https://www.reddit.com/r/dailyprogrammer/comments/dv0231/20191111_challenge_381_easy_yahtzee_upper_section/

I'm going to try and make an algorithm that'll optimize a game of Yahtzee
*/

//First we have to make a die rolling function
const roll = function(keeps){
	//Store our resulting rolls as an array
	let result = [];
	if(!keeps){
	//Roll all 5(?) dice
		for (let i = 0; i < 5; i++) {
			//Roll an integer from 1 to 6 and add it to our array
			result.push(Math.floor(Math.random()*6) + 1);
		}
	} else if(keeps){
		result = keeps;
		let length = 5 - keeps.length;
		for (let i = 0; i < length; i++){
			let die = Math.floor(Math.random()*6) + 1;
			result.push(die);
		}
	}

	//Finally, return our resulting roll
	return result
}

//Let's figure out the value for our roll.

//There are many different scoring spots on our card, so let's focus on the
//upper section first (1-6)

let scoreCard = [0, 0, 0, 0, 0, 0];

//The first thing to do is add up our different possible scores and determine
//what gives us the most points. This is terrible and will not be used for long

const score = function(result){
	//Break up the array into arrays of the same value
	//Instantiate the arrays we will use to house each die
	//Maybe we could instead just count and have these be integers, but for now
	//we just use buckets because I like it :)

	let ones   = {
		val  : 0,
		dice : [],
	};

	let twos   = {
		val  : 0,
		dice : [],
	};

	let threes = {
		val  : 0,
		dice : [],
	};

	let fours  = {
		val  : 0,
		dice : [],
	};

	let fives  = {
		val  : 0,
		dice : [],
	};

	let sixes  = {
		val  : 0,
		dice : [],
	};


	//Iterate and sort
	for (let i = result.length - 1; i >= 0; i--) {
		//Switch statement to determine where each value should go? Sure.
		//Could also push just the number and not call result[i] each time...
		//Let's deternime value here rather than adding the array later
		switch(result[i]) {
			case 1:
				ones.dice.push(result[i]);
				ones.val += 1;
				break;
			case 2:
				twos.dice.push(result[i]);
				twos.val += 2;
				break;
			case 3:
				threes.dice.push(result[i]);
				threes.val += 3;
				break;
			case 4:
				fours.dice.push(result[i]);
				fours.val += 4;
				break;
			case 5:
				fives.dice.push(result[i]);
				fives.val += + 5;
				break;
			case 6:
				sixes.dice.push(result[i]);
				sixes.val += 6;
		}
	}
	

	// Now that we have tallied scores, we need to actually determine the
	//best course of action

	//We can start by comparing the ideal score for each spot and seeing
	//how close our dice are to achieving that score (or overachieving).
	//Interestingly, that ideal score is 3 dice of a kind so it's easier
	//to use the arrays rather than the tallied scores.

	//We can make a function that will take all 6 objects and tell us which
	//has a greater number of dice
	let keeps = bestDie([ones, twos, threes, fours, fives, sixes]);
	//'keeps' is an array holding all the best dice. We can reroll keeping
	//those
	console.log('rolled ' + result);
	console.log('keeping  ' + keeps.dice);
	return keeps

}

const bestDie = function(dieArr){
	//Instantiate the variable that holds the greatest valued object
	let greatest;
	for (var i = scoreCard.length - 1; i >= 0; i--) {
		//
		if(scoreCard[i] == 0){
			greatest = dieArr[i];
		}
	}
	for (var i = dieArr.length - 1; i >= 0; i--) {
		//If this is our first value, then we have nothing to compare it to
		if((dieArr[i].dice.length >= greatest.dice.length)&&(scoreCard[i] == 0)){
			//We want to prefer larger die values, so it's greater than or equal
			greatest = dieArr[i];
		}
	}
	return greatest
}

const round = function(){
	//Here we roll the three times alotted by the rules
	let output = {};
	for (var i = 0; i < 3; i++) {
		console.log('roll ' + i);
		//Score the roll
		output = score(roll(output.dice));
	}
	if (!output) {

	}
	return output
}

const game = function(){
	//While any part of the score card is not filled out, we should keep going
	while ( scoreCard[0] == 0 || 
			scoreCard[1] == 0 || 
			scoreCard[2] == 0 || 
			scoreCard[3] == 0 || 
			scoreCard[4] == 0 || 
			scoreCard[5] == 0){
		let score = round();
		switch(score.dice[0]) {
			case 1:
				scoreCard[0] = score.val;
				break;
			case 2:
				scoreCard[1] = score.val;
				break;
			case 3:
				scoreCard[2] = score.val;
				break;
			case 4:
				scoreCard[3] = score.val;
				break;
			case 5:
				scoreCard[4] = score.val;
				break;
			case 6:
				scoreCard[5] = score.val;
				break;
			default:
				//If there is no die that we can keep,
				//set it to -1 to denote that it's crossed out
				for (var i = 0; i < scoreCard.length; i++) {
					if(scoreCard[i] == 0){
						scoreCard[i] = -1;
						break;
					}
				}
		}
		console.log('----------------');
	}
	//Tally up the total score
	let scoreCardScore = 0
	for (var i = scoreCard.length - 1; i >= 0; i--) {
		//Let's handle the crossed out sections and correct their value
		if(scoreCard[i] == -1){
			scoreCard[i] = 0;
		}
		//Add score to tally
		scoreCardScore += scoreCard[i];
	}
	console.log(scoreCard);
	return scoreCardScore
}

console.log(game());
