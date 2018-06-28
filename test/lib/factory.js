import '../../dist/regenerator.js';
import '../../dist/sfjs.js';
import '../../node_modules/chai/chai.js';
import '../vendor/chai-as-promised-built.js';
import '../../vendor/lodash/lodash.custom.js';

import LocalStorageManager from './localStorageManager.js';
const sf_default = new StandardFile();
SFItem.AppDomain = "org.standardnotes.sn";

var _globalStorageManager = null;
var _globalHttpManager = null;
var _globalAuthManager = null;
var _globalModelManager = null;
var _globalStandardFile = null;

export default class Factory {

  static initialize() {
    this.globalStorageManager();
    this.globalHttpManager();
    this.globalAuthManager();
    this.globalModelManager();
  }

  static globalStorageManager() {
    if(_globalStorageManager == null) { _globalStorageManager = new LocalStorageManager(); }
    return _globalStorageManager;
  }

  static globalHttpManager() {
    if(_globalHttpManager == null) { _globalHttpManager = new SFHttpManager(_globalStorageManager); }
    return _globalHttpManager;
  }

  static globalAuthManager() {
    if(_globalAuthManager == null) { _globalAuthManager = new SFAuthManager(_globalStorageManager, _globalHttpManager); }
    return _globalAuthManager;
  }

  static globalModelManager() {
    if(_globalModelManager == null) { _globalModelManager = new SFModelManager(); }
    return _globalModelManager;
  }

  static globalStandardFile() {
    if(_globalStandardFile == null) { _globalStandardFile = new StandardFile(); }
    return _globalStandardFile;
  }

  static createModelManager() {
    return new SFModelManager();
  }

  static createItemParams() {
    var params = {
      uuid: SFJS.crypto.generateUUIDSync(),
      content_type: "Note",
      content: {
        title: "hello",
        text: "world"
      }
    };
    return params;
  }

  static createItem() {
    return new SFItem(this.createItemParams());
  }

  static async newRegisteredUser() {
    let url = "http://localhost:3000";
    let email = sf_default.crypto.generateUUIDSync();
    let password = sf_default.crypto.generateUUIDSync();
    return new Promise((resolve, reject) => {
      this.globalAuthManager().register(url, email, password, false, resolve);
    })
  }
}

Factory.initialize();
