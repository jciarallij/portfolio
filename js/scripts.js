$(document).ready(function() {

    (function($) {
        $(document).ready(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 83) {
                    $('#scroll-nav').fadeIn(500);
                } else {
                    $('#scroll-nav').fadeOut(500);
                }
            });
        });
    })(jQuery);

    $('body').smoothScroll({
        delegateSelector: 'ul.nav a'
    });

    $('p.subnav a').click(function(event) {
        event.preventDefault();
        var link = this;
        $.smoothScroll({
            scrollTarget: link.hash
        });
    });

    $('#change-speed').bind('click', function() {
        var $p1 = $('ul.nav a').first();
        var p1Opts = $p1.smoothScroll('options') || {};

        p1Opts.speed = p1Opts.speed === 1400 ? 400 : 1400;
        $p1.smoothScroll('options', p1Opts);
    });

});
