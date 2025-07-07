$(document).ready(function () {

    // Breakpoint berechnen
    // Bitte anpassen an _einstellungen.scss
    // https://github.com/jerrylow/breakpoints
    $(window).breakpoints({
        breakpoints: [{
            'name': 'breakpointSmartphoneAb',
            'width': 0
        }, {
            'name': 'breakpointTabletHochAb',
            'width': 800
        }, {
            'name': 'breakpointTabletQuerAb',
            'width': 1200
        }, {
            'name': 'breakpointDesktopAb',
            'width': 2000
        }]
    });

    // Body je nach Breakpoint anderes data-layout Attribut zuweisen
    var breakpoint;
    $(window).on('inside-breakpointSmartphoneAb', function () {
        $('body').attr('data-layout', 'smartphone');
        breakpoint = 'smartphone';
    });
    $(window).on('inside-breakpointTabletAb', function () {
        $('body').attr('data-layout', 'tablet');
        breakpoint = 'tablet';
    });
    $(window).on('inside-breakpointTabletHochAb', function () {
        $('body').attr('data-layout', 'tabletHoch');
        breakpoint = 'tabletHoch';
    });
    $(window).on('inside-breakpointTabletQuerAb', function () {
        $('body').attr('data-layout', 'tabletQuer');
        breakpoint = 'tabletQuer';
    });
    $(window).on('inside-breakpointDesktopAb', function () {
        $('body').attr('data-layout', 'desktop');
        breakpoint = 'desktop';
    });


    menueStatus = 'inaktiv';
    function menueToggle() {
        if (menueStatus == 'aktiv') {
            menueStatus = 'inaktiv';
        } else {
            menueStatus = 'aktiv';
        }

        if (breakpoint == 'smartphone' || breakpoint == 'tabletHoch') {
            $.scrollLockMenue();
        }

        $('body').toggleClass('body--menue--aktiv').toggleClass('body--menue--inaktiv');
        $('#menue').toggleClass('aktiv');
        $('#menue__hamburger').toggleClass('aktiv');
    }

    // Hamburgermenü aktivieren
    $('#menue__hamburger').click(function (event) {

        event.preventDefault();
        menueToggle();

    });


    $('#menue').on('click', '.menue__link', function (event) {

        menue = $('#menue');

        var abstand = 0;

        if ((breakpoint == 'smartphone') || (breakpoint == 'tabletHoch')) {
            abstand = menue.height();
        } else {
            abstand = menue.outerHeight(true) - menue.height()
        }

        if (menueStatus == 'aktiv') {
            menueToggle();
        }

        // Weiches Scrollen
        event.preventDefault();
        var zielId = $(this).data('ziel');
        var ziel = $('#' + zielId).offset().top - abstand;
        scrollen(ziel, 1000);

    });

    $('#main__pfeil-link').on('click', function (event) {

        scrollen(0, 1000);

    });

    $('.abschnitt__pfeil-link').on('click', function (event) {

        scrollen(0, 1000);

    });

    $(document).ready(function () {
        // Prüfe ob Success-Message existiert und ersetze sie
        if ($('.form-success').length > 0) {
            // Verstecke die Original-Message
            $('.form-success').hide();
    
            // Zeige deine Custom-Message
            $('.bestellung__sendemeldung').show();
    
            // Hamburger zu X machen und Click-Handler hinzufügen
            $('#bestellung__hamburger').addClass('aktiv');
            
            // Debug: Prüfe ob Klasse gesetzt wurde
            console.log('Hamburger classes:', $('#bestellung__hamburger').attr('class'));
            
            $('#bestellung__hamburger').on('click', function () {
                $('.bestellung__sendemeldung').fadeOut();
            });
        }

        // ...existing code...
    });

    $('#main__pfeil-link').on('click', function (event) {
        scrollen(0, 1000);
    });

    $('.abschnitt__pfeil-link').on('click', function (event) {
        scrollen(0, 1000);
    });
});