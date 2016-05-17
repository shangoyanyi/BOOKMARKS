$(function(){
  var newItem  = function(name, url, imgSrc){
    return '<div class="bookmark" data-target="' + url + '">' +
              '<img class="bookmark-img" src="' + imgSrc + '">' + 
              '<span class="bookmark-name">' + name + '</span>' + 
           '</div>';
  }
  
  var newItemGroup  = function(groupName){
    return '<div class="bookmark-group">' +              
              '<span class="bookmark-group-name">' + groupName + '</span>' +
           '</div>';
  }
  
  var spacing = function(marginSize){
    return '<div style="margin-top:' + marginSize + '; margin-bottom:' + marginSize + ';">&nbsp;</div>'
  }
  
  
  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true && JSON.stringify(obj) === JSON.stringify({});
  };
  
  
  chrome.storage.sync.get("bookmarks", function(result) {
      console.log("load bookmarks result:"  + JSON.stringify(result));
      
      if(isEmpty(result)){
         $('#bookmark-container').append(newItemGroup("尚未建立書籤"));
         
      }else {
        $('#bookmark-container').append(newItemGroup("我的書籤"));
        
        for(var i=1; i<result.bookmarks.length+1; i++){        
          result.bookmarks.forEach(function(bookmark){
            if(bookmark.index == i){
              $('#console').append('<p>adding bookmark:' + bookmark.name + ','+ bookmark.index + '</p>');
            
              $('#bookmark-container').append(
                newItem(bookmark.name, bookmark.url, bookmark.imgSrc)
              );
            }            
          });
        }
      }
  });
  
  
  
  $('.bookmark-container').on('click', '.bookmark', function(){
    window.open($(this).data('target'));
  });
})
