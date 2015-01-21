var app = app || {};
var ENTER_KEY = 13;

$(function() {

  new app.AppView();

  var template = [
    {
      name: 'Василий',
      phone: '+7 (954) 235-89-86'
    },
    {
      name: 'Ольга',
      phone: '+7 (911) 568-75-69'
    },
    {
      name: 'Ефим',
      phone: '+7 (865) 123-56-89'
    },
    {
      name: 'Феофан',
      phone: '+7 (658) 996-32-72'
    }
  ];

  if (!app.List.localStorage.localStorage().getItem('phonebook')) {
    template.forEach(function(item){
      app.List.create(item);
    });
  }
});