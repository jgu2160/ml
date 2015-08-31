$("#about").click(function() {
  $('html, body').animate({
    scrollTop: $("#about-body").offset().top
  }, 750);
});
