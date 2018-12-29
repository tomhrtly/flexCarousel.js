$(document).ready(function() {
  $('.navbar-burger').click(function() {
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  $('.menu-list a').click(function(){
    $(this).addClass('is-active');
    $('.menu-list a').not($(this)).removeClass('is-active');
  });
});

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-70809338-11');
