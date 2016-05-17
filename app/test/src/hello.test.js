// var should = require('should');
// var utils = require('../../main/src/hello');
 
// describe('測試標題', function(){
//   before(function(){
//     // 任何需要在測試前執行的程式
//   });
//   after(function(){
//     // 任何需要在測試後刪除的資料
//   });
//   describe('測試子標題', function(){
//     it('測試內容', function(){
//       utils.isNull(null).should.equal(true);
//     });
//   });
// });


import {should} from 'should';
import {hello} from '../../main/src/hello';

describe('測試標題', function(){
  before(function(){
    // 任何需要在測試前執行的程式
  });
  after(function(){
    // 任何需要在測試後刪除的資料
  });
  describe('測試子標題', function(){
    it('測試內容', function(){
      hello().should.equal('hello');
    });
  });
});