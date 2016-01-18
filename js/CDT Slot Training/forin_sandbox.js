
<body onload="getUniqueColor()"></body>
<script>
var experimentColors = {
        RED: "#FF0000",
        BLUE: "#0000FF",
        MAGENTA: "#FF00FF",
        GREEN: "#00FF00",
        YELLOW: "#FFFF00",
        ORANGE: "#FF7F00",
        SKY_BLUE: "#007FFF",
        NIGHT_SKY_BLUE: "#00647F",
        DARK_ORANGE: "#7F6400",
        CYAN: "#00FFFF",
        DARK_RED: "#7F0000",
        DARK_GREEN: "#007F00",
        DARK_BLUE: "#00007F",
        DARK_MAGENTA: "#7F007F",
        DARK_YELLOW: "#7F7F00",
        PINK: "#FF007F",
        VIOLET: "#7F00FF"
};


getUniqueColor([RED, BLUE, YELLOW], experimentColors);


function getUniqueColor(colorsToExclude, allColors) {

    alert("RED IS " + colorsToExclude[RED]);

    // var newColorPopulation;

    // for (key in allColors)
    //     if !(key in colorsToExclude) {
    //         newColorPalette = key
    //     }
    // }

    // getRandomColorNames(newColorPopulation, numberOfNewColors)
}
    

</script>