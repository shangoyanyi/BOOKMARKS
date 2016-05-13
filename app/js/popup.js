$(function(){
  var newItem  = function(name, url, imgSrc){
    return '<div class="bookmark" data-target="' + url + '">' +
              '<img class="bookmark-img" src="' + imgSrc + '">' + 
              '<span class="bookmark-name">' + name + '</span>' 
           '</div>';
  }
  
  var newItemGroup  = function(groupName){
    return '<div class="bookmark-group">' +              
              '<span class="bookmark-group-name">' + groupName + '</span>' 
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
  
  /*
  $('#bookmark-container').append(newItemGroup("專案管理"));
  $('#bookmark-container').append(newItem("Slack - chtmember", "https://chtmember.slack.com/", chrome.extension.getURL("app/img/slack200x200.png")));
  $('#bookmark-container').append(newItem("Trello - 會員小隊", "https://trello.com/user75548250", chrome.extension.getURL("app/img/trello200x200.png")));
  $('#bookmark-container').append(newItem("Quip", "https://quip.com", chrome.extension.getURL("app/img/quip200x200.png")));
  
  $('#bookmark-container').append(spacing(30));
  $('#bookmark-container').append(newItemGroup("公司網站"));
  $('#bookmark-container').append(newItem("EIP | 員工資訊入口網站", "http://eip.cht.com.tw", chrome.extension.getURL("app/img/cht200x200.png")));
  $('#bookmark-container').append(newItem("HRIS | 人力資源管理系統", "https://hris.cht.com.tw/", chrome.extension.getURL("app/img/cht200x200.png")));
  $('#bookmark-container').append(newItem("eForm | 電子表單", "http://eform.cht.com.tw/Pages/Announcement/Announcement.aspx", chrome.extension.getURL("app/img/cht200x200.png")));
  $('#bookmark-container').append(newItem("eMeeting | 電子會議", "http://emt.cht.com.tw/pub/docProcess.asp", chrome.extension.getURL("app/img/cht200x200.png")));
  $('#bookmark-container').append(newItem("ODAS | 電子公文", "http://odaswps.cht.com.tw/Portal/Pages/", chrome.extension.getURL("app/img/cht200x200.png")));
  */
  
  $('.bookmark-container').on('click', '.bookmark', function(){
    window.open($(this).data('target'));
  });
})
