import React from 'react';
import ReactDOM from 'react-dom';

import * as utils from '../../common/utils.js';


var SettingsProfile = React.createClass({
   render: function(){
       return (
           <div>
                <p>
                    <b>Title&nbsp;</b>
                    <input type='text' value={this.props.title} onChange={this.props.onTitleChange}/>
                </p>
                
                <p>
                    <b>Info&nbsp;</b>
                    <input type='text' value={this.props.info} onChange={this.props.onInfoChange} />
                </p>
                
                <p><button onClick={this.props.saveActionHandler}>儲存</button></p>
           </div>
       );
   } 
});


var SettingsBookmarks = React.createClass({
   render: function(){
       var bookmarkNodes = this.props.data.map(function(bookmark) {
            return (
                <div className='media media-bookmark' key={bookmark.id} >
                    <div className='media-left'>
                        <img className='bookmark-img' src={bookmark.imgSrc} />
                    </div>
                    <div className='media-body'>
                        <div className='pull-right'>
                            <button className='btn btn-link btn-bookmark-delete' onClick={this.props.deleteBookmarkActionHandler} data-id={bookmark.id}>刪除</button>
                        </div>
                        <h4 className='bookmark-name'>{bookmark.name}</h4>
                        <p className='bookmark-url'>{bookmark.url}</p>
                    </div>                    
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



var SettingsBox = React.createClass({
    getInitialState: function(){
        return {            
            title: '',
            info: '',
            bookmarks: []            
        }
    },
    loadSettings: function(){
        chrome.storage.sync.get("settings", function(result) {
            console.log("load settings result:"  + JSON.stringify(result));
            
            if (utils.isNull(result) || utils.isEmpty(result) || utils.isNull(result.settings) || utils.isEmpty(result.settings)){
                console.log('no settings');
                
                this.setState({
                    title:  'No Settings!',
                    info: 'create your first settings',
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
    saveSettings: function(){
        let settings = {
            title: this.state.title,
            info: this.state.info,
            bookmarks: this.state.bookmarks
        };
        
        chrome.storage.sync.set({'settings': settings}, function(){
            console.log('settings saved!');                            
            alert('settings saved!');
        }.bind(this)); 
    },
    handleTitleChanged: function(e){        
        this.setState({
           title: e.target.value
        });        
    },
    handleInfoChanged: function(e){        
        this.setState({
           info: e.target.value
        });        
    },
    deleteBookmark: function(e){
        if(confirm('確定要刪除?')){
            console.log('delete bookmark with id:' + e.target.getAttribute('data-id'));
        }else{
            console.log('delete bookmark with id:' + e.target.getAttribute('data-id') + ' is canceled');
        }
    },
    componentDidMount: function(){
        this.loadSettings();
    },
    render: function(){
       return (
         <div className='settings-container'>
            <h2>Title and Info</h2>         
            <SettingsProfile title={this.state.title} info={this.state.info} onTitleChange={this.handleTitleChanged} onInfoChange={this.handleInfoChanged} saveActionHandler={this.saveSettings}/>
            
            <hr />
            
            <h2>Bookmarks</h2>
            <SettingsBookmarks data={this.state.bookmarks} deleteBookmarkActionHandler={this.deleteBookmark} />                     
         </div>  
       );
    } 
});


ReactDOM.render(
    <SettingsBox />,
    document.getElementById("settingsBox")
);




