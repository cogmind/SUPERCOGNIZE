//SANDBOX 2

var experiment = {

	timer: new Tock({}),//no default constructor
	is_match_trial: null, //to do boolean
	current_trial: null,
	current_frame: null,
	current_delay: null,
	StimulusTime: 100,
	RetentionInterval: 900,
	MemoryArrayTime: 2000,
	InterTrialIntervalRange: [500, 600],
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
	nextFrame: 	function(current_delay) {
		if (this.timer.go) {
			this.timer.stop();
		}
		this.timer.start(current_delay);
	},
	endOfInterval: function() {
		this.timer.stop();
		this.timer.reset(); //TO DO check what the difference is between stop and reset
	},
	setTimer: function(delay) {
			//TO DO 
	},
	mem_array: null,
	test_array: null,

};

//TO DO / transcribe

	delay = MemoryArrayTime;
	displayMem(memArray);
	visual_array = null;
	break;
