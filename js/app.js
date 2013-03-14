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
  adapter: 'DS.FixtureAdapter'
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string')
});

App.Post.FIXTURES = [{
  id: 1,
  title: "A post title!",
  body: "A post body goes here yo!"
}, {
  id: 4,
  title: "Second post, baby.",
  body: "A post body goes  asdf ads s s df yo!"
}, {
  id: 9,
  title: "The third and final post",
  body: "Hipster ipsum is my blood"
}];