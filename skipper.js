var createLink = function(root, path) {
  $(root).parent().append("<a class='skipper-link' href='" + path + "'>skip -></a>");
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
      else if(root != current && ($(current).parent().parent().find('.icon span').hasClass('octicon-file-directory') || $(current).parent().parent().find('.icon img').attr("alt") == 'directory'))
      {
        createLink(root, $(current).attr("href"));
      }
    }
  });
}

// GitHub
$('table.files tr td.content a').each(function() {
  grabTree(this, this);
});

// GitHub:FI
$('#browser table tr td.content a').each(function() {
  grabTree(this, this);
});
