function runTraining() {

	console.log("runnning training");

	const MISSING_VALUE = 99999;
	const COORDINATES = 0;
	const COLORS = 1;
	const MIN = 0;
	const MAX = 1;

	var exp = {
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
		visualArray: [],
		stimulusCoordinates: [],
		stimulusColors: [],
		testCoordinates: [],
		testColors: [],
		stimulusPalette: [],
		trialType: null,
		random_ITI: MISSING_VALUE,
		responseCorrect: null //TO DO
	};

	var timer = new Tock({
		countdown: true
	});

	//START
	delay = exp.get_iti(exp.iti_range[MIN], exp.iti_range[MAX]);
	nextFunction(delay, frame_iti);

	function frame_iti() {
		trial.count++;
		console.log("1 ".concat(delay));

		trial.random_ITI = exp.get_iti(exp.iti_range[0], exp.iti_range[1]);
		nextFunction(exp.get_iti(exp.iti_range[MIN], exp.iti_range[MAX]), frame_stimulus);
		
		displayIntertrial();

	}
	function frame_stimulus() {
		console.log("2 ".concat(exp.StimulusTime));

		trial.visualArray = displayStimulus();
		trial.coordinates = trial.visualArray[COORDINATES];
		trial.colors = trial.visualArray[COLORS];

		nextFunction(exp.StimulusTime, frame_retention);		
	}
	function frame_retention() {
		console.log("3 ".concat(exp.RetentionInterval));

		displayRetention();

		nextFunction(exp.RetentionInterval, frame_test);
	}
	function frame_test() {
		console.log("4 ".concat(exp.TestArrayTime));

		//INSERT MATCH NON MATCH CONDITION
		displayTestArray(trial.visualArray);

		nextFunction(exp.TestArrayTime, frame_iti);
		/**
		* Replaces the input array with an unmatched array
		* 
		*/
		function unmatchArray() {
			var randomIndex = 0;
			var rmin = 0;
			var rmax = trial.visualArray.length;

			var squaresToChange = 1;
			var a;

			for (i = 0; i < squaresToChange; i++){

				var unmatchedArray = trial.visualArray.slice(0);

				randomIndex = randInt(rmin, rmax);
				var selectedSquare = unmatchArray[randomIndex];

				//TO DO
				//Check colors against palette

				//trial.palette

				//and replace it with a
				// Previously non-existing color
				// i.e. which is not part of the applied color set
				// consider set theory 
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


	//Note to self: Reuse of function
	function randInt(min, max) {
         return Math.floor(Math.random() * (max - min)) + min;
    }
}