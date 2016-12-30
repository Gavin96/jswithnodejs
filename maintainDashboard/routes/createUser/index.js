/**
 * Created by WANGGA2 on 12/19/2016.
 */
var createUser =  module.exports;
// var User = require('../../models/User');
// var ReportConfig = require('../../models/ReportConfig');
var User = require('../../models/User');
var passport = require('../utils/passport');

createUser.getCreateUserNameDropdown =  function (req, res) {
    User.find().sort({Name:1}).select('_id Name').exec(function (err, items) {
        if(err){
            console.error(err);
            res.status(504).end();
        }else {
            res.json(items);
        }
    });
};