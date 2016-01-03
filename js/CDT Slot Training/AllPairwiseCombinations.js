		var d = [1, 2, 3, 4 , 5, 6, 7, 8];


		function printSeries() {
			var dString = d[i];
			for (i = 0; i >= d.length; i++) {
				dString = dString.concat(d[i]);
				out("Looping...");
			}
			getAllPairwiseCombinations(d);
		}

		function getAllPairwiseCombinations(inputArray) {
			var allPairs = allPairwiseCombinations(inputArray);
			return allPairs;
		}

		function allPairwiseCombinations(inputArray) {
			var a = inputArray;
			var b = a.slice(0);
			var pair = [];
			var pairs = [];
			var first = 0;
			//Generator
			for(j = 0; j < a.length - 1; j++) {
				first = b[0];
				b.shift();
				//b.push(first);
				for(i = 0; i < b.length; i++){
					pair = [a[i], b[i]];
					//out(pair);
					pairs = pairs.concat(pair);
				}
			}
			//out(pairs);
			return pairs;
		}