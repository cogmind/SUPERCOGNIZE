function runExperiment() {

	var trial = 0;

	console.log("runnning experiment");
	var timer = new Tock({
		countdown: true
	});

	var delay = 1000;

	trialSequence();

	function frame1(){
		trial++;
		console.log("1");
		nextFunction(delay, frame2);
	}
	function frame2(){
		console.log("2");
		nextFunction(delay, frame3);
	}
	function frame3(){
		console.log("3");
		nextFunction(delay, frame4);
	}
	function frame4(){
		console.log("4");
		nextFunction(delay, frame1);
	}


	function trialSequence(){

		var complete = frame1;
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
}