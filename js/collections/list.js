var app = app || {};

var ItemsList = Backbone.Collection.extend({
  model: app.Item,
  localStorage: new Backbone.LocalStorage('phonebook')
});

app.List = new ItemsList();