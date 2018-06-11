$( document ).ready(function() {
    $('.fa-star-o').click(function() {
        $(this).toggleClass('fa-star-o');
        $(this).toggleClass('fa-star');
        $(this).parent('li').toggleClass('active');
    })
});