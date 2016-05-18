import React from 'react';
import ReactDOM from 'react-dom';


var BookmarksIsEmpty = React.createClass({  
    render: function(){
        return (
          <div className='bookmark-empty'>
              <img src='http://2.bp.blogspot.com/-uS_sqEbi9Po/U4K7HV1_XII/AAAAAAAAARQ/jv5z0zvIyGw/s1600/Pikachu.600.1445652.jpg' />
          </div>  
        );
    }
});

var Bookmarks = React.createClass({    
    handleClick: function(url){        
        window.open(url);
    },
    render: function(){        
        var bookmarkNodes = this.props.data.map(function(bookmark) {
            return (
                <div className='bookmark' key={bookmark.id} onClick={this.handleClick.bind(this, bookmark.url)}>
                    <img className='bookmark-img' src={bookmark.imgSrc} />
                    <span className='bookmark-name'>{bookmark.name}</span>
                </div>                
            );
        }.bind(this));
    
        return (
          <div className='bookmark-container'>
            {bookmarkNodes}
          </div>  
        );
    }
});




           
var BookmarkBox = React.createClass({
    getInitialState: function(){
        return {
          title: 'Title',
          info: 'info',
          bookmarks : []
        };
    },
    getSettings: function(){
        chrome.storage.sync.get("bookmarks", function(result) {
            console.log("load bookmarks result:"  + JSON.stringify(result));            
        });
    },
    componentDidMount: function(){
        this.getSettings();
        this.setState({
            title: 'myBookmarks',
            info: 'my first bookmarks',
            // bookmarks : [{
            //     id : '1',              
            //     name:'Slack | chtmember',
            //     url:'https://chtmember.slack.com',
            //     imgSrc:'https://a.slack-edge.com/0180/img/icons/app-256.png'
            // },{
            //     id : '2',              
            //     name:'Slack | Mirakuru',
            //     url:'https://mirakuru.slack.com',
            //     imgSrc:'https://a.slack-edge.com/0180/img/icons/app-256.png'
            // }]
            bookmarks:[]
        });
    },
    render: function(){
        if(this.state.bookmarks.length > 0){
            return (
                <div>
                    <div className='page-title'>{this.state.title}</div>
                    <div className='page-info'>{this.state.info}</div>
                    
                    <Bookmarks data={this.state.bookmarks} />            
                </div>            
            );
            
        }else{
            return (
                <div>
                    <div className='page-title'>{this.state.title}</div>
                    <div className='page-info'>{this.state.info}</div>
                    
                    <BookmarksIsEmpty />                    
                </div>            
            );
        }
    }
});


ReactDOM.render(
    <BookmarkBox />,
    document.getElementById("bookmarkBox")
);