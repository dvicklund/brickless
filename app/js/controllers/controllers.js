module.exports = function(app) {
  require('./authCtrl')(app);
  require('./pageCtrl')(app);
  require('./storeCtrl')(app);
}
