function runExperiment() {

	var timer = new Tock({
		countdown: true
	});

	var state = {
		is_match_trial: null, //to do boolean
		current_trial: null,
		current_frame: null,
		current_delay: null,
		StimulusTime: 100,
		RetentionInterval: 900,
		MemoryArrayTime: 2000,
		InterTrialIntervalRange: [500, 600],
		currentColors: [],
		complementOfCurrentColors: [];
		mem_array: null,
		test_array: null,
		checkTrialType: function() {			
			if (BIN_DIST[this.current_trial] == NON_MATCH) {
				//Generate NEW ARRAY
				memArray = visual_array;
				///TO DO
			} else if (BIN_DIST[this.current_trial] == MATCH) {
				//COPY ARRAY
				memArray = visual_array;
			} else {
				console.log("ERROR in nextFrame. Length of trials do not match the length of the binomial distribution for match/non-match trials.");
			}
		},
		getITI: function(min, max){
			var iti = Math.floor(Math.random() * (max - min + 1)) + min; // TO DO check lab experiment settings
	  		return iti;
		},
		// nextFrame: 	function(current_delay) {
		// 	if (this.timer.go) {
		// 		this.timer.stop();
		// 	}
		// 	this.timer.start(current_delay);
		// },
		// endOfInterval: function() {
		// 	this.timer.stop();
		// 	this.timer.reset(); //TO DO check what the difference is between stop and reset
		// },
		// setTimer: function(delay) {
		// 		//TO DO 
		// },
	}

	function getComplementColorSet(colorSet, colorPalette){
		//TO DO
	}

	function trialSequence(){


		//At the end of each completion callback
		nextFunction(delay, complete);
		//getComplementColorSet

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

	//Complete type callbacks
	function matchArray() {
		
	}

	function unmatchArray() {
		var randomIndex = 0;
		var rmin = 0;
		var rmax = state.mem_array.length;

		var squaresToChange = 1;
		var a;

		for (i = 0; i < squaresToChange; i++){
			//get one of the squares at random
			randomIndex = randInt(rmin, rmax);
			a = state.mem_array[randomIndex];

			state.mem_array[randomIndex];

			//and replace it with a
			// Previously non-existing color
			// i.e. which is not part of the applied color set
			// consider set theory 
		}
	}

	//Note to self: Reuse of function
	function randInt(min, max) {
         return Math.floor(Math.random() * (max - min)) + min;
    }
}
