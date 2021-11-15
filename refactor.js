// use class syntax 
	// for better organisation and to be inline with modern JS
// use 'let' and 'const' keywords for variable names 
	// to better define the intent, to be inline with modern JS, and to use their scoping features 
class TennisGame1 {

	// define ScoreType enum
		// it gives readability, better auto-completion and prevention from typing errors
		// it follows DRY
	// make it static 
		// so it can be accessed from any instance 
	// make it private 
		// so it is not exposed and used only for internal purposes
	static #ScoreType = {
		0: 'Love',
		1: 'Fifteen',
		2: 'Thirty',
		3: 'Forty'
	}

	// define more readable field names and also using camelCasing for player scores 
	// make them private 
		// so they are not exposed and scores cannot be directly manipulated from outside
	#player1Score
	#player2Score

	// at instantiation give player1Name and player2Name a default name for fallback
	constructor(player1Name='player1', player2Name='player2'){
    this.#player1Score = 0;
    this.#player2Score = 0;
		this.player1Name = player1Name; 
		this.player2Name = player2Name;
	}

	// make winPoint public method to increment score for a given player
	// the code is refactored
	// if is corrected 
		// prevously if compared the name argument to a hardcoded 'player1' 
		// it should check against player1Name instance variable
	// else is corrected
		// it was catching all values 
		// even if the value were other than firstPlayer or secondPlayer name it would still change the player2 score which was incorrect
	// returns latest score after a player wins a point
	winPoint(playerName){
		switch(playerName){
			case this.player1Name:
				this.#player1Score += 1;
				break;
			case this.player2Name:
				this.#player2Score += 1;
				break;
		}
		return this.getScore();
	}

	// define resetGame 
		// it resets scores and thus the game when any player wins
	// make it private 
		// so it cannot be called from outside and game cannot be accidentaly reset
	#resetGame(){
		this.#player1Score = 0;
		this.#player2Score = 0;
	}

	// define getEqualScore helper function
		// to handle all cases where player scores are equal
	// it uses ScoreType enum 
		// to avoid typing errors and get better autocompletion
	// make it private 
		// so it can only be uses internally
	#getEqualScore(){
		switch (this.#player1Score) {
      case 0:
        return `${TennisGame1.#ScoreType[0]}-All`;
      case 1:
        return `${TennisGame1.#ScoreType[1]}-All`;
      case 2:
        return `${TennisGame1.#ScoreType[2]}-All`;
      default:
        return 'Deuce';
	  }
	}

	// define getMatchScore helper function
		// to handle all cases after deuce when any player has advantage or match point
	// make it private 
		// so it can only be used internally
  // resets game when any player wins
  // uses player names in a score string rather than player1 or player2
	#getMatchScore(){
		let player1ScoreDiff = this.#player1Score - this.#player2Score;
		if(player1ScoreDiff === 1 || player1ScoreDiff === -1){
			const winner = player1ScoreDiff === 1 ? this.player1Name : this.player2Name;
			return `Advantage ${winner}`
		}else {
    	const winner = player1ScoreDiff >= 2 ? this.player1Name : this.player2Name;
    	this.#resetGame();
    	return `Win for ${winner}`;
    }
	}

	// define getUnequalScore helper function 
		// to handle all cases when scores are not equal and not deuce
	// it uses ScoreType enum 
		// to avoid typing errors and get better autocompletion
	// make it private 
		// so it can only be used internally
	#getUnequalScore(){
		let score = '';
		Array(2).fill().forEach((_, i) => {
			let playerScore = 0;
			if (i === 0) playerScore = this.#player1Score;
      else {
        score += "-";						
        playerScore = this.#player2Score;
      }
      switch (playerScore) {
        case 0:
          score += TennisGame1.#ScoreType[0];
          break;
        case 1:
          score += TennisGame1.#ScoreType[1];
          break;
        case 2:
          score += TennisGame1.#ScoreType[2];
          break;
        case 3:
          score += TennisGame1.#ScoreType[3];
          break;
      }
		})
	  return score;
	}

	// define getScore method 
		// to get current score of the game
	// it refactors the previously witten function 
		// by breaking the logic into three private helper functions handling three different types of cases
		// it makes those helper functions and this function more readable and extensible
	// make it public 
		// so only this master function is accessible externally and returns the score
	getScore(){
		if(this.#player1Score === this.#player2Score){
			return this.#getEqualScore();
		}else if(this.#player1Score >= 4 || this.#player2Score >= 4){
			return this.#getMatchScore();
		}else{
			return this.#getUnequalScore();
		}
	}
}





