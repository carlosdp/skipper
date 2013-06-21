var createLink = function(root, path) {
  $(root).parent().append("<a class='skipper-link' href='" + path + "'>skip -></a>");
}

var grabTree = function(root, current) {

  $.ajax({
    url: $(current).attr("href"),
    success: function(result) {
      objects = $('table.files tr td.content a', result);
      if(objects.length == 1)
      {
        grabTree(root, objects.first());
      }
      else if(root != current)
      {
        createLink(root, $(current).attr("href"));
      }
    }
  });
}

$('table.files tr td.content a').each(function() {
  grabTree(this, this);
});
