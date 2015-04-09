$(function(){
    /*
    *   This is all the business that makes the outlines
    *   and other stuff look really neat.
    */
    anno.setProperties({
        fill: "rgba(255,255,255,.4)",
        stroke: "rgba(255,255,255,0)",
        outline: "rgba(255,255,255,0)",
        outline_width: 10,
        hi_stroke: "rgba(255,255,255,1)",
        hi_stroke_width: 8,
        hi_fill: "rgba(0,0,0,1)",
        hi_outline: "rgba(0,0,0,0)",
        hi_outline_width: 5
    });

    var $annotations_list = $('div#annotations-list');
    var $count_target = $('.annotation-count');
    var $main_image = $('#main-image');
    var $toggle_annotations_button = $('#toggle-annotations');
    var visible_class = 'annotations-visible';

    var ANNOTATIONS_VISIBLE = true;

    /*
    *   Initializes the Pym child element
    *   but does not send height. We'll do
    *   that later when the Ajax is complete.
    */
    var pymChild = new pym.Child();

    /*
    *   Called when the Parse backend query finishes
    *   successfully. Removes old annotations and adds
    *   all of the ones we know about.
    */
    var load_annotations = function(results) {
        results = results.reverse();

        $annotations_list.html('');
        $count_target.html(results.length +' annotations');
        for (var i = 0; i < results.length; i++) { append_annotation(results[i]); }

        /*
        *   Once the annotations have been loaded,
        *   send the height back out to the parent.
        */
        pymChild.sendHeight();
    }

    /*
    *   Handles templating the annotation HTML.
    *   I am a bad person.
    */
    var append_annotation = function(annotation) {
        var annotation_html = '<div id="'+annotation.id+'" class="panel panel-default"><div class="panel-body"><div class="panel-icon"><p class="glyphicon glyphicon-user"></p></div><div class="panel-votes"><p class="glyphicon glyphicon-pushpin">&nbsp;<p class="glyphicon glyphicon-thumbs-up">&nbsp;</p><p class="glyphicon glyphicon-thumbs-down">&nbsp;</p></div><p>'+annotation.get("text")+'</p></div></div>';
        $annotations_list.append(annotation_html);
    }

    /*
    *   Centrally responsible for getting annotations and
    *   calling functions to place them on the page.
    */
    var get_annotations = function () {

        /*
        *   Set up Parse, our persistence backend.
        */
        Parse.initialize("QB0NpFjr42svgfWazPPCcckVRp2pqy9mTZPYAccF", "n4UrEk4qM3czKAAn10n21m0vILckfbWxfVjB9Dma");
        var Annotation = Parse.Object.extend("Annotation");
        var query = new Parse.Query(Annotation);

        /*
        *   Our annotation plugin saves annotations based on the
        *   perceived URL path to the image, e.g., localhost/path/to/img.jpg
        *   This is actually different in development if developers serve
        *   the pages via file:// or http://127.0.0.1/ or some such.
        */
        var url = 'http://' + window.location.toString().split('/')[2] + '/' + $main_image.attr('src');

        /*
        *   Query to get all the annotations that will show up on the image.
        */
        query.equalTo("src", url);

        /*
        *   Do the  query asynchronously and load the annotations on success.
        */
        query.find({
          success: function(results) { load_annotations(results); },
          error: function(error) { console.log("Error: " + error.code + " " + error.message); }
        });
    }

    /*
    *   Handle the global state of the annotation toggle.
    */
    var toggle_annotations = function() {
        if ($toggle_annotations_button.hasClass(visible_class)) {
            ANNOTATIONS_VISIBLE = false;
            anno.hideAnnotations();
            $toggle_annotations_button.removeClass(visible_class);
            $toggle_annotations_button.html('Show annotations');
        } else {
            ANNOTATIONS_VISIBLE = true;
            anno.showAnnotations();
            $toggle_annotations_button.addClass(visible_class);
            $toggle_annotations_button.html('Hide annotations');
        }
        console.log(ANNOTATIONS_VISIBLE);
    }

    /*
    *   Event handler for toggling the annotations on and off.
    */
    $toggle_annotations_button.on('click', toggle_annotations);

    /*
    *   Get the annotations on initial load.
    */
    get_annotations();
})