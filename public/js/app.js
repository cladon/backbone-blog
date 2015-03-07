$.ajaxPrefilter(function(options, originalOptions, jqXHR)
{
    options.url = '/api/v1' + options.url;
});

var Posts = Backbone.Collection.extend({
    url: '/posts'
});

var Post = Backbone.Model.extend({
    urlRoot: '/posts'
});

var PostListView = Backbone.View.extend({
    el: '#page',
    render: function() {
        var that = this;
        var posts = new Posts();
        posts.fetch({
            success: function(posts) {
                //console.log(that.template()({posts: posts.models}));
                that.$el.html(that.template(posts.models));
            },
            error: function() {
                that.$el.html(that.template([]));
            }
        })
    },
    template: function(data) {
        return _.template($("#post-list-template").html())({posts: data});
    }
});

var postListView = new PostListView();

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        '/login': 'login'
    }
});

var router = new Router();
router.on('route:home', function()
{
    postListView.render();
});

router.on('route:login', function()
{

});

Backbone.history.start();
//# sourceMappingURL=app.js.map