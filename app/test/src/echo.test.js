var should = require('should');
//var echo = require('../../main/src/echo');

import {print} from '../../main/src/echo';
 
describe('測試標題', function(){
  before(function(){
    // 任何需要在測試前執行的程式
  });
  after(function(){
    // 任何需要在測試後刪除的資料
  });
  describe('測試子標題', function(){
    it('測試內容', function(){
      // echo.print('訊息').should.equal('訊息');
      print('訊息').should.equal('訊息');
    });
  });
});