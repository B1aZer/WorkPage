$(document).ready( function () {
    $(document).on('mouseenter', '.linkaway', function () {
        $(this).siblings('.icon').hide().siblings('.iconinverted').show();
    });
    $(document).on('mouseleave', '.linkaway', function () {
        $(this).siblings('.iconinverted').hide().siblings('.icon').show();
    });

    $(document).on('click', '#modal-link', function (e) {
        e.preventDefault();
        $('#modal-send-message').modal({overlayClose:true});
    });

    $(document).on('click', '#send-button', function (e) {
        e.preventDefault();
        var texta = $('#message-text').find('textarea');
        var text = texta.val();
        var url = '/send/';
        var data = {text: text}
        $.ajax({
          type: "POST",
          url: url,
          data: data,
          success: function (msg) {
            $.modal.close();
          }
        });
        
    });
    
});
