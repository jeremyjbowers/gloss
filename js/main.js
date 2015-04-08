$(function(){
    var EDITING = false;
    var LIVESELECTIONS = []
    var $editswitch = $('#edit-switch');
    var $image = $('#main-image');
    var $wwidth = $(window).width();
    var $wheight = $(window).height();

    $editswitch.on('click', function() {
        $(this).toggleClass('active');
        if (EDITING) { EDITING = false; } else { EDITING = true; };
    });

    $image.on('click', function(){
        if (EDITING) {
            var uuid4 = uuid.v4();
            $('body').prepend('<div style="top:'+event.clientY+'px; left:'+event.clientX+'px;" class="live-selection" id="' + uuid4 + '">&nbsp;</div>');
            LIVESELECTIONS.push(uuid4);
            console.log(LIVESELECTIONS);
        }
    });
})