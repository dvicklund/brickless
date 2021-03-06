module.exports = function(app) {
  require('./authCtrl')(app);
  require('./pageCtrl')(app);
  require('./storeCtrl')(app);
  require('./postItemCtrl')(app);
  require('./profileCtrl')(app);
  require('./searchCtrl')(app);
  require('./imageuploadCtrl')(app);
  require('./singleItemCtrl')(app);
}
