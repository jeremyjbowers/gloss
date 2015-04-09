$(function(){
    Parse.initialize("QB0NpFjr42svgfWazPPCcckVRp2pqy9mTZPYAccF", "n4UrEk4qM3czKAAn10n21m0vILckfbWxfVjB9Dma");
    var Annotation = Parse.Object.extend("Annotation");
    var query = new Parse.Query(Annotation);

    var $comments = $('div#comments-body');
    var $titlesmall = $('h1#title small');

    var load_comments = function(results) {
        wipe_old_comments();
        update_results_count(results.length);
        for (var i = 0; i < results.length; i++) {
            append_comment(results[i]);
        }
    }

    var wipe_old_comments = function() {
        $comments.html('');
    }

    var append_comment = function(comment) {
        var comment_html = '<div id="'+comment.id+'" class="panel panel-default"><div class="panel-body"><div class="panel-icon"><p class="glyphicon glyphicon-user"></p></div><div class="panel-votes"><p class="glyphicon glyphicon-thumbs-up">&nbsp;</p><p class="glyphicon glyphicon-thumbs-down">&nbsp;</p></div><p>'+comment.get("text")+'</p></div></div>';
        $comments.append(comment_html);
    }

    var update_results_count = function(results_count) {
        $titlesmall.html(results_count+' annotations');
    }

    query.find({
      success: function(results) { load_comments(results); },
      error: function(error) { console.log("Error: " + error.code + " " + error.message); }
    });
})