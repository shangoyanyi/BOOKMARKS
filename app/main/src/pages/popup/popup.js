import React from 'react';
import ReactDOM from 'react-dom';

// return '<div class="bookmark" data-target="' + url + '">' +
//               '<img class="bookmark-img" src="' + imgSrc + '">' + 
//               '<span class="bookmark-name">' + name + '</span>' + 
//            '</div>';
           
var BookmarkBox = React.createClass({
    render: function(){
        return (
          <div>
            I'm a Bookmarks list
          </div>            
        );
    }
})


ReactDOM.render(
    <BookmarkBox />,
    document.getElementById("bookmarkBox")
);