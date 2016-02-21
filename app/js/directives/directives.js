module.exports = function(app) {
  require('./header')(app);
  require('./imageUpload')(app);
  require('./editable')(app);
}
