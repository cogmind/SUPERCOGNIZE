time = {};
time.iterator = 0;

time.startNewTimer = function (){
  out("Starting new timer...");

  const StimulusTime = 1000; //DEBUG
  const RetentionInterval = 900;
  const MemoryArrayTime = 2000;
  var iti = 0; // placeholder

  var fun = [displayIntertrial, displayStimulus, displayRetention, displayMem];
  var interv = [iti, StimulusTime, RetentionInterval, MemoryArrayTime];//TO DO Chnage to MEM time

  out(this.iterator);
  if (this.iterator > fun.length) {
    this.iterator = 0;
  }


  var timer = new Tock({});


  var options = {};

  switch (this.iterator){
    case 0:
      options.callback = fun[0];
      options.interval = interTrialInterval(500, 600);
      options.complete = this.startNewTimer;//("stimulus");
      break;
    case 1:
      options.callback = fun[1];
      options.interval = interv[1];
      options.complete = this.startNewTimer;//("retention");
      break;
    case 2:
      options.callback = fun[2];
      options.interval = interv[2];
      options.complete = this.startNewTimer;//("memory");
      break;
    case 3:
      options.callback = fun[3];
      options.interval = interv[3];
      options.complete = this.startNewTimer;//("intertrial");
      break;
  }

  timer.callback = options.callback;
  timer.interval = options.interval;
  timer.complete = options.complete;


  timer.start(0);
  //out("Starting timer: ".concat(timer.callback));
  this.iterator++;
};

function interTrialInterval(min, max) {
  var iti = Math.floor(Math.random() * (max - min + 1)) + min; // TO DO check lab experiment settings
  return iti;
}

