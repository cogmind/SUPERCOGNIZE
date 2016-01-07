const NON_MATCH = 0;
const MATCH = 1;

var CURRENT_TRIAL = 0;
var BIN_DIST = generateBinomialDistribution(50);

function runExperiment(){
	nextFrame(0);
}

function interTrialInterval(min, max) {
  var iti = Math.floor(Math.random() * (max - min + 1)) + min; // TO DO check lab experiment settings
  return iti;
}

    
function generateBinomialDistribution(n) {
    if (n % 2 != 0) {
        console.log("WARNING. generateBinomialDistribution(): n must be an even number. Adjusting by adding 1.");
        n = n + 1;
    }

    var binDist = [];
    for (i = 0; i < n / 2; i++){
        binDist[i] = 0;
    }
    for (i = n/2; i < n; i++){
        binDist[i] = 1;
    }

    binDist = shuffleFisherYates(binDist);

    //out("binary: ");
    //out(binDist);
    return binDist;
}

function nextFrame(number, delay){

	//TO DO timeout after 10 minutes ---> End of session + message
	const StimulusTime = 100; //DEBUG
	const RetentionInterval = 900;
	const MemoryArrayTime = 2000;



	var iterator = number;
	var timer = new Tock({
		countdown: true,
		complete: function() {

			switch(iterator){
				case 0:
					//console.log("1");
					delay = interTrialInterval(500, 600);
					displayIntertrial();

					CURRENT_TRIAL++;					
					break;
				case 1:
					//console.log("2");
					delay = StimulusTime;
					displayStimulus();
					break;
				case 2:
					//console.log("3");
					delay = RetentionInterval;
					displayRetention();
					break;
				case 3:
					//console.log("4");
					//out("Current trial: " + CURRENT_TRIAL);
					if (BIN_DIST[CURRENT_TRIAL] == NON_MATCH) {
						//Generate NEW ARRAY
						memArray = null;
					} else if (BIN_DIST[CURRENT_TRIAL] == MATCH) {
						//COPY ARRAY
						memArray = null;
					} else {
						console.log("ERROR in nextFrame. Length of trials do not match the length of the binomial distribution for match/non-match trials.");
					}

					delay = MemoryArrayTime;
					displayMem(memArray);
					break;
			}
			if (iterator < 3) {
				iterator++;
			} else {
				iterator = 0;
			}

			nextFrame(iterator, delay);
		}
	});
	timer.start(delay);
}
