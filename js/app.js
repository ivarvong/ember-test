window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('post', {path: ':post_id'})
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.PostsController = Ember.ArrayController.extend();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.DumbAdapter'
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  author: DS.attr('string'),
  tags: DS.attr('string'),
  catagories: DS.attr('string')
});


DS.DumbAdapter = DS.Adapter.extend({
  find: function (store, type, id) { 
    console.log('find')
    store.load(type, []);    
  },
  findAll: function (store, type) { 
    var self = this;
    console.log('findAll', store, type)
    var url = "http://dailyemerald.com/json/?callback=?"
    $.getJSON(url, function(data) {
      console.log(data);
      var posts = {
        "posts": data
      }
      store.loadMany(type, posts);
      self.didFindAll(store, type, posts);
    });
  }
});