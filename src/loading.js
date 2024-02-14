const hide = () => {
    // Кринжовая появляшка))
    $('#stopwatch-holder').fadeOut(1);
    $('#loading-sheet').fadeOut(1000);
    $('#main-sheet').fadeIn(1000, () => {
        $('#stopwatch-holder').fadeIn(1000)
    });
}

setTimeout(hide, 1750);