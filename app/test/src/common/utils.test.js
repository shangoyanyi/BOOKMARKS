// var should = require('should');
// var utils = require('../../main/src/utils');

import {should} from 'should';
import * as utils from '../../../main/src/common/utils';
 
describe('測試utils', function(){
  before(function(){
    // 任何需要在測試前執行的程式
  });
  after(function(){
    // 任何需要在測試後刪除的資料
  });
  describe('utils.isNull', function(){
    it('null equals true', function(){
        utils.isNull(null).should.equal(true);
    });
    it('empty object equals false', function(){
        utils.isNull({}).should.equal(false);
    });
  });
  describe('utils.isEmpty', function(){
    it('null equals false', function(){
        utils.isEmpty(null).should.equal(false);
    });
    
    it('empty object equals true', function(){
        utils.isEmpty({}).should.equal(true);
    });
    
    it('not empty object equals false', function(){
        utils.isEmpty({key:'value'}).should.equal(false);
    });
  });
  
});