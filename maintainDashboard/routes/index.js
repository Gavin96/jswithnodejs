var express = require('express');
var user = require('./userRouter');
var home = require('./homeRouter');
var viewConfig = require('./viewReportRouter');
var reportRouter = require('./reportConfigRouter');
var previewRouter = require('./previewRouter');
var externalSystem = require('./externalSystem');
var createUser = require('./createUser');
var updateUser = require('./updateUser');
// var updateUserName = require('./updateUserName');
var router = express.Router();


module.exports = function (app) {

  //user router
  app.get('/',user.getLoginPage);
  app.get('/login',user.getLoginPage);
  app.post('/user/login',user.loginSystem);
  app.get('/user/modifyPwd',user.modifyPwdPage);
  app.post('/user/modifyPwd',user.modifyPwd);
  app.post('/user/getLoginUser',user.getLoginUser);
  app.post('/user/getAdmin',user.getAdmin);

  //data connection router    //report configuration router    //preview report    //report configuration enquiry


  //run report    //external system    //dashboard config    //object as supporting table
  app.post('/support/externalSystem', externalSystem.getExternalSystemDropdown);
  app.post('/support/createUser', createUser.getCreateUserNameDropdown);
  app.post('/support/updateUser', updateUser.getUpdateUserNameDropdown);
  // app.post('/support/updateUserName', updateUserName.getUpdateUserNameDropdown);
  // app.post('/support/activeStatus', activeStatus.getActiveStatusDropdown);  
};
