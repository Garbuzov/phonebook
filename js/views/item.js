var app = app || {};

app.ItemView = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#item-template').html()),

  events: {
    'dblclick .item-name': 'editName',
    'dblclick .item-phone': 'editPhone',
    'click .delete': 'remove',
    'keypress': 'updateOnEnter',
    'blur ': 'close',
    'focusout' : 'close'
  },

  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'remove', this.unrender);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes)).attr('class','item');
    this.$itemName = this.$el.find('.item-name');
    this.$itemPhone = this.$el.find('.item-phone');
    this.$editName =  this.$itemName.find('.edit-name');
    this.$editPhone =  this.$itemPhone.find('.edit-phone');
    this.toggleVisible();
    return this;
  },

  unrender: function(){
    this.$el.remove();
  },

  toggleVisible : function () {
    this.$el.toggleClass( 'hidden',  this.isHidden());
  },

  escapeRegExp: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  isHidden : function () {
    var filter = this.escapeRegExp($('#search').prop('value').trim());
    var regexp = RegExp(filter, 'i');
    return !(regexp.test(this.model.get('name')) || regexp.test(this.model.get('phone')));
  },

  editName: function(){
    this.$itemName.addClass('edit');
    this.$editName.focusEnd();
  },

  editPhone: function(){
    this.$itemPhone.addClass('edit');
    this.$editPhone.focusEnd();
  },

  isNotEmptyName: function(){
    return this.$editName.val().trim() !== '';
  },

  close: function(){
    if (this.isNotEmptyName()){

      this.model.save({
        name: this.$editName.val(),
        phone: this.$editPhone.val()
      });

      this.$itemName.removeClass('edit');
      this.$itemPhone.removeClass('edit');
    }
  },

  remove: function() {
    this.model.destroy();
  },

  updateOnEnter: function( e ) {
    if ( e.which === ENTER_KEY ) {
      this.close();
    }
  }
});