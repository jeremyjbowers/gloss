$(function(){
    var $annotations_list = $('div#annotations-list');
    var $count_target = $('h1#title small');
    var $main_image = $('#main-image');
    var $toggle_annotations_button = $('#toggle-annotations');

    var load_annotations = function(results) {
        // wipe_old_annotations();
        // update_results_count(results.length);
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            append_annotation(results[i]);
        }
    }

    var wipe_old_annotations = function() { $annotations_list.html(''); }

    var append_annotation = function(annotation) {
        var annotation_html = '<div id="'+annotation.id+'" class="panel panel-default"><div class="panel-body"><div class="panel-icon"><p class="glyphicon glyphicon-user"></p></div><div class="panel-votes"><p class="glyphicon glyphicon-thumbs-up">&nbsp;</p><p class="glyphicon glyphicon-thumbs-down">&nbsp;</p></div><p>'+annotation.get("text")+'</p></div></div>';
        $annotations_list.append(annotation_html);
    }

    var update_results_count = function(results_count) { $count_target.html(results_count+' annotations'); }

    var get_annotations = function () {
        Parse.initialize("QB0NpFjr42svgfWazPPCcckVRp2pqy9mTZPYAccF", "n4UrEk4qM3czKAAn10n21m0vILckfbWxfVjB9Dma");
        var Annotation = Parse.Object.extend("Annotation");
        var query = new Parse.Query(Annotation);
        var url = window.location.toString().replace('index.html', '') + $main_image.attr('src');

        query.equalTo("src", url);
        query.find({
          success: function(results) { load_annotations(results); },
          error: function(error) { console.log("Error: " + error.code + " " + error.message); }
        });
    }

    get_annotations();
})