(function($) {
  $(document).ready(function(){
    var createLink = function(root, path) {
      $(root).parent().append("<a class='skipper-link' href='" + path + "'>skip -></a>");
      $(root).attr("processing", null);
    }

    var isDirectory = function(element) {
      return ($(element).parent().parent().find('.icon span').hasClass('octicon-file-directory') || $(element).parent().parent().find('.icon img').attr("alt") == 'directory');
    }

    var grabTree = function(root, current) {

      $.ajax({
        url: $(current).attr("href"),
        success: function(result) {
          objects = $('table.files tr td.content a', result);
          if(objects.length < 1)
          {
            objects = $('#browser table tr td.content a', result);
          }

          if(objects.length == 1)
          {
            grabTree(root, objects.first());
          }
          else if(root != current && isDirectory(current))
          {
            createLink(root, $(current).attr("href"));
          }
        }
      });
    }

    var findLinks = function() {
      // GitHub
      $('table.files tr td.content a').each(function() {
        // Processing flag to make sure we don't traverse this tree more than once
        if($(this).parent().find('.skipper-link').length < 1 && $(this).attr("processing") != "1" && isDirectory(this))
        {
          $(this).attr("processing", "1");
          grabTree(this, this);
        }
      });

      // GitHub:FI
      $('#browser table tr td.content a').each(function() {
        if(isDirectory(this))
        {
          grabTree(this, this);
        }
      });
    }

    if($('table.files').length > 0)
    {
      $(this).bind('DOMNodeInserted', findLinks);
    }

    findLinks();
  });
}(jQuery));
