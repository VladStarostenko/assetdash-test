import {expect} from 'chai';
import {
  addParamToURL,
  deleteParamFromURL,
  addAndDeleteParamFromURL
} from '../../src/core/utils';

describe('Utils', () => {
  describe('addParamToURL', () => {
    it('adds first param', () => {
      const location = {
        pathname: 'test/',
        search: ''
      };
      expect(addParamToURL(location, 'testName', 'testValue')).to.eq('test/?testName=testValue');
    });

    it('adds second param', () => {
      const location = {
        pathname: 'test/',
        search: 'first=a'
      };
      expect(addParamToURL(location, 'second', 'b')).to.eq('test/?first=a&second=b');
    });

    it('changes value when add param with the same name', () => {
      const location = {
        pathname: 'test/',
        search: 'first=a'
      };
      expect(addParamToURL(location, 'first', 'b')).to.eq('test/?first=b');
    });
  });

  describe('deleteParamFromURL', () => {
    it('deletes single param', () => {
      const location = {
        pathname: 'test/',
        search: 'testName=testValue'
      };
      expect(deleteParamFromURL(location, 'testName')).to.eq('test/');
    });

    it('deletes first param', () => {
      const location = {
        pathname: 'test/',
        search: 'first=a&second=b'
      };
      expect(deleteParamFromURL(location, 'first')).to.eq('test/?second=b');
    });

    it('deletes second param', () => {
      const location = {
        pathname: 'test/',
        search: 'first=a&second=b'
      };
      expect(deleteParamFromURL(location, 'second')).to.eq('test/?first=a');
    });
  });

  describe('addAndDeleteParamFromURL', () => {
    it('adds new param and deletes old, when there is one param in URL', () => {
      const location = {
        pathname: 'test/',
        search: 'oldParamName=oldParamValue'
      };
      expect(addAndDeleteParamFromURL(location, 'newParamName', 'newParamValue', 'oldParamName'))
        .to.eq('test/?newParamName=newParamValue');
    });

    it('adds new param and deletes old, when there are two params in URL', () => {
      const location = {
        pathname: 'test/',
        search: 'firstOldParam=a&secondOldParam=b'
      };
      expect(addAndDeleteParamFromURL(location, 'newParamName', 'newParamValue', 'firstOldParam'))
        .to.eq('test/?secondOldParam=b&newParamName=newParamValue');
    });

    it('changes value of old param and then deletes it', () => {
      const location = {
        pathname: 'test/',
        search: 'param=a'
      };
      expect(addAndDeleteParamFromURL(location, 'param', 'b', 'param'))
        .to.eq('test/');
    });
  });
});
