angular
  .module("options", [])
  .controller("optionsCtrl", optionsCtrl)
  .config([
    '$compileProvider', 
    function($compileProvider){   
      // add trusted protocal: chrome-extension to get app resources
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|chrome-extension):/);
    }        
  ]);

optionsCtrl.$inject = ["$scope", "$http", "$filter"];		
  

function optionsCtrl($scope, $http, $filter){
  $scope.bookmarkTypes = [{
    name:"Others",
    image:chrome.extension.getURL("app/img/icon200x200.png")
  },{
    name:"Quip",
    image:chrome.extension.getURL("app/img/quip200x200.png")
  },{
    name:"Slack",
    image:chrome.extension.getURL("app/img/slack200x200.png")
  },{
    name:"Trello",
    image:chrome.extension.getURL("app/img/trello200x200.png")
  }];
  
  $scope.bookmarks = [];
  
  $scope.bookmarkType = $scope.bookmarkTypes[0];
  $scope.bookmarkName = "";
  $scope.bookmarkUrl = "https://";
  $scope.bookmarkImage = chrome.extension.getURL("app/img/slack200x200.png");
  
  $scope.readBookmarks = function(){
    chrome.storage.sync.get("bookmarks", function(result) {
      console.log("result:"  + JSON.stringify(result));
      
      if(isEmpty(result)){
        $scope.bookmarks = [];
      }else {
        $scope.bookmarks = result.bookmarks;         
      }
    });
  };  
  
  $scope.addBookmark = function(){
    $scope.bookmarks.push(
      newBookmark(
        $scope.bookmarkType.name,
        $scope.bookmarkName, 
        $scope.bookmarkUrl, 
        $scope.bookmarkType.image
      )
    );
    
    chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
      console.log("bookmarks saved");
      
      // clear input box
      $scope.bookmarkType = $scope.bookmarkTypes[0];
      $scope.bookmarkName = "";
      $scope.bookmarkUrl = "https://";      
    });
  };
  
  $scope.deleteBookmark = function(index){
    console.log('deleting item with index:' + index);
    
    $scope.bookmarks.splice(index, 1);
    
    $scope.bookmarks.forEach(function(item){      
      if(item.index > index){
        item.index = item.index - 1;
      }
    });
    
    chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
      console.log("bookmark deleted");
    });    
  };
  
  $scope.deleteAllBookmarks = function(){
    $scope.bookmarks = [];
    chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
      console.log("all bookmarks deleted");    
    });
  };
  
  
  $scope.editBookmark = function(index){
    $scope.bookmarks[index].editMode = true;
  };
  
  $scope.editBookmarkDone = function(index){    
    $scope.bookmarks[index].editMode = false;
    
    chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
      console.log("bookmarks updated");
    });
  };
  
  
  
  
  
  $scope.goUp = function(i){
    console.log('going up, i=' + i);
    if(i>1){
      var newBookmarks = [];
      var temp1;
      var temp2;
      
      $scope.bookmarks.forEach(function(item){
        if(item.index == i-1){
          temp1 = newBookmark(item.bookmarkType, item.name, item.url, item.imgSrc);
          temp1.index = item.index + 1;
          
          newBookmarks.push(temp1);
          
        }else if(item.index == i){
          temp2 = newBookmark(item.bookmarkType, item.name, item.url, item.imgSrc);
          temp2.index = item.index - 1;
          
          newBookmarks.push(temp2);
          
        }else{
          newBookmarks.push(item);
        }
      });
      
      console.log(JSON.stringify('newBookmarks:' + newBookmarks));      
      $scope.bookmarks = newBookmarks;
      
      chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
        console.log("bookmarks saved");
      });
    }
  }
  
  $scope.goDown = function(i){
    console.log('going down, i=' + i);    
    
    if(i< $scope.bookmarks.length){
      var newBookmarks = [];
      var temp1;
      var temp2;
      
      $scope.bookmarks.forEach(function(item){
        if(item.index == i){
          temp1 = newBookmark(item.bookmarkType, item.name, item.url, item.imgSrc);
          temp1.index = item.index + 1;
                    
          newBookmarks.push(temp1);
          
        }else if(item.index == i+1){
          temp2 = newBookmark(item.bookmarkType, item.name, item.url, item.imgSrc);
          temp2.index = item.index - 1;
          
          newBookmarks.push(temp2);
          
        }else{
          newBookmarks.push(item);
        }
        
        console.log(JSON.stringify('newBookmarks:' + newBookmarks));      
        $scope.bookmarks = newBookmarks;
        
        chrome.storage.sync.set({bookmarks: $scope.bookmarks}, function(){
          console.log("bookmarks saved");
        });
      });
    }
  }
  
  
  
  function newBookmark(bookmarkType, name, url, imgSrc){
    return {
      index: $scope.bookmarks.length + 1,
      bookmarkType: bookmarkType,
      name: name,
      url: url,
      imgSrc: imgSrc,
      editMode: false
    }
  };
  
  
  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true && JSON.stringify(obj) === JSON.stringify({});
  };
  
  
}  
