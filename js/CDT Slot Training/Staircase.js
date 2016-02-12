//Staircase

const CORRECT = 1;
const INCORRECT = 0;
const MISSING = -9999;

var Staircase = {

	level: 1,
	correct: 0,
	incorrect: 0,
	missing: 0,
	responseShift: 0,
	constant: 1,
	stepSize: 1,
	targetProbability: 0.79, //Consider
	previousResponse: null,
	
	accumulate: function(response){
	
		if (response == CORRECT) {
			this.correct++;
		} else if(response == INCORRECT) {
			this.incorrect++;
		} else if (missing) {
			this.missing++;
		} else {
			out("Error wrong response type in staircase.accumulate");
		}
	},
	applyRule: function(Z) {
		//Accelerated Stochastic Approximation
		// Where Z is the response (0,1)
		var C = this.constant;
		var s = this.stepSize;
		var m = this.responseShift;
		var phi = this.targetProbability;
		var level = this.level;
		var nextLevel = 2; //Defaults to level 2

		nextLevel = level - c / (2 + m) * (Z - phi);
		nextLevel = round(nextLevel);

		if (nextLevel < 1) {		
			nextLevel = 1;	//Floor
		}

		return nextLevel;
	},
	countShifts: function(response) {
		if (response == null) {
			return null;
		} else if (response == this.previousResponse) {
			var shifts = true;		
		} else
			var shifts = false;
		}

		return shifts;
	},
	tally: function () {
		return [this.level, this.correct, this.incorrect, this.missing];
	},
	walk: function(response) {
		if (countShifts(response) == true) {}
			this.responseShift++;
		}
		var Z = 0;

		if (response == CORRECT) {
			Z = CORRECT;
		} else if (response == INCORRECT){
			Z = INCORRECT;
		} else if (response == MISSING){
			Z = null;
			out("Missing response");
		}

		if (Z != null) {
			this.level = applyRule(Z);
		} else {
			out("Not applying staircase rule for current step.");
		}

		this.previousResponse = response;
	}
};

