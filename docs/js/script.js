$(document).ready(function() {
    new ClipboardJS('.is-clipboard');
    $('.is-clipboard').click(function() {
      $(this).addClass('is-inverted');
      $(this).find('span.icon').html('<i class="fas fa-clipboard-check"></i>');
    });
});
