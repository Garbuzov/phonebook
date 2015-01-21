var app = app || {};

app.Item = Backbone.Model.extend({
  defaults: {
    name: '',
    phone: '+7'
  }
});