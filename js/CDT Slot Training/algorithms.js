function shuffleFisherYates(array) {
    var m = array.length, t, i;

    while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    }

    return array;
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