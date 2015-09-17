$ = jQuery;
$(function() {
    var openSub, closeSub;
    $('.databoxes').height(window.height() - 100 + 'px');
    openSub = function(el) {
        el.addClass('active');
        $('header').addClass('activated');
    };
    closeSub = function() {
        $('nav>ul>li.active').removeClass('active');
        $('header').removeClass('activated');
    };
    $('nav>ul>li').click(function() {
        var elem = $(this);
        if ($('header').hasClass('activated')) {
            if ($('nav>ul>li.active').not(elem).length > 0) {
                closeSub();
                setTimeout(function() {
                    openSub(elem);
                }, 500);
            } else {
                closeSub();
            }
        } else {
            openSub($(this));
        }
    });
});

