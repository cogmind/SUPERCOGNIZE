function getDevice() {
	var device = "";
	const DESKTOP = 0;
	const TABLET = 1;
	const MOBILE = 2;

	//TO DO: Replace with three objects holding different parameters
	const deviceType = ["desktop", "tablet", "mobile"];

	switch (device) {
		case: deviceType[DESKTOP]
			console.log("Desktop detected");
			break;
		case: deviceType[TABLET]
			console.log("Tablet detected");
			break;	// Break might not apply depending on the order of (arguments)
					// e.g. screen size is large
		case: deviceType[MOBILE]
			console.log("Mobile");
			break;
	} default {
		alert("ERROR. Device not supported. To ensure future compability your device type has been anonymously registered with the web developer");
		//TO DO email device type to programmer
	} 
}

//TO DO addEventListener
// document.addEventListener();

function getResponse() {
	
}