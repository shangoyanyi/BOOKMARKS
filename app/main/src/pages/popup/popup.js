import React from 'react';
import ReactDOM from 'react-dom';

import * as utils from '../../common/utils.js';

var BookmarksEmpty = React.createClass({  
    render: function(){
        return (
          <div className='bookmark-empty'>
              <img src='http://supperstudio.com/wp-content/uploads/empty-spaces-logo.jpg' />
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
          title: '',
          info: '',
          bookmarks : []
        };
    },
    loadSettings: function(){
        chrome.storage.sync.get("settings", function(result) {
            console.log("load settings result:"  + JSON.stringify(result));
            
            if (utils.isNull(result) || utils.isEmpty(result) || utils.isNull(result.settings) || utils.isEmpty(result.settings)){
                console.log('no settings');
                
                this.setState({
                    title:  'Not Found',
                    info: 'found no settings, generate it first',
                    bookmarks: []
                });
                
            }else{
                let settings = result.settings;
                this.setState({
                    title:  settings.title,
                    info: settings.info,
                    bookmarks: settings.bookmarks
                });
            }
                        
        }.bind(this));
    },
    generateTestData: function(){
      let settings = {
          title: 'The Punisher',
          info: 'Frank Castle',
          bookmarks: [{
                id : '1',              
                name:'Slack | chtmember',
                url:'https://chtmember.slack.com',
                imgSrc:'https://a.slack-edge.com/0180/img/icons/app-256.png'
            },{
                id : '2',              
                name:'Slack | Mirakuru',
                url:'https://mirakuru.slack.com',
                imgSrc:'https://a.slack-edge.com/0180/img/icons/app-256.png'
            } 
          ]
      };      
      
      chrome.storage.sync.set({'settings': settings}, function(){
          console.log('settings saved!');
          
          this.setState({
             title:  settings.title,
             info: settings.info,
             bookmarks: settings.bookmarks
          });
      }.bind(this));      
    },
    clearTestData: function(){
      let settings = {};
      
      chrome.storage.sync.set({'settings': settings}, function(){
          console.log('settings cleared!');          
          this.loadSettings();
      }.bind(this));      
    },
    componentDidMount: function(){
        this.loadSettings();        
    },
    render: function(){
        var bookmarks = this.state.bookmarks.length>0 ? <Bookmarks data={this.state.bookmarks} /> : <BookmarksEmpty />;        
        
        return (
            <div>
                <div className='page-title'>{this.state.title}</div>
                <div className='page-info'>{this.state.info}</div>
                
                <p>
                    <button onClick={this.generateTestData}>產生測試資料</button>
                    <button onClick={this.clearTestData}>清除測試資料</button>
                </p>
                
                {bookmarks}
            </div>            
        );
    }
});


ReactDOM.render(
    <BookmarkBox />,
    document.getElementById("bookmarkBox")
);