module.exports = function(app) {
  require('./pageCtrl')(app);
  require('./storeCtrl')(app);
}
