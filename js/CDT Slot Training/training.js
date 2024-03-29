function runTraining() {

	console.log("Running training...");

	const MISSING_VALUE = -99999;

	const COORDINATES = 0;
	const COLORS = 1;

	const MIN = 0;
	const MAX = 1;

	const NON_MATCH = 0;
	const MATCH = 1;

	var exp = {
		//TimeOut: 10 * 60000, //10 minutes 
		BIN_DIST: generateBinomialDistribution(this.trials), // this = algorithms.js
		StimulusTime: 100,
		RetentionInterval: 900,
		TestArrayTime: 2000,
		iti_range: [500, 600],
		get_iti: function(min, max) {
			var iti = Math.floor(Math.random() * (max - min + 1)) + min; // TO DO check lab experiment settings
			return iti;
		}
	};

	var trial = {

		count: 0,
		stimulusCoordinates: [],
		stimulusColors: [],
		testCoordinates: [],
		testColors: [],
		stimulusPalette: [],
		trialType: null,
		random_ITI: MISSING_VALUE,
		responseCorrect: null,
		responseType: null,
		keyPressed: null
	};

	var timer = new Tock({
		countdown: true
	});

	//START
	delay = exp.get_iti(exp.iti_range[MIN], exp.iti_range[MAX]);
	nextFunction(delay, frame_iti);

	var eventAdded = false;

	function frame_iti() {

		if (eventAdded){
			if (document.removeEventListener) {
			// For all major browsers, except IE 8 and earlier
			    document.removeEventListener("keydown", getResponse);
			    console.log("");
			} else if (document.detachEvent) {
			// For IE 8 and earlier versions
			    document.detachEvent("keydown", getResponse);
			} else {
				console.log("ERROR. Browser not compatible with key event");
			}

			//Check if previous response was correct
			if (trial.trialType == MATCH && trial.keyPressed == 1) {
				trial.responseType = "HIT";
				trial.responseCorrect = 1;
				console.log("CORRECT!");
			} else if (trial.trialType == NON_MATCH && trial.keyPressed == 9) {
				trial.responseType = "CR";
				trial.responseCorrect = 0;
				console.log("CORRECT!");
			} else if (trial.trialType == NON_MATCH && trial.keyPressed == 1) {
				console.log("WRONG!");
				trial.responseCorrect = 0;
				trial.responseType = "FA";
			} else if (trial.trialType == MATCH && trial.keyPressed == 9) {
				trial.responseType = "MISS";
				trial.responseCorrect = 0;
				console.log("WRONG!");
			} else {
				console.log("Invalid response");
				trial.responseCorrect = MISSING_VALUE;
			}
			//Staircase
			staircase.accumulate(trial.responseCorrect);
			staircase.walk(trial.responseCorrect);
			console.log("Current level is " + staircase.level);
			//Change Level
			nSquares = staircase.level;
			//Update HUD
			htmlLevel.innerHTML = "LEVEL " + staircase.level;
		}

		//NEXT TRIAL
		trial.count++;
		console.log("1 ".concat(delay));

		trial.random_ITI = exp.get_iti(exp.iti_range[0], exp.iti_range[1]);
		nextFunction(exp.get_iti(exp.iti_range[MIN], exp.iti_range[MAX]), frame_stimulus);
		
		displayIntertrial();

	}
	function frame_stimulus() {
		console.log("2 ".concat(exp.StimulusTime));

		trial.stimulusArray = displayStimulus();
		trial.stimulusCoordinates = trial.stimulusArray[COORDINATES];
		trial.stimulusColors = trial.stimulusArray[COLORS];

		nextFunction(exp.StimulusTime, frame_retention);		
	}
	function frame_retention() {
		console.log("3 ".concat(exp.RetentionInterval));

		displayRetention();

		nextFunction(exp.RetentionInterval, frame_test);
	}
	function frame_test() {
		
		console.log("4 ".concat(exp.TestArrayTime));

		//Turn keyboard responses on
		document.addEventListener("keydown", getResponse);
		eventAdded = true;

		//Keep coordinates
		trial.testCoordinates = trial.stimulusCoordinates;

		//INSERT MATCH NON MATCH CONDITION
		if (exp.BIN_DIST[trial.count] == NON_MATCH) {
			//Generate NEW ARRAY based on the previous stimulus array
			out("NON-MATCH");
			trial.trialType = NON_MATCH;

			var nonMatchArray = [];
			nonMatchArray[COORDINATES] = trial.stimulusCoordinates;
			nonMatchArray[COLORS] = unmatchArray(); //DEBUGABLE COMPABILITY CHECK?? Array is not unpacked

			//out("non match array>coord ");
			//out(nonMatchArray[COORDINATES]);			
			//out("non match array>color ");
			//out(nonMatchArray[COLORS]);
			displayTestArray(nonMatchArray);

		} else if (exp.BIN_DIST[trial.count] == MATCH) {
			
			out("MATCH");
			trial.trialType = MATCH;
			//Register in the data model
			trial.testColors = trial.stimulusColors;

			//Re-reference
			displayTestArray(trial.stimulusArray);//
			
		} else {
			trial.trialType = MISSING_VALUE;
			console.log("ERROR in frame_test. The binomial distribution for match/non-match trials. Reason: exp.BIN_DIST[trial.count] = " + exp.BIN_DIST[trial.count]);
		}


		nextFunction(exp.TestArrayTime, frame_iti);
		/**
		* Replaces the input array with an unmatched array
		* 
		*/
		function unmatchArray() {
			var randomIndex = 0;
			var rmin = 0;
			var rmax = trial.stimulusArray.length;

			var squaresToChange = 1;

			for (i = 0; i < squaresToChange; i++){


				if (squaresToChange > 1) {
					("WARNING in unmatchArray().. The current version does not yet sample with replacement");
				}

				//Check colors against palette
				// and replace it with a
				// Previously non-existing color
				// i.e. which is not part of the applied color set

				var unmatchedArray = trial.stimulusArray[COLORS].slice(0);

				randomIndex = randInt(rmin, rmax);
				var selectedSquare = unmatchedArray[randomIndex];

				var newColor = getUniqueColor(trial.stimulusColors, experimentColors);

				unmatchedArray[randomIndex] = newColor;//Confusing structure of trial colors (cf. visual_array)

			}

			return unmatchedArray;
		}
	}


	/**
	* Stops the current timer, replaces the callback on completion, and
	* 
	* @method nextFunction
	* @param delay
	* @param complete
	*/
	function nextFunction(delay, complete){

		timer.stop();
		//this.state.timer.delay = delay;
		timer.complete = complete;
		timer.start(delay);
	}

	//CONTROLLER
	function getResponse(keyDown){

		console.log("Fetching response..");
		console.log("Response is " + keyDown.key);
		if (keyDown.key == 1) {
			trial.keyPressed = 1;
		} else if(keyDown.key == 9) {
			trial.keyPressed = 9;
		} else {
			trial.keyPressed = keyDown.key;
			console.log(keyDown.key + " is not a valid key");
		}
		keyDown.key = null;
	}

	//Note to self: Reuse of function
	function randInt(min, max) {
         return Math.floor(Math.random() * (max - min)) + min;
    }

    //Staircase

	const CORRECT = 1;
	const INCORRECT = 0;
	const MISSING = -9999;

	var staircase = {

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
			} else {
				this.missing++;
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
			nextLevel = Math.round(nextLevel);

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
			} else {
				var shifts = false;
			}

			return shifts;
		},
		tally: function () {
			return [this.level, this.correct, this.incorrect, this.missing];
		},
		walk: function(response) {
			if (this.countShifts(response) == true) {
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
				this.level = this.applyRule(Z);
			} else {
				out("Not applying staircase rule for current step.");
			}

			this.previousResponse = response;
		}
	};
}