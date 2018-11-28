$(function () {
    var currentPage = 0;
    var scrollable = true;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function goDown() {
        currentPage += 1;
        scrollable = false;
        $(".backgrounds").css("transform", "translateY(-" + (currentPage * 100) + "vh)");
        setTimeout(function () {
            scrollable = true
        }, 1000);
    }

    function goUp() {
        currentPage -= 1;
        scrollable = false;
        $(".backgrounds").css("transform", "translateY(-" + (currentPage * 100) + "vh)");
        setTimeout(function () {
            scrollable = true
        }, 1000);
    }

    function validateEmail(email) {
        return emailRegex.test(email);
    }

    $(document).on("mousewheel DOMMouseScroll", function (event) {
        event.preventDefault();
        var originalEvent = event.originalEvent;
        if ((originalEvent.wheelDelta < 0 || originalEvent.detail > 0) && currentPage < 2 && scrollable) {
            goDown();
        } else if ((originalEvent.wheelDelta > 0 || originalEvent.detail < 0) && currentPage > 0 && scrollable) {
            goUp();
        }
    });

    $(".go-down-arrow").on("click", function(event) {
        goDown();
    });

    var contactForm = $(".contact-form");
    $(".input-email").on("input", function(event) {
        const email = event.target.value;
        contactForm.toggleClass("invalid", !validateEmail(email));
    });
    $(".link-to-slide").on("click", function() {
        currentPage = $(this).data("slide") - 1;
        goDown();
    });

});