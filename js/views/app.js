var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#phonebookapp',

  events: {
    'keypress #add-item': 'createOnEnter',
    'click .btn-add' : 'create',
    'keyup #search' : 'filterAll',
    'focusout #search' : 'filterAll'
  },

  initialize: function(){
    this.$inputName = this.$('#add-name');
    this.$inputPhone = this.$('#add-phone').mask('+0 (000) 000-00-00');
    this.$container = this.$('#phone-list');

    this.listenTo(app.List, 'add', this.addOne);
    this.listenTo(app.List, 'reset', this.addAll);

    app.List.fetch();
  },

  render: function(){

  },

  addOne: function(item) {
    var view = new app.ItemView({model: item});
    var element = view.render().el;
    $('#phone-list').prepend(element);

  },

  addAll: function(){
    this.$container.html('');
    app.List.each(this.addOne, this);
  },

  newAttributes: function(){
    return {
      name: this.$inputName.val().trim(),
      phone: this.$inputPhone.val().trim()
    }
  },

  create: function(){
    if (this.$inputName.val().trim() !== '') {
      app.List.create(this.newAttributes());
      this.$inputName.val('');
      this.$inputPhone.val('');
    }
  },

  createOnEnter: function(event) {
    if (event.which === ENTER_KEY && this.$inputName.val().trim() !== '') {
      this.create();
    }
  },

  filterOne : function (item) {
    item.trigger('visible');
  },

  filterAll : function () {
    app.List.each(this.filterOne, this);
  }
});