def get_unique_color(replace_this_color, non_unique_colors, all_colors):
    colors_to_exclude = non_unique_colors
    new_color_population = {k: v for k, v in all_colors.iteritems() if k not in colors_to_exclude}
    number_of_new_colors = 1
    new_color = get_random_color_names(new_color_population, number_of_new_colors)

    assert len(new_color) == 1
    return new_color[0]




function get_unique_color() {
    for (value in allColors)
        if !(key in colorsToExclude) {
        newColorPalette
        }
    }

    getRandomColorNames(newColorPopulation, numberOfNewColors)
}


