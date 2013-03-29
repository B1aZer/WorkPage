$(document).ready( function () {
    $(document).on('mouseenter', '.linkaway', function () {
        $(this).siblings('.icon').hide().siblings('.iconinverted').show();
    });
    $(document).on('mouseleave', '.linkaway', function () {
        $(this).siblings('.iconinverted').hide().siblings('.icon').show();
    });
});
